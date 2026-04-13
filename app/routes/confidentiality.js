const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()
const { setFlash } = require('./helpers/flash')
const {
  addError,
  renderWithErrors
} = require('./helpers/routing')

// ─── Page flow ───────────────────────────────────────────────────────────────
//
//  /project/confidentiality/data-only    isDataOnly (always)

// ─── Routes ──────────────────────────────────────────────────────────────────

router.post('/project/confidentiality/data-only', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['isDataOnly']) {
    addError(errors, 'isDataOnly', 'Select whether this study is limited to working with data only')
  }

  if (errors.length) return renderWithErrors(res, 'project/confidentiality/data-only', errors)

  return res.redirect('/project/confidentiality/check')
})
// app/routes/confidentiality.js
router.post('/project/confidentiality/check-complete', (req, res) => {
  req.session.data['completed-confidentiality'] = 'true'
  setFlash(req, 'completed', 'Confidentiality')
  res.redirect('/project/start01')
})

module.exports = router
