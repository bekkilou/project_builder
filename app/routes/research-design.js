const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const {
  asArray,
  clear,
  addError,
  renderWithErrors
} = require('./helpers/routing')

// ─── Helpers ────────────────────────────────────────────────────────────────

// OPT0074 = randomised controlled trial, OPT0065 = controlled trial without randomisation
function isTrial (data) {
  const m = asArray(data['iqa0049'])
  return m.includes('OPT0074') || m.includes('OPT0065')
}

// OPT0089 = designing/developing/testing AI
function isDesigningAI (data) {
  return asArray(data['iqa03277']).includes('OPT0089')
}

// OPT0090 = using existing AI
function isUsingExistingAI (data) {
  return asArray(data['iqa03277']).includes('OPT0090')
}

// ─── Page flow ───────────────────────────────────────────────────────────────
//
//  /project/research-design/iqa0049                 Research methods (always)
//    — iqa0050 revealed inline via revealOn when OPT0033 selected
//    → if trial:          /iqa0051
//    → else:              /iqa0053
//  /project/research-design/iqa0051                 Trial methods (if trial)
//    — iqa0052 revealed inline via revealOn when OPT0083 selected
//  /project/research-design/iqa0054                 Novel intervention (if trial)
//    → if no:             /iqa0055
//    → if yes:            /iqa0053
//  /project/research-design/iqa0055                 Compare intervention (if trial + not novel)
//    → if no:             /iqa0056
//    → if yes:            /iqa0053
//  /project/research-design/iqa0056                 Gold standard intervention (if trial + not novel + not compare)
//  /project/research-design/iqa0053                 Methodology details (always)
//  /project/research-design/iqa0057                 Main research question (always)
//  /project/research-design/iqa0058                 Secondary research question (always)
//  /project/research-design/iqa03277                Does project use AI (always)
//    → if OPT0089:        /iqa03278
//    → if OPT0090 only:   /iqa03280
//    → else:              /iqa0060
//  /project/research-design/iqa03278                Design AI type (if designing AI)
//    — iqa03279 revealed inline via revealOn when OPT0033 selected
//    → if also using existing: /iqa03280
//    → else:              /iqa0060
//  /project/research-design/iqa03280                Existing AI type (if using existing AI)
//    — iqa03281 revealed inline via revealOn when OPT0033 selected
//  /project/research-design/iqa0060                 What will happen (always)
//
//  Note: iqa0058 (secondary research question) was not in the original route.
//  It is now included between iqa0057 and iqa03277.

// ─── Routes ──────────────────────────────────────────────────────────────────

router.post('/project/research-design/iqa0049', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (asArray(data['iqa0049']).length === 0) {
    addError(errors, 'iqa0049', questions['iqa0049'].errorMessages.required)
  }

  // Validate revealed field if OPT0033 (other) selected
  if (asArray(data['iqa0049']).includes('OPT0033') &&
    (!data['iqa0050'] || !data['iqa0050'].trim())) {
    addError(errors, 'iqa0050', questions['iqa0050'].errorMessages.required)
  }

  if (errors.length) {
    clear(data, ['iqa0050'])
    return renderWithErrors(res, 'project/research-design/iqa0049', errors)
  }

  if (!asArray(data['iqa0049']).includes('OPT0033')) clear(data, ['iqa0050'])

  // Clear trial-specific answers if not a trial
  if (!isTrial(data)) {
    clear(data, ['iqa0051', 'iqa0052', 'iqa0054', 'iqa0055', 'iqa0056'])
  }

  if (isTrial(data)) return res.redirect('/project/research-design/iqa0051')

  return res.redirect('/project/research-design/iqa0053')
})

router.post('/project/research-design/iqa0051', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (asArray(data['iqa0051']).length === 0) {
    addError(errors, 'iqa0051', questions['iqa0051'].errorMessages.required)
  }

  // Validate revealed field if OPT0083 (other complex) selected
  if (asArray(data['iqa0051']).includes('OPT0083') &&
    (!data['iqa0052'] || !data['iqa0052'].trim())) {
    addError(errors, 'iqa0052', questions['iqa0052'].errorMessages.required)
  }

  if (errors.length) {
    clear(data, ['iqa0052'])
    return renderWithErrors(res, 'project/research-design/iqa0051', errors)
  }

  if (!asArray(data['iqa0051']).includes('OPT0083')) clear(data, ['iqa0052'])

  return res.redirect('/project/research-design/iqa0054')
})

