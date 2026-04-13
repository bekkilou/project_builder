const session = require('express-session')
const FileStore = require('session-file-store')(session)

module.exports = {
  sessionStore: new FileStore({
    path: './sessions',
    ttl: 86400 * 30,
    reapInterval: 86400
  })
}
