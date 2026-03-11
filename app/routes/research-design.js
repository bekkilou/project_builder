const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const {
  asArray,
  clear,
  addError,
  renderWithErrors
} = require('./helpers/routing')

// ─── Helpers ────────────────────────────────────────────────────────────────

function isTrial (data) {
  const m = asArray(data['methodologies'])
  return m.includes('randomised_controlled_trial') ||
    m.includes('controlled_trial_without_randomisation')
}

function isDesigningAI (data) {
  return asArray(data['useAI']).includes('designing_developing_testing_ai')
}

function isUsingExistingAI (data) {
  return asArray(data['useAI']).includes('using_existing_ai')
}

// ─── Page flow ───────────────────────────────────────────────────────────────
//
//  /project/research-design/methodologies            methodologies (always)
//    → if other:           /methodologies-other
//    → if trial:           /trial-methodologies
//    → else:               /methodologies-details
//  /project/research-design/methodologies-other      methodologiesOther
//    → if trial:           /trial-methodologies
//    → else:               /methodologies-details
//  /project/research-design/trial-methodologies      trialMethodologies
//    → if other complex:   /trial-methodologies-other
//    → else:               /novel-intervention
//  /project/research-design/trial-methodologies-other  trialMethodologiesOther
//  /project/research-design/novel-intervention       novelIntervention (if trial)
//    → if no:              /compare-intervention
//    → if yes:             /methodologies-details
//  /project/research-design/compare-intervention     compareIntervention (if trial + not novel)
//    → if no:              /gold-intervention
//    → if yes:             /methodologies-details
//  /project/research-design/gold-intervention        goldIntervention (if trial + not novel + not compare)
//  /project/research-design/methodologies-details    methodologiesDetails (always)
//  /project/research-design/research-question        researchQuestion (always)
//  /project/research-design/use-ai                   useAI (always)
//    → if designing:       /design-ai
//    → if existing:        /existing-ai
//    → if no AI:           /what-will-happen
//  /project/research-design/design-ai                designAI
//    → if other:           /design-ai-other
//    → if also existing:   /existing-ai
//    → else:               /what-will-happen
//  /project/research-design/design-ai-other          otherAI
//    → if also existing:   /existing-ai
//    → else:               /what-will-happen
//  /project/research-design/existing-ai              existingAI
//    → if other:           /existing-ai-other
//    → else:               /what-will-happen
//  /project/research-design/existing-ai-other        otherExistingAI
//  /project/research-design/what-will-happen         willHappen (always)

// ─── Routes ──────────────────────────────────────────────────────────────────

router.post('/project/research-design/methodologies', function (req, res) {
  const data = req.session.data
  const errors = []

  if (asArray(data['methodologies']).length === 0) {
    addError(errors, 'methodologies', 'Select at least one methodology')
  }

  if (errors.length) return renderWithErrors(res, 'project/research-design/methodologies', errors)

  // Cleanup: if not a trial, clear all trial-specific answers
  if (!isTrial(data)) {
    clear(data, [
      'trialMethodologies',
      'trialMethodologiesOther',
      'novelIntervention',
      'compareIntervention',
      'goldIntervention'
    ])
  }

  if (asArray(data['methodologies']).includes('other')) {
    return res.redirect('/project/research-design/methodologies-other')
  }

  if (isTrial(data)) return res.redirect('/project/research-design/trial-methodologies')

  clear(data, ['methodologiesOther'])
  return res.redirect('/project/research-design/methodologies-details')
})

router.post('/project/research-design/methodologies-other', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['methodologiesOther'] || !data['methodologiesOther'].trim()) {
    addError(errors, 'methodologiesOther', 'Enter details of the methodologies you will be using')
  }

  if (errors.length) return renderWithErrors(res, 'project/research-design/methodologies-other', errors)

  if (isTrial(data)) return res.redirect('/project/research-design/trial-methodologies')

  return res.redirect('/project/research-design/methodologies-details')
})

router.post('/project/research-design/trial-methodologies', function (req, res) {
  const data = req.session.data
  const errors = []

  if (asArray(data['trialMethodologies']).length === 0) {
    addError(errors, 'trialMethodologies', 'Select at least one trial methodology')
  }

  if (errors.length) return renderWithErrors(res, 'project/research-design/trial-methodologies', errors)

  if (asArray(data['trialMethodologies']).includes('other_complex_or_innovative_design')) {
    return res.redirect('/project/research-design/trial-methodologies-other')
  }

  clear(data, ['trialMethodologiesOther'])
  return res.redirect('/project/research-design/novel-intervention')
})

router.post('/project/research-design/trial-methodologies-other', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['trialMethodologiesOther'] || !data['trialMethodologiesOther'].trim()) {
    addError(errors, 'trialMethodologiesOther', 'Enter details of the other complex or innovative design')
  }

  if (errors.length) return renderWithErrors(res, 'project/research-design/trial-methodologies-other', errors)

  return res.redirect('/project/research-design/novel-intervention')
})

