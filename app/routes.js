//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Helpers
function asArray(value) {
  return Array.isArray(value) ? value : (value ? [value] : [])
}

function clear(data, keys) {
  keys.forEach(k => { delete data[k] })
}

function addError(errors, field, message) {
  errors.push({ text: message, href: `#${field}` })
}

function renderWithErrors(res, view, errors) {
  const errorMap = errors.reduce((acc, e) => {
    const key = e.href.replace('#', '')
    acc[key] = { text: e.text }
    return acc
  }, {})
  return res.render(view, { errors, errorMap })
}

// ===============================
// Project scope routing + validation
// ===============================

// Participants -> Activities
router.post('/my-research/project-scope-participants', function (req, res) {
  const data = req.session.data
  const errors = []

  const participantGroups = asArray(data['participantGroups'])

  if (participantGroups.length === 0) {
    addError(errors, 'participantGroups', 'Select at least one participant group')
  }

  if (errors.length) {
    return renderWithErrors(res, 'my-research/project-scope-participants', errors)
  }

  return res.redirect('/my-research/project-scope-activities')
})

// Activities -> CTIMP (if Treatment selected) else Participant age
router.post('/my-research/project-scope-activities', function (req, res) {
  const data = req.session.data
  const errors = []

  const researchActivities = asArray(data['researchActivities'])

  if (researchActivities.length === 0) {
    addError(errors, 'researchActivities', 'Select at least one research activity')
  }

  if (errors.length) {
    return renderWithErrors(res, 'my-research/project-scope-activities', errors)
  }

  const TREATMENT = 'Treatment, such as medicines, devices, surgery, vaccines or therapies'
  const hasTreatment = researchActivities.includes(TREATMENT)

  // Clear CTIMP answers if treatment is not selected
  if (!hasTreatment) {
    clear(data, ['isCTIMP', 'ctimpCombined'])
    return res.redirect('/my-research/project-scope-participant-age')
  }

  return res.redirect('/my-research/project-scope-ctimp')
})

// CTIMP -> Participant age
router.post('/my-research/project-scope-ctimp', function (req, res) {
  const data = req.session.data
  const errors = []

  const isCTIMP = data['isCTIMP']          // yes/no
  const ctimpCombined = data['ctimpCombined'] // only required if yes

  if (!isCTIMP) {
    addError(errors, 'isCTIMP', 'Select whether this project is a CTIMP')
  }

  if (isCTIMP === 'yes' && !ctimpCombined) {
    addError(errors, 'ctimpCombined', 'Select the option that applies to your CTIMP project')
  }

  if (errors.length) {
    return renderWithErrors(res, 'my-research/project-scope-ctimp', errors)
  }

  // Cleanup: if CTIMP is no, combined is irrelevant
  if (isCTIMP === 'no') {
    clear(data, ['ctimpCombined'])
  }

  return res.redirect('/my-research/project-scope-participant-age')
})

// Participant age -> Age ranges
router.post('/my-research/project-scope-participant-age', function (req, res) {
  const data = req.session.data
  const errors = []

  const adultsAndChildren = asArray(data['adultsAndChildren'])

  if (adultsAndChildren.length === 0) {
    addError(errors, 'adultsAndChildren', 'Select whether you are involving adults or children')
  }

  if (errors.length) {
    return renderWithErrors(res, 'my-research/project-scope-participant-age', errors)
  }

  // Determine involvement from the full-text values
  const involvesAdults = adultsAndChildren.some(v => v.toLowerCase().includes('adult'))
  const involvesChildren = adultsAndChildren.some(v => v.toLowerCase().includes('child'))

  if (!involvesAdults) clear(data, ['adultAge'])
  if (!involvesChildren) clear(data, ['childAge'])

  return res.redirect('/my-research/project-scope-participant-age-range')
})

