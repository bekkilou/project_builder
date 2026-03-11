const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const {
  asArray,
  clear,
  addError,
  renderWithErrors
} = require('./helpers/routing')

// ─── Helpers ────────────────────────────────────────────────────────────────

function isCTIMP (data) {
  return String(data['isCTIMP'] || '').toLowerCase() === 'yes'
}

function hasTreatment (data) {
  return asArray(data['researchActivities']).includes('treatment')
}

function hasClinicalOrTreatment (data) {
  const a = asArray(data['researchActivities'])
  return a.includes('clinical_people_activities') || a.includes('treatment')
}

function hasNonClinicalInterviews (data) {
  return asArray(data['researchActivities']).includes('non_clinical_people_interviews_surveys')
}

function hasNHSPatients (data) {
  return asArray(data['participantGroups']).includes('nhs_patients_service_users') ||
    asArray(data['participantGroups']).includes('care_home_residents')
}

// The "comparing standard" path is skipped if novelIntervention or compareIntervention/goldIntervention == yes
function isComparingStandard (data) {
  return data['compareStandard'] === 'no' &&
    data['novelIntervention'] !== 'yes' &&
    data['compareIntervention'] !== 'yes'
}

// ─── Page flow ───────────────────────────────────────────────────────────────
//
//  /project/research-activities/intervention-description   interventionDescription (if clinical/treatment)
//  /project/research-activities/first-in-human            firstInHuman (if CTIMP)
//  /project/research-activities/delay-treatment           delayTreatment (if NHS patients + clinical/treatment)
//  /project/research-activities/compare-standard          compareStandard (if treatment)
//    → if no:  /change-in-standard-care
//    → if yes: /questionnaire-type (or next appropriate)
//  /project/research-activities/change-in-standard-care   changeInStandardCare
//  /project/research-activities/questionnaire-type        questionnaireType (if non-clinical interviews)
//  /project/research-activities/sensitive-topic           sensitiveTopic (if non-clinical interviews)
//  /project/research-activities/serious-disclosure        seriousDisclosure (if non-clinical interviews)
//    → if yes: /serious-disclosure-details
//    → if no:  /society-benefits
//  /project/research-activities/serious-disclosure-details  seriousDisclosureDetails
//  /project/research-activities/society-benefits           societyBenefits (always)
//  /project/research-activities/side-effects              sideEffects (if clinical/treatment)
//  /project/research-activities/risk-delay-treatment      riskDelayTreatment (if delayTreatment == yes)
//  /project/research-activities/risk-sensitive-topic      riskSensitiveTreatment (if sensitiveTopic == yes)
//  /project/research-activities/inform-gp                 informGP (if treatment)
//    → if yes: /when-inform-gp
//    → if no:  /continue-treatment
//  /project/research-activities/when-inform-gp            whenInformGP
//  /project/research-activities/continue-treatment        continueTreatment (if treatment)
//    → yes:    /continue-treatment-yes
//    → no:     /continue-treatment-no
//  /project/research-activities/continue-treatment-yes    continueTreatmentYes
//  /project/research-activities/continue-treatment-no     continueTreatmentNo
//  /project/research-activities/finish-data-collection    finishDataCollection (always)

// ─── Routes ──────────────────────────────────────────────────────────────────

// Decide where to start — the first page shown varies by scoping answers
//
router.post('/project/research-activities/start', function (req, res) {
  const data = req.session.data
  if (hasClinicalOrTreatment(data)) {
    return res.redirect('/project/research-activities/intervention-description')
  }
  if (hasNonClinicalInterviews(data)) {
    return res.redirect('/project/research-activities/questionnaire-type')
  }
  return res.redirect('/project/research-activities/society-benefits')
})

router.post('/project/research-activities/intervention-description', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['interventionDescription'] || !data['interventionDescription'].trim()) {
    addError(errors, 'interventionDescription', 'Enter a description of the intervention or treatment being studied')
  }

  if (errors.length) return renderWithErrors(res, 'project/research-activities/intervention-description', errors)

  if (isCTIMP(data)) return res.redirect('/project/research-activities/first-in-human')

  clear(data, ['firstInHuman'])

  if (hasNHSPatients(data) && hasClinicalOrTreatment(data)) {
    return res.redirect('/project/research-activities/delay-treatment')
  }

  clear(data, ['delayTreatment', 'riskDelayTreatment'])

  if (hasTreatment(data)) return res.redirect('/project/research-activities/compare-standard')

  clear(data, ['compareStandard', 'changeInStandardCare'])
  return res.redirect('/project/research-activities/questionnaire-type-or-benefits')
})

router.post('/project/research-activities/first-in-human', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['firstInHuman']) {
    addError(errors, 'firstInHuman', 'Select whether this treatment is first-in-human')
  }

  if (errors.length) return renderWithErrors(res, 'project/research-activities/first-in-human', errors)

  if (hasNHSPatients(data) && hasClinicalOrTreatment(data)) {
    return res.redirect('/project/research-activities/delay-treatment')
  }

  clear(data, ['delayTreatment', 'riskDelayTreatment'])

  if (hasTreatment(data)) return res.redirect('/project/research-activities/compare-standard')

  clear(data, ['compareStandard', 'changeInStandardCare'])
  return res.redirect('/project/research-activities/questionnaire-type-or-benefits')
})

