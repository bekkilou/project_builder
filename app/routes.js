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

// ===============================
// Project scope routing
// ===============================

router.post('/my-research/project-scope-participant-age', function (req, res) {

  const participantGroups = asArray(req.session.data['participantGroups'])
  const researchActivities = asArray(req.session.data['researchActivities'])
  const isCTIMP = req.session.data['isCTIMP']

  // Answer constants
  const DECEASED = 'People who are known to be deceased prior to their inclusion in the project'
  const NHSSTAFF = 'Staff working in NHS or HSC provided or commissioned services'
  const OTHERSTAFF = 'Staff working in other care settings'
  const TREATMENT = 'Treatment, such as medicines, devices, surgery, vaccines or therapies'

  // Flags
  const hasDeceased = participantGroups.includes(DECEASED)
  const deceasedOnly = hasDeceased && participantGroups.length === 1
  const deceasedPlusOthers = hasDeceased && participantGroups.length > 1

  const onlyStaff =
    participantGroups.length > 0 &&
    participantGroups.every(function (v) {
      return v === OTHERSTAFF || v === NHSSTAFF
    })

  const hasTreatment = researchActivities.includes(TREATMENT)

  // --- routing (order matters: most specific first) ---

  // 1) Deceased only -> ineligible
  if (deceasedOnly) {
    return res.redirect('/my-research/project-scope-hmpps')
  }

  // 2) Deceased + others -> (send to your special page, if you have one)
  if (deceasedPlusOthers) {
    return res.redirect('/my-research/project-scope-participant-age') // TODO: replace with your "deceased + others" page
  }

  // 3) Only staff selected -> skip patient/service-user questions
  if (onlyStaff) {
    return res.redirect('/my-research/project-scope-participant-consent')
  }

  // 4) Treatment selected and CTIMP not answered yet -> ask CTIMP
  if (hasTreatment && !isCTIMP) {
    return res.redirect('/my-research/project-scope-ctimp')
  }

  // 5) Default next step
  return res.redirect('/my-research/project-scope-participant-age') // TODO: replace with the real next page
})

/**
 * CTIMP follow-up routing
 * NOTE: This route should be the page the CTIMP-01 form POSTS to.
 * If the CTIMP-01 page posts to itself, keep this path as-is.
 */
router.post('/my-research/project-scope-ctimp-01', function (req, res) {
  const isCTIMP = req.session.data['isCTIMP']
  const ctimpCombined = req.session.data['CTIMPCombined']

  // If CTIMP is Yes and combined question not answered, stay on ctimp-01 (show validation or re-render ideally)
  if (isCTIMP === 'Yes' && !ctimpCombined) {
    return res.redirect('/my-research/project-scope-ctimp-01')
  }

  return res.redirect('/my-research/project-scope-participant-age') // TODO: replace with the real next page after CTIMP-01
})

router.post('/my-research/project-scope-additional', function (req, res) {
  const isCTIMP = req.session.data['isCTIMP']

  if (isCTIMP === 'Yes') {
    return res.redirect('/my-research/project-scope-additional')
  }

  return res.redirect('/my-research/project-scope-participant-consent')
})

router.post('/my-research/project-scope-participant-consent-01', function (req, res) {
  const participantConsent = req.session.data['participantConsent']
  const participantGroups = asArray(req.session.data['participantGroups'])
  const PATIENTS =
    'Patients or service users of NHS or HSC provided or commissioned services'

  if (participantConsent == "Consent will not be obtained from or on behalf of any participants")
  // or (participantConsent == "Consent will be obtained from or on behalf of participants in some situations")
   {
    return res.redirect('/my-research/project-scope-participant-consent-01')
  }
  else if (participantGroups.includes(PATIENTS)) {
    return res.redirect('/my-research/project-scope-hmpps')
  }
  else {
    return res.redirect('/my-research/project-scope-mod')
  }
})

router.post('/my-research/project-scope-hmpps', function (req, res) {
  const participantGroups = asArray(req.session.data['participantGroups'])

  const PATIENTS =
    'Patients or service users of NHS or HSC provided or commissioned services'

  // If they ARE patients/service users, go to the HMPPS route/page
  if (participantGroups.includes(PATIENTS)) {
    return res.redirect('/my-research/project-scope-hmpps')
  }

  return res.redirect('/my-research/project-scope-mod')
})
/*
router.post('/my-research/project-scope-participant-consent-02', function (req, res) {
  const PATIENTS =
    'Patients or service users of NHS or HSC provided or commissioned services'
  // If they ARE patients/service users, go to the HMPPS route/page
  if (participantGroups.includes(PATIENTS)) {
    return res.redirect('/my-research/project-scope-hmpps')
  }

  return res.redirect('/my-research/project-scope-mod')
})
*/
