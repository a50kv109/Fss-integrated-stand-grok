# FSS Integrated Research Stand (fss-integrated-stand)

**A Deterministic Crystallographic Symmetry Reasoning & Classification Environment**

---

## 1. Overview & Purpose

The **Fedorov Symmetry Reasoning Stand (FSS)** is an integrated scientific research stand designed for the deterministic verification, analysis, and representation matching of crystallographic space groups.

Rooted in Evgraf S. Fedorov’s 1891 geometric derivation of the 230 space groups, FSS provides:
* A **deterministic vector-affine geometric engine** for testing symmetry operations on 3D structures (such as the regular tetrahedron) with exact metric tolerance.
* An **interactive 3D Three.js visualization** environment allowing real-time inspection of symmetry transformations and generated evidence.
* A **two-stage in-memory classification subsystem** combining coordinate-independent invariant profiling with strict canonical key matching modulo unit-cell translations $\mathbb{Z}^3$.
* Exact rational arithmetic backed by JavaScript `BigInt` and Euclidean GCD reduction, eliminating floating-point rounding drift.

---

## 2. Integrated Architecture & Provenance

This repository represents an **integrated research stand**, unifying capabilities developed across two complementary research streams:

```
+-----------------------------------------------------------------------------------------+
|                               FSS INTEGRATED RESEARCH STAND                             |
|                                                                                         |
|  [Studio FSS Baseline Architecture]         [GROK v0.1.1 Adapted Capabilities]          |
|  - Vector-affine geometric engine           - Two-stage classification algorithm        |
|  - 3D Three.js interactive viewport         - Coordinate-independent invariant profiler|
|  - 8-setting classifier catalog (9 in registry)  - Strict canonical key matcher              |
|  - Exact BigInt rational arithmetic         - Multiset duplicate detection              |
|  - Express REST server & Vite build         - Soundness test suite (T1-T10, S1-S16)     |
+-----------------------------------------------------------------------------------------+
```

### What was assimilated from GROK v0.1.1:
1. **Invariant Profiler (`core/operation_set_profile.ts`):** Extracts coordinate-independent algebraic invariants (matrix order spectrum $\{1, 2, 3, 4, 6\}$, trace histograms, determinant ratio, inversion presence) to rapidly prune incompatible space groups.
2. **Strict Candidate Matcher (`core/operation_set_match.ts`):** Performs bijective set comparison of canonical keys `${JSON(W)}|${w mod 1}` and evaluates ITA Volume A origin shifts.

### What was adapted and preserved from Studio FSS:
* All rational arithmetic was adapted to Studio's BigInt-backed `ExactRational`.
* The matcher was expanded from GROK's 4-group prototype to query Studio's **8-setting classifier catalog** (`REGISTERED_SETTING_IDS`), while 9 settings are defined in the broader registry (`core/registry.ts`, including SG 76 / $P4_1$).
* The vector-affine geometric engine (`core/engine.ts`), affine dimensionality engine (`core/dimension.ts`), and 3D visualization stand remained 100% intact with zero breaking modifications.

---

## 3. Current System Capabilities

* **Interactive Symmetry Experiments (Active in UI):**
  - Interactive 3D visualization of a canonical regular tetrahedron.
  - Execution of affine symmetry operations ($C_3$ 120° rotations, reflections, non-symmetry rotations).
  - Configurable verification predicates (`PRESERVES_STRUCTURE`, `INVARIANT_SUBSPACE`) and distance threshold $\epsilon$.
  - Real-time generation of bit-identical JSON evidence reports.
* **Affine Dimensionality Analysis (`core/dimension.ts`):**
  - Scale-invariant covariance and eigenvalue analysis determining geometric dimension ($0$D, $1$D, $2$D, $3$D) across scales from $10^{-3}$ to $10^3$.
