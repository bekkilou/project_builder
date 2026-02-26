const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const {
  asArray,
  clear,
  addError,
  renderWithErrors
} = require('./helpers/routing')

// Pull error messages from the central questions config
// so they only ever need updating in one place (data/questions.js)
const questions = require('../data/scoping-questions')


// NOTE: If your checkbox value is different, change this:
const CLINICAL_ACTIVITIES = 'clinical_people_activities'
const TREATMENT = 'treatment'

function hasClinicalOrTreatmentActivities(data) {
  const researchActivities = asArray(data['researchActivities'])
  return researchActivities.includes(CLINICAL_ACTIVITIES) || researchActivities.includes(TREATMENT)
}

// Decide what comes after age-range
function nextAfterAgeRange(data) {
  const isCTIMPYes = String(data['isCTIMP'] || '').toLowerCase() === 'yes'
  const hasClinicalOrTreatment = hasClinicalOrTreatmentActivities(data)

  // Clinical investigation should only come up if CTIMP == yes
  if (isCTIMPYes) return '/project-scope/clinical-investigation'

  // Ionising radiation should only come up if activities includes clinical activities AND/OR treatment
  if (hasClinicalOrTreatment) return '/project-scope/ionising-radiation'

  // Bio samples should only come up if activities includes clinical activities AND/OR treatment
  // (In your flow, bio samples comes after ionising radiation anyway)
  // If we didn't qualify for ionising, we shouldn't qualify for bio either.
  return '/project-scope/participant-consent'
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
    addError(errors, 'participantGroups', questions.participantGroups.errorMessage)
  }

  if (errors.length) {
    return renderWithErrors(res, 'project-scope/participants', errors)
  }

  // Cleanup: restrict researchActivities based on participantGroups

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

    // Clear CTIMP answers if "treatment" is now impossible (or cleared)
    if (!data['researchActivities'].includes(TREATMENT)) {
      delete data['isCTIMP']
      delete data['ctimpCombined']
    }
  }

  const returnTo = req.query.returnTo
  if (returnTo) return res.redirect(returnTo)

  return res.redirect('/project-scope/activities')
})

router.post('/project-scope/activities', function (req, res) {
  const data = req.session.data
  const errors = []

  const researchActivities = asArray(data['researchActivities'])

  if (researchActivities.length === 0) {
    addError(errors, 'researchActivities', questions.researchActivities.errorMessage)
  }

  if (errors.length) {
    return renderWithErrors(res, 'project-scope/activities', errors)
  }

  const participantGroups = asArray(data['participantGroups'])

  // Only skip age if the participant selection is ONLY the exclusions
  const isDeceasedOnly =
    participantGroups.includes('deceased') && participantGroups.length === 1

  const isStaffOnly =
    participantGroups.length > 0 &&
    participantGroups.every(v => v === 'nhs_hsc_staff' || v === 'other_care_staff')

  const skipAgeBecauseGroups = isDeceasedOnly || isStaffOnly

  const TREATMENT = 'treatment'
  const hasTreatment = researchActivities.includes(TREATMENT)

  // "Previously collected" activities
  const ageSkippableActivities = new Set([
    'previously_collected_data',
    'previously_collected_biosamples'
  ])

  // Only skip age if EVERYTHING selected is in that set
  const activitiesAreAllAgeSkippable =
    researchActivities.length > 0 &&
    researchActivities.every(a => ageSkippableActivities.has(a))

  const shouldSkipParticipantAge = skipAgeBecauseGroups || activitiesAreAllAgeSkippable

  const returnTo = req.query.returnTo

  // If exclusions apply, skip straight to consent (and clear downstream answers)
  if (shouldSkipParticipantAge) {
    clear(data, [
      'isCTIMP',
      'ctimpCombined',
      'adultsAndChildren',
      'adultAge',
      'childAge'
    ])
    if (returnTo) return res.redirect(returnTo)
    return res.redirect('/project-scope/participant-consent')
  }

  // Not excluded: if treatment selected, ask CTIMP first, then age
  if (hasTreatment) {
    if (returnTo) return res.redirect(returnTo)
    return res.redirect('/project-scope/ctimp')
  }

  // No treatment: CTIMP irrelevant
  clear(data, ['isCTIMP', 'ctimpCombined'])

  // Always ask participant age if not excluded
  if (returnTo) return res.redirect(returnTo)
  return res.redirect('/project-scope/participant-age')
})

