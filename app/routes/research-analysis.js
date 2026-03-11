const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const {
  asArray,
  clear,
  addError,
  renderWithErrors
} = require('./helpers/routing')

// ─── Helpers ────────────────────────────────────────────────────────────────

function isQuantitative (data) {
  return data['primaryAnalysis'] === 'quantitative'
}

function needsStatReview (data) {
  return !asArray(data['statAspects']).includes('no_review_necessary') &&
    asArray(data['statAspects']).length > 0
}

// ─── Page flow ───────────────────────────────────────────────────────────────
//
//  /project/research-analysis/quality-assessed         qualityAssessed (always)
//    → if other:   /quality-assessed-other
//    → else:       /review-process
//  /project/research-analysis/quality-assessed-other   qualityAssessedOther
//  /project/research-analysis/review-process           reviewProcess (always)
//  /project/research-analysis/primary-analysis         primaryAnalysis (always)
//    → quantitative: /stat-aspects
//    → qualitative:  /method-analysis (skip stat pages)
//  /project/research-analysis/method-analysis          methodAnalysis (always)
//  /project/research-analysis/stat-aspects             statAspects (if quantitative)
//    → if not no_review: /who-review-stat
//    → else:             /outcome-measure
//  /project/research-analysis/who-review-stat          whoReviewStat
//  /project/research-analysis/outcome-measure          outcomeMeasure (if quantitative)
//  /project/research-analysis/record-numbers           recordNumbers (if quantitative)
//  /project/research-analysis/sample-size              sampleSize (if quantitative)
//  /project/research-analysis/stop-early-criteria      stopEarlyCriteria (always)

// ─── Routes ──────────────────────────────────────────────────────────────────

router.post('/project/research-analysis/quality-assessed', function (req, res) {
  const data = req.session.data
  const errors = []

  if (asArray(data['qualityAssessed']).length === 0) {
    addError(errors, 'qualityAssessed', 'Select at least one option')
  }

  if (errors.length) return renderWithErrors(res, 'project/research-analysis/quality-assessed', errors)

  if (asArray(data['qualityAssessed']).includes('other')) {
    return res.redirect('/project/research-analysis/quality-assessed-other')
  }

  clear(data, ['qualityAssessedOther'])
  return res.redirect('/project/research-analysis/review-process')
})

router.post('/project/research-analysis/quality-assessed-other', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['qualityAssessedOther'] || !data['qualityAssessedOther'].trim()) {
    addError(errors, 'qualityAssessedOther', 'Enter details of how the quality of the research has been assessed')
  }

  if (errors.length) return renderWithErrors(res, 'project/research-analysis/quality-assessed-other', errors)

  return res.redirect('/project/research-analysis/review-process')
})

router.post('/project/research-analysis/review-process', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['reviewProcess'] || !data['reviewProcess'].trim()) {
    addError(errors, 'reviewProcess', 'Enter why this review process is appropriate and how any issues have been addressed')
  }

  if (errors.length) return renderWithErrors(res, 'project/research-analysis/review-process', errors)

  return res.redirect('/project/research-analysis/primary-analysis')
})

router.post('/project/research-analysis/primary-analysis', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['primaryAnalysis']) {
    addError(errors, 'primaryAnalysis', 'Select whether the primary form of analysis will be qualitative or quantitative')
  }

  if (errors.length) return renderWithErrors(res, 'project/research-analysis/primary-analysis', errors)

  // Cleanup: if not quantitative, clear all quantitative-specific answers
  if (!isQuantitative(data)) {
    clear(data, [
      'statAspects',
      'whoReviewStat',
      'outcomeMeasure',
      'recordNumbers',
      'sampleSize'
    ])
  }

  return res.redirect('/project/research-analysis/method-analysis')
})

router.post('/project/research-analysis/method-analysis', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['methodAnalysis'] || !data['methodAnalysis'].trim()) {
    addError(errors, 'methodAnalysis', 'Enter details of the methods for analysing the data')
  }

  if (errors.length) return renderWithErrors(res, 'project/research-analysis/method-analysis', errors)

  if (isQuantitative(data)) return res.redirect('/project/research-analysis/stat-aspects')

  return res.redirect('/project/research-analysis/stop-early-criteria')
})

router.post('/project/research-analysis/stat-aspects', function (req, res) {
  const data = req.session.data
  const errors = []

  if (asArray(data['statAspects']).length === 0) {
    addError(errors, 'statAspects', 'Select at least one option')
  }

  if (errors.length) return renderWithErrors(res, 'project/research-analysis/stat-aspects', errors)

  if (needsStatReview(data)) {
    return res.redirect('/project/research-analysis/who-review-stat')
  }

  clear(data, ['whoReviewStat'])
  return res.redirect('/project/research-analysis/outcome-measure')
})

router.post('/project/research-analysis/who-review-stat', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['whoReviewStat'] || !data['whoReviewStat'].trim()) {
    addError(errors, 'whoReviewStat', 'Enter details of who undertook the statistical review and how recommendations were addressed')
  }

  if (errors.length) return renderWithErrors(res, 'project/research-analysis/who-review-stat', errors)

  return res.redirect('/project/research-analysis/outcome-measure')
})

router.post('/project/research-analysis/outcome-measure', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['outcomeMeasure'] || !data['outcomeMeasure'].trim()) {
    addError(errors, 'outcomeMeasure', 'Enter the outcome measure or measures for this project')
  }

  if (errors.length) return renderWithErrors(res, 'project/research-analysis/outcome-measure', errors)

  return res.redirect('/project/research-analysis/record-numbers')
})

router.post('/project/research-analysis/record-numbers', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['recordNumbers'] || !data['recordNumbers'].trim()) {
    addError(errors, 'recordNumbers', 'Enter how many participants, samples, or data records you plan to study')
  }

  if (errors.length) return renderWithErrors(res, 'project/research-analysis/record-numbers', errors)

  return res.redirect('/project/research-analysis/sample-size')
})

router.post('/project/research-analysis/sample-size', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['sampleSize'] || !data['sampleSize'].trim()) {
    addError(errors, 'sampleSize', 'Enter how the sample size was decided upon')
  }

  if (errors.length) return renderWithErrors(res, 'project/research-analysis/sample-size', errors)

  return res.redirect('/project/research-analysis/stop-early-criteria')
})

router.post('/project/research-analysis/stop-early-criteria', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['stopEarlyCriteria'] || !data['stopEarlyCriteria'].trim()) {
    addError(errors, 'stopEarlyCriteria', 'Enter the criteria for electively stopping the project early')
  }

  if (errors.length) return renderWithErrors(res, 'project/research-analysis/stop-early-criteria', errors)

  return res.redirect('/project/research-analysis/check')
})

module.exports = router
