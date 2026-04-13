const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()
const fs   = require('fs')
const path = require('path')

const DATA_FILE = path.join(__dirname, '..', 'session-data.json')

// Load persisted data into session on every request
router.use((req, res, next) => {
  if (!req.session.data || Object.keys(req.session.data).length === 0) {
    if (fs.existsSync(DATA_FILE)) {
      try {
        req.session.data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'))
      } catch (e) {}
    }
  }
  next()
})

// Save session data to disk after every request
router.use((req, res, next) => {
  res.on('finish', () => {
    if (req.session && req.session.data) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(req.session.data, null, 2), 'utf8')
    }
  })
  next()
})


const scopingQuestions = require('./data/scoping-questions')
const projInfoQuestions = require('./data/project-information-questions')
const partiQuestions = require('./data/participants-questions')
const pubInvolveQuestions = require('./data/public-involvement-questions')
const resDesQuestions = require('./data/research-design-questions')
const resActQuestions = require('./data/research-activities-questions')
const consQuestions = require('./data/consent-questions')
const riskConfQuestions = require('./data/risks-and-conflicts-questions')
const ethQuestions = require('./data/ethical-issues-questions')
const resAnaQuestions = require('./data/research-analysis-questions')
const governQuestions = require('./data/governance-questions')
const transpQuestions = require('./data/transparency-questions')
const confiQuestions = require('./data/confidentiality-questions')
const adminSubQuestions = require('./data/ionising/administration-substances-questions.js')
const ioBookingQuestions = require('./data/ionising/booking-questions.js')
const creQuestions = require('./data/ionising/cre-questions.js')
const exBeamQuestions = require('./data/ionising/external-beam-questions.js')
const mpeDoseQuestions = require('./data/ionising/mpe-dose-questions.js')
const nonIoQuestions = require('./data/ionising/non-ionising-imaging-questions.js')
const ioPartQuestions = require('./data/ionising/administration-substances-questions.js')
const radImagQuestions = require('./data/ionising/radiology-imaging-questions.js')
const ratProcQuestions = require('./data/ionising/rationale-procedure-questions.js')

router.use((req, res, next) => {
  res.locals.questions = {
    ...scopingQuestions,
    ...projInfoQuestions,
    ...partiQuestions,
    ...pubInvolveQuestions,
    ...resDesQuestions,
    ...resActQuestions,
    ...consQuestions,
    ...riskConfQuestions,
    ...ethQuestions,
    ...resAnaQuestions,
    ...governQuestions,
    ...transpQuestions,
    ...confiQuestions,
    ...adminSubQuestions,
    ...ioBookingQuestions,
    ...creQuestions,
    ...exBeamQuestions,
    ...mpeDoseQuestions,
    ...nonIoQuestions,
    ...ioPartQuestions,
    ...radImagQuestions,
    ...ratProcQuestions
    // ... spread all the rest
  }

  next()
})

router.use(require('./routes/my-research'))
router.use(require('./routes/project-scope'))
router.use(require('./routes/confidentiality'))
router.use(require('./routes/ethical-issues'))
router.use(require('./routes/governance'))
router.use(require('./routes/participants'))
router.use(require('./routes/public-involvement'))
router.use(require('./routes/research-activities'))
router.use(require('./routes/research-analysis'))
router.use(require('./routes/research-design'))
router.use(require('./routes/risks-and-conflicts'))
router.use(require('./routes/transparency'))
require('./routes/doc-extract')(router)

require('./routes/export-routes')(router)

const { getSectionStatuses } = require('./routes/helpers/section-status')

router.get('/project/start01', (req, res) => {
  res.locals.sectionStatuses = getSectionStatuses(req.session.data)
  res.render('project/start01')
})
require('./routes/start-routes')(router)

module.exports = router
