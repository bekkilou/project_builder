// ============================================================
//  governance-questions.js
//
//  Visibility flags:
//  alwaysShow:                       true  = always shown
//  showWhenMultiNation:              true  = show when UKOrMultiNation == "multi_national"
//  showWhenSuppliesNotFunder:        true  = show when suppliesNotFunder == "yes"
//  showWhenCTIMP:                    true  = show when isCTIMP == "yes"
//  showWhenTreatment:                true  = show when researchActivities includes treatment
//  showWhenSponsorCompensation:      true  = show when sponsorCompensation == "yes"
//  showWhenContractOrg:              true  = show when contractOrgResponsibility == "yes"
//  showWhenDelegatedActivities:      true  = show when delegatedActivities == "yes"
// ============================================================

module.exports = {

  UKOrMultiNation: {
    type: "radios",
    name: "UKOrMultiNation",
    legendSize: "l",
    legend: "Is this project taking place in any countries other than the UK?",
    alwaysShow: true,
    items: [
      { value: "uk_only",        text: "UK Only" },
      { value: "multi_national", text: "Multi-national" }
    ]
  },

  // Note: outsideUKCountries requires a country list data source — items left as placeholder
  outsideUKCountries: {
    type: "checkboxes",
    name: "outsideUKCountries",
    legendSize: "l",
    legend: "Select countries outside the UK participating in this project.",
    hint: "Select all that apply.",
    showWhenMultiNation: true,
    items: [
      // TODO: populate with full country list
      { value: "placeholder", text: "Country list to be added" }
    ]
  },

  suppliesNotFunder: {
    type: "radios",
    name: "suppliesNotFunder",
    inline: true,
    legendSize: "l",
    legend: "Are any materials being supplied from an organisation not providing funding?",
    alwaysShow: true,
    items: [
      { value: "yes", text: "Yes" },
      { value: "no",  text: "No" }
    ]
  },

  materialsSupplied: {
    type: "input",
    name: "materialsSupplied",
    legendSize: "l",
    label: "Give details of the source of materials supplied.",
    showWhenSuppliesNotFunder: true
  },

  legalRisks: {
    type: "textarea",
    name: "legalRisks",
    legendSize: "l",
    label: "Describe any logistical, legal, or management risks relating to your project.",
    hint: "State how you are addressing them. Projects that present a minimal risk to participants may still raise complex organisational or legal issues.",
    alwaysShow: true,
    rows: 6
  },

  monitoringAuditing: {
    type: "checkboxes",
    name: "monitoringAuditing",
    legendSize: "l",
    legend: "What arrangements will be put in place for the monitoring and auditing of the conduct of the project?",
    hint: "Select all that apply",
    showWhenCTIMP: true,
    items: [
      { value: "remote_monitoring",   text: "Remote monitoring by sponsor or delegate" },
      { value: "self_monitoring",     text: "Self-monitoring by site" },
      { value: "onsite_monitoring",   text: "On-site monitoring by sponsor or delegate" }
    ]
  },

  dataEfficacy: {
    type: "textarea",
    name: "dataEfficacy",
    legendSize: "l",
    label: "What arrangements will be made to review interim safety and efficacy data from the project?",
    hint: "Describe how any formal Data Monitoring Committee or equivalent bodies set up to review this data will contribute to this.",
    showWhenTreatment: true,
    rows: 5
  },

  insuranceIndemnity: {
    type: "textarea",
    name: "insuranceIndemnity",
    legendSize: "l",
    label: "What arrangements will be made for insurance or indemnity to meet the potential legal liability of the sponsors for harm to participants arising from the management of the project?",
    hint: "Upload all applicable insurance certificates as part of your project submission.",
    alwaysShow: true,
    rows: 5
  },

  insuranceIndemnityCollab: {
    type: "textarea",
    name: "insuranceIndemnityCollab",
    legendSize: "l",
    label: "What arrangements will be made for insurance or indemnity to meet the potential legal liability of investigators or collaborators arising from harm to participants in the conduct of the project?",
    hint: "Provide details of any time limits to the cover. Explain the arrangements that would apply if the insurance ceases. Upload all applicable insurance certificates as part of your project submission.",
    alwaysShow: true,
    rows: 5
  },

  justifyExcluded: {
    type: "textarea",
    name: "justifyExcluded",
    legendSize: "l",
    label: "Describe and justify which participant groups are excluded from cover under the insurance.",
    hint: "Upload all applicable insurance certificates as part of your project submission.",
    alwaysShow: true,
    rows: 5
  },

  sponsorCompensation: {
    type: "radios",
    name: "sponsorCompensation",
    inline: true,
    legendSize: "l",
    legend: "Have sponsors made arrangements for payment of compensation in the event of harm to the participants where no legal liability arises?",
    alwaysShow: true,
    items: [
      { value: "yes", text: "Yes" },
      { value: "no",  text: "No" }
    ]
  },

  compensationArrangements: {
    type: "textarea",
    name: "compensationArrangements",
    legendSize: "l",
    label: "Give details of the arrangements for compensation.",
    showWhenSponsorCompensation: true,
    rows: 5
  },

  contractOrgResponsibility: {
    type: "radios",
    name: "contractOrgResponsibility",
    inline: true,
    legendSize: "l",
    legend: "Have sponsors delegated any site management responsibilities to a Contract Research Organisation or a Clinical Trials Unit?",
    showWhenCTIMP: true,
    items: [
      { value: "yes", text: "Yes" },
      { value: "no",  text: "No" }
    ]
  },

  contractOrgName: {
    type: "textarea",
    name: "contractOrgName",
    legendSize: "l",
    label: "Give the name of the Contract Research Organisation or Clinical Trials Unit with site management responsibilities.",
    showWhenContractOrg: true,
    rows: 3
  },

  delegatedActivities: {
    type: "radios",
    name: "delegatedActivities",
    inline: true,
    legendSize: "l",
    legend: "Has responsibility for any specific research activities or procedures been delegated to a subcontractor?",
    showWhenCTIMP: true,
    items: [
      { value: "yes", text: "Yes" },
      { value: "no",  text: "No" }
    ]
  },

  delegateOrgs: {
    type: "textarea",
    name: "delegateOrgs",
    legendSize: "l",
    label: "Give the names of subcontracted organisations and the proposed oversight arrangements.",
    showWhenDelegatedActivities: true,
    rows: 5
  }

}
