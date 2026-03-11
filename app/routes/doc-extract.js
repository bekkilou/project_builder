const path = require("path");
const multer = require("multer");
const mammoth = require("mammoth");
const cheerio = require("cheerio");

const upload = multer({
  dest: path.join(__dirname, "uploads"),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  fileFilter: (req, file, cb) => {
    const ok =
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.originalname.toLowerCase().endsWith(".docx");
    cb(ok ? null : new Error("Only .docx files are allowed"), ok);
  },
});

// ─── Text utilities ───────────────────────────────────────────────────────────

function normalise(s) {
  return (s || "").replace(/\s+/g, " ").trim();
}

function looksLikeHeading(text) {
  const t = normalise(text);
  if (!t) return false;
  const letters = t.replace(/[^A-Za-z]/g, "");
  if (!letters) return false;
  const upperRatio =
    letters.split("").filter((c) => c === c.toUpperCase()).length /
    letters.length;
  return upperRatio > 0.85 && t.length <= 80;
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Returns the first non-guidance paragraph of text after a given heading.
// Skips lines starting with "Aim:" as those are template guidance, not user content.
// Optionally collects multiple paragraphs up to the next heading (multiPara: true).
function getTextAfterHeading($, headingText, { multiPara = false } = {}) {
  const target = normalise(headingText).toLowerCase();
  const ps = $("p")
    .toArray()
    .map((el) => ({ text: normalise($(el).text()) }));

  const idx = ps.findIndex((p) => p.text.toLowerCase() === target);
  if (idx === -1) return "";

  const results = [];
  for (let i = idx + 1; i < ps.length; i++) {
    const t = ps[i].text;
    if (!t) continue;
    if (/^aim\s*:/i.test(t)) continue;
    if (looksLikeHeading(t)) break;
    // Skip obvious template guidance sentences
    if (/^(the protocol should|this section should|insert|example|guidance)/i.test(t)) continue;
    results.push(t);
    if (!multiPara) break;
  }
  return results.join("\n\n");
}

// Returns inline value after "Label: value" or the next paragraph after "Label" / "Label:"
function getValueAfterLabel($, label) {
  const target = label.toLowerCase();
  const ps = $("p")
    .toArray()
    .map((el) => ({ text: normalise($(el).text()) }));

  for (let i = 0; i < ps.length; i++) {
    const t = ps[i].text;
    if (!t) continue;

    const inlineMatch = t.match(
      new RegExp(`^${escapeRegExp(label)}\\s*:\\s*(.+)$`, "i")
    );
    if (inlineMatch) return normalise(inlineMatch[1]);

    if (t.toLowerCase() === target || t.toLowerCase() === `${target}:`) {
      for (let j = i + 1; j < ps.length; j++) {
        const next = ps[j].text;
        if (!next) continue;
        if (/^aim\s*:/i.test(next)) continue;
        if (looksLikeHeading(next)) return "";
        return next;
      }
    }
  }
  return "";
}

// Returns the value from the right-hand cell of a two-column table row
// whose left cell matches rowLabel
function getStudySummaryValue($, rowLabel) {
  const wanted = normalise(rowLabel).toLowerCase();
  for (const tbl of $("table").toArray()) {
    for (const r of $(tbl).find("tr").toArray()) {
      const cells = $(r).find("td,th").toArray();
      if (cells.length < 2) continue;
      const left = normalise($(cells[0]).text()).toLowerCase();
      const right = normalise($(cells[1]).text());
      if (left === wanted) return right;
    }
  }
  return "";
}

// Returns all non-empty right-hand cell values beneath a section heading in a table,
// stopping at the next section. Useful for multi-row free text sections.
function getTableSectionText($, sectionHeading) {
  const wanted = normalise(sectionHeading).toLowerCase();
  const results = [];
  let inSection = false;

  for (const tbl of $("table").toArray()) {
    for (const r of $(tbl).find("tr").toArray()) {
      const cells = $(r).find("td,th").toArray();
      if (cells.length === 0) continue;

      const left = normalise($(cells[0]).text()).toLowerCase();
      if (left === wanted) { inSection = true; continue; }
      if (inSection) {
        if (looksLikeHeading($(cells[0]).text())) break;
        const val = cells.length >= 2 ? normalise($(cells[1]).text()) : normalise($(cells[0]).text());
        if (val) results.push(val);
      }
    }
    if (inSection) break;
  }
  return results.join("\n\n");
}

// ─── Route ───────────────────────────────────────────────────────────────────

module.exports = function (router) {
  router.post(
    "/doc-upload/extract",
    upload.single("uploaded_doc"),
    async (req, res) => {
      try {
        if (!req.file) {
          req.session.data["docx-upload-error"] =
            "No file was uploaded. Please choose a .docx file.";
          return res.redirect("/doc-upload/experiment");
        }

        const { value: html } = await mammoth.convertToHtml({
          path: req.file.path,
        });
        const $ = cheerio.load(html);

        // ── Study summary table values ────────────────────────────────────
        const summaryStudyTitle   = getStudySummaryValue($, "Study Title");
        const summaryInternalRef  = getStudySummaryValue($, "Internal ref. no. (or short title)");
        const summaryDesign       = getStudySummaryValue($, "Study Design");
        const summaryParticipants = getStudySummaryValue($, "Study Participants");
        const summarySampleSize   = getStudySummaryValue($, "Planned Size of Sample (if applicable)");
        const summaryResearchQ    = getStudySummaryValue($, "Research Question/Aim(s)");

        // ── Title page ────────────────────────────────────────────────────
        const fullTitle      = getTextAfterHeading($, "FULL/LONG TITLE OF THE STUDY") || summaryStudyTitle;
        const shortTitle     = getTextAfterHeading($, "SHORT STUDY TITLE / ACRONYM")  || summaryInternalRef;
        const protocolRef    = getTextAfterHeading($, "PROTOCOL VERSION NUMBER AND DATE");
        const irasNumber     = getValueAfterLabel($, "IRAS Number");
        const sponsorNumber  = getValueAfterLabel($, "SPONSORS Number");
        const funderNumber   = getValueAfterLabel($, "FUNDERS Number");

        // ── Project information (project-information-questions.js) ────────
        // protocolRef → protocolRef
        // researchQuestion is the primary research question/aim

        // ── Research design (research-design-questions.js) ────────────────
        // Section 4: Research Question/Aim(s)
        const researchQuestion = getTextAfterHeading($, "4RESEARCH QUESTION/AIM(S)", { multiPara: true })
          || summaryResearchQ;

        // Section 5: Study design — maps to methodologiesDetails and willHappen
        const studyDesignDetails = getTextAfterHeading($, "5STUDY DESIGN and METHODS of DATA COLLECTION AND DATA ANALYIS", { multiPara: true })
          || summaryDesign;

        // Section 1: Background — useful context, maps to projectSummary
        const background = getTextAfterHeading($, "1BACKGROUND", { multiPara: true });

        // Section 2: Rationale — maps to methodologiesDetails (justification)
        const rationale = getTextAfterHeading($, "2RATIONALE", { multiPara: true });

        // ── Participants (participants-questions.js) ───────────────────────
        // Section 7.1.1: Inclusion criteria → principalInclusion
        const inclusionCriteria = getTextAfterHeading($, "7.1.1Inclusion criteria", { multiPara: true });

        // Section 7.1.2: Exclusion criteria → principalExclusion
        const exclusionCriteria = getTextAfterHeading($, "7.1.2Exclusion criteria", { multiPara: true });

        // Section 7.2.1: Size of sample → sampleSize (research-analysis)
        const sampleSize = getTextAfterHeading($, "7.2.1 Size of sample", { multiPara: true })
          || summarySampleSize;

        // Section 7.2.2: Sampling technique → methodAnalysis / sampleSize justification
        const samplingTechnique = getTextAfterHeading($, "7.2.2 Sampling technique", { multiPara: true });

        // Section 7.3: Recruitment → realWorldPop
        const recruitmentDetails = getTextAfterHeading($, "7.3 Recruitment", { multiPara: true });

        // ── Research activities (research-activities-questions.js) ────────
        // Section 6: Study setting → societyBenefits (closest match — where/why)
        const studySetting = getTextAfterHeading($, "6STUDY SETTING", { multiPara: true });

        // ── Research analysis (research-analysis-questions.js) ────────────
        // Data analysis methods sit within section 5 — extract the analysis subsection
        const analysisText = getTextAfterHeading($, "Data analysis methods", { multiPara: true });

        // ── Ethical issues (ethical-issues-questions.js) ──────────────────
        // Section 8: Ethical and regulatory considerations → ethicalIssues
        const ethicalConsiderations = getTextAfterHeading(
          $, "8ETHICAL AND REGULATORY CONSIDERATIONS", { multiPara: true }
        );

        // Section 8.1: Risk assessment → riskToTeam (risks-and-conflicts)
        const riskAssessment = getTextAfterHeading($, "8.1Assessment and management of risk", { multiPara: true });

        // ── Governance (governance-questions.js) ──────────────────────────
        // Section 8.7: Indemnity → insuranceIndemnity
        const indemnityText = getTextAfterHeading($, "8.7Indemnity", { multiPara: true });

        // Section 8.8: Access to final dataset → shareDeIdentifiedDetails (transparency)
        const datasetAccess = getTextAfterHeading($, "8.8Access to the final study dataset", { multiPara: true });

        // ── Public involvement (public-involvement-questions.js) ──────────
        // Section 8.4: Patient & Public Involvement → publicContributors / involvedContributors
        const ppiText = getTextAfterHeading($, "8.4 Patient & Public Involvement", { multiPara: true });

        // ── Transparency / Dissemination (transparency-questions.js) ──────
        // Section 9.1: Dissemination policy → DisseminateResults / participantResults
        const disseminationPolicy = getTextAfterHeading($, "9.1 Dissemination policy", { multiPara: true });

        // methodologies — look for method keywords in the design text
        const designText = (studyDesignDetails + ' ' + rationale).toLowerCase()
        if (/\binterview/i.test(designText))        d['methodologies'] = asArrayPush(d['methodologies'], 'interviews')
        if (/\bfocus.?group/i.test(designText))     d['methodologies'] = asArrayPush(d['methodologies'], 'focus_groups')
        if (/\bethnograph/i.test(designText))       d['methodologies'] = asArrayPush(d['methodologies'], 'ethnography')
        if (/\bsurvey|questionnaire/i.test(designText)) d['methodologies'] = asArrayPush(d['methodologies'], 'survey_questionnaire')

        // primaryAnalysis — qualitative vs quantitative
        if (/\bqualitative\b/i.test(designText))    d['primaryAnalysis'] = 'qualitative'
        else if (/\bquantitative\b/i.test(designText)) d['primaryAnalysis'] = 'quantitative'

        // useAI — very unlikely in this template but possible
        if (/\bartificial intelligence\b|\b\bai\b/i.test(designText)) d['useAI'] = ['using_existing_ai']

        // ── Write to session ──────────────────────────────────────────────

        const d = req.session.data;

        // Project information
        d["study-full-title"]   = fullTitle;
        d["study-short-title"]  = shortTitle;
        d["protocol-version"]   = protocolRef;
        d["iras-id"]            = irasNumber;
        d["sponsor-number"]     = sponsorNumber;
        d["funder-number"]      = funderNumber;
        d["protocolRef"]        = protocolRef;

        // Project summary (project-information)
        // Combine background + rationale as a summary
        d["projectSummary"] = [background, rationale].filter(Boolean).join("\n\n") || "";

        // Research design
        d["researchQuestion"]     = researchQuestion;
        d["methodologiesDetails"] = [studyDesignDetails, rationale].filter(Boolean).join("\n\n") || "";
        d["willHappen"]           = studyDesignDetails;

        // Research analysis
        d["methodAnalysis"]  = [analysisText, samplingTechnique].filter(Boolean).join("\n\n") || "";
        d["sampleSize"]      = sampleSize;
        d["reviewProcess"]   = samplingTechnique;

        // Participants
        d["principalInclusion"] = inclusionCriteria;
        d["principalExclusion"] = exclusionCriteria;
        d["realWorldPop"]       = recruitmentDetails;

        // Research activities
        d["societyBenefits"] = studySetting;

        // Ethical issues
        d["ethicalIssues"] = ethicalConsiderations;

        // Risks and conflicts
        d["riskToTeam"] = riskAssessment;

        // Governance
        d["insuranceIndemnity"]      = indemnityText;
        d["insuranceIndemnityCollab"] = indemnityText;

        // Public involvement
        // PPI text from the protocol describes involvement broadly —
        // pre-fill the free-text justification fields rather than checkboxes
        d["publicContributors"]   = ppiText;
        d["justifyContribution"]  = ppiText;

        // Transparency
        d["participantResults"]      = disseminationPolicy;
        d["shareDeIdentifiedDetails"] = datasetAccess;

        // Debug snapshot
        d["_protocol_extracted_html_snip"] = html.slice(0, 1500);

        return res.redirect("/doc-upload/doc-x");
      } catch (err) {
        console.error(err);
        req.session.data["docx-upload-error"] =
          "We couldn't read that document. Please upload a .docx created from the protocol template.";
        return res.redirect("/doc-upload/experiment");
      }
    }
  );
  router.get('/doc-upload/completion', (req, res) => {
    const data = req.session.data
    const fields = [
      'protocolRef', 'projectSummary',
      'methodologies', 'methodologiesDetails', 'researchQuestion', 'useAI', 'willHappen',
      'primaryCondition', 'primaryProblem', 'principalInclusion', 'principalExclusion',
      'realWorldPop', 'fullyParticipate', 'participantRecruitmentDate-day', 'imposterParticipant',
      'societyBenefits', 'finishDataCollection-day',
      'qualityAssessed', 'reviewProcess', 'primaryAnalysis', 'methodAnalysis', 'stopEarlyCriteria',
      'ethicalIssues', 'applicationPrevious',
      'riskToTeam', 'CIConflict', 'CIEthicsCommittee', 'personalPayment',
      'UKOrMultiNation', 'suppliesNotFunder', 'legalRisks', 'insuranceIndemnity',
      'insuranceIndemnityCollab', 'justifyExcluded', 'sponsorCompensation',
      'involvedContributors',
      'alreadyRegistered', 'publicationRequestDeferral', 'plannedEndDate-day',
      'DisseminateResults', 'participantResults', 'shareDeIdentified',
      'shareDeIdentifiedDetails', 'publicEmail', 'scientificEmail'
    ]
    const answeredCount = fields.filter(f =>
      Array.isArray(data[f]) ? data[f].length : (data[f] || '').trim()
    ).length
    res.render('doc-upload/completion', {
      answeredCount,
      totalCount: fields.length,
      remainingCount: fields.length - answeredCount
    })
  })
};
