//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here
// Run this code when a form is submitted to 'juggling-balls-answer'
router.post('/my-research/project-scope-03', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var isctimp = req.session.data['researchActivities']

  // Check whether the variable matches a condition
  if (isctimp == "Treatment, such as medicines, devices, surgery, vaccines or therapies"){
    // Send user to next page
    res.redirect('/my-research/project-scope-ctimp')
  } else {
    // Send user to ineligible page
    res.redirect('/my-research/project-scope-participants')
  }

})
