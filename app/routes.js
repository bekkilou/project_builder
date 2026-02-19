const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.use(require('./routes/my-research'))
router.use(require('./routes/project-scope'))
require('./routes/doc-extract')(router)

module.exports = router
