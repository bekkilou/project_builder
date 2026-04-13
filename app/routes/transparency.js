const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()
const { setFlash } = require('./helpers/flash')

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

function hasBioResource (data) {
  const a = asArray(data['researchActivities'])
  return a.includes('previously_collected_biosamples') ||
    a.includes('clinical_people_activities')
}

function isMultiNational (data) {
  return data['UKOrMultiNation'] === 'multi_national'
}

// OPT0253 = 'No deferral requested' for both iqa0165 and iqa0173
function deferralRequested (field, data) {
  return data[field] && data[field] !== 'OPT0253'
}

function disseminateOther (data) {
  return asArray(data['iqa0176']).includes('OPT0033')
}

// ─── Page flow ───────────────────────────────────────────────────────────────
//
//  /project/transparency/iqa0169                     Is the project already registered?  (always)
//  /project/transparency/iqa0165                     Deferral request (if CTIMP)
//    → if deferral requested: /iqa0166
//    → else:                  /reg-arrangements-next
//  /project/transparency/iqa0166                     Justify deferral
//  /project/transparency/iqa0167                     Registration arrangements (if not treatment AND already registered)
//    → if OPT0257 (other):   /iqa0168
//    → else:                 /iqa0169b (if CTIMP) or /iqa0173
//  /project/transparency/iqa0168                     Other registration arrangements
//  /project/transparency/iqa0169b                    CTIMP registry type (if CTIMP)
//    — sub-inputs: iqa0170, iqa0171, iqa0172
//  /project/transparency/iqa0173                     Publication deferral (always)
//    → if deferral: /iqa0174
//    → else:        /iqa0175
//  /project/transparency/iqa0174                     Justify publication deferral
//  /project/transparency/iqa0175                     Planned end date (always)
//  /project/transparency/planned-end-date-multi      plannedEndDateMulti (if multi-national)
//  /project/transparency/iqa0176                     Disseminate results (always)
//    → if OPT0033 (other):  /iqa0177
//    → else:                /iqa0178
//  /project/transparency/iqa0177                     Other dissemination details
//  /project/transparency/iqa0178                     Participant results (always)
//  /project/transparency/iqa0179                     Share de-identified data (always)
//  /project/transparency/iqa0180                     De-identified data details (always)
//  /project/transparency/iqa0181                     Remaining bio material (if bio resource)
//    → if yes: /iqa0182
//    → if no:  /public-contact
//  /project/transparency/iqa0182                     Register bio material
//    → if no:  /iqa0183
//    → if yes: /public-contact
//  /project/transparency/iqa0183                     Justify not registering bio material
//  /project/transparency/public-contact              (always)
//  /project/transparency/scientific-contact          (always)

// ─── Routes ──────────────────────────────────────────────────────────────────

router.post('/project/transparency/iqa0169', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0169']) {
    addError(errors, 'iqa0169', questions['iqa0169'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/transparency/iqa0169', errors)

  if (isCTIMP(data)) return res.redirect('/project/transparency/iqa0165')

  clear(data, ['iqa0165', 'iqa0166'])
  return res.redirect('/project/transparency/reg-arrangements-next')
})

router.post('/project/transparency/iqa0165', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0165']) {
    addError(errors, 'iqa0165', questions['iqa0165'].errorMessages.required)
  }

  if (errors.length) {
    clear(data, ['iqa0166'])
    return renderWithErrors(res, 'project/transparency/iqa0165', errors)
  }

  if (deferralRequested('iqa0165', data)) {
    return res.redirect('/project/transparency/iqa0166')
  }

  clear(data, ['iqa0166'])
  return res.redirect('/project/transparency/reg-arrangements-next')
})

