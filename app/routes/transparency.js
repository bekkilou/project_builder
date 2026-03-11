const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const {
  asArray,
  clear,
  addError,
  renderWithErrors
} = require('./helpers/routing')

// ─── Helpers ────────────────────────────────────────────────────────────────

function isCTIMP (data) {
  return String(data['isCTIMP'] || '').toLowerCase() === 'yes'
}

function hasTreatment (data) {
  return asArray(data['researchActivities']).includes('treatment')
}

function hasBioResource (data) {
  const a = asArray(data['researchActivities'])
  return a.includes('previously_collected_biosamples') ||
    a.includes('clinical_people_activities')
}

function isMultiNational (data) {
  return data['UKOrMultiNation'] === 'multi_national'
}

function deferralRequested (field, data) {
  const val = data[field] || ''
  return val.startsWith('deferral_')
}

function disseminateOther (data) {
  return asArray(data['DisseminateResults']).includes('other')
}

// ─── Page flow ───────────────────────────────────────────────────────────────
//
//  /project/transparency/already-registered          alreadyRegistered (always)
//  /project/transparency/request-deferral            requestDeferral (if CTIMP)
//    → if deferral requested: /justify-deferral
//    → else:                  /reg-arrangements (if not treatment + registered) or next
//  /project/transparency/justify-deferral            justifyDeferral
//  /project/transparency/reg-arrangements            regArrangements (if not treatment AND already registered)
//    → if other:   /reg-arrangements-other
//    → else:       /ctimp-reg-arrangements (if CTIMP) or publication-deferral
//  /project/transparency/reg-arrangements-other      regArrangementsOther
//  /project/transparency/ctimp-reg-arrangements      CTIMPRegArrangements (if CTIMP)
//    — sub-inputs for ISRCTN/ClinTrials/Other refs handled on same page
//  /project/transparency/publication-deferral        publicationRequestDeferral (always)
//    → if deferral: /justify-publication-deferral
//    → else:        /planned-end-date
//  /project/transparency/justify-publication-deferral  justifyPublicationDeferral
//  /project/transparency/planned-end-date            plannedEndDate (always)
//  /project/transparency/planned-end-date-multi      plannedEndDateMulti (if multi-national)
//  /project/transparency/disseminate-results         DisseminateResults (always)
//    → if other:   /disseminate-results-other
//    → else:       /participant-results
//  /project/transparency/disseminate-results-other   otherDisseminateResults
//  /project/transparency/participant-results         participantResults (always)
//  /project/transparency/share-de-identified         shareDeIdentified (always)
//  /project/transparency/share-de-identified-details shareDeIdentifiedDetails (always)
//  /project/transparency/remaining-bio-material      remainingBioMaterial (if bio resource)
//    → if yes: /register-bio-material
//    → if no:  /public-contact
//  /project/transparency/register-bio-material       registerBioMaterial
//    → if no: /register-bio-material-no
//    → if yes: /public-contact
//  /project/transparency/register-bio-material-no    registerBioMaterialNo
//  /project/transparency/public-contact              publicEmail + publicPhoneNumber + address (always)
//  /project/transparency/scientific-contact          scientificEmail + scientificPhoneNumber + address (always)

// ─── Routes ──────────────────────────────────────────────────────────────────

router.post('/project/transparency/already-registered', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['alreadyRegistered']) {
    addError(errors, 'alreadyRegistered', 'Select whether the project is already registered elsewhere')
  }

  if (errors.length) return renderWithErrors(res, 'project/transparency/already-registered', errors)

  if (isCTIMP(data)) return res.redirect('/project/transparency/request-deferral')

  clear(data, ['requestDeferral', 'justifyDeferral'])
  return res.redirect('/project/transparency/reg-arrangements-next')
})

router.post('/project/transparency/request-deferral', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['requestDeferral']) {
    addError(errors, 'requestDeferral', 'Select your deferral request option')
  }

  if (errors.length) return renderWithErrors(res, 'project/transparency/request-deferral', errors)

  if (deferralRequested('requestDeferral', data)) {
    return res.redirect('/project/transparency/justify-deferral')
  }

  clear(data, ['justifyDeferral'])
  return res.redirect('/project/transparency/reg-arrangements-next')
})

