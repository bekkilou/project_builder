const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const {
  asArray,
  clear,
  addError,
  renderWithErrors
} = require('./helpers/routing')

// ─── Helpers ────────────────────────────────────────────────────────────────

function isInvolved (data) {
  return !asArray(data['involvedContributors']).includes('not_involved')
}

function hasInvolvedContributors (data) {
  return asArray(data['involvedContributors']).length > 0
}

function selectedOther (data, field) {
  return asArray(data[field]).includes('other')
}

function hasAnyFuturePlanned (data) {
  return !asArray(data['futureContribution']).includes('no_contribution') &&
    asArray(data['futureContribution']).length > 0
}

function hasNoFuture (data) {
  return asArray(data['futureContribution']).includes('no_contribution')
}

// ─── Page flow ───────────────────────────────────────────────────────────────
//
//  /project/public-involvement/involvement         involvedContributors (always)
//    → if not_involved:  /why-not-involved
//    → if other only:    /involvement-details (skipping identify)
//    → else:             /identify-contributors
//  /project/public-involvement/why-not-involved    patientInsights
//  /project/public-involvement/identify-contributors  identifyContributors
//  /project/public-involvement/identify-contributors-other  identifyContributorsOther (if other)
//  /project/public-involvement/involvement-details   publicContributors
//  /project/public-involvement/contributor-details   contributorDetails
//  /project/public-involvement/important-contribution  importantContribution
//  /project/public-involvement/future-contribution  futureContribution (always)
//    → if other:         /future-contribution-other
//    → if no_contribution: /justify-no-contribution
//    → else:             /justify-contribution
//  /project/public-involvement/future-contribution-other  futureContributionOther
//  /project/public-involvement/justify-contribution  justifyContribution
//  /project/public-involvement/justify-no-contribution  justifyNoContribution

// ─── Routes ──────────────────────────────────────────────────────────────────

// Which aspects have you involved contributors in?
router.post('/project/public-involvement/involvement', function (req, res) {
  const data = req.session.data
  const errors = []

  if (asArray(data['involvedContributors']).length === 0) {
    addError(errors, 'involvedContributors', 'Select at least one option, or select \'Patients, service users or their carers, or members of the public have not been involved\'')
  }

  if (errors.length) return renderWithErrors(res, 'project/public-involvement/involvement', errors)

  // Cleanup: if not involved, clear all "involved" answers
  if (!isInvolved(data)) {
    clear(data, [
      'publicContributors',
      'identifyContributors',
      'identifyContributorsOther',
      'contributorDetails',
      'importantContribution'
    ])
    return res.redirect('/project/public-involvement/why-not-involved')
  }

  // If "other" selected alongside real involvements, still go to identify
  // (involvement details is collected per-aspect on the details page)
  return res.redirect('/project/public-involvement/identify-contributors')
})

// Why didn't you involve the public?
router.post('/project/public-involvement/why-not-involved', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['patientInsights'] || !data['patientInsights'].trim()) {
    addError(errors, 'patientInsights', 'Enter your reasons for not involving patients, carers, service users or members of the public')
  }

  if (errors.length) return renderWithErrors(res, 'project/public-involvement/why-not-involved', errors)

  return res.redirect('/project/public-involvement/future-contribution')
})

// How did you identify contributors?
router.post('/project/public-involvement/identify-contributors', function (req, res) {
  const data = req.session.data
  const errors = []

  if (asArray(data['identifyContributors']).length === 0) {
    addError(errors, 'identifyContributors', 'Select at least one option')
  }

  if (errors.length) return renderWithErrors(res, 'project/public-involvement/identify-contributors', errors)

  if (selectedOther(data, 'identifyContributors')) {
    return res.redirect('/project/public-involvement/identify-contributors-other')
  }

  clear(data, ['identifyContributorsOther'])
  return res.redirect('/project/public-involvement/involvement-details')
})

