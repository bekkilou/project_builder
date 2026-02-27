const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const scopingQuestions = require('./data/scoping-questions')
const projInfoQuestions = require('./data/project-information-questions')
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

router.use((req, res, next) => {
  res.locals.questions = {
    ...scopingQuestions,
    ...projInfoQuestions,
    ...pubInvolveQuestions,
    ...resDesQuestions,
    ...resActQuestions,
    ...consQuestions,
    ...riskConfQuestions,
    ...ethQuestions,
    ...resAnaQuestions,
    ...governQuestions,
    ...transpQuestions,
    ...confiQuestions
    // ... spread all the rest
  }

  next()
})

router.use(require('./routes/my-research'))
router.use(require('./routes/project-scope'))
require('./routes/doc-extract')(router)


module.exports = router
