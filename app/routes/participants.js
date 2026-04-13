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

function isClinicalOrTreatment (data) {
  const a = asArray(data['researchActivities'])
  return a.includes('clinical_people_activities') || a.includes('treatment')
}

function isNonClinical (data) {
  const a = asArray(data['researchActivities'])
  return a.includes('non_clinical_people_interviews_surveys') ||
    a.includes('non_clinical_staff_activities')
}

function hasOtherParticipants (data) {
  return asArray(data['participantGroups']).includes('other')
}

function isDataOnly (data) {
  const a = asArray(data['researchActivities'])
  const dataOnlyActivities = new Set([
    'previously_collected_data',
    'previously_collected_biosamples'
  ])
  return a.length > 0 && a.every(act => dataOnlyActivities.has(act))
}

// ─── Page flow ───────────────────────────────────────────────────────────────
//
//  /project/participants/iqa0083                   Primary condition (always)
//  /project/participants/iqa0322                   Primary problem description (always)
//  /project/participants/iqa0084                   Inclusion criteria (always)
//  /project/participants/iqa0085                   Exclusion criteria (always)
//  /project/participants/iqa0086                   Real-world population (always)
//  /project/participants/iqa0087                   Full participation (always)
//  /project/participants/iqa0089                   Other participants (if other group selected in scoping)
//  /project/participants/iqa0090                   Recruitment date (always)
//  /project/participants/iqa0091                   How long involved (if not data-only)
//  /project/participants/iqa0092                   Current research (if clinical/treatment)
//  /project/participants/iqa0093                   Vulnerable participants (if non-clinical)
//  /project/participants/tbc007                    Imposter participants (always)

// ─── Routes ──────────────────────────────────────────────────────────────────

router.post('/project/participants/iqa0083', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (asArray(data['iqa0083']).length === 0) {
    addError(errors, 'iqa0083', questions['iqa0083'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/participants/iqa0083', errors)

  return res.redirect('/project/participants/iqa0322')
})

router.post('/project/participants/iqa0322', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0322'] || !data['iqa0322'].trim()) {
    addError(errors, 'iqa0322', questions['iqa0322'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/participants/iqa0322', errors)

  return res.redirect('/project/participants/iqa0084')
})

router.post('/project/participants/iqa0084', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0084'] || !data['iqa0084'].trim()) {
    addError(errors, 'iqa0084', questions['iqa0084'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/participants/iqa0084', errors)

  return res.redirect('/project/participants/iqa0085')
})

router.post('/project/participants/iqa0085', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0085'] || !data['iqa0085'].trim()) {
    addError(errors, 'iqa0085', questions['iqa0085'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/participants/iqa0085', errors)

  return res.redirect('/project/participants/iqa0086')
})

router.post('/project/participants/iqa0086', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0086'] || !data['iqa0086'].trim()) {
    addError(errors, 'iqa0086', questions['iqa0086'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/participants/iqa0086', errors)

  return res.redirect('/project/participants/iqa0087')
})

router.post('/project/participants/iqa0087', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0087'] || !data['iqa0087'].trim()) {
    addError(errors, 'iqa0087', questions['iqa0087'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/participants/iqa0087', errors)

  if (hasOtherParticipants(data)) {
    return res.redirect('/project/participants/iqa0089')
  }

  clear(data, ['iqa0089'])
  return res.redirect('/project/participants/iqa0090')
})

router.post('/project/participants/iqa0089', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0089'] || !data['iqa0089'].trim()) {
    addError(errors, 'iqa0089', questions['iqa0089'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/participants/iqa0089', errors)

  return res.redirect('/project/participants/iqa0090')
})

router.post('/project/participants/iqa0090', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  const day   = data['iqa0090-day']
  const month = data['iqa0090-month']
  const year  = data['iqa0090-year']

  if (!day || !month || !year) {
    addError(errors, 'iqa0090', questions['iqa0090'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/participants/iqa0090', errors)

  if (!isDataOnly(data)) {
    return res.redirect('/project/participants/iqa0091')
  }

  clear(data, ['iqa0091'])
  return res.redirect('/project/participants/tbc007')
})

router.post('/project/participants/iqa0091', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0091'] || !data['iqa0091'].trim()) {
    addError(errors, 'iqa0091', questions['iqa0091'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/participants/iqa0091', errors)

  if (isClinicalOrTreatment(data)) {
    return res.redirect('/project/participants/iqa0092')
  }

  clear(data, ['iqa0092'])

  if (isNonClinical(data)) {
    return res.redirect('/project/participants/iqa0093')
  }

  clear(data, ['iqa0093'])
  return res.redirect('/project/participants/tbc007')
})

router.post('/project/participants/iqa0092', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0092'] || !data['iqa0092'].trim()) {
    addError(errors, 'iqa0092', questions['iqa0092'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/participants/iqa0092', errors)

  if (isNonClinical(data)) {
    return res.redirect('/project/participants/iqa0093')
  }

  clear(data, ['iqa0093'])
  return res.redirect('/project/participants/tbc007')
})

router.post('/project/participants/iqa0093', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['iqa0093']) {
    addError(errors, 'iqa0093', questions['iqa0093'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/participants/iqa0093', errors)

  return res.redirect('/project/participants/tbc007')
})

router.post('/project/participants/tbc007', function (req, res) {
  const data = req.session.data
  const questions = res.locals.questions
  const errors = []

  if (!data['tbc007'] || !data['tbc007'].trim()) {
    addError(errors, 'tbc007', questions['tbc007'].errorMessages.required)
  }

  if (errors.length) return renderWithErrors(res, 'project/participants/tbc007', errors)

  return res.redirect('/project/participants/check-participants')
})

router.post('/project/participants/check-complete', (req, res) => {
  req.session.data['completed-participants'] = 'true'
  setFlash(req, 'completed', 'Participants')
  res.redirect('/project/start01')
})

module.exports = router