router.post('/project/research-design/novel-intervention', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['novelIntervention']) {
    addError(errors, 'novelIntervention', 'Select whether this is a clinical trial to study a novel intervention')
  }

  if (errors.length) return renderWithErrors(res, 'project/research-design/novel-intervention', errors)

  if (data['novelIntervention'] === 'yes') {
    // Novel: compare and gold not relevant
    clear(data, ['compareIntervention', 'goldIntervention'])
    return res.redirect('/project/research-design/methodologies-details')
  }

  return res.redirect('/project/research-design/compare-intervention')
})

router.post('/project/research-design/compare-intervention', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['compareIntervention']) {
    addError(errors, 'compareIntervention', 'Select whether this is a trial to compare interventions in clinical practice')
  }

  if (errors.length) return renderWithErrors(res, 'project/research-design/compare-intervention', errors)

  if (data['compareIntervention'] === 'yes') {
    clear(data, ['goldIntervention'])
    return res.redirect('/project/research-design/methodologies-details')
  }

  return res.redirect('/project/research-design/gold-intervention')
})

router.post('/project/research-design/gold-intervention', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['goldIntervention']) {
    addError(errors, 'goldIntervention', 'Select whether all interventions are routine gold standard care options')
  }

  if (errors.length) return renderWithErrors(res, 'project/research-design/gold-intervention', errors)

  return res.redirect('/project/research-design/methodologies-details')
})

router.post('/project/research-design/methodologies-details', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['methodologiesDetails'] || !data['methodologiesDetails'].trim()) {
    addError(errors, 'methodologiesDetails', 'Enter details of the methodologies you will be using')
  }

  if (errors.length) return renderWithErrors(res, 'project/research-design/methodologies-details', errors)

  return res.redirect('/project/research-design/research-question')
})

router.post('/project/research-design/research-question', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['researchQuestion'] || !data['researchQuestion'].trim()) {
    addError(errors, 'researchQuestion', 'Enter the principal research question or objective')
  }

  if (errors.length) return renderWithErrors(res, 'project/research-design/research-question', errors)

  return res.redirect('/project/research-design/use-ai')
})

router.post('/project/research-design/use-ai', function (req, res) {
  const data = req.session.data
  const errors = []

  if (asArray(data['useAI']).length === 0) {
    addError(errors, 'useAI', 'Select at least one option')
  }

  if (errors.length) return renderWithErrors(res, 'project/research-design/use-ai', errors)

  // Cleanup: if not designing AI, clear design answers
  if (!isDesigningAI(data)) clear(data, ['designAI', 'otherAI'])

  // Cleanup: if not using existing AI, clear existing answers
  if (!isUsingExistingAI(data)) clear(data, ['existingAI', 'otherExistingAI'])

  if (isDesigningAI(data)) return res.redirect('/project/research-design/design-ai')

  if (isUsingExistingAI(data)) return res.redirect('/project/research-design/existing-ai')

  return res.redirect('/project/research-design/what-will-happen')
})

router.post('/project/research-design/design-ai', function (req, res) {
  const data = req.session.data
  const errors = []

  if (asArray(data['designAI']).length === 0) {
    addError(errors, 'designAI', 'Select at least one type of AI')
  }

  if (errors.length) return renderWithErrors(res, 'project/research-design/design-ai', errors)

  if (asArray(data['designAI']).includes('other')) {
    return res.redirect('/project/research-design/design-ai-other')
  }

  clear(data, ['otherAI'])

  if (isUsingExistingAI(data)) return res.redirect('/project/research-design/existing-ai')

  return res.redirect('/project/research-design/what-will-happen')
})

router.post('/project/research-design/design-ai-other', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['otherAI'] || !data['otherAI'].trim()) {
    addError(errors, 'otherAI', 'Enter a description of the type of AI being used')
  }

  if (errors.length) return renderWithErrors(res, 'project/research-design/design-ai-other', errors)

  if (isUsingExistingAI(data)) return res.redirect('/project/research-design/existing-ai')

  return res.redirect('/project/research-design/what-will-happen')
})

router.post('/project/research-design/existing-ai', function (req, res) {
  const data = req.session.data
  const errors = []

  if (asArray(data['existingAI']).length === 0) {
    addError(errors, 'existingAI', 'Select at least one type of AI')
  }

  if (errors.length) return renderWithErrors(res, 'project/research-design/existing-ai', errors)

  if (asArray(data['existingAI']).includes('other')) {
    return res.redirect('/project/research-design/existing-ai-other')
  }

  clear(data, ['otherExistingAI'])
  return res.redirect('/project/research-design/what-will-happen')
})

router.post('/project/research-design/existing-ai-other', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['otherExistingAI'] || !data['otherExistingAI'].trim()) {
    addError(errors, 'otherExistingAI', 'Enter a description of the type of AI being used')
  }

  if (errors.length) return renderWithErrors(res, 'project/research-design/existing-ai-other', errors)

  return res.redirect('/project/research-design/what-will-happen')
})

router.post('/project/research-design/what-will-happen', function (req, res) {
  const data = req.session.data
  const errors = []

  if (!data['willHappen'] || !data['willHappen'].trim()) {
    addError(errors, 'willHappen', 'Enter what will happen to participants, their tissue or data')
  }

  if (errors.length) return renderWithErrors(res, 'project/research-design/what-will-happen', errors)

  return res.redirect('/project/research-design/check')
})

module.exports = router
