//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()



// Handle submission from check answers page
router.post('/my-research/create-project-check', function (req, res) {

  // Only generate once
  if (!req.session.data.projectReference) {

    const now = new Date()

    // ---- Create readable UK date ----
    req.session.data.submissionDate =
      String(now.getDate()).padStart(2, '0') + ' ' +
      now.toLocaleString('en-GB', { month: 'long' }) + ' ' +
      now.getFullYear()

    // ---- Create reference number ----
    const datePart =
      now.getFullYear().toString().slice(-2) +
      String(now.getMonth() + 1).padStart(2, '0') +
      String(now.getDate()).padStart(2, '0')

    const randomPart =
      Math.random().toString(36).substring(2, 6).toUpperCase()

    req.session.data.projectReference = `HRA-${datePart}-${randomPart}`
  }

  // Redirect to record page
  res.redirect('/my-research-w-record')
})


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
router.post('/project-scope/participants', function (req, res) {
  const data = req.session.data
  const errors = []

  const participantGroups = asArray(data['participantGroups'])

  if (participantGroups.length === 0) {
    addError(errors, 'participantGroups', 'Select at least one participant group')
  }

  if (errors.length) {
    return renderWithErrors(res, 'project-scope/participants', errors)
  }

  // ----------------------------
  // Cleanup: restrict researchActivities based on participantGroups
  // ----------------------------

  const isDeceasedOnly =
    participantGroups.includes('deceased') && participantGroups.length === 1

  const isStaffOnly =
    participantGroups.length > 0 &&
    participantGroups.every(v => v === 'nhs_hsc_staff' || v === 'other_care_staff')

  let allowedActivities = null

  if (isDeceasedOnly) {
    allowedActivities = new Set([
      'previously_collected_data',
      'previously_collected_biosamples'
    ])
  } else if (isStaffOnly) {
    allowedActivities = new Set([
      'non_clinical_staff_activities',
      'non_clinical_people_interviews_surveys'
    ])
  }

  if (allowedActivities) {
    const currentActivities = asArray(data['researchActivities'])
    data['researchActivities'] = currentActivities.filter(v => allowedActivities.has(v))

    // Also clear CTIMP answers if "treatment" is now impossible (or cleared)
    if (!data['researchActivities'].includes('treatment')) {
      delete data['isCTIMP']
      delete data['ctimpCombined']
    }
  }

  return res.redirect('/project-scope/activities')
})

// Activities -> CTIMP (if Treatment selected) else Participant age
router.post('/project-scope/activities', function (req, res) {
  const data = req.session.data
  const errors = []

  const researchActivities = asArray(data['researchActivities'])

  if (researchActivities.length === 0) {
    addError(errors, 'researchActivities', 'Select at least one research activity')
  }

  if (errors.length) {
    return renderWithErrors(res, 'project-scope/activities', errors)
  }

  const TREATMENT = 'treatment'
  const hasTreatment = researchActivities.includes(TREATMENT)

  // Clear CTIMP answers if treatment is not selected
  if (!hasTreatment) {
    clear(data, ['isCTIMP', 'ctimpCombined'])
    return res.redirect('/project-scope/participant-age')
  }

  return res.redirect('/project-scope/ctimp')
})

// CTIMP -> Participant age
router.post('/project-scope/ctimp', function (req, res) {
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
    return renderWithErrors(res, 'project-scope/ctimp', errors)
  }

  // Cleanup: if CTIMP is no, combined is irrelevant
  if (isCTIMP === 'no') {
    clear(data, ['ctimpCombined'])
  }

  return res.redirect('/project-scope/participant-age')
})

// Participant age -> Age ranges
router.post('/project-scope/participant-age', function (req, res) {
  const data = req.session.data
  const errors = []

  const adultsAndChildren = asArray(data['adultsAndChildren'])

  if (adultsAndChildren.length === 0) {
    addError(errors, 'adultsAndChildren', 'Select whether you are involving adults or children')
  }

  if (errors.length) {
    return renderWithErrors(res, 'project-scope/participant-age', errors)
  }

  const involvesAdults =
    adultsAndChildren.includes('adult') ||
    adultsAndChildren.includes('adult_including_16_17_scotland')

  const involvesChildren =
    adultsAndChildren.includes('child_u18') ||
    adultsAndChildren.includes('child_u16')

  if (!involvesAdults) clear(data, ['adultAge'])
  if (!involvesChildren) clear(data, ['childAge'])

  return res.redirect('/project-scope/participant-age-range')
})

// Age ranges -> Additional facets
router.post('/project-scope/participant-age-range', function (req, res) {
  const data = req.session.data
  const errors = []

  const adultsAndChildren = asArray(data['adultsAndChildren'])

  const involvesAdults =
    adultsAndChildren.includes('adult') ||
    adultsAndChildren.includes('adult_including_16_17_scotland')

  const involvesChildren =
    adultsAndChildren.includes('child_u18') ||
    adultsAndChildren.includes('child_u16')

  const childAge = asArray(data['childAge'])
  const adultAge = asArray(data['adultAge'])

  if (involvesChildren && childAge.length === 0) {
    addError(errors, 'childAge', 'Select at least one child age range')
  }

  if (involvesAdults && adultAge.length === 0) {
    addError(errors, 'adultAge', 'Select at least one adult age range')
  }

  if (errors.length) {
    return renderWithErrors(res, 'project-scope/participant-age-range', errors)
  }

  // Cleanup (optional but consistent)
  if (!involvesAdults) clear(data, ['adultAge'])
  if (!involvesChildren) clear(data, ['childAge'])

  return res.redirect('/project-scope/clinical-investigation')
})