* **Two-Stage Space Group Classifier (In-Memory Core):**
  - **Stage 1 (Candidate Filter):** Prunes catalog candidates using necessary linear invariants (zero false negatives for registered catalog settings).
  - **Stage 2 (Strict Matcher):** Bijectively matches canonical operation keys modulo $\mathbb{Z}^3$.
  - **Origin Shift Awareness:** Detects and verifies exact equivalence under the standard ITA Volume A origin shift $\vec{x}_0 = (1/4, 1/4, 1/4)$ for Space Group 19 ($P2_12_12_1$).
  - **Multiset Duplicate Handling:** Distinguishes set equality from multiset equality without silent data modification.

---

## 4. Current Mathematical Boundaries & Limitations

To maintain scientific rigor, the system enforces strict epistemic boundaries:
1. **Catalog Bound (8 of 230 in Classifier, 9 in Registry):** The fast classifier evaluates exactly 8 space group settings: Nos. 1 ($P1$), 2 ($P\bar{1}$), 3 ($P2$), 4 ($P2_1$), 5 ($C2$), 9 ($Cc$), 14 ($P2_1/c$), and 19 ($P2_12_12_1$). Setting 76 ($P4_1$) is registered in `core/registry.ts` but is explicitly excluded from `REGISTERED_SETTING_IDS`. Queries outside the 8 catalog settings evaluate to `NO_CANDIDATES` or `SETTING_MISMATCH`.
2. **Invariant Profile $\neq$ Space Group Identification:** Invariant profile matching is a necessary filter, **never** a sufficient proof of space group identity (e.g. $P2$ and $P21$ have identical profiles).
3. **Representation Matching $\neq$ General Isomorphism:** `EXACT_MATCH` proves equality in the canonical coordinate basis of the catalog setting modulo $\mathbb{Z}^3$. Arbitrary basis changes ($P \in GL_3(\mathbb{Z})$) and continuous origin shifts are not implemented.
4. **Group Closure Notice:** The matcher evaluates complete operation lists against catalog entries. It does not automatically compute group closure $\langle S \rangle$ for sparse generator sets. (An isolated research module `core/group_closure.ts` exists and passed test suite T1–T15 per execution report [`ISOLATED_MODULE_TESTED`], but is strictly unwired from `classifyOperationSet`, `server.ts`, and the UI).
5. **Gated UI/API Integration Status:**
   - **Classification Core:** Fully implemented in-memory (`core/operation_set_profile.ts`, `core/operation_set_match.ts`).
   - **API Route:** Implemented in `server.ts` via `POST /api/classify`. The presence of this endpoint does not imply that the API contract has received final human approval.
   - **UI Component:** `ClassifierUI` component exists in `components/ClassifierUI.tsx` and is imported in `App.tsx`.
   - **User Navigation:** The classifier tab is unexposed in user navigation; `App.tsx` holds view state initialized to `'experiment'` with no navigation switch control exposed in the interface (UI remains focused on the baseline regular tetrahedron experiment).

For complete details, see [docs/LIMITATIONS.md](docs/LIMITATIONS.md) and [docs/CLASSIFIER_CONTRACT.md](docs/CLASSIFIER_CONTRACT.md).

---

## 5. Environment & Getting Started

### Prerequisites:
* **Node.js:** v18.0.0 or higher (v20+ recommended)
* **npm:** v9.0.0 or higher

### Installation:
```bash
# Clone the repository
git clone <repository-url>
cd fss-integrated-stand

# Install dependencies
npm install
```

### Environment Configuration:
Copy the example environment file:
```bash
cp .env.example .env
```
*(Note: `GEMINI_API_KEY` is optional; required only for harmonic protocol text synthesis via `/api/synthesis`)*

---

## 6. Running & Verification Commands

```bash
# Start local development server (Express + Vite on Port 3000)
npm run dev

# Run static TypeScript type check (Zero errors)
npm run lint

# Build production bundle (Vite)
npm run build

# Start production server
npm start
```

### Running Test Suites:
```bash
# EXP-09 Candidate Filter Soundness & Classification Test Suite
npx tsx core/filter_soundness.test.ts

# EXP-09 Invariant Profiler Test Suite
npx tsx core/operation_set_profile.test.ts

# Affine Dimensionality Engine (64 tests)
npx tsx core/dimension.test.ts

# Geometric Symmetry Engine (31 tests)
npx tsx core/engine.test.ts

# Reference Loader & Gemmi Benchmark
npx tsx core/reference_loader.test.ts
```