router.post('/project/transparency/justify-deferral', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['justifyDeferral'] || !data['justifyDeferral'].trim()) {
    addError(errors, 'justifyDeferral', 'Enter a justification for the deferral request')
  }

  if (errors.length) return renderWithErrors(res, 'project/transparency/justify-deferral', errors)

  return res.redirect('/project/transparency/reg-arrangements-next')
})

// Internal redirect — reg-arrangements only shown when not treatment AND already registered
router.get('/project/transparency/reg-arrangements-next', function (req, res) {
  const data = req.session.data

  if (!hasTreatment(data) && data['alreadyRegistered'] === 'yes') {
    return res.redirect('/project/transparency/reg-arrangements')
  }

  clear(data, ['regArrangements', 'regArrangementsOther'])

  if (isCTIMP(data)) return res.redirect('/project/transparency/ctimp-reg-arrangements')

  clear(data, ['CTIMPRegArrangements'])
  return res.redirect('/project/transparency/publication-deferral')
})

router.post('/project/transparency/reg-arrangements', function (req, res) {
  const data = req.session.data
  const errors = []

  if (asArray(data['regArrangements']).length === 0) {
    addError(errors, 'regArrangements', 'Select at least one registration arrangement')
  }

  if (errors.length) return renderWithErrors(res, 'project/transparency/reg-arrangements', errors)

  if (asArray(data['regArrangements']).includes('other')) {
    return res.redirect('/project/transparency/reg-arrangements-other')
  }

  clear(data, ['regArrangementsOther'])

  if (isCTIMP(data)) return res.redirect('/project/transparency/ctimp-reg-arrangements')

  clear(data, ['CTIMPRegArrangements'])
  return res.redirect('/project/transparency/publication-deferral')
})

router.post('/project/transparency/reg-arrangements-other', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['regArrangementsOther'] || !data['regArrangementsOther'].trim()) {
    addError(errors, 'regArrangementsOther', 'Enter details of other arrangements for project registration')
  }

  if (errors.length) return renderWithErrors(res, 'project/transparency/reg-arrangements-other', errors)

  if (isCTIMP(data)) return res.redirect('/project/transparency/ctimp-reg-arrangements')

  clear(data, ['CTIMPRegArrangements'])
  return res.redirect('/project/transparency/publication-deferral')
})

// CTIMP reg arrangements — includes sub-inputs for reference numbers on the same page
router.post('/project/transparency/ctimp-reg-arrangements', function (req, res) {
  const data = req.session.data
  const errors = []

  if (asArray(data['CTIMPRegArrangements']).length === 0) {
    addError(errors, 'CTIMPRegArrangements', 'Select at least one registration arrangement')
  }

  // Validate sub-inputs: if ISRCTN selected, reference must be provided
  if (asArray(data['CTIMPRegArrangements']).includes('ISRCTN') &&
    (!data['ISRCTNReference'] || !data['ISRCTNReference'].trim())) {
    addError(errors, 'ISRCTNReference', 'Enter the ISRCTN reference number')
  }

  if (asArray(data['CTIMPRegArrangements']).includes('clinicaltrials') &&
    (!data['clinGovReference'] || !data['clinGovReference'].trim())) {
    addError(errors, 'clinGovReference', 'Enter the Clinicaltrials.gov reference number')
  }

  if (asArray(data['CTIMPRegArrangements']).includes('other') &&
    (!data['otherReference'] || !data['otherReference'].trim())) {
    addError(errors, 'otherReference', 'Enter the name and reference number of the other registry')
  }

  if (errors.length) return renderWithErrors(res, 'project/transparency/ctimp-reg-arrangements', errors)

  // Cleanup: clear reference fields for deselected options
  if (!asArray(data['CTIMPRegArrangements']).includes('ISRCTN')) clear(data, ['ISRCTNReference'])
  if (!asArray(data['CTIMPRegArrangements']).includes('clinicaltrials')) clear(data, ['clinGovReference'])
  if (!asArray(data['CTIMPRegArrangements']).includes('other')) clear(data, ['otherReference'])

  return res.redirect('/project/transparency/publication-deferral')
})

