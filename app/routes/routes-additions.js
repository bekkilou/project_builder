// ─── routes.js — add these lines alongside your existing router.use() calls ──
//
// Each section's routing is self-contained in its own file.
// Add these below your existing project-scope require.

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