router.post('/project/research-activities/delay-treatment', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['delayTreatment']) {
    addError(errors, 'delayTreatment', 'Select whether the project involves a change or delay to standard treatment or care')
  }

  if (errors.length) return renderWithErrors(res, 'project/research-activities/delay-treatment', errors)

  if (data['delayTreatment'] === 'no') clear(data, ['riskDelayTreatment'])

  if (hasTreatment(data)) return res.redirect('/project/research-activities/compare-standard')

  clear(data, ['compareStandard', 'changeInStandardCare'])
  return res.redirect('/project/research-activities/questionnaire-type-or-benefits')
})

router.post('/project/research-activities/compare-standard', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['compareStandard']) {
    addError(errors, 'compareStandard', 'Select whether any treatments are being compared to standard care')
  }

  if (errors.length) return renderWithErrors(res, 'project/research-activities/compare-standard', errors)

  if (data['compareStandard'] === 'no') {
    return res.redirect('/project/research-activities/change-in-standard-care')
  }

  clear(data, ['changeInStandardCare'])
  return res.redirect('/project/research-activities/questionnaire-type-or-benefits')
})

router.post('/project/research-activities/change-in-standard-care', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['changeInStandardCare'] || !data['changeInStandardCare'].trim()) {
    addError(errors, 'changeInStandardCare', 'Enter the arrangements you will put in place to address changes in standard care')
  }

  if (errors.length) return renderWithErrors(res, 'project/research-activities/change-in-standard-care', errors)

  return res.redirect('/project/research-activities/questionnaire-type-or-benefits')
})

// Internal redirect helper — routes to questionnaire-type if applicable, else society-benefits
router.get('/project/research-activities/questionnaire-type-or-benefits', function (req, res) {
  const data = req.session.data

  if (hasNonClinicalInterviews(data)) {
    return res.redirect('/project/research-activities/questionnaire-type')
  }

  clear(data, ['questionnaireType', 'sensitiveTopic', 'seriousDisclosure', 'seriousDisclosureDetails'])
  return res.redirect('/project/research-activities/society-benefits')
})

router.post('/project/research-activities/questionnaire-type', function (req, res) {
  const data = req.session.data
  const errors = []

  if (asArray(data['questionnaireType']).length === 0) {
    addError(errors, 'questionnaireType', 'Select at least one option, or select \'No questionnaires included in project\'')
  }

  if (errors.length) return renderWithErrors(res, 'project/research-activities/questionnaire-type', errors)

  return res.redirect('/project/research-activities/sensitive-topic')
})

router.post('/project/research-activities/sensitive-topic', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['sensitiveTopic']) {
    addError(errors, 'sensitiveTopic', 'Select whether interviews, questionnaires or discussions may include sensitive topics')
  }

  if (errors.length) return renderWithErrors(res, 'project/research-activities/sensitive-topic', errors)

  if (data['sensitiveTopic'] === 'no') clear(data, ['riskSensitiveTreatment'])

  return res.redirect('/project/research-activities/serious-disclosure')
})

router.post('/project/research-activities/serious-disclosure', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['seriousDisclosure']) {
    addError(errors, 'seriousDisclosure', 'Select whether discussions could include topics that result in criminal or serious disclosures')
  }

  if (errors.length) return renderWithErrors(res, 'project/research-activities/serious-disclosure', errors)

  if (data['seriousDisclosure'] === 'yes') {
    return res.redirect('/project/research-activities/serious-disclosure-details')
  }

  clear(data, ['seriousDisclosureDetails'])
  return res.redirect('/project/research-activities/society-benefits')
})

router.post('/project/research-activities/serious-disclosure-details', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['seriousDisclosureDetails'] || !data['seriousDisclosureDetails'].trim()) {
    addError(errors, 'seriousDisclosureDetails', 'Enter how criminal or other disclosures will be dealt with')
  }

  if (errors.length) return renderWithErrors(res, 'project/research-activities/serious-disclosure-details', errors)

  return res.redirect('/project/research-activities/society-benefits')
})

router.post('/project/research-activities/society-benefits', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['societyBenefits'] || !data['societyBenefits'].trim()) {
    addError(errors, 'societyBenefits', 'Enter the potential benefits for participants and society')
  }

  if (errors.length) return renderWithErrors(res, 'project/research-activities/society-benefits', errors)

  if (hasClinicalOrTreatment(data)) return res.redirect('/project/research-activities/side-effects')

  clear(data, ['sideEffects'])
  return res.redirect('/project/research-activities/risks-next')
})

