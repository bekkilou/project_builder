// ============================================================
//  flash.js
//  app/routes/helpers/flash.js
//
//  Lightweight flash message helper.
//  Sets a one-time message in session data that is read and
//  cleared by the next page load.
//
//  Usage — setting a flash in a route:
//
//    const { setFlash } = require('./helpers/flash')
//
//    // Save for later (in any section route):
//    setFlash(req, 'saved')
//    return res.redirect('/project/start')
//
//    // Section completed (in a check answers POST route):
//    setFlash(req, 'completed', 'Public involvement')
//    return res.redirect('/project/start')
//
//  The start page GET route reads and clears the flash
//  automatically — see the start-routes.js file.
// ============================================================

function setFlash (req, type, sectionName) {
  req.session.data._flash = type
  if (sectionName) {
    req.session.data._flashSection = sectionName
  }
}

function readAndClearFlash (req) {
  const flash = {
    type: req.session.data._flash || null,
    section: req.session.data._flashSection || null
  }
  delete req.session.data._flash
  delete req.session.data._flashSection
  return flash
}

module.exports = { setFlash, readAndClearFlash }


// ============================================================
//  How to wire up Save for later in a section route
//  ─────────────────────────────────────────────────────────
//  In each section's routes file, the Save for later button
//  submits the form with a hidden input:
//
//    <button name="_action" value="save-for-later" class="govuk-button govuk-button--secondary">
//      Save for later
//    </button>
//
//  Then in the POST route handler, check for it before
//  your normal validation:
//
//    const { setFlash } = require('./helpers/flash')
//
//    router.post('/project/public-involvement/involvement', (req, res) => {
//      const data = req.session.data
//
//      if (req.body._action === 'save-for-later') {
//        setFlash(req, 'saved')
//        return res.redirect('/project/start')
//      }
//
//      // ... normal validation continues below
//    })
//
//  ─────────────────────────────────────────────────────────
//  How to wire up section completion in a check answers route
//  ─────────────────────────────────────────────────────────
//  In the POST handler for your check answers page:
//
//    router.post('/project/public-involvement/check-complete', (req, res) => {
//      setFlash(req, 'completed', 'Public involvement')
//      return res.redirect('/project/start')
//    })
// ============================================================
