// ============================================================
//  questions.js  –  single source of truth for all questions
//
//  HOW TO EDIT:
//  - Change question wording: edit the "legend" or "label" field
//  - Change hint text: edit the "hint" field
//  - Add an answer option: add a line to the "items" array
//  - Remove an answer option: delete the line from "items"
//  - Change an answer's display text: edit the "text" field
//  - Change an answer's stored value: edit the "value" field
//    (warning: changing values may break existing session data)
//
//  QUESTION TYPES:
//  - "checkboxes"  →  multi-select checkboxes
//  - "radios"      →  single-select radio buttons
//  - "input"       →  single-line text field
//  - "textarea"    →  multi-line text field
//  - "select"      →  autocomplete / dropdown
// ============================================================

module.exports = {

  // ----------------------------------------------------------
  //  PROJECT DETAILS
  // ----------------------------------------------------------

  projectTitle: {
    type: "input",
    name: "projectTitle",
    label: "Short project title",
    legendSize: "l"
  },

  fullProjectTitle: {
    type: "textarea",
    name: "fullProjectTitle",
    label: "Full project title",
    legendSize: "l"
  },

  // ----------------------------------------------------------
  //  LOCATION
  // ----------------------------------------------------------

  UKNations: {
    type: "checkboxes",
    name: "UKNations",
    legend: "Which UK nations will this project take place in?",
    legendSize: "l",
    hint: "Select all that apply",
    items: [
      { value: "England",          text: "England" },
      { value: "Northern Ireland", text: "Northern Ireland" },
      { value: "Scotland",         text: "Scotland" },
      { value: "Wales",            text: "Wales" }
    ]
  },

  nhsHscOrg: {
    type: "radios",
    name: "nhs-hsc-org",
    inline: true,
    legend: "Is this project taking place at any NHS / HSC organisations?",
    legendSize: "l",
    items: [
      { value: "Yes", text: "Yes" },
      { value: "No",  text: "No" }
    ]
  },

  // ----------------------------------------------------------
  //  SPONSOR ORGANISATION
  //  type "select" renders as an accessible autocomplete.
  //  Add or remove organisations from the items array below.
  // ----------------------------------------------------------

  sponsorOrg: {
    type: "select",
    name: "sponsorOrg",
    label: "Primary sponsor organisation",
    legendSize: "l",
    hint: "Start typing to see suggestions and select an organisation",
    items: [
      { value: "airedaleNHS",    text: "Airedale NHS Foundation Trust" },
      { value: "astraZeneca",    text: "AstraZeneca UK Limited" },
      { value: "belfastHSC",     text: "Belfast Health and Social Care Trust" },
      { value: "cambridgeUni",   text: "Cambridge University Hospitals NHS Foundation Trust" },
      { value: "cardiffLHB",     text: "Cardiff & Vale University LHB" },
      { value: "cardiffUni",     text: "Cardiff University" },
      { value: "derbyshireNHS",  text: "Derbyshire Healthcare NHS Foundation Trust" },
      { value: "eastLancsNHS",   text: "East Lancashire Hospitals NHS Trust" },
      { value: "greaterGlasgow", text: "Greater Glasgow and Clyde" },
      { value: "guysStThomas",   text: "Guy's and St Thomas' NHS Foundation Trust" },
      { value: "imperialCollege",text: "Imperial College Healthcare NHS Trust" },
      { value: "lifescanScot",   text: "Lifescan Scotland Ltd." },
      { value: "prifysgolAber",  text: "Prifysgol Aberystwyth" },
      { value: "queenVHos",      text: "Queen Victoria Hospital NHS Foundation Trust" },
      { value: "uniHosSouth",    text: "University Hospital Southampton NHS Foundation Trust" },
      { value: "uOfAber",        text: "University of Aberdeen" },
      { value: "uOfBir",         text: "University of Birmingham" },
      { value: "uOfBri",         text: "University of Bristol" },
      { value: "uOfEdi",         text: "University of Edinburgh" },
      { value: "uOfMan",         text: "University of Manchester" }
    ]
  },

  // ----------------------------------------------------------
  //  CHIEF INVESTIGATOR
  //  "radios-conditional" renders a radio with a revealed
  //  sub-form when "Someone else" is selected.
  // ----------------------------------------------------------

  chiefInvestigator: {
    type: "radios-conditional",
    name: "contact",
    legend: "Who is the Chief Investigator for this project?",
    legendSize: "l",
    items: [
      {
        value: "itsMe",
        text: "I am the Chief Investigator"
      },
      {
        value: "addCI",
        text: "Someone else is the Chief Investigator",
        // Fields revealed when this option is selected
        conditionalFields: [
          { name: "addChief01", label: "First name" },
          { name: "addChief02", label: "Last name" },
          { name: "addChief03", label: "Email" }
        ]
      }
    ]
  },

  // ----------------------------------------------------------
  //  PARTICIPANT GROUPS
  // ----------------------------------------------------------

  participantGroups: {
    type: "checkboxes",
    name: "participantGroups",
    legendSize: "l",
    legend: "Who will take part in this project or provide data or samples?",
    hint: "Select all that apply",
    errorMessage: "Select at least one participant group",
    items: [
      { value: "carers_guardians",           text: "Carers, parents or legal guardians of patients or participants" },
      { value: "healthy_volunteers",         text: "Healthy volunteers or controls" },
      { value: "public",                     text: "Members of the public" },
      { value: "nhs_patients_service_users", text: "Patients or service users of NHS or HSC provided or commissioned services", nhsOnly: true },
      { value: "care_home_residents",        text: "Patients or residents in care homes, independent health care clinics, nursing homes or residential care" },
      { value: "deceased",                   text: "People who are known to be deceased prior to their inclusion in the project" },
      { value: "other_social_care_users",    text: "Service users in other social care settings" },
      { value: "nhs_hsc_staff",              text: "Staff working in NHS or HSC provided or commissioned services", nhsOnly: true },
      { value: "other_care_staff",           text: "Staff working in other care settings" },
      { value: "other",                      text: "Other" }
    ]
  },

  // ----------------------------------------------------------
  //  RESEARCH ACTIVITIES
  // ----------------------------------------------------------

  researchActivities: {
    type: "checkboxes",
    name: "researchActivities",
    legend: "What activities will this project involve?",
    legendSize: "l",
    hint: "Select all that apply",
    errorMessage: "Select at least one research activity",
    items: [
      { value: "previously_collected_data",              text: "Use of previously collected data about people",                                                                                     showWhenDeceased: true,  showWhenStaffOnly: false, showWhenStaffExcluded: true  },
      { value: "previously_collected_biosamples",        text: "Use of previously collected human biological samples",                                                                             showWhenDeceased: true,  showWhenStaffOnly: false, showWhenStaffExcluded: true  },
      { value: "non_clinical_staff_activities",          text: "Non-clinical activities with staff, such as interviews, questionnaires and observations",                                          showWhenDeceased: false, showWhenStaffOnly: true,  showWhenStaffExcluded: false },
      { value: "non_clinical_people_interviews_surveys", text: "Non-clinical activities with people, such as interviews or surveys",                                                               showWhenDeceased: false, showWhenStaffOnly: true,  showWhenStaffExcluded: true  },
      { value: "non_clinical_people_procedures",         text: "Non-clinical activities with people, such as non-clinical assessments, observations or care procedures",                           showWhenDeceased: false, showWhenStaffOnly: false, showWhenStaffExcluded: true  },
      { value: "clinical_people_activities",             text: "Clinical activities with people, such as collecting human biological samples, imaging investigations or diagnostics",              showWhenDeceased: false, showWhenStaffOnly: false, showWhenStaffExcluded: true  },
      { value: "treatment",                              text: "Treatment, such as medicines, devices, surgery, vaccines or therapies",                                                            showWhenDeceased: false, showWhenStaffOnly: false, showWhenStaffExcluded: true  }
    ]
  },

  // ----------------------------------------------------------
  //  CTIMP
  // ----------------------------------------------------------


    isCTIMP: {
      type: "radios",
      name: "isCTIMP",
      inline: true,
      conditionalValue: "yes",
      legend: "Is this a clinical trial of an investigational medicinal product (CTIMP)?",
      legendSize: "l",
      errorMessage: "Select whether this project is a CTIMP",
      items: [
        { value: "yes", text: "Yes" },
        { value: "no",  text: "No" }
      ]
    },

    ctimpCombined: {
      type: "radios",
      name: "ctimpCombined",
      legend: "What type of CTIMP is this?",
      legendSize: "m",
      errorMessage: "Select the option that applies to your CTIMP project",
      items: [
        { value: "ctimp",            text: "A clinical trial of an investigational medicinal product" },
        { value: "ctimp-and-device", text: "A combined trial of an investigational medicinal product and an investigational medical device" }
      ]
    },

  // ----------------------------------------------------------
  //  PARTICIPANT AGES
  // ----------------------------------------------------------

  adultsAndChildren: {
    type: "checkboxes",
    name: "adultsAndChildren",
    legend: "Will the project involve adults, children or both?",
    legendSize: "l",
    hint: "Select all that apply",
    errorMessage: "Select whether you are involving adults or children",
    items: [
      { value: "adult",                        text: "Adults" },
      { value: "adult_including_16_17_scotland", text: "Adults (including children 16–17 years old in Scotland)" },
      { value: "child_u18",                    text: "Children (under 18 years old)" },
      { value: "child_u16",                    text: "Children (under 16 years of age)" }
    ]
  },

  childAge: {
    type: "checkboxes",
    name: "childAge",
    legend: "What ages are your child participants?",
    legendSize: "l",
    hint: "Select all that apply",
    errorMessage: "Select at least one child age range",
    items: [
      { value: "in_utero",                text: "In utero" },
      { value: "preterm_under_37_weeks",  text: "Preterm newborn infants (up to gestational age less than 37 weeks)" },
      { value: "newborn_0_27_days",       text: "Newborn (0 to 27 days)" },
      { value: "28_days_to_23_months",    text: "28 days to 23 months" },
      { value: "2_to_9_years",            text: "2 to 9 years" },
      { value: "10_to_15_years",          text: "10 to 15 years" },
      { value: "16_to_17_years",          text: "16 to 17 years" }
    ]
  },

  adultAge: {
    type: "checkboxes",
    name: "adultAge",
    legend: "What ages are your adult participants?",
    legendSize: "l",
    hint: "Select all that apply",
    errorMessage: "Select at least one adult age range",
    items: [
      { value: "16_to_17_years", text: "16 to 17 years" },
      { value: "18_to_39_years", text: "18 to 39 years" },
      { value: "40_to_49_years", text: "40 to 49 years" },
      { value: "50_to_59_years", text: "50 to 59 years" },
      { value: "60_to_69_years", text: "60 to 69 years" },
      { value: "70_plus_years",  text: "70+ years" }
    ]
  },

  // ----------------------------------------------------------
  //  ADDITIONAL FACETS
  // ----------------------------------------------------------

  isClinical: {
    type: "radios",
    name: "isClinical",
    inline: true,
    legend: "Does this project involve a clinical investigation or other study of a medical device (including digital technology)?",
    legendSize: "l",
    errorMessage: "Select whether this project involves a medical device investigation",
    items: [
      { value: "yes", text: "Yes" },
      { value: "no",  text: "No" }
    ]
  },

  isIonising: {
    type: "radios",
    name: "isIonising",
    inline: true,
    legend: "Does this project involve exposing participants to ionising radiation?",
    legendSize: "l",
    errorMessage: "Select whether the project involves ionising radiation",
    items: [
      { value: "yes", text: "Yes" },
      { value: "no",  text: "No" }
    ]
  },

  isBioSample: {
    type: "radios",
    name: "isBioSample",
    inline: true,
    legend: "Will this project involve taking or using human biological samples?",
    legendSize: "l",
    errorMessage: "Select whether you will take or use human biological samples",
    items: [
      { value: "yes", text: "Yes" },
      { value: "no",  text: "No" }
    ]
  },

  // ----------------------------------------------------------
  //  PARTICIPANT CONSENT
  // ----------------------------------------------------------

  participantConsent: {
    type: "radios",
    name: "participantConsent",
    legend: "Will consent be sought from or on behalf of participants?",
    legendSize: "l",
    errorMessage: "Select whether you will seek consent from or on behalf of participants",
    items: [
      { value: "all",     text: "Consent will be obtained from or on behalf of all participants" },
      { value: "some",    text: "Consent will be obtained from or on behalf of participants in some situations" },
      { value: "none",    text: "Consent will not be obtained from or on behalf of any participants" },
      { value: "already", text: "Consent has already been obtained for previously collected data or samples" }
    ]
  },

  noConsent: {
    type: "checkboxes",
    name: "noConsent",
    legend: "In which situations will consent or assent not be obtained?",
    legendSize: "l",
    hint: "Select all that apply",
    errorMessage: "Select at least one situation when consent or assent will not be obtained",
    items: [
      { value: "non_identifiable_patient_data",                        text: "For the use of non-identifiable patient or care data by the research team" },
      { value: "identifiable_data_usual_care_team",                    text: "For access to identifiable patient or care data by the usual care team (including identification of potential participants)" },
      { value: "identifiable_data_no_legal_basis",                     text: "For access to identifiable patient or care data by people without an existing legal basis (including identification of potential participants)" },
      { value: "previously_collected_non_identifiable_biosamples",     text: "For the use of previously collected non-identifiable human biological samples" },
      { value: "previously_collected_identifiable_biosamples_no_consent", text: "For the use of previously collected identifiable human biological samples without relevant consent for their use in this project" },
      { value: "adult_lacks_capacity",                                 text: "When adults do not have capacity to consent to their participation" },
      { value: "other",                                                text: "Other" }
    ]
  },

  isCapable: {
    type: "radios",
    name: "isCapable",
    legend: "Will adult participants have capacity to consent for themselves?",
    legendSize: "l",
    errorMessage: "Select what capacity adult participants will have to consent to their participation",
    items: [
      { value: "all",  text: "All adults will have capacity" },
      { value: "none", text: "No adults will have capacity" },
      { value: "some", text: "Some adults may lack capacity" }
    ]
  },

  // ----------------------------------------------------------
  //  HMPPS INVOLVEMENT
  // ----------------------------------------------------------

  isHMPPS: {
    type: "radios",
    name: "isHMPPS",
    inline: true,
    legend: "Does this project involve people in custody or under probation supervision?",
    legendSize: "l",
    hint: "This question refers only to participants you recruit through a prison or probation service. It does not apply to people with past convictions or those on community sentecnes not managed by these services.",
    errorMessage: "Select whether HMPPS is involved",
    items: [
      { value: "yes", text: "Yes" },
      { value: "no",  text: "No" }
    ]
  },

  hmppsNations: {
    type: "checkboxes",
    name: "hmppsNations",
    legend: "In which UK nations will the project involve people in custody or under probation supervision?",
    legendSize: "m",
    hint: "Select all that apply",
    errorMessage: "Select at least one UK nation",
    items: [
      { value: "England",          text: "England" },
      { value: "Northern Ireland", text: "Northern Ireland" },
      { value: "Scotland",         text: "Scotland" },
      { value: "Wales",            text: "Wales" }
    ]
  },

  // ----------------------------------------------------------
  //  MOD INVOLVEMENT
  // ----------------------------------------------------------

  isMOD: {
    type: "radios",
    name: "isMOD",
    inline: true,
    legend: "Does this project involve participants, sites or activity under Ministry of Defence (MOD) responsibility?",
    legendSize: "l",
    errorMessage: "Select whether the project involves MOD activity",
    items: [
      { value: "yes", text: "Yes" },
      { value: "no",  text: "No" }
    ]
  },

  // ----------------------------------------------------------
  //  HFEA INVOLVEMENT
  // ----------------------------------------------------------

  isHFEA: {
    type: "radios",
    name: "isHFEA",
    legend: "Does this project involve activities or data regulated by the Human Fertilisation and Embryology Authority (HFEA)?",
    legendSize: "l",
    errorMessage: "Select whether the project involves HFEA regulated activities or data",
    items: [
      { value: "regulated-activities", text: "Yes, activities regulated by HFEA" },
      { value: "register-data",        text: "Yes, accessing data from the HFEA register" },
      { value: "no",                   text: "No" }
    ]
  }

}