router.post('/project/research-activities/side-effects', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['sideEffects'] || !data['sideEffects'].trim()) {
    addError(errors, 'sideEffects', 'Enter any risks, side-effects or burdens of research activities')
  }

  if (errors.length) return renderWithErrors(res, 'project/research-activities/side-effects', errors)

  return res.redirect('/project/research-activities/risks-next')
})

// Internal redirect — routes to risk pages that apply, then on to inform-gp/finish
router.get('/project/research-activities/risks-next', function (req, res) {
  const data = req.session.data

  if (data['delayTreatment'] === 'yes') {
    return res.redirect('/project/research-activities/risk-delay-treatment')
  }

  if (data['sensitiveTopic'] === 'yes') {
    return res.redirect('/project/research-activities/risk-sensitive-topic')
  }

  return res.redirect('/project/research-activities/treatment-next')
})

router.post('/project/research-activities/risk-delay-treatment', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['riskDelayTreatment'] || !data['riskDelayTreatment'].trim()) {
    addError(errors, 'riskDelayTreatment', 'Enter any risks due to a change or delay to standard treatment or care')
  }

  if (errors.length) return renderWithErrors(res, 'project/research-activities/risk-delay-treatment', errors)

  if (data['sensitiveTopic'] === 'yes') {
    return res.redirect('/project/research-activities/risk-sensitive-topic')
  }

  return res.redirect('/project/research-activities/treatment-next')
})

router.post('/project/research-activities/risk-sensitive-topic', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['riskSensitiveTreatment'] || !data['riskSensitiveTreatment'].trim()) {
    addError(errors, 'riskSensitiveTreatment', 'Enter any risk or burden due to sensitive, embarrassing or upsetting topics')
  }

  if (errors.length) return renderWithErrors(res, 'project/research-activities/risk-sensitive-topic', errors)

  return res.redirect('/project/research-activities/treatment-next')
})

// Internal redirect — routes to treatment-specific pages if applicable
router.get('/project/research-activities/treatment-next', function (req, res) {
  const data = req.session.data

  if (hasTreatment(data)) return res.redirect('/project/research-activities/inform-gp')

  clear(data, ['informGP', 'whenInformGP', 'continueTreatment', 'continueTreatmentYes', 'continueTreatmentNo'])
  return res.redirect('/project/research-activities/finish-data-collection')
})

router.post('/project/research-activities/inform-gp', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['informGP']) {
    addError(errors, 'informGP', 'Select whether you will inform participants\' General Practitioners')
  }

  if (errors.length) return renderWithErrors(res, 'project/research-activities/inform-gp', errors)

  if (data['informGP'] === 'yes') return res.redirect('/project/research-activities/when-inform-gp')

  clear(data, ['whenInformGP'])
  return res.redirect('/project/research-activities/continue-treatment')
})

router.post('/project/research-activities/when-inform-gp', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['whenInformGP'] || !data['whenInformGP'].trim()) {
    addError(errors, 'whenInformGP', 'Enter the circumstances when you will contact the participant\'s GP')
  }

  if (errors.length) return renderWithErrors(res, 'project/research-activities/when-inform-gp', errors)

  return res.redirect('/project/research-activities/continue-treatment')
})

router.post('/project/research-activities/continue-treatment', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['continueTreatment']) {
    addError(errors, 'continueTreatment', 'Select what will happen with treatment after the project has finished')
  }

  if (errors.length) return renderWithErrors(res, 'project/research-activities/continue-treatment', errors)

  if (data['continueTreatment'] === 'yes') {
    clear(data, ['continueTreatmentNo'])
    return res.redirect('/project/research-activities/continue-treatment-yes')
  }

  clear(data, ['continueTreatmentYes'])
  return res.redirect('/project/research-activities/continue-treatment-no')
})

router.post('/project/research-activities/continue-treatment-yes', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['continueTreatmentYes'] || !data['continueTreatmentYes'].trim()) {
    addError(errors, 'continueTreatmentYes', 'Enter the arrangements for continued provision of treatment after the project')
  }

  if (errors.length) return renderWithErrors(res, 'project/research-activities/continue-treatment-yes', errors)

  return res.redirect('/project/research-activities/finish-data-collection')
})

router.post('/project/research-activities/continue-treatment-no', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['continueTreatmentNo'] || !data['continueTreatmentNo'].trim()) {
    addError(errors, 'continueTreatmentNo', 'Enter the care arrangements after the project has finished')
  }

  if (errors.length) return renderWithErrors(res, 'project/research-activities/continue-treatment-no', errors)

  return res.redirect('/project/research-activities/finish-data-collection')
})

router.post('/project/research-activities/finish-data-collection', function (req, res) {
  const data = req.session.data
  const errors = []

  const day = data['finishDataCollection-day']
  const month = data['finishDataCollection-month']
  const year = data['finishDataCollection-year']

  if (!day || !month || !year) {
    addError(errors, 'finishDataCollection', 'Enter the planned date for finishing data collection')
  }

  if (errors.length) return renderWithErrors(res, 'project/research-activities/finish-data-collection', errors)

  return res.redirect('/project/research-activities/check')
})

module.exports = router
