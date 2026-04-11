// ============================================================
//  section-status.js
//  app/routes/helpers/section-status.js
//
//  Calculates the completion status of each section for the
//  project overview page. Because cleared fields are absent
//  from session data, we only need to check which fields
//  are relevant given current answers — cleared fields are
//  never "unanswered", they simply don't exist.
//
//  Usage in your start page route:
//
//    const { getSectionStatuses } = require('./helpers/section-status')
//
//    router.get('/project/start', (req, res) => {
//      res.locals.sectionStatuses = getSectionStatuses(req.session.data)
//      res.render('project/start')
//    })
//
//  Usage in the template:
//
//    {% set status = sectionStatuses.publicInvolvement %}
//    <strong class="govuk-tag govuk-tag--{{ status.colour }}">{{ status.label }}</strong>
//
//  Status values:
//    { label: "Not started", colour: "grey"  }
//    { label: "In progress", colour: "blue"  }
//    { label: "Completed",   colour: "green" }
// ============================================================

const { asArray } = require('./routing')

// ── Status resolver ──────────────────────────────────────────

// Given a list of field names that are relevant for this
// participant's path, return a status object.
function statusFromFields (fields, data) {
  if (!fields.length) return tag('not-started')

  const answered = fields.filter(name => {
    const val = data[name]
    if (val === undefined || val === null) return false
    if (typeof val === 'string') return val.trim().length > 0
    if (Array.isArray(val)) return val.length > 0
    return false
  })

  if (answered.length === 0)           return tag('not-started')
  if (answered.length < fields.length) return tag('in-progress')
  return tag('completed')
}

function tag (status) {
  const map = {
    'not-started': { label: 'Not started', colour: 'grey'  },
    'in-progress':  { label: 'In progress', colour: 'blue'  },
    'completed':    { label: 'Completed',   colour: 'green' }
  }
  return map[status]
}

// ── Section relevance functions ──────────────────────────────
// Each function returns the list of field names that are
// relevant for this participant given their current answers.
// This mirrors the conditional logic in each routes file.

function publicInvolvementFields (data) {
  const involved = !asArray(data['involvedContributors']).includes('not_involved')
  const hasInvolved = asArray(data['involvedContributors']).length > 0

  const fields = ['involvedContributors']

  if (!hasInvolved) return fields  // Not yet answered the first question

  if (!involved) {
    // Not involved path
    fields.push('patientInsights')
  } else {
    // Involved path
    fields.push('identifyContributors')
    if (asArray(data['identifyContributors']).includes('other')) {
      fields.push('identifyContributorsOther')
    }
    fields.push('publicContributors', 'contributorDetails', 'importantContribution')
  }

  fields.push('futureContribution')

  const future = asArray(data['futureContribution'])
  if (future.length > 0) {
    if (future.includes('other')) fields.push('futureContributionOther')
    if (future.includes('no_contribution')) {
      fields.push('justifyNoContribution')
    } else {
      fields.push('justifyContribution')
    }
  }

  return fields
}

// Add a function per section below, following the same pattern.
// Mirror the conditional logic from that section's routes file.

function scopingFields (data) {
  // TODO: add conditional logic from scoping-routes.js
  // Return the always-shown fields for now as a starting point
  return ['scopingField1']  // replace with real field names
}

function projectInformationFields (data) {
  // TODO: mirror conditional logic from project-information routes
  return []
}

function participantsFields (data) {
  // TODO: mirror conditional logic from participants routes
  return []
}

function researchDesignFields (data) {
  return []
}

function researchActivitiesFields (data) {
  return []
}

function consentFields (data) {
  return []
}

function risksAndConflictsFields (data) {
  return []
}

function ethicalIssuesFields (data) {
  return []
}

function researchAnalysisFields (data) {
  return []
}

function governanceFields (data) {
  return []
}

function transparencyFields (data) {
  return []
}

function confidentialityFields (data) {
  return []
}

// ── Main export ──────────────────────────────────────────────

function getSectionStatuses (data) {
  return {
    publicInvolvement:  statusFromFields(publicInvolvementFields(data),  data),
    scoping:            statusFromFields(scopingFields(data),             data),
    projectInformation: statusFromFields(projectInformationFields(data),  data),
    participants:       statusFromFields(participantsFields(data),        data),
    researchDesign:     statusFromFields(researchDesignFields(data),      data),
    researchActivities: statusFromFields(researchActivitiesFields(data),  data),
    consent:            statusFromFields(consentFields(data),             data),
    risksAndConflicts:  statusFromFields(risksAndConflictsFields(data),   data),
    ethicalIssues:      statusFromFields(ethicalIssuesFields(data),       data),
    researchAnalysis:   statusFromFields(researchAnalysisFields(data),    data),
    governance:         statusFromFields(governanceFields(data),          data),
    transparency:       statusFromFields(transparencyFields(data),        data),
    confidentiality:    statusFromFields(confidentialityFields(data),     data)
  }
}

module.exports = { getSectionStatuses }
