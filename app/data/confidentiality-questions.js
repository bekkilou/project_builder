// ============================================================
//  confidentiality-questions.js
// ============================================================

module.exports = {

  isDataOnly: {
    type: "radios",
    name: "isDataOnly",
    inline: true,
    legendSize: "l",
    legend: "Is this study limited to working with data only?",
    // Note: typo 'TIs' in original — corrected here
    items: [
      { value: "yes", text: "Yes" },
      { value: "no",  text: "No" }
    ]
  }

}
