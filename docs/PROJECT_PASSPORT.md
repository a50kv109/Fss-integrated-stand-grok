# FSS Integrated Research Stand — Project Passport

**Project:** Fedorov Symmetry Reasoning Stand (FSS)  
**Document:** `docs/PROJECT_PASSPORT.md`  
**Classification:** Canonical System Passport  
**Repository Target:** `fss-integrated-stand`  
**Status:** Integrated Research Stand (Post-Phase 4E Reconciliation)  
**Last Updated:** 2026-10-11  

---

## 1. System Mission & Identity

The **Fedorov Symmetry Reasoning Stand (FSS)** is an open-source, deterministic experimental research environment for the mathematical analysis, verification, and classification of crystallographic space groups.

Rooted in Evgraf S. Fedorov's classical 1891 geometric derivation of the 230 space groups, FSS pairs exact rational and vector-affine geometric engines with interactive 3D visualization and candidate representation matching.

### Provenance & System Integration
This repository represents an **integrated research stand**, combining:
1. **Studio FSS Baseline Architecture:** Vector-affine geometry engine, regular tetrahedron symmetry verification, 3D interactive Three.js viewport, 8-setting reference catalog (`core/registry.ts`), and exact rational exchange schema (`core/schema/crystallographic_exchange.ts`).
2. **Selectively Assimilated GROK v0.1.1 Capabilities:** Two-stage operation-set invariant profiler (`core/operation_set_profile.ts`) and candidate matcher (`core/operation_set_match.ts`), adapted from their original 4-setting prototype to Studio's BigInt-backed rational arithmetic and 8-setting catalog.

---

## 2. Core Epistemic Principles

FSS strictly adheres to epistemic demarcation in crystallographic computing:
* **Geometry State $\neq$ Epistemic Claim:** Geometric vertex transformations are physical simulations; mathematical symmetry classification requires formal algebraic proof.
* **Invariant Match $\neq$ Space Group Identification:** Matching a coordinate-independent profile is a necessary filter, never a sufficient proof of space group isomorphism.
* **Representation Equality $\neq$ Abstract Isomorphism:** Bijective matching of canonical operation keys proves identity within a fixed conventional basis modulo $\mathbb{Z}^3$, not under arbitrary affine transformations $GL_3(\mathbb{Z}) \ltimes \mathbb{R}^3$.
* **Finite Test Pass $\neq$ Universal Theorem:** Passing unit tests on 8 catalog settings validates the implementation on those settings; it is not extrapolated as an unverified theorem over infinite domains.
* **Zero Hidden Telemetry & Zero Hallucinated Claims:** The system emits exact diagnostic verdicts (`EXACT_MATCH`, `SETTING_MISMATCH`, `OPERATION_MISMATCH`, `AMBIGUOUS`, `NO_CANDIDATES`, `INVALID_INPUT`) without guessing or silent coercion.

---

## 3. Structural & Architectural Scope

| Layer | Implementation File(s) | Operational Status | Tested Status |
|:---|:---|:---:|:---:|
| **Affine Geometry Engine** | `core/engine.ts`, `core/dimension.ts`, `core/canonical.ts` | ACTIVE | PASS (64/64 dimension, 31/31 engine) |
| **Symmetry Registry (8 Settings)** | `core/registry.ts`, `data/gemmi_benchmark_4.json` | ACTIVE | PASS (`core/registry.test.ts`) |
| **Rational Arithmetic & Exchange** | `core/schema/crystallographic_exchange.ts` | ACTIVE | PASS (`core/schema/crystallographic_exchange.test.ts`) |
| **Invariant Profiler (EXP-09)** | `core/operation_set_profile.ts` | ACTIVE | PASS (`core/operation_set_profile.test.ts`) |
| **Candidate Matcher (EXP-09)** | `core/operation_set_match.ts` | ACTIVE (In-Memory) | PASS (`core/filter_soundness.test.ts`) |
| **Interactive UI & 3D Viewport** | `App.tsx`, `components/TetrahedronViewport.tsx` | ACTIVE | PASS (Vite Production Build) |
| **Backend Service & Gemini API** | `server.ts` | ACTIVE | PASS (TypeScript / Express) |
| **Classifier API / UI Wiring** | N/A | **INTENTIONALLY SEALED** | Gated pending human audit |

---

## 4. Key Artifacts & References

* **Normative Classifier Contract:** `docs/CLASSIFIER_CONTRACT.md` (and `docs/analysis/FSS_CLASSIFIER_CONTRACT.md`)
* **System Architecture:** `docs/ARCHITECTURE.md`
* **Mathematical Specification:** `docs/MATHEMATICAL_MODEL.md`
* **Integration History (GROK Assimilation):** `docs/INTEGRATION_HISTORY.md`
* **Test Verification & Test Debt:** `docs/TESTING.md`
* **Known Limitations & Open Problems:** `docs/LIMITATIONS.md`
* **Development Roadmap:** `docs/ROADMAP.md`
* **Historical Audit Reports:** `docs/analysis/PHASE_4A_PREINTEGRATION_VALIDATION.md` through `docs/analysis/PHASE_4E_DOCUMENTATION_RECONCILIATION.md`
