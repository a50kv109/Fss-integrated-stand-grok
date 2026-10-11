# FSS Integrated Research Stand — Engineering Roadmap

**Project:** Fedorov Symmetry Reasoning Stand (FSS)  
**Document:** `docs/ROADMAP.md`  
**Classification:** Canonical Project Roadmap  
**Status:** Active Engineering Plan  
**Last Updated:** 2026-10-11  

---

## 1. Roadmap Principles

* **No Premature Capabilities:** Features are marked as planned, not implemented.
* **Strict Epistemic Progression:** A capability is only exposed to higher tiers (UI, API) after it has passed in-memory unit tests, property tests, and normative contract specification.
* **Zero Magic / Zero Hallucination:** Algorithms must be exact, deterministic, and verifiable.

---

## 2. Development Phases

### Phase 5A — Repository Packaging & Publication Preparation (CURRENT)
* [x] Complete system inventory and codebase audit.
* [x] Establish canonical documentation suite in `docs/` (`PROJECT_PASSPORT`, `ARCHITECTURE`, `MATHEMATICAL_MODEL`, `CLASSIFIER_CONTRACT`, `INTEGRATION_HISTORY`, `TESTING`, `LIMITATIONS`, `ROADMAP`).
* [x] Create root `README.md`, `CONTRIBUTING.md`, and clean `.env.example`.
* [x] Preserve all Phase 4A–4E analytical artifacts in `docs/analysis/`.
* [x] Record test execution statuses and legacy test debt without modifying production code.
* [x] Gated stop for human repository review.

---

### Phase 5B — Legacy Test Debt Reconciliation (UPCOMING)
* [ ] Reconcile stale 4-record expectations in `core/property_evidence.test.ts` (update assertion from 4 to 8).
* [ ] Reconcile stale 4-record manifest check in `core/schema/crystallographic_extractor.test.ts` (update assertion from 4 to 8).
* [ ] Achieve 15/15 passing test files across the repository.

---

### Phase 5C — Group Closure Engine
* [ ] Implement `core/group_closure.ts`: Compute the algebraic closure $\langle S \rangle$ of a set of symmetry operations $S$ modulo $\mathbb{Z}^3$.
* [ ] Validate closure properties: identity existence, two-sided inverses, and composition closure.
* [ ] Enable classification of partial generator sets (e.g. expanding 2 generators into 4 operations before calling `filterCandidates`).

---

### Phase 5D — Controlled REST API & UI Matcher Exposure
* [ ] Implement `POST /api/classify` in `server.ts` with strict input validation and rate limiting.
* [ ] Ensure API responses adhere strictly to `TwoStageMatchReport` and `FSS_CLASSIFIER_CONTRACT.md`.
* [ ] Create React inspection component: "Symmetry Operation Classifier (8 Catalog Settings)".
* [ ] Enforce epistemic labeling: display matched settings, candidate pruning reasons, and explicit disclaimers when inputs do not match catalog entries.

---

### Phase 6 — Catalog Expansion (Path to 230 Space Groups)
* [ ] Design automated ingestion pipeline for International Tables for Crystallography (ITA) Volume A data.
* [ ] Ingest and validate triclinic, monoclinic, and orthorhombic space groups (Nos. 1–74).
* [ ] Expand to tetragonal, trigonal, hexagonal, and cubic crystal families (Nos. 75–230).
* [ ] Implement exact Delaunay/Niggli lattice reduction for arbitrary change-of-basis identification ($GL_3(\mathbb{Z})$).
