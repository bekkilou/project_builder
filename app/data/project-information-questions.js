// ============================================================
//  project-information-questions.js
// ============================================================

module.exports = {

  protocolRef: {
    type: "input",
    name: "protocolRef",
    legendSize: "l",
    label: "Provide protocol reference number",
    hint: "This should be no more than 50 characters"
  },

  // showWhenCTIMP: true — only shown when isCTIMP == "yes"
  euct: {
    type: "radios",
    name: "euct",
    legendSize: "l",
    legend: "Do you have an EU Clinical Trial (EUCT) number?",
    hint: "Select one option",
    showWhenCTIMP: true,
    conditionalValue: "Yes",
    items: [
      { value: "Yes",            text: "Yes" },
      { value: "Not applicable", text: "Not applicable" }
    ]
    // Note: the conditional EUCT number input field is rendered in the page template
    // as it requires a conditional reveal with a sub-input
  },

  projectSummary: {
    type: "textarea",
    name: "projectSummary",
    legendSize: "l",
    label: "Research project public summary",
    hint: "Explain why the research is being carried out, the questions it seeks to answer, its design and methodology. Do not reproduce or refer to the protocol. Complete this in language understandable to a member of the public (maximum 300 words).",
    rows: 8
  }

}