// Details of other identification method
router.post('/project/public-involvement/identify-contributors-other', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['identifyContributorsOther'] || !data['identifyContributorsOther'].trim()) {
    addError(errors, 'identifyContributorsOther', 'Enter details of how you identified the public contributors')
  }

  if (errors.length) return renderWithErrors(res, 'project/public-involvement/identify-contributors-other', errors)

  return res.redirect('/project/public-involvement/involvement-details')
})

// How did you involve them?
router.post('/project/public-involvement/involvement-details', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['publicContributors'] || !data['publicContributors'].trim()) {
    addError(errors, 'publicContributors', 'Enter details of how you involved public contributors')
  }

  if (errors.length) return renderWithErrors(res, 'project/public-involvement/involvement-details', errors)

  return res.redirect('/project/public-involvement/contributor-details')
})

// Tell us about the public contributors
router.post('/project/public-involvement/contributor-details', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['contributorDetails'] || !data['contributorDetails'].trim()) {
    addError(errors, 'contributorDetails', 'Enter details about the public contributors you worked with')
  }

  if (errors.length) return renderWithErrors(res, 'project/public-involvement/contributor-details', errors)

  return res.redirect('/project/public-involvement/important-contribution')
})

// What did contributors say was important?
router.post('/project/public-involvement/important-contribution', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['importantContribution'] || !data['importantContribution'].trim()) {
    addError(errors, 'importantContribution', 'Enter what your public contributors said was important to them')
  }

  if (errors.length) return renderWithErrors(res, 'project/public-involvement/important-contribution', errors)

  return res.redirect('/project/public-involvement/future-contribution')
})

// Future involvement plans
router.post('/project/public-involvement/future-contribution', function (req, res) {
  const data = req.session.data
  const errors = []

  if (asArray(data['futureContribution']).length === 0) {
    addError(errors, 'futureContribution', 'Select at least one option')
  }

  if (errors.length) return renderWithErrors(res, 'project/public-involvement/future-contribution', errors)

  if (selectedOther(data, 'futureContribution')) {
    return res.redirect('/project/public-involvement/future-contribution-other')
  }

  clear(data, ['futureContributionOther'])

  if (hasNoFuture(data)) {
    clear(data, ['justifyContribution'])
    return res.redirect('/project/public-involvement/justify-no-contribution')
  }

  clear(data, ['justifyNoContribution'])
  return res.redirect('/project/public-involvement/justify-contribution')
})

// Other future contribution details
router.post('/project/public-involvement/future-contribution-other', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['futureContributionOther'] || !data['futureContributionOther'].trim()) {
    addError(errors, 'futureContributionOther', 'Enter details of other aspects public contributors will advise on')
  }

  if (errors.length) return renderWithErrors(res, 'project/public-involvement/future-contribution-other', errors)

  if (hasNoFuture(data)) {
    clear(data, ['justifyContribution'])
    return res.redirect('/project/public-involvement/justify-no-contribution')
  }

  clear(data, ['justifyNoContribution'])
  return res.redirect('/project/public-involvement/justify-contribution')
})

// Justify involvement approach
router.post('/project/public-involvement/justify-contribution', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['justifyContribution'] || !data['justifyContribution'].trim()) {
    addError(errors, 'justifyContribution', 'Enter a justification for your public involvement approach')
  }

  if (errors.length) return renderWithErrors(res, 'project/public-involvement/justify-contribution', errors)

  return res.redirect('/project/public-involvement/check')
})

// Justify no future involvement
router.post('/project/public-involvement/justify-no-contribution', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['justifyNoContribution'] || !data['justifyNoContribution'].trim()) {
    addError(errors, 'justifyNoContribution', 'Enter a justification for the absence of public involvement')
  }

  if (errors.length) return renderWithErrors(res, 'project/public-involvement/justify-no-contribution', errors)

  return res.redirect('/project/public-involvement/check')
})

module.exports = router