// Clinical investigation -> Ionising radiation
router.post('/project-scope/clinical-investigation', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['isClinical']) {
    addError(errors, 'isClinical', 'Select whether this project involves a medical device investigation')
  }

  if (errors.length) {
    return renderWithErrors(res, 'project-scope/clinical-investigation', errors)
  }

  return res.redirect('/project-scope/ionising-radiation')
})

// Ionising radiation -> Biological samples
router.post('/project-scope/ionising-radiation', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['isIonising']) {
    addError(errors, 'isIonising', 'Select whether the project involves ionising radiation')
  }

  if (errors.length) {
    return renderWithErrors(res, 'project-scope/ionising-radiation', errors)
  }

  return res.redirect('/project-scope/biological-samples')
})

// Biological samples -> Participant consent
router.post('/project-scope/biological-samples', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['isBioSample']) {
    addError(errors, 'isBioSample', 'Select whether you will take or use human biological samples')
  }

  if (errors.length) {
    return renderWithErrors(res, 'project-scope/biological-samples', errors)
  }

  return res.redirect('/project-scope/participant-consent')
})

// Consent -> (if some/none) Not obtained page, else branch to HMPPS/MOD
router.post('/project-scope/participant-consent', function (req, res) {
  const data = req.session.data
  const errors = []

  const participantConsent = data['participantConsent'] // expects: all | none | some | already

  if (!participantConsent) {
    addError(errors, 'participantConsent', 'Select whether you will seek consent from or on behalf of participants')
  }

  if (errors.length) {
    return renderWithErrors(res, 'project-scope/consent', errors)
  }

  // If consent isn't obtained in all cases, capture situations first
  if (participantConsent === 'some' || participantConsent === 'none') {
    return res.redirect('/project-scope/participant-consent-not-obtained')
  }

  // Cleanup: noConsent / isCapable not relevant if consent is all/already
  delete data['noConsent']
  delete data['isCapable']

  // Branching rule based on participant groups (SHORT VALUE!)
  const participantGroups = asArray(data['participantGroups'])
  const PATIENTS = 'nhs_patients_service_users'

  if (participantGroups.includes(PATIENTS)) {
    return res.redirect('/project-scope/hmpps')
  }

  return res.redirect('/project-scope/mod')
})

// Consent not obtained -> validate noConsent (+ isCapable if adults involved) -> branch to HMPPS/MOD
router.post('/project-scope/participant-consent-not-obtained', function (req, res) {
  const data = req.session.data
  const errors = []

  const noConsent = asArray(data['noConsent'])
  const adultsAndChildren = asArray(data['adultsAndChildren'])

  const involvesAdults =
    adultsAndChildren.includes('adult') ||
    adultsAndChildren.includes('adult_including_16_17_scotland')

  // Validate: must select at least one situation
  if (noConsent.length === 0) {
    addError(errors, 'noConsent', 'Select at least one situation when consent or assent will not be obtained')
  }

  // Validate: only ask capacity if adults are involved (and you’re showing this field on the page)
  if (involvesAdults && !data['isCapable']) {
    addError(errors, 'isCapable', 'Select what capacity adult participants will have to consent to their participation')
  }

  if (errors.length) {
    return renderWithErrors(
      res,
      'project-scope/participant-consent-not-obtained',
      errors
    )
  }

  // Cleanup: if adults aren't involved, don't keep isCapable around
  if (!involvesAdults) {
    delete data['isCapable']
  }

  // Branching rule based on participant groups (SHORT VALUE!)
  const participantGroups = asArray(data['participantGroups'])
  const PATIENTS = 'nhs_patients_service_users'

  if (participantGroups.includes(PATIENTS)) {
    return res.redirect('/project-scope/hmpps')
  }

  return res.redirect('/project-scope/mod')
})


// HMPPS -> MOD
router.post('/project-scope/hmpps', function (req, res) {
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
    return renderWithErrors(res, 'project-scope/hmpps', errors)
  }

  // Cleanup
  if (isHMPPS === 'no') {
    clear(data, ['hmppsNations'])
  }

  return res.redirect('/project-scope/mod')
})

// MOD -> HFEA
router.post('/project-scope/mod', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['isMOD']) {
    addError(errors, 'isMOD', 'Select whether the project involves MOD activity')
  }

  if (errors.length) {
    return renderWithErrors(res, 'project-scope/mod', errors)
  }

  return res.redirect('/project-scope/hfea')
})

// HFEA -> Check answers
router.post('/project-scope/hfea', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['isHFEA']) {
    addError(errors, 'isHFEA', 'Select whether the project involves HFEA regulated activities or data')
  }

  if (errors.length) {
    return renderWithErrors(res, 'project-scope/hfea', errors)
  }

  return res.redirect('/project-scope/check')
})

// routes.js
const { buildApprovalsPathway } = require('./helpers/approvals-pathway')

router.get('/project-scope/check', (req, res) => {
  req.session.data.approvalsPathway = buildApprovalsPathway(req.session.data)
  res.render('project-scope/check') // your template filename
})