For complete test logs and test suite audit details, see [docs/TESTING.md](docs/TESTING.md).

---

## 7. Directory Structure

```
fss-integrated-stand/
├── README.md                   # This overview
├── CONTRIBUTING.md             # Developer guidelines & epistemic rules
├── CHANGELOG.md                # Project version & integration history
├── .env.example                # Template environment file (no secrets)
├── package.json                # Project dependencies and scripts
├── server.ts                   # Express server & API endpoints
├── App.tsx                     # React 19 interactive stand UI
├── components/                 # React UI components (3D Viewport, Lattice)
├── core/                       # Deterministic mathematical core
│   ├── engine.ts               # Symmetry experiment execution
│   ├── dimension.ts            # 3D affine dimensionality analysis
│   ├── operation_set_profile.ts# Algebraic invariant profiler (EXP-09)
│   ├── operation_set_match.ts  # Two-stage candidate matcher (EXP-09)
│   ├── registry.ts             # 9-setting space group catalog
│   └── schema/                 # Exact rational arithmetic & exchange
├── data/                       # Crystallographic benchmarks (Gemmi)
└── docs/                       # Project documentation
    ├── PROJECT_PASSPORT.md     # System mission, status, and principles
    ├── ARCHITECTURE.md         # Component topology & data flow
    ├── MATHEMATICAL_MODEL.md   # Mathematical equations & formalisms
    ├── CLASSIFIER_CONTRACT.md  # Normative verdicts & rules
    ├── INTEGRATION_HISTORY.md  # Detailed history of GROK assimilation
    ├── TESTING.md              # Test execution guide & results
    ├── LIMITATIONS.md          # Negative boundaries and prohibited claims
    ├── ROADMAP.md              # Development phases
    └── analysis/               # Phase 4A-4E analytical reports
```

---

## 8. Documentation Index

1. [docs/PROJECT_PASSPORT.md](docs/PROJECT_PASSPORT.md) — System passport and scope boundaries
2. [docs/SG-IMPORT-PROTOCOL.md](docs/SG-IMPORT-PROTOCOL.md) — Registration & Verification Protocol
3. [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — Architectural layers, data pipelines, and gating
4. [docs/MATHEMATICAL_MODEL.md](docs/MATHEMATICAL_MODEL.md) — Group theory, rational arithmetic, and invariants
5. [docs/CLASSIFIER_CONTRACT.md](docs/CLASSIFIER_CONTRACT.md) — Normative classifier verdicts and decision rules
6. [docs/INTEGRATION_HISTORY.md](docs/INTEGRATION_HISTORY.md) — Step-by-step history of GROK integration
7. [docs/TESTING.md](docs/TESTING.md) — Execution status of all test suites and lint/build checks
8. [docs/LIMITATIONS.md](docs/LIMITATIONS.md) — Negative boundaries and prohibited claims
9. [docs/ROADMAP.md](docs/ROADMAP.md) — Engineering phases (5A docs, 5B test debt, 5C repair, 5D REST/UI, 6 catalog)

---

## 9. Current Status & Next Steps

* **Current Status:** Integrated Research Stand (Phases 5A-5E Packaging & API Exposure Complete; UI Unexposed; GCL-01 Isolated).
  - Classifier API (`POST /api/classify`) implemented in `server.ts` and boundary-tested (pending final API contract approval).
  - Classifier UI component (`ClassifierUI`) implemented; navigation tab unexposed in `App.tsx`.
  - 15 / 15 baseline test suites PASS per execution report (with caveat on HTTP API test process exit).
  - Mathematical core and catalog intact and unmodified.
* **Next Steps:**
  1. Phase 5F Status: Group closure module (`core/group_closure.ts`) is implemented as an isolated research module (`ISOLATED_MODULE_TESTED`; tests T1–T15 PASS per report; strictly unwired to matcher, API, or UI). Potential pipeline integration remains a proposal for future consideration, not an approved requirement.
  2. Phase 6: Systematic expansion to full 230 space groups.
