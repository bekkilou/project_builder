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
//  /project/risks-and-conflicts/iqa0110    Risks to team (always)
//  /project/risks-and-conflicts/iqa0111    Conflict of interest (always)
//    — iqa0112 revealed inline via revealOn when 'yes' selected
//  /project/risks-and-conflicts/iqa0113    CI ethics committee member (always)
//    — iqa0114 revealed inline via revealOn when 'yes' selected
//  /project/risks-and-conflicts/iqa0115    Personal payment (always)
//    — iqa0116 revealed inline via revealOn when 'yes' selected

// ─── Routes ──────────────────────────────────────────────────────────────────

router.post('/project/risks-and-conflicts/iqa0110', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0110'] || !data['iqa0110'].trim()) {
    addError(errors, 'iqa0110', questions['iqa0110'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/risks-and-conflicts/iqa0110', errors)

  return res.redirect('/project/risks-and-conflicts/iqa0111')
})

router.post('/project/risks-and-conflicts/iqa0111', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0111']) {
    addError(errors, 'iqa0111', questions['iqa0111'].errorMessages.required)
  }

  // Validate revealed field if 'yes' selected
  if (data['iqa0111'] === 'yes' && (!data['iqa0112'] || !data['iqa0112'].trim())) {
    addError(errors, 'iqa0112', questions['iqa0112'].errorMessages.required)
  }

  if (errors.length) {
    clear(data, ['iqa0112'])
    return renderWithErrors(res, 'project/risks-and-conflicts/iqa0111', errors)
  }

  if (data['iqa0111'] === 'no') clear(data, ['iqa0112'])

  return res.redirect('/project/risks-and-conflicts/iqa0113')
})

router.post('/project/risks-and-conflicts/iqa0113', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0113']) {
    addError(errors, 'iqa0113', questions['iqa0113'].errorMessages.required)
  }

  // Validate revealed field if 'yes' selected
  if (data['iqa0113'] === 'yes' && asArray(data['iqa0114']).length === 0) {
    addError(errors, 'iqa0114', questions['iqa0114'].errorMessages.required)
  }

  if (errors.length) {
    clear(data, ['iqa0114'])
    return renderWithErrors(res, 'project/risks-and-conflicts/iqa0113', errors)
  }

  if (data['iqa0113'] === 'no') clear(data, ['iqa0114'])

  return res.redirect('/project/risks-and-conflicts/iqa0115')
})

router.post('/project/risks-and-conflicts/iqa0115', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0115']) {
    addError(errors, 'iqa0115', questions['iqa0115'].errorMessages.required)
  }

  // Validate revealed field if 'yes' selected
  if (data['iqa0115'] === 'yes' && (!data['iqa0116'] || !data['iqa0116'].trim())) {
    addError(errors, 'iqa0116', questions['iqa0116'].errorMessages.required)
  }

  if (errors.length) {
    clear(data, ['iqa0116'])
    return renderWithErrors(res, 'project/risks-and-conflicts/iqa0115', errors)
  }

  if (data['iqa0115'] === 'no') clear(data, ['iqa0116'])

  return res.redirect('/project/risks-and-conflicts/check-risks-and-conflicts')
})

module.exports = router