// CTIMP -> Participant age
router.post('/project-scope/ctimp', function (req, res) {
  const data = req.session.data
  const errors = []

  const rawIsCTIMP = data['isCTIMP'] // could be "yes", "Yes", etc.
  const isCTIMP = String(rawIsCTIMP || '').toLowerCase()
  const ctimpCombined = data['ctimpCombined'] // only required if yes

  if (!rawIsCTIMP) {
    addError(errors, 'isCTIMP', questions.isCTIMP.errorMessage)
  }

  if (isCTIMP === 'yes' && !ctimpCombined) {
    addError(errors, 'ctimpCombined', questions.ctimpCombined.errorMessage)
  }

  if (errors.length) {
    return renderWithErrors(res, 'project-scope/ctimp', errors)
  }

  // Cleanup: if CTIMP is no, combined is irrelevant
  if (isCTIMP === 'no') {
    clear(data, ['ctimpCombined'])
  }

  const returnTo = req.query.returnTo
  if (returnTo) return res.redirect(returnTo)

  return res.redirect('/project-scope/participant-age')
})

// Participant age -> Age ranges
router.post('/project-scope/participant-age', function (req, res) {
  const data = req.session.data
  const errors = []

  const adultsAndChildren = asArray(data['adultsAndChildren'])

  if (adultsAndChildren.length === 0) {
    addError(errors, 'adultsAndChildren', questions.adultsAndChildren.errorMessage)
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

  const returnTo = req.query.returnTo
  if (returnTo) return res.redirect(returnTo)

  return res.redirect('/project-scope/participant-age-range')
})

// Age ranges -> Conditional next step
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
    addError(errors, 'childAge', questions.childAge.errorMessage)
  }

  if (involvesAdults && adultAge.length === 0) {
    addError(errors, 'adultAge', questions.adultAge.errorMessage)
  }

  if (errors.length) {
    return renderWithErrors(res, 'project-scope/participant-age-range', errors)
  }

  // Cleanup
  if (!involvesAdults) clear(data, ['adultAge'])
  if (!involvesChildren) clear(data, ['childAge'])

  const returnTo = req.query.returnTo
  if (returnTo) return res.redirect(returnTo)

  // Cleanup answers for pages we might skip
  // If not CTIMP=yes, clinical investigation is irrelevant
  if (String(data['isCTIMP'] || '').toLowerCase() !== 'yes') {
    delete data['isClinical']
  }

  // If not clinical/treatment, ionising + bio samples are irrelevant
  if (!hasClinicalOrTreatmentActivities(data)) {
    delete data['isIonising']
    delete data['isBioSample']
  }

  return res.redirect(nextAfterAgeRange(data))
})

// Clinical investigation -> Ionising radiation (only appears if CTIMP == yes)
router.post('/project-scope/clinical-investigation', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['isClinical']) {
    addError(errors, 'isClinical', questions.isClinical.errorMessage)
  }

  if (errors.length) {
    return renderWithErrors(res, 'project-scope/clinical-investigation', errors)
  }

  const returnTo = req.query.returnTo
  if (returnTo) return res.redirect(returnTo)

  // Ionising radiation only if clinical activities and/or treatment
  if (hasClinicalOrTreatmentActivities(data)) {
    return res.redirect('/project-scope/ionising-radiation')
  }

  // Otherwise skip ahead safely
  delete data['isIonising']
  delete data['isBioSample']
  return res.redirect('/project-scope/participant-consent')
})

