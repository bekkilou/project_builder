const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

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
  // If all activities are data/sample-only (no direct participant contact)
  const a = asArray(data['researchActivities'])
  const dataOnlyActivities = new Set([
    'previously_collected_data',
    'previously_collected_biosamples'
  ])
  return a.length > 0 && a.every(act => dataOnlyActivities.has(act))
}

// ─── Page flow ───────────────────────────────────────────────────────────────
//
//  /project/participants/primary-condition         primaryCondition (always)
//  /project/participants/primary-problem           primaryProblem (always)
//  /project/participants/inclusion-criteria        principalInclusion (always)
//  /project/participants/exclusion-criteria        principalExclusion (always)
//  /project/participants/real-world-population     realWorldPop (always)
//  /project/participants/full-participation        fullyParticipate (always)
//  /project/participants/other-participants        otherParticipants (if other group selected in scoping)
//  /project/participants/recruitment-date          participantRecruitmentDate (always)
//  /project/participants/how-long-involved         howLongInvolved (if not data-only)
//  /project/participants/current-research          currentResearchParticipant (if clinical/treatment)
//  /project/participants/vulnerable-participants   consideredVulnerable (if non-clinical)
//  /project/participants/imposter-participants     imposterParticipant (always)

// ─── Routes ──────────────────────────────────────────────────────────────────

router.post('/project/participants/primary-condition', function (req, res) {
  const data = req.session.data
  const errors = []

  if (asArray(data['primaryCondition']).length === 0) {
    addError(errors, 'primaryCondition', 'Select at least one primary condition or problem being studied')
  }

  if (errors.length) return renderWithErrors(res, 'project/participants/primary-condition', errors)

  return res.redirect('/project/participants/primary-problem')
})

router.post('/project/participants/primary-problem', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['primaryProblem'] || !data['primaryProblem'].trim()) {
    addError(errors, 'primaryProblem', 'Enter the primary condition or problem being studied')
  }

  if (errors.length) return renderWithErrors(res, 'project/participants/primary-problem', errors)

  return res.redirect('/project/participants/inclusion-criteria')
})

router.post('/project/participants/inclusion-criteria', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['principalInclusion'] || !data['principalInclusion'].trim()) {
    addError(errors, 'principalInclusion', 'Enter the principal inclusion criteria')
  }

  if (errors.length) return renderWithErrors(res, 'project/participants/inclusion-criteria', errors)

  return res.redirect('/project/participants/exclusion-criteria')
})

router.post('/project/participants/exclusion-criteria', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['principalExclusion'] || !data['principalExclusion'].trim()) {
    addError(errors, 'principalExclusion', 'Enter the principal exclusion criteria')
  }

  if (errors.length) return renderWithErrors(res, 'project/participants/exclusion-criteria', errors)

  return res.redirect('/project/participants/real-world-population')
})

router.post('/project/participants/real-world-population', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['realWorldPop'] || !data['realWorldPop'].trim()) {
    addError(errors, 'realWorldPop', 'Enter how you are ensuring your study sample reflects the real-world population')
  }

  if (errors.length) return renderWithErrors(res, 'project/participants/real-world-population', errors)

  return res.redirect('/project/participants/full-participation')
})

router.post('/project/participants/full-participation', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['fullyParticipate'] || !data['fullyParticipate'].trim()) {
    addError(errors, 'fullyParticipate', 'Enter how you will ensure participants are able to participate fully')
  }

  if (errors.length) return renderWithErrors(res, 'project/participants/full-participation', errors)

  if (hasOtherParticipants(data)) {
    return res.redirect('/project/participants/other-participants')
  }

  clear(data, ['otherParticipants'])
  return res.redirect('/project/participants/recruitment-date')
})

router.post('/project/participants/other-participants', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['otherParticipants'] || !data['otherParticipants'].trim()) {
    addError(errors, 'otherParticipants', 'Enter details of the other groups participating in this project')
  }

  if (errors.length) return renderWithErrors(res, 'project/participants/other-participants', errors)

  return res.redirect('/project/participants/recruitment-date')
})

router.post('/project/participants/recruitment-date', function (req, res) {
  const data = req.session.data
  const errors = []

  const day = data['participantRecruitmentDate-day']
  const month = data['participantRecruitmentDate-month']
  const year = data['participantRecruitmentDate-year']

  if (!day || !month || !year) {
    addError(errors, 'participantRecruitmentDate', 'Enter the planned start date for recruiting participants')
  }

  if (errors.length) return renderWithErrors(res, 'project/participants/recruitment-date', errors)

  if (!isDataOnly(data)) {
    return res.redirect('/project/participants/how-long-involved')
  }

  clear(data, ['howLongInvolved'])
  return res.redirect('/project/participants/imposter-participants')
})

router.post('/project/participants/how-long-involved', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['howLongInvolved'] || !data['howLongInvolved'].trim()) {
    addError(errors, 'howLongInvolved', 'Enter how long you expect each participant to be in the project')
  }

  if (errors.length) return renderWithErrors(res, 'project/participants/how-long-involved', errors)

  if (isClinicalOrTreatment(data)) {
    return res.redirect('/project/participants/current-research')
  }

  clear(data, ['currentResearchParticipant'])

  if (isNonClinical(data)) {
    return res.redirect('/project/participants/vulnerable-participants')
  }

  clear(data, ['consideredVulnerable'])
  return res.redirect('/project/participants/imposter-participants')
})

router.post('/project/participants/current-research', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['currentResearchParticipant'] || !data['currentResearchParticipant'].trim()) {
    addError(errors, 'currentResearchParticipant', 'Enter the arrangements for participants currently involved in other research')
  }

  if (errors.length) return renderWithErrors(res, 'project/participants/current-research', errors)

  if (isNonClinical(data)) {
    return res.redirect('/project/participants/vulnerable-participants')
  }

  clear(data, ['consideredVulnerable'])
  return res.redirect('/project/participants/imposter-participants')
})

router.post('/project/participants/vulnerable-participants', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['consideredVulnerable']) {
    addError(errors, 'consideredVulnerable', 'Select whether any potential participants could be considered vulnerable')
  }

  if (errors.length) return renderWithErrors(res, 'project/participants/vulnerable-participants', errors)

  return res.redirect('/project/participants/imposter-participants')
})

router.post('/project/participants/imposter-participants', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['imposterParticipant'] || !data['imposterParticipant'].trim()) {
    addError(errors, 'imposterParticipant', 'Enter the measures being taken to address the risk of fake or imposter participants')
  }

  if (errors.length) return renderWithErrors(res, 'project/participants/imposter-participants', errors)

  return res.redirect('/project/participants/check')
})

module.exports = router
