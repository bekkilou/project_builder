const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const {
  asArray,
  clear,
  addError,
  renderWithErrors
} = require('./helpers/routing')

// ─── Helpers ────────────────────────────────────────────────────────────────

function isMultiNational (data) {
  return data['UKOrMultiNation'] === 'multi_national'
}

function isCTIMP (data) {
  return String(data['isCTIMP'] || '').toLowerCase() === 'yes'
}

function hasTreatment (data) {
  return asArray(data['researchActivities']).includes('treatment')
}

// ─── Page flow ───────────────────────────────────────────────────────────────
//
//  /project/governance/uk-or-multi-nation          UKOrMultiNation (always)
//    → if multi: /outside-uk-countries
//    → else:     /supplies-not-funder
//  /project/governance/outside-uk-countries        outsideUKCountries
//  /project/governance/supplies-not-funder         suppliesNotFunder (always)
//    → if yes:   /materials-supplied
//    → else:     /legal-risks
//  /project/governance/materials-supplied          materialsSupplied
//  /project/governance/legal-risks                 legalRisks (always)
//  /project/governance/monitoring-auditing         monitoringAuditing (if CTIMP)
//  /project/governance/data-efficacy               dataEfficacy (if treatment)
//  /project/governance/insurance-indemnity         insuranceIndemnity (always)
//  /project/governance/insurance-indemnity-collab  insuranceIndemnityCollab (always)
//  /project/governance/justify-excluded            justifyExcluded (always)
//  /project/governance/sponsor-compensation        sponsorCompensation (always)
//    → if yes:   /compensation-arrangements
//    → else:     /contract-org (if CTIMP) or check
//  /project/governance/compensation-arrangements   compensationArrangements
//  /project/governance/contract-org                contractOrgResponsibility (if CTIMP)
//    → if yes:   /contract-org-name
//    → else:     /delegated-activities
//  /project/governance/contract-org-name           contractOrgName
//  /project/governance/delegated-activities        delegatedActivities (if CTIMP)
//    → if yes:   /delegate-orgs
//    → else:     /check
//  /project/governance/delegate-orgs               delegateOrgs

// ─── Routes ──────────────────────────────────────────────────────────────────

router.post('/project/governance/uk-or-multi-nation', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['UKOrMultiNation']) {
    addError(errors, 'UKOrMultiNation', 'Select whether this project is taking place in any countries other than the UK')
  }

  if (errors.length) return renderWithErrors(res, 'project/governance/uk-or-multi-nation', errors)

  if (!isMultiNational(data)) clear(data, ['outsideUKCountries'])

  if (isMultiNational(data)) return res.redirect('/project/governance/outside-uk-countries')

  return res.redirect('/project/governance/supplies-not-funder')
})

router.post('/project/governance/outside-uk-countries', function (req, res) {
  const data = req.session.data
  const errors = []

  if (asArray(data['outsideUKCountries']).length === 0) {
    addError(errors, 'outsideUKCountries', 'Select at least one country outside the UK')
  }

  if (errors.length) return renderWithErrors(res, 'project/governance/outside-uk-countries', errors)

  return res.redirect('/project/governance/supplies-not-funder')
})

router.post('/project/governance/supplies-not-funder', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['suppliesNotFunder']) {
    addError(errors, 'suppliesNotFunder', 'Select whether any materials are being supplied from an organisation not providing funding')
  }

  if (errors.length) return renderWithErrors(res, 'project/governance/supplies-not-funder', errors)

  if (data['suppliesNotFunder'] === 'yes') {
    return res.redirect('/project/governance/materials-supplied')
  }

  clear(data, ['materialsSupplied'])
  return res.redirect('/project/governance/legal-risks')
})

router.post('/project/governance/materials-supplied', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['materialsSupplied'] || !data['materialsSupplied'].trim()) {
    addError(errors, 'materialsSupplied', 'Enter details of the source of materials supplied')
  }

  if (errors.length) return renderWithErrors(res, 'project/governance/materials-supplied', errors)

  return res.redirect('/project/governance/legal-risks')
})

router.post('/project/governance/legal-risks', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['legalRisks'] || !data['legalRisks'].trim()) {
    addError(errors, 'legalRisks', 'Enter any logistical, legal, or management risks relating to your project')
  }

  if (errors.length) return renderWithErrors(res, 'project/governance/legal-risks', errors)

  if (isCTIMP(data)) return res.redirect('/project/governance/monitoring-auditing')

  clear(data, ['monitoringAuditing'])
  return res.redirect('/project/governance/data-efficacy-or-insurance')
})

router.post('/project/governance/monitoring-auditing', function (req, res) {
  const data = req.session.data
  const errors = []

  if (asArray(data['monitoringAuditing']).length === 0) {
    addError(errors, 'monitoringAuditing', 'Select at least one monitoring and auditing arrangement')
  }

  if (errors.length) return renderWithErrors(res, 'project/governance/monitoring-auditing', errors)

  return res.redirect('/project/governance/data-efficacy-or-insurance')
})

