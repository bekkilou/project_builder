#!/usr/bin/env node
// ============================================================
//  generate-question-pages.js
//
//  Generates individual Nunjucks question page templates
//  from your section questions JS config files.
//
//  Run from the root of your prototype:
//    node generate-question-pages.js
//
//  Output: one .html file per question, written to
//    app/views/project/<sectionSlug>/<questionKey>.html
//
//  Files are NOT overwritten if they already exist, so it is
//  safe to re-run after adding new questions to a JS file.
//
//  Page titles use q.id if present (e.g. "IQA0045"),
//  falling back to the question label.
// ============================================================

const fs   = require('fs')
const path = require('path')

// ── Section config ───────────────────────────────────────────
// Each entry defines:
//   file        – path to the questions JS file (from project root)
//   sectionSlug – URL segment and output subfolder name
//   label       – human-readable section name (used in page title)

const sections = [
  { file: 'app/data/scoping-questions.js',                            sectionSlug: 'scoping',                           label: 'Scoping' },
  { file: 'app/data/project-information-questions.js',                sectionSlug: 'project-information',               label: 'Project information' },
  { file: 'app/data/participants-questions.js',                       sectionSlug: 'participants',                      label: 'Participants' },
  { file: 'app/data/public-involvement-questions.js',                 sectionSlug: 'public-involvement',                label: 'Public involvement' },
  { file: 'app/data/research-design-questions.js',                    sectionSlug: 'research-design',                   label: 'Research design and methodology' },
  { file: 'app/data/research-activities-questions.js',                sectionSlug: 'research-activities',               label: 'Research activities' },
  { file: 'app/data/consent-questions.js',                            sectionSlug: 'consent',                           label: 'Consent' },
  { file: 'app/data/risks-and-conflicts-questions.js',                sectionSlug: 'risks-and-conflicts',               label: 'Risks and conflicts of interest' },
  { file: 'app/data/ethical-issues-questions.js',                     sectionSlug: 'ethical-issues',                    label: 'Summary of ethical issues' },
  { file: 'app/data/research-analysis-questions.js',                  sectionSlug: 'research-analysis',                 label: 'Research analysis' },
  { file: 'app/data/governance-questions.js',                         sectionSlug: 'governance',                        label: 'Governance and management' },
  { file: 'app/data/transparency-questions.js',                       sectionSlug: 'transparency',                      label: 'Transparency' },
  { file: 'app/data/confidentiality-questions.js',                    sectionSlug: 'confidentiality',                   label: 'Confidentiality and information governance' },
  { file: 'app/data/ionising/administration-substances-questions.js', sectionSlug: 'ionising/administration-substances', label: 'Administration of substances' },
  { file: 'app/data/ionising/booking-questions.js',                   sectionSlug: 'ionising/booking',                  label: 'Ionising radiation booking' },
  { file: 'app/data/ionising/cre-questions.js',                       sectionSlug: 'ionising/cre',                      label: 'CRE' },
  { file: 'app/data/ionising/external-beam-questions.js',             sectionSlug: 'ionising/external-beam',            label: 'External beam' },
  { file: 'app/data/ionising/mpe-dose-questions.js',                  sectionSlug: 'ionising/mpe-dose',                 label: 'MPE dose' },
  { file: 'app/data/ionising/non-ionising-imaging-questions.js',      sectionSlug: 'ionising/non-ionising',             label: 'Non-ionising imaging' },
  { file: 'app/data/ionising/radiology-imaging-questions.js',         sectionSlug: 'ionising/radiology',                label: 'Radiology imaging' },
  { file: 'app/data/ionising/rationale-procedure-questions.js',       sectionSlug: 'ionising/rationale',                label: 'Rationale and procedures' },
]

// ── Template ─────────────────────────────────────────────────

function pageTemplate (q, sectionSlug, sectionLabel) {
  // Page title: prefer the question ID if present, otherwise use label/legend
  const questionTitle = q.id
    ? `${q.id} – ${sectionLabel}`
    : `${q.legend || q.label || q.name} – ${sectionLabel}`

  const formAction = `/project/${sectionSlug}/${q.name}`

  return `{% extends "layouts/main.html" %}
{% from "_partials/_question.html" import renderQuestion %}

{% block pageTitle %}
  ${questionTitle} – {{ serviceName }} – GOV.UK Prototype Kit
{% endblock %}

{% block beforeContent %}
  {{ govukBackLink({
    text: "Back",
    href: "javascript:window.history.back()"
  }) }}
{% endblock %}

{% block content %}
  {% if errors and errors.length %}
    {{ govukErrorSummary({ titleText: "There is a problem", errorList: errors }) }}
  {% endif %}

  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">

      <form class="form" action="${formAction}" method="post">

        {{ renderQuestion(questions.${q.name}, data, errors, null, null, errorMap, questions) }}

        <div class="govuk-button-group">
          {{ govukButton({ text: "Save and continue" }) }}
          <button name="_action" value="save-for-later" class="govuk-button govuk-button--secondary">
            Save for later
          </button>
        </div>

      </form>
    </div>
  </div>
{% endblock %}
`
}

// ── Main ─────────────────────────────────────────────────────

let totalGenerated = 0
let totalSkipped   = 0
let totalErrors    = 0

for (const section of sections) {
  const questionsPath = path.resolve(section.file)

  if (!fs.existsSync(questionsPath)) {
    console.warn(`⚠  Skipping — file not found: ${section.file}`)
    totalErrors++
    continue
  }

  let questions
  try {
    questions = require(questionsPath)
  } catch (err) {
    console.error(`✗  Failed to load ${section.file}: ${err.message}`)
    totalErrors++
    continue
  }

  const outputDir = path.resolve(`app/views/project/${section.sectionSlug}`)
  fs.mkdirSync(outputDir, { recursive: true })

  for (const q of Object.values(questions)) {
    if (!q || typeof q !== 'object' || !q.name || !q.type) continue

    const outputPath = path.join(outputDir, `${q.name}.html`)

    if (fs.existsSync(outputPath)) {
      console.log(`–  Skipped (already exists): ${outputPath}`)
      totalSkipped++
      continue
    }

    const content = pageTemplate(q, section.sectionSlug, section.label)
    fs.writeFileSync(outputPath, content, 'utf8')
    console.log(`✓  Created: ${outputPath}`)
    totalGenerated++
  }
}

console.log(`\nDone. ${totalGenerated} created, ${totalSkipped} skipped, ${totalErrors} errors.`)
