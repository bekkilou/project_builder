const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()
const { setFlash } = require('./helpers/flash')

const {
  asArray,
  clear,
  addError,
  renderWithErrors
} = require('./helpers/routing')

// ─── Page flow ───────────────────────────────────────────────────────────────
//
//  Note: This section is under active development. The flow is
//  currently linear — all questions are shown to all applicants.
//  Branching logic will be added when the question set is finalised.
//
//  /project/public-involvement/tbc001    How involved to date (always)
//  /project/public-involvement/tbc002    Further details on past involvement (always)
//  /project/public-involvement/tbc003    How lived experience shaped research (always)
//  /project/public-involvement/tbc004    How involved in future (always)
//  /project/public-involvement/tbc005    Further details on future involvement (always)
//  /project/public-involvement/tbc006    Involving communities research seeks to benefit (always)

// ─── Routes ──────────────────────────────────────────────────────────────────

router.post('/project/public-involvement/tbc001', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (asArray(data['tbc001']).length === 0) {
    addError(errors, 'tbc001', questions['tbc001'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/public-involvement/tbc001', errors)

  return res.redirect('/project/public-involvement/tbc002')
})

router.post('/project/public-involvement/tbc002', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['tbc002'] || !data['tbc002'].trim()) {
    addError(errors, 'tbc002', questions['tbc002'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/public-involvement/tbc002', errors)

  return res.redirect('/project/public-involvement/tbc003')
})

router.post('/project/public-involvement/tbc003', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['tbc003'] || !data['tbc003'].trim()) {
    addError(errors, 'tbc003', questions['tbc003'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/public-involvement/tbc003', errors)

  return res.redirect('/project/public-involvement/tbc004')
})

router.post('/project/public-involvement/tbc004', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (asArray(data['tbc004']).length === 0) {
    addError(errors, 'tbc004', questions['tbc004'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/public-involvement/tbc004', errors)

  return res.redirect('/project/public-involvement/tbc005')
})

router.post('/project/public-involvement/tbc005', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['tbc005'] || !data['tbc005'].trim()) {
    addError(errors, 'tbc005', questions['tbc005'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/public-involvement/tbc005', errors)

  return res.redirect('/project/public-involvement/tbc006')
})

router.post('/project/public-involvement/tbc006', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['tbc006'] || !data['tbc006'].trim()) {
    addError(errors, 'tbc006', questions['tbc006'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/public-involvement/tbc006', errors)

  return res.redirect('/project/public-involvement/check-public-involvement')
})

router.post('/project/public-involvement/check-complete', (req, res) => {
  req.session.data['completed-publicInvolvement'] = 'true'
  setFlash(req, 'completed', 'Public involvement')
  res.redirect('/project/start01')
})

module.exports = router
