// ============================================================
//  export-routes.js
//  app/routes/export-routes.js
//
//  Provides per-section CSV downloads of application data.
//
//  Add this single line anywhere in your routes.js to register:
//    require('./routes/export-routes')(router)
//
//  Each section's check answers page links to:
//    /admin/export/:section.csv
//  e.g. /admin/export/transparency.csv
//
//  The original all-in-one export is still available at:
//    /admin/export.csv
// ============================================================

const path = require('path')

// ── Section registry ─────────────────────────────────────────
// Maps URL slug to questions filename (without -questions.js).
// Slug must match the filename in app/data/.

const SECTIONS = [
  'project-information',
  'research-design',
  'research-activities',
  'participants',
  'consent',
  'confidentiality',
  'public-involvement',
  'risks-and-conflicts',
  'ethical-issues',
  'research-analysis',
  'governance',
  'transparency',
]

// ── Helpers ─────────────────────────────────────────────────

function csvCell (value) {
  if (value === null || value === undefined) return ''
  const str = Array.isArray(value) ? value.join('; ') : String(value)
  return '"' + str.replace(/"/g, '""') + '"'
}

function csvRow (cells) {
  return cells.map(csvCell).join(',')
}

function questionLabel (q) {
  return q.legend || q.label || ''
}

function resolveResponse (q, sessionData) {
  const raw = sessionData[q.name]

  if (raw === undefined || raw === null || raw === '') return ''

  const itemTypes = ['checkboxes', 'radios', 'radios-conditional']
  if (itemTypes.includes(q.type) && q.items) {
    const values = Array.isArray(raw) ? raw : [raw]
    const labels = values.map(v => {
      const match = q.items.find(item => item.value === v)
      return match ? match.text : v
    })
    return labels.join('; ')
  }

  if (q.type === 'date') {
    const day   = sessionData[q.name + '-day']   || ''
    const month = sessionData[q.name + '-month'] || ''
    const year  = sessionData[q.name + '-year']  || ''
    if (!day && !month && !year) return ''
    return [day, month, year].filter(Boolean).join('/')
  }

  return Array.isArray(raw) ? raw.join('; ') : raw
}

function buildCsv (questions, sessionData) {
  const headers = [
    'Question ID',
    'Question',
    'Response',
    'Proportionate review',
    'REC booking',
    'REC dataset',
    'Study wide dataset'
  ]

  const rows = [headers]

  for (const q of Object.values(questions)) {
    if (!q || typeof q !== 'object' || !q.name || !q.type) continue

    rows.push([
      q.id || '',
      questionLabel(q),
      resolveResponse(q, sessionData),
      q.proportionateReview ? 'Yes' : '',
      q.recBooking          ? 'Yes' : '',
      q.recDataset          ? 'Yes' : '',
      q.studyWideDataset    ? 'Yes' : ''
    ])
  }

  return rows.map(csvRow).join('\r\n')
}

// ── Routes ───────────────────────────────────────────────────

module.exports = function (router) {

  // Per-section CSV — linked from each check answers page
  // e.g. /admin/export/transparency.csv
  router.get('/admin/export/:section.csv', (req, res) => {
    const slug = req.params.section

    if (!SECTIONS.includes(slug)) {
      return res.status(404).send('Section not found')
    }

    let questions
    try {
      questions = require(path.join(process.cwd(), 'app', 'data', slug + '-questions.js'))
    } catch (e) {
      return res.status(500).send('Could not load questions for section: ' + slug)
    }

    const sessionData = req.session.data || {}
    const csv = buildCsv(questions, sessionData)

    res.setHeader('Content-Type', 'text/csv; charset=utf-8')
    res.setHeader('Content-Disposition', 'attachment; filename="iras-' + slug + '.csv"')
    res.send(csv)
  })

  // Original all-in-one export — kept for backwards compatibility
  router.get('/admin/export.csv', (req, res) => {
    const sessionData = req.session.data || {}
    const questions   = res.locals.questions || {}

    const headers = [
      'Question',
      'Response',
      'Proportionate review',
      'REC booking',
      'REC dataset',
      'Study wide dataset'
    ]

    const rows = [headers]

    for (const q of Object.values(questions)) {
      if (!q || typeof q !== 'object' || !q.name || !q.type) continue

      rows.push([
        questionLabel(q),
        resolveResponse(q, sessionData),
        q.proportionateReview ? 'Yes' : '',
        q.recBooking          ? 'Yes' : '',
        q.recDataset          ? 'Yes' : '',
        q.studyWideDataset    ? 'Yes' : ''
      ])
    }

    const csv = rows.map(csvRow).join('\r\n')

    res.setHeader('Content-Type', 'text/csv; charset=utf-8')
    res.setHeader('Content-Disposition', 'attachment; filename="iras-application-data.csv"')
    res.send(csv)
  })

}
