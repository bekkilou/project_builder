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
  return data['iqa0142'] === 'OPT0017'
}

function isCTIMP (data) {
  return String(data['isCTIMP'] || '').toLowerCase() === 'yes'
}

function hasTreatment (data) {
  return asArray(data['researchActivities']).includes('treatment')
}

// ─── Page flow ───────────────────────────────────────────────────────────────
//
//  /project/governance/iqa0142                     UK or multi-national (always)
//    → if multi: /iqa0143
//    → else:     /iqa0325
//  /project/governance/iqa0143                     Countries outside UK
//  /project/governance/iqa0325                     Materials supplied by non-funder (always)
//    — iqa0139 revealed inline via revealOn
//  /project/governance/iqa0140                     Legal risks (always)
//  /project/governance/iqa0147                     Monitoring and auditing (if CTIMP)
//  /project/governance/iqa0148                     Data efficacy (if treatment)
//  /project/governance/iqa0149                     Insurance — sponsor participation liability (always)
//  /project/governance/iqa0150                     Insurance — sponsor design liability (always)
//  /project/governance/iqa0151                     Insurance — investigator/collaborator liability (always)
//  /project/governance/iqa0152                     Excluded from insurance cover (always)
//  /project/governance/iqa0153                     Sponsor compensation arrangements (always)
//    — iqa0154 revealed inline via revealOn
//  /project/governance/iqa0155                     Contract Research Organisation (if CTIMP)
//    — iqa0156 revealed inline via revealOn
//  /project/governance/iqa0157                     Delegated activities (if CTIMP)
//    — iqa0158 revealed inline via revealOn

// ─── Routes ──────────────────────────────────────────────────────────────────

router.post('/project/governance/iqa0142', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0142']) {
    addError(errors, 'iqa0142', questions['iqa0142'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/governance/iqa0142', errors)

  if (!isMultiNational(data)) clear(data, ['iqa0143'])

  if (isMultiNational(data)) return res.redirect('/project/governance/iqa0143')

  return res.redirect('/project/governance/iqa0325')
})

router.post('/project/governance/iqa0143', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (asArray(data['iqa0143']).length === 0) {
    addError(errors, 'iqa0143', questions['iqa0143'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/governance/iqa0143', errors)

  return res.redirect('/project/governance/iqa0325')
})

router.post('/project/governance/iqa0325', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0325']) {
    addError(errors, 'iqa0325', questions['iqa0325'].errorMessages.required)
  }

  // Validate revealed field if yes selected
  if (data['iqa0325'] === 'yes' && (!data['iqa0139'] || !data['iqa0139'].trim())) {
    addError(errors, 'iqa0139', questions['iqa0139'].errorMessages.required)
  }

  if (errors.length) {
    clear(data, ['iqa0139'])
    return renderWithErrors(res, 'project/governance/iqa0325', errors)
  }

  if (data['iqa0325'] === 'no') clear(data, ['iqa0139'])

  return res.redirect('/project/governance/iqa0140')
})

router.post('/project/governance/iqa0140', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0140'] || !data['iqa0140'].trim()) {
    addError(errors, 'iqa0140', questions['iqa0140'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/governance/iqa0140', errors)

  if (isCTIMP(data)) return res.redirect('/project/governance/iqa0147')

  clear(data, ['iqa0147'])
  return res.redirect('/project/governance/data-efficacy-or-insurance')
})

router.post('/project/governance/iqa0147', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (asArray(data['iqa0147']).length === 0) {
    addError(errors, 'iqa0147', questions['iqa0147'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/governance/iqa0147', errors)

  return res.redirect('/project/governance/data-efficacy-or-insurance')
})

// Internal redirect — iqa0148 only shown if treatment
router.get('/project/governance/data-efficacy-or-insurance', function (req, res) {
  const data = req.session.data

  if (hasTreatment(data)) return res.redirect('/project/governance/iqa0148')

  clear(data, ['iqa0148'])
  return res.redirect('/project/governance/iqa0149')
})

router.post('/project/governance/iqa0148', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0148'] || !data['iqa0148'].trim()) {
    addError(errors, 'iqa0148', questions['iqa0148'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/governance/iqa0148', errors)

  return res.redirect('/project/governance/iqa0149')
})

router.post('/project/governance/iqa0149', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0149'] || !data['iqa0149'].trim()) {
    addError(errors, 'iqa0149', questions['iqa0149'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/governance/iqa0149', errors)

  return res.redirect('/project/governance/iqa0150')
})

router.post('/project/governance/iqa0150', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0150'] || !data['iqa0150'].trim()) {
    addError(errors, 'iqa0150', questions['iqa0150'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/governance/iqa0150', errors)

  return res.redirect('/project/governance/iqa0151')
})

router.post('/project/governance/iqa0151', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0151'] || !data['iqa0151'].trim()) {
    addError(errors, 'iqa0151', questions['iqa0151'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/governance/iqa0151', errors)

  return res.redirect('/project/governance/iqa0152')
})

router.post('/project/governance/iqa0152', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0152'] || !data['iqa0152'].trim()) {
    addError(errors, 'iqa0152', questions['iqa0152'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/governance/iqa0152', errors)

  return res.redirect('/project/governance/iqa0153')
})

router.post('/project/governance/iqa0153', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0153']) {
    addError(errors, 'iqa0153', questions['iqa0153'].errorMessages.required)
  }

  // Validate revealed field if yes selected
  if (data['iqa0153'] === 'yes' && (!data['iqa0154'] || !data['iqa0154'].trim())) {
    addError(errors, 'iqa0154', questions['iqa0154'].errorMessages.required)
  }

  if (errors.length) {
    clear(data, ['iqa0154'])
    return renderWithErrors(res, 'project/governance/iqa0153', errors)
  }

  if (data['iqa0153'] === 'no') clear(data, ['iqa0154'])

  if (isCTIMP(data)) return res.redirect('/project/governance/iqa0155')

  clear(data, ['iqa0155', 'iqa0156', 'iqa0157', 'iqa0158'])
  return res.redirect('/project/governance/check-governance')
})

router.post('/project/governance/iqa0155', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0155']) {
    addError(errors, 'iqa0155', questions['iqa0155'].errorMessages.required)
  }

  // Validate revealed field if yes selected
  if (data['iqa0155'] === 'yes' && (!data['iqa0156'] || !data['iqa0156'].trim())) {
    addError(errors, 'iqa0156', questions['iqa0156'].errorMessages.required)
  }

  if (errors.length) {
    clear(data, ['iqa0156'])
    return renderWithErrors(res, 'project/governance/iqa0155', errors)
  }

  if (data['iqa0155'] === 'no') clear(data, ['iqa0156'])

  return res.redirect('/project/governance/iqa0157')
})

router.post('/project/governance/iqa0157', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0157']) {
    addError(errors, 'iqa0157', questions['iqa0157'].errorMessages.required)
  }

  // Validate revealed field if yes selected
  if (data['iqa0157'] === 'yes' && (!data['iqa0158'] || !data['iqa0158'].trim())) {
    addError(errors, 'iqa0158', questions['iqa0158'].errorMessages.required)
  }

  if (errors.length) {
    clear(data, ['iqa0158'])
    return renderWithErrors(res, 'project/governance/iqa0157', errors)
  }

  if (data['iqa0157'] === 'no') clear(data, ['iqa0158'])

  return res.redirect('/project/governance/check-governance')
})

module.exports = router
