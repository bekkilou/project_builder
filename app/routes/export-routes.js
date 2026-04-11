// ============================================================
//  export-routes.js
//  app/routes/export-routes.js
//
//  Provides a CSV download of all questions, the participant's
//  responses from session data, and which approvals pathways
//  each question contributes towards.
//
//  Add this single line anywhere in your routes.js to register:
//    require('./routes/export-routes')(router)
//
//  Participant downloads their data by visiting (or clicking
//  a button that links to): /admin/export.csv
// ============================================================

// ── Helpers ─────────────────────────────────────────────────

// Safely escape a value for CSV:
// wrap in double quotes and escape any internal double quotes by doubling them
function csvCell (value) {
  if (value === null || value === undefined) return ''
  const str = Array.isArray(value) ? value.join('; ') : String(value)
  return '"' + str.replace(/"/g, '""') + '"'
}

function csvRow (cells) {
  return cells.map(csvCell).join(',')
}

// Resolve a human-readable label for a question.
// Questions use either `legend` (fieldset types) or `label` (input/textarea).
function questionLabel (q) {
  return q.legend || q.label || ''
}

// Resolve a human-readable response for a question.
// For checkboxes/radios, map stored values back to item text where possible.
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

  // For date inputs, reassemble day/month/year parts
  if (q.type === 'date') {
    const day   = sessionData[q.name + '-day']   || ''
    const month = sessionData[q.name + '-month'] || ''
    const year  = sessionData[q.name + '-year']  || ''
    if (!day && !month && !year) return ''
    return [day, month, year].filter(Boolean).join('/')
  }

  return Array.isArray(raw) ? raw.join('; ') : raw
}

// ── Route ───────────────────────────────────────────────────

module.exports = function (router) {

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
      // Skip non-question entries (e.g. any non-objects that crept into the spread)
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
