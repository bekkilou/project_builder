// ============================================================
//  start-routes.js
//  app/routes/start-routes.js
//
//  Route handler for the project overview / start page.
//  Assembles all data needed for the two progress panels
//  and section status cards, then renders the page.
//
//  Register in your main routes.js:
//    require('./routes/start-routes')(router)
// ============================================================

const { readAndClearFlash }    = require('./helpers/flash')
const { getSectionStatuses }   = require('./helpers/section-status')
const { getPathwayProgress,
        getSubmissionReadiness } = require('./helpers/pathway-progress')
const { buildApprovalsPathway } = require('../helpers/approvals-pathway')

module.exports = function (router) {

  function handleStart (req, res, template) {
    const data  = req.session.data
    const flash = readAndClearFlash(req)

    const sectionStatuses = getSectionStatuses(data)
    const pathway         = buildApprovalsPathway(data)

    res.locals.sectionStatuses  = sectionStatuses
    res.locals.pathwayProgress  = getPathwayProgress(data, pathway.flags)
    res.locals.submissionReady  = getSubmissionReadiness(data, sectionStatuses)
    res.locals.flash            = flash.type
    res.locals.completedSection = flash.section

    res.render(template)
  }

  router.get('/project/start', (req, res) => {
    handleStart(req, res, 'project/start')
  })

  router.get('/project/start01', (req, res) => {
  console.log('start01 hit, flash data:', req.session.data._flash, req.session.data._flashSection)
  handleStart(req, res, 'project/start01')
})

}