router.post('/project/transparency/iqa0166', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0166'] || !data['iqa0166'].trim()) {
    addError(errors, 'iqa0166', questions['iqa0166'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/transparency/iqa0166', errors)

  return res.redirect('/project/transparency/reg-arrangements-next')
})

// Internal redirect — iqa0167 only shown when not treatment AND already registered
router.get('/project/transparency/reg-arrangements-next', function (req, res) {
  const data = req.session.data

  if (!hasTreatment(data) && data['iqa0169'] === 'yes') {
    return res.redirect('/project/transparency/iqa0167')
  }

  clear(data, ['iqa0167', 'iqa0168'])

  if (isCTIMP(data)) return res.redirect('/project/transparency/iqa0169b')

  clear(data, ['iqa0169b', 'iqa0170', 'iqa0171', 'iqa0172'])
  return res.redirect('/project/transparency/iqa0173')
})

router.post('/project/transparency/iqa0167', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (asArray(data['iqa0167']).length === 0) {
    addError(errors, 'iqa0167', questions['iqa0167'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/transparency/iqa0167', errors)

  // OPT0257 = 'Other arrangements are in place'
  if (asArray(data['iqa0167']).includes('OPT0257')) {
    return res.redirect('/project/transparency/iqa0168')
  }

  clear(data, ['iqa0168'])

  if (isCTIMP(data)) return res.redirect('/project/transparency/iqa0169b')

  clear(data, ['iqa0169b', 'iqa0170', 'iqa0171', 'iqa0172'])
  return res.redirect('/project/transparency/iqa0173')
})

router.post('/project/transparency/iqa0168', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0168'] || !data['iqa0168'].trim()) {
    addError(errors, 'iqa0168', questions['iqa0168'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/transparency/iqa0168', errors)

  if (isCTIMP(data)) return res.redirect('/project/transparency/iqa0169b')

  clear(data, ['iqa0169b', 'iqa0170', 'iqa0171', 'iqa0172'])
  return res.redirect('/project/transparency/iqa0173')
})

router.post('/project/transparency/iqa0169b', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (asArray(data['iqa0169b']).length === 0) {
    addError(errors, 'iqa0169b', questions['iqa0169b'].errorMessages.required)
  }

  if (asArray(data['iqa0169b']).includes('OPT0258') &&
    (!data['iqa0170'] || !data['iqa0170'].trim())) {
    addError(errors, 'iqa0170', questions['iqa0170'].errorMessages.required)
  }

  if (asArray(data['iqa0169b']).includes('OPT0259') &&
    (!data['iqa0171'] || !data['iqa0171'].trim())) {
    addError(errors, 'iqa0171', questions['iqa0171'].errorMessages.required)
  }

  if (asArray(data['iqa0169b']).includes('OPT0033') &&
    (!data['iqa0172'] || !data['iqa0172'].trim())) {
    addError(errors, 'iqa0172', questions['iqa0172'].errorMessages.required)
  }

  if (errors.length) {
    clear(data, ['iqa0170', 'iqa0171', 'iqa0172'])
    return renderWithErrors(res, 'project/transparency/iqa0169b', errors)
  }

  if (!asArray(data['iqa0169b']).includes('OPT0258')) clear(data, ['iqa0170'])
  if (!asArray(data['iqa0169b']).includes('OPT0259')) clear(data, ['iqa0171'])
  if (!asArray(data['iqa0169b']).includes('OPT0033')) clear(data, ['iqa0172'])

  return res.redirect('/project/transparency/iqa0173')
})

router.post('/project/transparency/iqa0173', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0173']) {
    addError(errors, 'iqa0173', questions['iqa0173'].errorMessages.required)
  }

  if (errors.length) {
    clear(data, ['iqa0174'])
    return renderWithErrors(res, 'project/transparency/iqa0173', errors)
  }

  if (deferralRequested('iqa0173', data)) {
    return res.redirect('/project/transparency/iqa0174')
  }

  clear(data, ['iqa0174'])
  return res.redirect('/project/transparency/iqa0175')
})

router.post('/project/transparency/iqa0174', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0174'] || !data['iqa0174'].trim()) {
    addError(errors, 'iqa0174', questions['iqa0174'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/transparency/iqa0174', errors)

  return res.redirect('/project/transparency/iqa0175')
})

router.post('/project/transparency/iqa0175', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  const day   = data['iqa0175-day']
  const month = data['iqa0175-month']
  const year  = data['iqa0175-year']

  if (!day || !month || !year) {
    addError(errors, 'iqa0175', questions['iqa0175'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/transparency/iqa0175', errors)

  if (isMultiNational(data)) return res.redirect('/project/transparency/planned-end-date-multi')

  clear(data, ['plannedEndDateMulti'])
  return res.redirect('/project/transparency/iqa0176')
})

// plannedEndDateMulti has no IQA ID yet — keeping descriptive path until assigned
router.post('/project/transparency/planned-end-date-multi', function (req, res) {
  const data = req.session.data
  const errors = []

  const day   = data['plannedEndDateMulti-day']
  const month = data['plannedEndDateMulti-month']
  const year  = data['plannedEndDateMulti-year']

  if (!day || !month || !year) {
    addError(errors, 'plannedEndDateMulti', 'Enter the planned global study end date')
  }

  if (errors.length) return renderWithErrors(res, 'project/transparency/planned-end-date-multi', errors)

  return res.redirect('/project/transparency/iqa0176')
})

router.post('/project/transparency/iqa0176', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (asArray(data['iqa0176']).length === 0) {
    addError(errors, 'iqa0176', questions['iqa0176'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/transparency/iqa0176', errors)

  if (disseminateOther(data)) {
    return res.redirect('/project/transparency/iqa0177')
  }

  clear(data, ['iqa0177'])
  return res.redirect('/project/transparency/iqa0178')
})

router.post('/project/transparency/iqa0177', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0177'] || !data['iqa0177'].trim()) {
    addError(errors, 'iqa0177', questions['iqa0177'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/transparency/iqa0177', errors)

  return res.redirect('/project/transparency/iqa0178')
})

router.post('/project/transparency/iqa0178', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0178'] || !data['iqa0178'].trim()) {
    addError(errors, 'iqa0178', questions['iqa0178'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/transparency/iqa0178', errors)

  return res.redirect('/project/transparency/iqa0179')
})

router.post('/project/transparency/iqa0179', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0179']) {
    addError(errors, 'iqa0179', questions['iqa0179'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/transparency/iqa0179', errors)

  return res.redirect('/project/transparency/iqa0180')
})

router.post('/project/transparency/iqa0180', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0180'] || !data['iqa0180'].trim()) {
    addError(errors, 'iqa0180', questions['iqa0180'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/transparency/iqa0180', errors)

  if (hasBioResource(data)) return res.redirect('/project/transparency/iqa0181')

  clear(data, ['iqa0181', 'iqa0182', 'iqa0183'])
  return res.redirect('/project/transparency/public-contact')
})

router.post('/project/transparency/iqa0181', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0181']) {
    addError(errors, 'iqa0181', questions['iqa0181'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/transparency/iqa0181', errors)

  if (data['iqa0181'] === 'yes') {
    return res.redirect('/project/transparency/iqa0182')
  }

  clear(data, ['iqa0182', 'iqa0183'])
  return res.redirect('/project/transparency/public-contact')
})

router.post('/project/transparency/iqa0182', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0182']) {
    addError(errors, 'iqa0182', questions['iqa0182'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/transparency/iqa0182', errors)

  if (data['iqa0182'] === 'no') {
    return res.redirect('/project/transparency/iqa0183')
  }

  clear(data, ['iqa0183'])
  return res.redirect('/project/transparency/public-contact')
})

router.post('/project/transparency/iqa0183', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0183'] || !data['iqa0183'].trim()) {
    addError(errors, 'iqa0183', questions['iqa0183'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/transparency/iqa0183', errors)

  return res.redirect('/project/transparency/public-contact')
})

// public-contact and scientific-contact keep descriptive paths as they
// cover multiple fields not yet assigned individual IQA IDs
router.post('/project/transparency/public-contact', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['iqa0185'] || !data['iqa0185'].trim()) {
    addError(errors, 'iqa0185', 'Enter a public contact email address')
  }

  if (!data['iqa0187'] || !data['iqa0187'].trim()) {
    addError(errors, 'iqa0187', 'Enter a postal address for the public contact')
  }

  if (errors.length) return renderWithErrors(res, 'project/transparency/public-contact', errors)

  return res.redirect('/project/transparency/scientific-contact')
})

router.post('/project/transparency/scientific-contact', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['iqa0189'] || !data['iqa0189'].trim()) {
    addError(errors, 'iqa0189', 'Enter a scientific contact email address')
  }

  if (!data['iqa0191'] || !data['iqa0191'].trim()) {
    addError(errors, 'iqa0191', 'Enter a postal address for the scientific contact')
  }

  if (errors.length) return renderWithErrors(res, 'project/transparency/scientific-contact', errors)

  return res.redirect('/project/transparency/check-transparency')
})

router.post('/project/transparency/check-complete', (req, res) => {
  req.session.data['completed-transparency'] = 'true'
  setFlash(req, 'completed', 'Transparency')
  res.redirect('/project/start01')
})

module.exports = router