router.post('/project/transparency/publication-deferral', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['publicationRequestDeferral']) {
    addError(errors, 'publicationRequestDeferral', 'Select your publication deferral request option')
  }

  if (errors.length) return renderWithErrors(res, 'project/transparency/publication-deferral', errors)

  if (deferralRequested('publicationRequestDeferral', data)) {
    return res.redirect('/project/transparency/justify-publication-deferral')
  }

  clear(data, ['justifyPublicationDeferral'])
  return res.redirect('/project/transparency/planned-end-date')
})

router.post('/project/transparency/justify-publication-deferral', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['justifyPublicationDeferral'] || !data['justifyPublicationDeferral'].trim()) {
    addError(errors, 'justifyPublicationDeferral', 'Enter a justification for the publication deferral request')
  }

  if (errors.length) return renderWithErrors(res, 'project/transparency/justify-publication-deferral', errors)

  return res.redirect('/project/transparency/planned-end-date')
})

router.post('/project/transparency/planned-end-date', function (req, res) {
  const data = req.session.data
  const errors = []

  const day = data['plannedEndDate-day']
  const month = data['plannedEndDate-month']
  const year = data['plannedEndDate-year']

  if (!day || !month || !year) {
    addError(errors, 'plannedEndDate', 'Enter the planned end date')
  }

  if (errors.length) return renderWithErrors(res, 'project/transparency/planned-end-date', errors)

  if (isMultiNational(data)) return res.redirect('/project/transparency/planned-end-date-multi')

  clear(data, ['plannedEndDateMulti'])
  return res.redirect('/project/transparency/disseminate-results')
})

router.post('/project/transparency/planned-end-date-multi', function (req, res) {
  const data = req.session.data
  const errors = []

  const day = data['plannedEndDateMulti-day']
  const month = data['plannedEndDateMulti-month']
  const year = data['plannedEndDateMulti-year']

  if (!day || !month || !year) {
    addError(errors, 'plannedEndDateMulti', 'Enter the planned global study end date')
  }

  if (errors.length) return renderWithErrors(res, 'project/transparency/planned-end-date-multi', errors)

  return res.redirect('/project/transparency/disseminate-results')
})

router.post('/project/transparency/disseminate-results', function (req, res) {
  const data = req.session.data
  const errors = []

  if (asArray(data['DisseminateResults']).length === 0) {
    addError(errors, 'DisseminateResults', 'Select at least one option for reporting and disseminating results')
  }

  if (errors.length) return renderWithErrors(res, 'project/transparency/disseminate-results', errors)

  if (disseminateOther(data)) {
    return res.redirect('/project/transparency/disseminate-results-other')
  }

  clear(data, ['otherDisseminateResults'])
  return res.redirect('/project/transparency/participant-results')
})

router.post('/project/transparency/disseminate-results-other', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['otherDisseminateResults'] || !data['otherDisseminateResults'].trim()) {
    addError(errors, 'otherDisseminateResults', 'Enter details of other reporting and dissemination plans')
  }

  if (errors.length) return renderWithErrors(res, 'project/transparency/disseminate-results-other', errors)

  return res.redirect('/project/transparency/participant-results')
})

router.post('/project/transparency/participant-results', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['participantResults'] || !data['participantResults'].trim()) {
    addError(errors, 'participantResults', 'Enter how and when you will inform participants of the results')
  }

  if (errors.length) return renderWithErrors(res, 'project/transparency/participant-results', errors)

  return res.redirect('/project/transparency/share-de-identified')
})

router.post('/project/transparency/share-de-identified', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['shareDeIdentified']) {
    addError(errors, 'shareDeIdentified', 'Select whether you plan to share de-identified individual participant-level data')
  }

  if (errors.length) return renderWithErrors(res, 'project/transparency/share-de-identified', errors)

  return res.redirect('/project/transparency/share-de-identified-details')
})

