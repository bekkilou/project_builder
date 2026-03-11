const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const {
  asArray,
  clear,
  addError,
  renderWithErrors
} = require('./helpers/routing')

// ─── Page flow ───────────────────────────────────────────────────────────────
//
//  /project/risks-and-conflicts/risk-to-team          riskToTeam (always)
//  /project/risks-and-conflicts/ci-conflict           CIConflict (always)
//    → if yes:   /ci-conflict-details
//    → else:     /ci-ethics-committee
//  /project/risks-and-conflicts/ci-conflict-details   CIConflictDetails
//  /project/risks-and-conflicts/ci-ethics-committee   CIEthicsCommittee (always)
//    → if yes:   /ethics-committees
//    → else:     /personal-payment
//  /project/risks-and-conflicts/ethics-committees     ethicsCommittees
//  /project/risks-and-conflicts/personal-payment      personalPayment (always)
//    → if yes:   /personal-payment-details
//    → else:     /check
//  /project/risks-and-conflicts/personal-payment-details  personalPaymentYes

// ─── Routes ──────────────────────────────────────────────────────────────────

router.post('/project/risks-and-conflicts/risk-to-team', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['riskToTeam'] || !data['riskToTeam'].trim()) {
    addError(errors, 'riskToTeam', 'Enter potential risks to the research team and how they will be managed')
  }

  if (errors.length) return renderWithErrors(res, 'project/risks-and-conflicts/risk-to-team', errors)

  return res.redirect('/project/risks-and-conflicts/ci-conflict')
})

router.post('/project/risks-and-conflicts/ci-conflict', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['CIConflict']) {
    addError(errors, 'CIConflict', 'Select whether the Chief Investigator or any investigator has a personal involvement that may give rise to a conflict of interest')
  }

  if (errors.length) return renderWithErrors(res, 'project/risks-and-conflicts/ci-conflict', errors)

  if (data['CIConflict'] === 'yes') {
    return res.redirect('/project/risks-and-conflicts/ci-conflict-details')
  }

  clear(data, ['CIConflictDetails'])
  return res.redirect('/project/risks-and-conflicts/ci-ethics-committee')
})

router.post('/project/risks-and-conflicts/ci-conflict-details', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['CIConflictDetails'] || !data['CIConflictDetails'].trim()) {
    addError(errors, 'CIConflictDetails', 'Enter details of the potential conflict of interest')
  }

  if (errors.length) return renderWithErrors(res, 'project/risks-and-conflicts/ci-conflict-details', errors)

  return res.redirect('/project/risks-and-conflicts/ci-ethics-committee')
})

router.post('/project/risks-and-conflicts/ci-ethics-committee', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['CIEthicsCommittee']) {
    addError(errors, 'CIEthicsCommittee', 'Select whether the Chief Investigator is a member of any NHS Research Ethics Committee')
  }

  if (errors.length) return renderWithErrors(res, 'project/risks-and-conflicts/ci-ethics-committee', errors)

  if (data['CIEthicsCommittee'] === 'yes') {
    return res.redirect('/project/risks-and-conflicts/ethics-committees')
  }

  clear(data, ['ethicsCommittees'])
  return res.redirect('/project/risks-and-conflicts/personal-payment')
})

router.post('/project/risks-and-conflicts/ethics-committees', function (req, res) {
  const data = req.session.data
  const errors = []

  if (asArray(data['ethicsCommittees']).length === 0) {
    addError(errors, 'ethicsCommittees', 'Select at least one Research Ethics Committee')
  }

  if (errors.length) return renderWithErrors(res, 'project/risks-and-conflicts/ethics-committees', errors)

  return res.redirect('/project/risks-and-conflicts/personal-payment')
})

router.post('/project/risks-and-conflicts/personal-payment', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['personalPayment']) {
    addError(errors, 'personalPayment', 'Select whether the Chief Investigator or any investigator will receive personal payment or benefits')
  }

  if (errors.length) return renderWithErrors(res, 'project/risks-and-conflicts/personal-payment', errors)

  if (data['personalPayment'] === 'yes') {
    return res.redirect('/project/risks-and-conflicts/personal-payment-details')
  }

  clear(data, ['personalPaymentYes'])
  return res.redirect('/project/risks-and-conflicts/check')
})

router.post('/project/risks-and-conflicts/personal-payment-details', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['personalPaymentYes'] || !data['personalPaymentYes'].trim()) {
    addError(errors, 'personalPaymentYes', 'Enter details of payments, benefits or other incentives')
  }

  if (errors.length) return renderWithErrors(res, 'project/risks-and-conflicts/personal-payment-details', errors)

  return res.redirect('/project/risks-and-conflicts/check')
})

module.exports = router
