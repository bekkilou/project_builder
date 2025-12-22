//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here
// Route through CTIMP & Participants
router.post('/my-research/project-scope-participant-age', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var researchActivities = req.session.data['researchActivities'];
  var participantGroups = req.session.data['participantGroups'];
  var isCTIMP = req.session.data['isCTIMP']

  // Check whether the variable matches a condition
  if (
  researchActivities === "Treatment, such as medicines, devices, surgery, vaccines or therapies" &&
  !isCTIMP
) {
    // Send user to CTIMP
    res.redirect('/my-research/project-scope-ctimp')
  } else if (participantGroups == "People who are known to be deceased prior to their inclusion in the project"){
    // Send user to ineligible page
    res.redirect('/my-research/project-scope-hmpps')
  } else {
    res.redirect('/my-research/project-scope-participant-age')
  }

})
