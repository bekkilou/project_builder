// app/helpers/approvals-pathway.js

function asArray(value) {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

function normYes(value) {
  return String(value || '').trim().toLowerCase() === 'yes'
}

function lowerArray(values) {
  return asArray(values)
    .map(v => String(v || '').trim().toLowerCase())
    .filter(Boolean)
}

function buildApprovalsPathway(data) {
  const participantGroups = asArray(data.participantGroups)
  const researchActivities = asArray(data.researchActivities)
  const noConsent = asArray(data.noConsent)
  const ukNations = lowerArray(data.UKNations)

  const includesEngland = ukNations.includes('england')
  const includesWales = ukNations.includes('wales')
  const includesScotland = ukNations.includes('scotland')
  const includesNI = ukNations.includes('northern ireland') || ukNations.includes('northern_ireland') || ukNations.includes('ni')

  const isCTIMP = normYes(data.isCTIMP)
  const ctimpCombined = String(data.ctimpCombined || '').trim().toLowerCase()
  const isCombinedCTIMP = ctimpCombined === 'ctimp-and-device'

  const isDeviceStudy = normYes(data.isClinical)
  const involvesIonising = normYes(data.isIonising)
  const involvesBioSamples = normYes(data.isBioSample)

  const involvesHMPPS = normYes(data.isHMPPS)
  const involvesMOD = normYes(data.isMOD)
  const hfeaMode = String(data.isHFEA || '').trim().toLowerCase() // regulated-activities | register-data | no

  const involvesNhsOrHsc =
    participantGroups.includes('nhs_patients_service_users') ||
    participantGroups.includes('nhs_hsc_staff')

  const noConsentIdentifiableUsualCare = noConsent.includes('identifiable_data_usual_care_team')
  const noConsentIdentifiableNoLegalBasis = noConsent.includes('identifiable_data_no_legal_basis')

  const usesIdentifiableWithoutConsent =
    noConsentIdentifiableUsualCare || noConsentIdentifiableNoLegalBasis

  const hasAnyResearchSignal =
    participantGroups.length > 0 ||
    researchActivities.length > 0 ||
    isCTIMP || isCombinedCTIMP || isDeviceStudy || involvesIonising || involvesBioSamples ||
    (data.participantConsent && String(data.participantConsent).length > 0) ||
    involvesHMPPS || involvesMOD || (hfeaMode && hfeaMode !== '')

  // ---- “Needs X” rules (same as your template) ----
  const needsRadiationAssurance = involvesIonising
  const needsPharmacyAssurance = isCTIMP && involvesNhsOrHsc

  const needsUKApprovals = involvesNhsOrHsc
  const needsREC = hasAnyResearchSignal

  const needsCAG = usesIdentifiableWithoutConsent && (includesEngland || includesWales)
  const needsPBPP = usesIdentifiableWithoutConsent && includesScotland

  const needsMHRA = isCTIMP || isCombinedCTIMP || isDeviceStudy
  const needsARSAC = involvesIonising

  const needsHMPPSPermission = involvesHMPPS && (includesEngland || includesWales)
const needsSPSPermission   = involvesHMPPS && includesScotland
const needsNIPSPermission  = involvesHMPPS && includesNI

  const needsHFEA = hfeaMode && hfeaMode !== 'no'

  // ---- Build a display-ready results structure ----
  const sections = [
    {
      heading: "Pre-submission assurances",
      items: [
        // You currently only show this when section is shown. Keep that behaviour:
        { show: true, summaryText: "Pre-submission advice (optional)", text: "If you would like to, you can submit your proposed activities and protocol for pre-application advice before you formally submit your application to the review bodies for the study." },
        { show: needsRadiationAssurance, summaryText: "Radiation assurance", text: "Apply for radiation assurance and make any changes needed to the proposed activities and the protocol that arise from that review." },
        { show: needsPharmacyAssurance, summaryText: "Pharmacy assurance", text: "Pharmacy assurance is required for CTIMPs taking place in the NHS. This review takes place before formal submission to the other review bodies. Submit your application for pharmacy assurance and make any changes needed to the proposed activities and protocol that arise from that review." }
      ]
    },
    {
      heading: "Committee reviews and approvals",
      items: [
        { show: needsUKApprovals, summaryText: "UK Approvals", text: "A UK-wide review is needed to provide assurances to NHS organisations undertaking research activities in the UK." },
        { show: needsREC, summaryText: "Research Ethics Committee (REC) review", text: "A favourable opinion from an NHS REC is needed before one or more study activities can take place. A single NHS REC opinion can cover activities across the UK." },
        { show: needsCAG, summaryText: "Confidentiality Advisory Group (CAG) review", text: "CAG review may be required if you need access to identifiable patient or care data without consent or another legal basis in England or Wales." },
        { show: needsPBPP, summaryText: "PBPP review", text: "PBPP review may be required if you need access to identifiable patient or care data without consent or another legal basis in Scotland." }
      ]
    },
    {
      heading: "Authorisations and permissions",
      items: [
        { show: needsARSAC, summaryText: "Administration of Radioactive Substances Advisory Committee (ARSAC) authorisation", text: "ARSAC authorisation may be required for some research involving ionising radiation." },
        { show: needsMHRA, summaryText: "Medicines and Healthcare products Regulatory Agency (MHRA) authorisation", text: "MHRA authorisation may be required for CTIMPs and some medical device investigations." },
        { show: involvesMOD, summaryText: "Ministry of Defence (MOD) permission", text: "MOD permission may be required for activities under the responsibility of the Ministry of Defence." },
        { show: needsHMPPSPermission, summaryText: "His Majesty's Prison and Probation Service (HMPPS) permission", text: "Permission from HMPPS is needed before activities involving prisoners, young offenders in custody, or people supervised by probation services can take place in England or Wales." },
        { show: needsSPSPermission, summaryText: "Scottish Prison Service permission", text: "Permission from the Scottish Prison Service is needed before activities involving people in custody can take place in Scotland." },
        { show: needsNIPSPermission, summaryText: "Northern Ireland Prison Service permission", text: "Permission from the Northern Ireland Prison Service is needed before activities involving people in custody can take place in Northern Ireland." },
        { show: needsHFEA, summaryText: "HFEA approval or permission", text: "HFEA approval or permission may be required for activities regulated by the Human Fertilisation and Embryology Authority, or for access to data from the HFEA register." }
      ]
    }
  ]

  // Strip empty items/sections so headings never appear without content
  const prunedSections = sections
    .map(s => ({ ...s, items: s.items.filter(i => i.show) }))
    .filter(s => s.items.length > 0)

  return {
    sections: prunedSections,
    flags: {
      needsRadiationAssurance,
      needsPharmacyAssurance,
      needsUKApprovals,
      needsREC,
      needsCAG,
      needsPBPP,
      needsMHRA,
      needsARSAC,
      needsHMPPSPermission,
      needsSPSPermission,
      needsNIPSPermission,
      needsHFEA
    }
  }
}

module.exports = { buildApprovalsPathway }