router.post('/project/research-design/iqa0054', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0054']) {
    addError(errors, 'iqa0054', questions['iqa0054'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/research-design/iqa0054', errors)

  if (data['iqa0054'] === 'yes') {
    clear(data, ['iqa0055', 'iqa0056'])
    return res.redirect('/project/research-design/iqa0053')
  }

  return res.redirect('/project/research-design/iqa0055')
})

router.post('/project/research-design/iqa0055', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0055']) {
    addError(errors, 'iqa0055', questions['iqa0055'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/research-design/iqa0055', errors)

  if (data['iqa0055'] === 'yes') {
    clear(data, ['iqa0056'])
    return res.redirect('/project/research-design/iqa0053')
  }

  return res.redirect('/project/research-design/iqa0056')
})

router.post('/project/research-design/iqa0056', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0056']) {
    addError(errors, 'iqa0056', questions['iqa0056'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/research-design/iqa0056', errors)

  return res.redirect('/project/research-design/iqa0053')
})

router.post('/project/research-design/iqa0053', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0053'] || !data['iqa0053'].trim()) {
    addError(errors, 'iqa0053', questions['iqa0053'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/research-design/iqa0053', errors)

  return res.redirect('/project/research-design/iqa0057')
})

router.post('/project/research-design/iqa0057', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0057'] || !data['iqa0057'].trim()) {
    addError(errors, 'iqa0057', questions['iqa0057'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/research-design/iqa0057', errors)

  return res.redirect('/project/research-design/iqa0058')
})

// iqa0058 (secondary research question) is optional — no validation required
router.post('/project/research-design/iqa0058', function (req, res) {
  return res.redirect('/project/research-design/iqa03277')
})

router.post('/project/research-design/iqa03277', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (asArray(data['iqa03277']).length === 0) {
    addError(errors, 'iqa03277', questions['iqa03277'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/research-design/iqa03277', errors)

  if (!isDesigningAI(data))    clear(data, ['iqa03278', 'iqa03279'])
  if (!isUsingExistingAI(data)) clear(data, ['iqa03280', 'iqa03281'])

  if (isDesigningAI(data))     return res.redirect('/project/research-design/iqa03278')
  if (isUsingExistingAI(data)) return res.redirect('/project/research-design/iqa03280')

  return res.redirect('/project/research-design/iqa0060')
})

router.post('/project/research-design/iqa03278', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (asArray(data['iqa03278']).length === 0) {
    addError(errors, 'iqa03278', questions['iqa03278'].errorMessages.required)
  }

  // Validate revealed field if OPT0033 (other) selected
  if (asArray(data['iqa03278']).includes('OPT0033') &&
    (!data['iqa03279'] || !data['iqa03279'].trim())) {
    addError(errors, 'iqa03279', questions['iqa03279'].errorMessages.required)
  }

  if (errors.length) {
    clear(data, ['iqa03279'])
    return renderWithErrors(res, 'project/research-design/iqa03278', errors)
  }

  if (!asArray(data['iqa03278']).includes('OPT0033')) clear(data, ['iqa03279'])

  if (isUsingExistingAI(data)) return res.redirect('/project/research-design/iqa03280')

  return res.redirect('/project/research-design/iqa0060')
})

router.post('/project/research-design/iqa03280', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (asArray(data['iqa03280']).length === 0) {
    addError(errors, 'iqa03280', questions['iqa03280'].errorMessages.required)
  }

  // Validate revealed field if OPT0033 (other) selected
  if (asArray(data['iqa03280']).includes('OPT0033') &&
    (!data['iqa03281'] || !data['iqa03281'].trim())) {
    addError(errors, 'iqa03281', questions['iqa03281'].errorMessages.required)
  }

  if (errors.length) {
    clear(data, ['iqa03281'])
    return renderWithErrors(res, 'project/research-design/iqa03280', errors)
  }

  if (!asArray(data['iqa03280']).includes('OPT0033')) clear(data, ['iqa03281'])

  return res.redirect('/project/research-design/iqa0060')
})

router.post('/project/research-design/iqa0060', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0060'] || !data['iqa0060'].trim()) {
    addError(errors, 'iqa0060', questions['iqa0060'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/research-design/iqa0060', errors)

  return res.redirect('/project/research-design/check-research-design')
})

module.exports = router