// Ionising radiation -> Biological samples (only if clinical activities and/or treatment)
router.post('/project-scope/ionising-radiation', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['isIonising']) {
    addError(errors, 'isIonising', questions.isIonising.errorMessage)
  }

  if (errors.length) {
    return renderWithErrors(res, 'project-scope/ionising-radiation', errors)
  }

  const returnTo = req.query.returnTo
  if (returnTo) return res.redirect(returnTo)

  if (hasClinicalOrTreatmentActivities(data)) {
    return res.redirect('/project-scope/biological-samples')
  }

  delete data['isBioSample']
  return res.redirect('/project-scope/participant-consent')
})

// Biological samples -> Participant consent (only if clinical activities and/or treatment)
router.post('/project-scope/biological-samples', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['isBioSample']) {
    addError(errors, 'isBioSample', questions.isBioSample.errorMessage)
  }

  if (errors.length) {
    return renderWithErrors(res, 'project-scope/biological-samples', errors)
  }

  const returnTo = req.query.returnTo
  if (returnTo) return res.redirect(returnTo)

  return res.redirect('/project-scope/participant-consent')
})

// Consent -> (if some/none) Not obtained page, else branch to HMPPS/MOD
router.post('/project-scope/participant-consent', function (req, res) {
  const data = req.session.data
  const errors = []

  const participantConsent = data['participantConsent'] // expects: all | none | some | already

  if (!participantConsent) {
    addError(errors, 'participantConsent', questions.participantConsent.errorMessage)
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

  const returnTo = req.query.returnTo
  if (returnTo) return res.redirect(returnTo)

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

  if (noConsent.length === 0) {
    addError(errors, 'noConsent', questions.noConsent.errorMessage)
  }

  if (involvesAdults && !data['isCapable']) {
    addError(errors, 'isCapable', questions.isCapable.errorMessage)
  }

  if (errors.length) {
    return renderWithErrors(res, 'project-scope/participant-consent-not-obtained', errors)
  }

  if (!involvesAdults) {
    delete data['isCapable']
  }

  const participantGroups = asArray(data['participantGroups'])
  const PATIENTS = 'nhs_patients_service_users'

  if (participantGroups.includes(PATIENTS)) {
    return res.redirect('/project-scope/hmpps')
  }

  const returnTo = req.query.returnTo
  if (returnTo) return res.redirect(returnTo)

  return res.redirect('/project-scope/mod')
})

// HMPPS -> MOD
router.post('/project-scope/hmpps', function (req, res) {
  const data = req.session.data
  const errors = []

  const isHMPPS = data['isHMPPS'] // yes/no
  const hmppsNations = asArray(data['hmppsNations'])

  if (!isHMPPS) {
    addError(errors, 'isHMPPS', questions.isHMPPS.errorMessage)
  }

  if (isHMPPS === 'yes' && hmppsNations.length === 0) {
    addError(errors, 'hmppsNations', questions.hmppsNations.errorMessage)
  }

  if (errors.length) {
    return renderWithErrors(res, 'project-scope/hmpps', errors)
  }

  if (isHMPPS === 'no') {
    clear(data, ['hmppsNations'])
  }

  const returnTo = req.query.returnTo
  if (returnTo) return res.redirect(returnTo)

  return res.redirect('/project-scope/mod')
})

// MOD -> HFEA
router.post('/project-scope/mod', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['isMOD']) {
    addError(errors, 'isMOD', questions.isMOD.errorMessage)
  }

  if (errors.length) {
    return renderWithErrors(res, 'project-scope/mod', errors)
  }

  const returnTo = req.query.returnTo
  if (returnTo) return res.redirect(returnTo)

  return res.redirect('/project-scope/hfea')
})

// HFEA -> Check answers
router.post('/project-scope/hfea', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['isHFEA']) {
    addError(errors, 'isHFEA', questions.isHFEA.errorMessage)
  }

  if (errors.length) {
    return renderWithErrors(res, 'project-scope/hfea', errors)
  }

  return res.redirect('/project-scope/check')
})

const { buildApprovalsPathway } = require('../helpers/approvals-pathway')

router.get('/project-scope/check', (req, res) => {
  req.session.data.approvalsPathway = buildApprovalsPathway(req.session.data)
  res.render('project-scope/check')
})

module.exports = router