// Age ranges -> Additional facets
router.post('/my-research/project-scope-participant-age-range', function (req, res) {
  const data = req.session.data
  const errors = []

  const adultsAndChildren = asArray(data['adultsAndChildren'])
  const involvesAdults = adultsAndChildren.some(v => v.toLowerCase().includes('adult'))
  const involvesChildren = adultsAndChildren.some(v => v.toLowerCase().includes('child'))

  const childAge = asArray(data['childAge'])
  const adultAge = asArray(data['adultAge'])

  if (involvesChildren && childAge.length === 0) {
    addError(errors, 'childAge', 'Select at least one child age range')
  }

  if (involvesAdults && adultAge.length === 0) {
    addError(errors, 'adultAge', 'Select at least one adult age range')
  }

  if (errors.length) {
    return renderWithErrors(res, 'my-research/project-scope-participant-age-range', errors)
  }

  // Cleanup if they no longer involve a group
  if (!involvesAdults) clear(data, ['adultAge'])
  if (!involvesChildren) clear(data, ['childAge'])

  return res.redirect('/my-research/project-scope-additional')
})

// Additional facets -> Consent
router.post('/my-research/project-scope-additional', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['isClinical']) {
    addError(errors, 'isClinical', 'Select whether this project involves a medical device investigation')
  }
  if (!data['isIonising']) {
    addError(errors, 'isIonising', 'Select whether the project involves ionising radiation')
  }
  if (!data['isBioSample']) {
    addError(errors, 'isBioSample', 'Select whether you will take or use human biological samples')
  }

  if (errors.length) {
    return renderWithErrors(res, 'my-research/project-scope-additional', errors)
  }

  return res.redirect('/my-research/project-scope-participant-consent')
})

// Consent -> HMPPS or MOD
router.post('/my-research/project-scope-participant-consent', function (req, res) {
  const data = req.session.data
  const errors = []

  const participantConsent = data['participantConsent'] // all/none/some/already
  const noConsent = asArray(data['noConsent'])
  const isCapable = data['isCapable']

  if (!participantConsent) {
    addError(errors, 'participantConsent', 'Select whether you will seek consent')
  }

  const needsFollowup = participantConsent === 'none' || participantConsent === 'some'

  if (needsFollowup && noConsent.length === 0) {
    addError(errors, 'noConsent', 'Select at least one situation when consent or assent will not be obtained')
  }

  if (needsFollowup && !isCapable) {
    addError(errors, 'isCapable', 'Select what capacity adult participants will have to consent')
  }

  if (errors.length) {
    return renderWithErrors(res, 'my-research/project-scope-participant-consent', errors)
  }

  // Cleanup if follow-ups are not relevant
  if (!needsFollowup) {
    clear(data, ['noConsent', 'isCapable'])
  }

  // Your branching rule based on participant groups
  const participantGroups = asArray(data['participantGroups'])
  const PATIENTS = 'Patients or service users of NHS or HSC provided or commissioned services'

  if (participantGroups.includes(PATIENTS)) {
    return res.redirect('/my-research/project-scope-hmpps')
  }

  return res.redirect('/my-research/project-scope-mod')
})

// HMPPS -> MOD
router.post('/my-research/project-scope-hmpps', function (req, res) {
  const data = req.session.data
  const errors = []

  const isHMPPS = data['isHMPPS'] // yes/no
  const hmppsNations = asArray(data['hmppsNations'])

  if (!isHMPPS) {
    addError(errors, 'isHMPPS', 'Select whether HMPPS is involved')
  }

  if (isHMPPS === 'yes' && hmppsNations.length === 0) {
    addError(errors, 'hmppsNations', 'Select at least one UK nation')
  }

  if (errors.length) {
    return renderWithErrors(res, 'my-research/project-scope-hmpps', errors)
  }

  // Cleanup
  if (isHMPPS === 'no') {
    clear(data, ['hmppsNations'])
  }

  return res.redirect('/my-research/project-scope-mod')
})

// MOD -> HFEA
router.post('/my-research/project-scope-mod', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['isMOD']) {
    addError(errors, 'isMOD', 'Select whether the project involves MOD activity')
  }

  if (errors.length) {
    return renderWithErrors(res, 'my-research/project-scope-mod', errors)
  }

  return res.redirect('/my-research/project-scope-hfea')
})

// HFEA -> Check answers
router.post('/my-research/project-scope-hfea', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['isHFEA']) {
    addError(errors, 'isHFEA', 'Select whether the project involves HFEA regulated activities or data')
  }

  if (errors.length) {
    return renderWithErrors(res, 'my-research/project-scope-hfea', errors)
  }

  return res.redirect('/my-research/check-your-answers')
})
