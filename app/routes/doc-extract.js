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

// Utilities
function normalise(s) {
  return (s || "").replace(/\s+/g, " ").trim();
}

function looksLikeHeading(text) {
  const t = normalise(text);
  if (!t) return false;
  const letters = t.replace(/[^A-Za-z]/g, "");
  if (!letters) return false;
  const upperRatio =
    letters.split("").filter((c) => c === c.toUpperCase()).length / letters.length;
  return upperRatio > 0.85 && t.length <= 80;
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getTextAfterHeading($, headingText) {
  const target = normalise(headingText).toLowerCase();
  const ps = $("p")
    .toArray()
    .map((el) => ({ text: normalise($(el).text()) }));

  const idx = ps.findIndex((p) => p.text.toLowerCase() === target);
  if (idx === -1) return "";

  for (let i = idx + 1; i < ps.length; i++) {
    const t = ps[i].text;
    if (!t) continue;
    if (/^aim\s*:/i.test(t)) continue;
    if (looksLikeHeading(t)) break;
    return t;
  }
  return "";
}

function getValueAfterLabel($, label) {
  const target = label.toLowerCase();

  const ps = $("p")
    .toArray()
    .map((el) => ({ text: normalise($(el).text()) }));

  for (let i = 0; i < ps.length; i++) {
    const t = ps[i].text;
    if (!t) continue;

    const inlineMatch = t.match(new RegExp(`^${escapeRegExp(label)}\\s*:\\s*(.+)$`, "i"));
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

function getStudySummaryValue($, rowLabel) {
  const wanted = normalise(rowLabel).toLowerCase();

  const tables = $("table").toArray();
  for (const tbl of tables) {
    const rows = $(tbl).find("tr").toArray();
    for (const r of rows) {
      const cells = $(r).find("td,th").toArray();
      if (cells.length < 2) continue;

      const left = normalise($(cells[0]).text()).toLowerCase();
      const right = normalise($(cells[1]).text());
      if (left === wanted) return right;
    }
  }
  return "";
}

module.exports = function (router) {
  // ✅ IMPORTANT: apply multer here so req.file exists
  router.post(
    "/doc-upload/extract",
    upload.single("uploaded_doc"),
    async (req, res) => {
      try {
        // Safety check: if no file came through, fail gracefully
        if (!req.file) {
          req.session.data["docx-upload-error"] =
            "No file was uploaded. Please choose a .docx file.";
          return res.redirect("/doc-upload/experiment");
        }

        const { value: html } = await mammoth.convertToHtml({ path: req.file.path });
        const $ = cheerio.load(html);

        const fullTitle = getTextAfterHeading($, "FULL/LONG TITLE OF THE STUDY");
        const shortTitle = getTextAfterHeading($, "SHORT STUDY TITLE / ACRONYM");
        const protocolVersion = getTextAfterHeading($, "PROTOCOL VERSION NUMBER AND DATE");

        const irasNumber = getValueAfterLabel($, "IRAS Number");
        const sponsorNumber = getValueAfterLabel($, "SPONSORS Number");
        const funderNumber = getValueAfterLabel($, "FUNDERS Number");

        const summaryStudyTitle = getStudySummaryValue($, "Study Title");
        const summaryInternalRef = getStudySummaryValue($, "Internal ref. no. (or short title)");
        const summaryDesign = getStudySummaryValue($, "Study Design");
        const summaryParticipants = getStudySummaryValue($, "Study Participants");

        req.session.data["study-full-title"] = fullTitle || summaryStudyTitle || "";
        req.session.data["study-short-title"] = shortTitle || summaryInternalRef || "";
        req.session.data["protocol-version"] = protocolVersion || "";

        req.session.data["iras-id"] = irasNumber || "";
        req.session.data["sponsor-number"] = sponsorNumber || "";
        req.session.data["funder-number"] = funderNumber || "";

        req.session.data["study-design"] = summaryDesign || "";
        req.session.data["study-participants"] = summaryParticipants || "";

        // prototype debug
        req.session.data["_protocol_extracted_html_snip"] = html.slice(0, 1500);

        return res.redirect("/doc-upload/doc-x");
      } catch (err) {
        console.error(err);
        req.session.data["docx-upload-error"] =
          "We couldn’t read that document. Please upload a .docx created from the protocol template.";
        return res.redirect("/doc-upload/experiment");
      }
    }
  );
};
