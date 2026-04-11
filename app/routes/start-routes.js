// ============================================================
//  start-routes.js
//  app/routes/start-routes.js
//
//  Route handler for the project overview / start page.
//  Reads and clears any flash message set by section routes,
//  calculates section statuses, and renders the page.
//
//  Register in your main routes.js:
//    require('./routes/start-routes')(router)
// ============================================================

const { readAndClearFlash } = require('./helpers/flash')
const { getSectionStatuses } = require('./helpers/section-status')

module.exports = function (router) {

  router.get('/project/start', (req, res) => {
    const flash = readAndClearFlash(req)

    res.locals.sectionStatuses = getSectionStatuses(req.session.data)

    // Pass flash type and section name separately so the
    // template can use them without object dot notation issues
    res.locals.flash           = flash.type
    res.locals.completedSection = flash.section

    res.render('project/start')
  })

}
