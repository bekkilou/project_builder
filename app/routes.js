//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here
// Route through CTIMP & Participants
/*
router.post('/my-research/project-scope-participant-age', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var researchActivities = req.session.data['researchActivities'];
  var participantGroups = req.session.data['participantGroups'];
  var isCTIMP = req.session.data['isCTIMP']

  // Check whether the variable matches a condition
  if (
  researchActivities == "Treatment, such as medicines, devices, surgery, vaccines or therapies" &&
  !isCTIMP
  ) {
    // Send user to CTIMP
    res.redirect('/my-research/project-scope-ctimp')
  } if (participantGroups == "People who are known to be deceased prior to their inclusion in the project"){
    // Send user to ineligible page
    res.redirect('/my-research/project-scope-hmpps')
  } else {
    res.redirect('/my-research/project-scope-participant-age')
  }

})

*/
router.post('/my-research/project-scope-participant-age', function (req, res) {

  const researchActivities = req.session.data['researchActivities']
  const isCTIMP = req.session.data['isCTIMP']

  const participantGroupsRaw = req.session.data['participantGroups']

  // Normalise checkbox answers into an array
  const participantGroups = Array.isArray(participantGroupsRaw)
    ? participantGroupsRaw
    : (participantGroupsRaw ? [participantGroupsRaw] : [])

  const DECEASED = "People who are known to be deceased prior to their inclusion in the project"

  const hasDeceased = participantGroups.includes(DECEASED)
  const deceasedOnly = hasDeceased && participantGroups.length === 1
  const deceasedPlusOthers = hasDeceased && participantGroups.length > 1

  // --- routing ---
  // Deceased is the only selection
  if (deceasedOnly) {
    return res.redirect('/my-research/project-scope-hmpps')
  }
  // Deceased + any other selection
  if (deceasedPlusOthers) {
    return res.redirect('/my-research/project-scope-participant-age') // <-- change this
  }
  // Your existing CTIMP rule (leave as-is, but make sure isCTIMP is defined)
  if (
    researchActivities == "Treatment, such as medicines, devices, surgery, vaccines or therapies" &&
    !isCTIMP
  ) {
    return res.redirect('/my-research/project-scope-ctimp')
  }
  // Default / next step (avoid looping back to the same page)
  return res.redirect('/my-research/project-scope-participant-age') // <-- change this
});

router.post('/my-research/project-scope-hmpps', function (req, res) {
  const participants = req.session.data['participantGroups']
  if (participants == "Patients or service users of NHS or HSC provided or commissioned services") {
    res.redirect('/my-research/project-scope-hmpps')
  }
  else {
    res.redirect('/my-research/project-scope-mod')
  }
});
