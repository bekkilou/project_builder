const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const questions = require('./data/scoping-questions')
router.use((req, res, next) => {
  res.locals.questions = questions
  next()
})

router.use(require('./routes/my-research'))
router.use(require('./routes/project-scope'))
require('./routes/doc-extract')(router)


module.exports = router