// Internal redirect — data efficacy only shown if treatment
router.get('/project/governance/data-efficacy-or-insurance', function (req, res) {
  const data = req.session.data

  if (hasTreatment(data)) return res.redirect('/project/governance/data-efficacy')

  clear(data, ['dataEfficacy'])
  return res.redirect('/project/governance/insurance-indemnity')
})

router.post('/project/governance/data-efficacy', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['dataEfficacy'] || !data['dataEfficacy'].trim()) {
    addError(errors, 'dataEfficacy', 'Enter the arrangements for reviewing interim safety and efficacy data')
  }

  if (errors.length) return renderWithErrors(res, 'project/governance/data-efficacy', errors)

  return res.redirect('/project/governance/insurance-indemnity')
})

router.post('/project/governance/insurance-indemnity', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['insuranceIndemnity'] || !data['insuranceIndemnity'].trim()) {
    addError(errors, 'insuranceIndemnity', 'Enter the insurance or indemnity arrangements for sponsors')
  }

  if (errors.length) return renderWithErrors(res, 'project/governance/insurance-indemnity', errors)

  return res.redirect('/project/governance/insurance-indemnity-collab')
})

router.post('/project/governance/insurance-indemnity-collab', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['insuranceIndemnityCollab'] || !data['insuranceIndemnityCollab'].trim()) {
    addError(errors, 'insuranceIndemnityCollab', 'Enter the insurance or indemnity arrangements for investigators and collaborators')
  }

  if (errors.length) return renderWithErrors(res, 'project/governance/insurance-indemnity-collab', errors)

  return res.redirect('/project/governance/justify-excluded')
})

router.post('/project/governance/justify-excluded', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['justifyExcluded'] || !data['justifyExcluded'].trim()) {
    addError(errors, 'justifyExcluded', 'Enter which participant groups are excluded from insurance cover and why')
  }

  if (errors.length) return renderWithErrors(res, 'project/governance/justify-excluded', errors)

  return res.redirect('/project/governance/sponsor-compensation')
})

router.post('/project/governance/sponsor-compensation', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['sponsorCompensation']) {
    addError(errors, 'sponsorCompensation', 'Select whether sponsors have made arrangements for compensation in the event of harm')
  }

  if (errors.length) return renderWithErrors(res, 'project/governance/sponsor-compensation', errors)

  if (data['sponsorCompensation'] === 'yes') {
    return res.redirect('/project/governance/compensation-arrangements')
  }

  clear(data, ['compensationArrangements'])
  return res.redirect('/project/governance/ctimp-delegation-next')
})

router.post('/project/governance/compensation-arrangements', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['compensationArrangements'] || !data['compensationArrangements'].trim()) {
    addError(errors, 'compensationArrangements', 'Enter details of the arrangements for compensation')
  }

  if (errors.length) return renderWithErrors(res, 'project/governance/compensation-arrangements', errors)

  return res.redirect('/project/governance/ctimp-delegation-next')
})

// Internal redirect — CTIMP delegation pages only shown if CTIMP
router.get('/project/governance/ctimp-delegation-next', function (req, res) {
  const data = req.session.data

  if (isCTIMP(data)) return res.redirect('/project/governance/contract-org')

  clear(data, [
    'contractOrgResponsibility',
    'contractOrgName',
    'delegatedActivities',
    'delegateOrgs'
  ])
  return res.redirect('/project/governance/check')
})

router.post('/project/governance/contract-org', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['contractOrgResponsibility']) {
    addError(errors, 'contractOrgResponsibility', 'Select whether sponsors have delegated site management to a CRO or CTU')
  }

  if (errors.length) return renderWithErrors(res, 'project/governance/contract-org', errors)

  if (data['contractOrgResponsibility'] === 'yes') {
    return res.redirect('/project/governance/contract-org-name')
  }

  clear(data, ['contractOrgName'])
  return res.redirect('/project/governance/delegated-activities')
})

router.post('/project/governance/contract-org-name', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['contractOrgName'] || !data['contractOrgName'].trim()) {
    addError(errors, 'contractOrgName', 'Enter the name of the Contract Research Organisation or Clinical Trials Unit')
  }

  if (errors.length) return renderWithErrors(res, 'project/governance/contract-org-name', errors)

  return res.redirect('/project/governance/delegated-activities')
})

router.post('/project/governance/delegated-activities', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['delegatedActivities']) {
    addError(errors, 'delegatedActivities', 'Select whether any research activities have been delegated to a subcontractor')
  }

  if (errors.length) return renderWithErrors(res, 'project/governance/delegated-activities', errors)

  if (data['delegatedActivities'] === 'yes') {
    return res.redirect('/project/governance/delegate-orgs')
  }

  clear(data, ['delegateOrgs'])
  return res.redirect('/project/governance/check')
})

router.post('/project/governance/delegate-orgs', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['delegateOrgs'] || !data['delegateOrgs'].trim()) {
    addError(errors, 'delegateOrgs', 'Enter the names of subcontracted organisations and oversight arrangements')
  }

  if (errors.length) return renderWithErrors(res, 'project/governance/delegate-orgs', errors)

  return res.redirect('/project/governance/check')
})

module.exports = router
