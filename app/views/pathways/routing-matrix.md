# IRAS Approvals Routing Matrix

## Filter attributes that determine approval requirements

These are the key project attributes (derived from IRAS filter questions) that drive approval routing logic. Each is a boolean or enum used as input to the routing function.

| Attribute | Type | Values |
|---|---|---|
| `isCTIMP` | boolean | Is this a Clinical Trial of an Investigational Medicinal Product? |
| `involvesNHS` | boolean | Does the research involve NHS premises, patients or staff? |
| `leadNation` | enum | `england` \| `wales` \| `scotland` \| `northern_ireland` |
| `requiresREC` | boolean | Does it require independent ethical review under GAfREC? |
| `usesIdentifiablePatientData` | boolean | Does it access confidential patient data without consent? |
| `involvesIonisingRadiation` | boolean | Does it administer radioactive substances to participants? |
| `involvesLackCapacity` | boolean | Does it include adults who lack capacity to consent (Mental Capacity Act)? |
| `isSocialCareResearch` | boolean | Does it involve individuals under care of social/community care professionals? |
| `isDeviceTrialCombined` | boolean | Is it a combined IMP + device trial? |

---

## Approval bodies and their trigger conditions

### 1. NHS REC (Research Ethics Committee)
**Always required when:**
- `requiresREC = true` AND research falls under GAfREC scope
- `isCTIMP = true`
- `involvesLackCapacity = true` (even outside NHS)
- `isSocialCareResearch = true`

**Not required when:**
- Research recruits NHS/social care staff solely by virtue of their professional role (no patient involvement)

---

### 2. HRA / HCRW Approval (study-wide governance)
**Required when:**
- `involvesNHS = true` AND `leadNation = england` OR `leadNation = wales`
- Includes governance + legal compliance assessment
- For CTIMPs: issued in parallel with REC + MHRA via Combined Review

**Not required when:**
- `leadNation = scotland` OR `leadNation = northern_ireland` → use nation-specific NHS/HSC permission process
- Research takes place entirely outside NHS with no NHS duty of care

---

### 3. MHRA (Medicines and Healthcare products Regulatory Agency)
**Required when:**
- `isCTIMP = true`
- `isDeviceTrialCombined = true`

**Route:**
- Since Jan 2022: must use Combined Review (single IRAS submission → simultaneous MHRA + REC review)
- Type A (lower-risk) CTIMPs may use Notification Scheme (streamlined CTA)

---

### 4. CAG (Confidentiality Advisory Group)
**Required when:**
- `usesIdentifiablePatientData = true` AND consent is not practical to obtain
- Operates under s.251 NHS Act 2006

**Independent of:** HRA Approval — can be applied for alongside main application

---

### 5. ARSAC (Administration of Radioactive Substances Advisory Committee)
**Required when:**
- `involvesIonisingRadiation = true` (administration of radioactive materials to participants, beyond standard care)

**Note:** Diagnostic X-rays, CT, DXA do **not** trigger ARSAC.

---

## Routing truth table (common scenarios)

| Scenario | REC | HRA/HCRW | MHRA | CAG | ARSAC |
|---|:---:|:---:|:---:|:---:|:---:|
| Observational study, NHS patients, England | ✓ | ✓ | — | — | — |
| CTIMP, NHS sites, England | ✓ | ✓ | ✓ | — | — | 
| CTIMP + radioactive tracer, England | ✓ | ✓ | ✓ | — | ✓ |
| Observational, identifiable data, no consent | ✓ | ✓ | — | ✓ | — |
| Social care research, no NHS involvement | ✓ | — | — | — | — |
| Adults lacking capacity, community (non-NHS) | ✓ | — | — | — | — |
| NHS staff as participants (professional role only) | — | ✓ | — | — | — |
| Scotland/NI NHS study | ✓ | — (use HSC) | — | — | — |
| CTIMP + identifiable data without consent | ✓ | ✓ | ✓ | ✓ | — |

---

## Parallel vs sequential review

| Combination | Relationship |
|---|---|
| REC + HRA | **Parallel** — submitted together, HRA approval issued once both complete |
| MHRA + REC (CTIMP) | **Parallel** — Combined Review, single response to joint RFIs |
| HRA + MHRA | **Parallel** (CTIMP only), HRA study-wide may follow slightly later |
| CAG | **Independent** — can run alongside main application |
| ARSAC | **Prerequisite** — study-wide review not completed until ARSAC in place |
| R&D Capacity & Capability | **Sequential** — required at each NHS site **after** HRA Approval |

---

## Developer notes: recommended data model

```js
// Inputs from project filter
const studyProfile = {
  isCTIMP: false,
  involvesNHS: true,
  leadNation: 'england',        // 'england' | 'wales' | 'scotland' | 'northern_ireland'
  requiresREC: true,
  usesIdentifiablePatientData: false,
  involvesIonisingRadiation: false,
  involvesLackCapacity: false,
  isSocialCareResearch: false,
  isDeviceTrialCombined: false,
}

// Derived approval requirements — pure function, fully testable
function getRequiredApprovals(profile) {
  const approvals = []

  if (
    profile.requiresREC ||
    profile.isCTIMP ||
    profile.involvesLackCapacity ||
    profile.isSocialCareResearch
  ) {
    approvals.push('REC')
  }

  if (
    profile.involvesNHS &&
    (profile.leadNation === 'england' || profile.leadNation === 'wales')
  ) {
    approvals.push('HRA')
  }

  if (profile.isCTIMP || profile.isDeviceTrialCombined) {
    approvals.push('MHRA')
  }

  if (profile.usesIdentifiablePatientData) {
    approvals.push('CAG')
  }

  if (profile.involvesIonisingRadiation) {
    approvals.push('ARSAC')
  }

  return approvals
}

// Review track — determines which IRAS submission route to use
function getReviewTrack(profile) {
  if (profile.isCTIMP || profile.isDeviceTrialCombined) {
    return 'combined-review'   // new IRAS CTIMP/combined route
  }
  return 'standard'
}
```

---

## Key design principle

The routing logic and the form-scoping logic are **two separate concerns**:

1. `getRequiredApprovals(studyProfile)` → which bodies need to approve
2. Form sections/questions gated on `approvalsRequired` entries OR specific `studyProfile` attributes

Keep these architecturally separate. The approval array should be derivable from profile alone — no side effects, no UI state. This makes it independently testable and reusable across the application summary view, task list generation, and form section gating.