router.post('/project/transparency/share-de-identified-details', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['shareDeIdentifiedDetails'] || !data['shareDeIdentifiedDetails'].trim()) {
    addError(errors, 'shareDeIdentifiedDetails', 'Enter details of your plans for sharing de-identified data or your alternative arrangements')
  }

  if (errors.length) return renderWithErrors(res, 'project/transparency/share-de-identified-details', errors)

  if (hasBioResource(data)) return res.redirect('/project/transparency/remaining-bio-material')

  clear(data, ['remainingBioMaterial', 'registerBioMaterial', 'registerBioMaterialNo'])
  return res.redirect('/project/transparency/public-contact')
})

router.post('/project/transparency/remaining-bio-material', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['remainingBioMaterial']) {
    addError(errors, 'remainingBioMaterial', 'Select whether you will have any remaining human biological material at the end of the project')
  }

  if (errors.length) return renderWithErrors(res, 'project/transparency/remaining-bio-material', errors)

  if (data['remainingBioMaterial'] === 'yes') {
    return res.redirect('/project/transparency/register-bio-material')
  }

  clear(data, ['registerBioMaterial', 'registerBioMaterialNo'])
  return res.redirect('/project/transparency/public-contact')
})

router.post('/project/transparency/register-bio-material', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['registerBioMaterial']) {
    addError(errors, 'registerBioMaterial', 'Select whether you will register remaining samples with the UKCRC Tissue Directory')
  }

  if (errors.length) return renderWithErrors(res, 'project/transparency/register-bio-material', errors)

  if (data['registerBioMaterial'] === 'no') {
    return res.redirect('/project/transparency/register-bio-material-no')
  }

  clear(data, ['registerBioMaterialNo'])
  return res.redirect('/project/transparency/public-contact')
})

router.post('/project/transparency/register-bio-material-no', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['registerBioMaterialNo'] || !data['registerBioMaterialNo'].trim()) {
    addError(errors, 'registerBioMaterialNo', 'Enter a justification for the post-study arrangements or destruction of the material')
  }

  if (errors.length) return renderWithErrors(res, 'project/transparency/register-bio-material-no', errors)

  return res.redirect('/project/transparency/public-contact')
})

// Public contact — email, phone, and address on one page
router.post('/project/transparency/public-contact', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['publicEmail'] || !data['publicEmail'].trim()) {
    addError(errors, 'publicEmail', 'Enter a public contact email address')
  }

  if (!data['publicAddressLine1'] || !data['publicAddressLine1'].trim()) {
    addError(errors, 'publicAddressLine1', 'Enter address line 1 for the public contact')
  }

  if (!data['publicAddressTown'] || !data['publicAddressTown'].trim()) {
    addError(errors, 'publicAddressTown', 'Enter a town or city for the public contact')
  }

  if (!data['publicAddressPostcode'] || !data['publicAddressPostcode'].trim()) {
    addError(errors, 'publicAddressPostcode', 'Enter a postcode for the public contact')
  }

  if (errors.length) return renderWithErrors(res, 'project/transparency/public-contact', errors)

  return res.redirect('/project/transparency/scientific-contact')
})

// Scientific contact — email, phone, and address on one page
router.post('/project/transparency/scientific-contact', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['scientificEmail'] || !data['scientificEmail'].trim()) {
    addError(errors, 'scientificEmail', 'Enter a scientific contact email address')
  }

  if (!data['scientificAddressLine1'] || !data['scientificAddressLine1'].trim()) {
    addError(errors, 'scientificAddressLine1', 'Enter address line 1 for the scientific contact')
  }

  if (!data['scientificAddressTown'] || !data['scientificAddressTown'].trim()) {
    addError(errors, 'scientificAddressTown', 'Enter a town or city for the scientific contact')
  }

  if (!data['scientificAddressPostcode'] || !data['scientificAddressPostcode'].trim()) {
    addError(errors, 'scientificAddressPostcode', 'Enter a postcode for the scientific contact')
  }

  if (errors.length) return renderWithErrors(res, 'project/transparency/scientific-contact', errors)

  return res.redirect('/project/transparency/check')
})

module.exports = router
