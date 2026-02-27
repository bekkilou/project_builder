const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// ===============================
// My Research routing
// ===============================

router.get('/my-research/create-project-check', function (req, res) {
  res.render('my-research/create-project-check')
})

// Handle submission from check answers page
router.post('/my-research/create-project-check', function (req, res) {
  if (!req.session.data.projectReference) {
    const now = new Date()

    req.session.data.submissionDate =
      String(now.getDate()).padStart(2, '0') + ' ' +
      now.toLocaleString('en-GB', { month: 'long' }) + ' ' +
      now.getFullYear()

  }

  res.redirect('/my-research-w-record')
})

module.exports = router
