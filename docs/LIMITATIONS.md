# FSS Integrated Research Stand — Known Limitations & Prohibited Claims

**Project:** Fedorov Symmetry Reasoning Stand (FSS)  
**Document:** `docs/LIMITATIONS.md`  
**Classification:** Canonical Constraints Specification  
**Status:** Active Epistemic Guide  
**Last Updated:** 2026-10-11  

---

## 1. Prohibited Mathematical & Epistemic Claims

To preserve scientific rigor, all developers, documentation authors, and API consumers must adhere to the following negative boundaries. The following statements are **strictly false or unproven** in the current system and must never be asserted:

1. ❌ **PROHIBITED:** *"FSS classifies all 230 space groups."*  
   * **Reality:** FSS currently contains exactly **8 space group settings** in its working catalog. Queries for space groups outside these 8 return `NO_CANDIDATES` (if the invariant profile is incompatible with all 8 catalog settings) or `OPERATION_MISMATCH` (if the profile matches a catalog candidate but operations differ; or `SETTING_MISMATCH` if origin-shift equivalent to Group 19). They never return `EXACT_MATCH`.
2. ❌ **PROHIBITED:** *"Matching the invariant profile proves that the input is space group X."*  
   * **Reality:** The profile matches necessary linear invariants (orders, traces, determinants, inversion). Distinct groups sharing the same point group and linear invariants (e.g. $P2$ and $P21$) have identical profiles. Only Stage 2 strict canonical key matching can distinguish them.
3. ❌ **PROHIBITED:** *"FSS supports arbitrary or continuous origin shifts."*  
   * **Reality:** FSS supports origin shift equivalence **exclusively** for the specific standard shift $\vec{x}_0 = (1/4, 1/4, 1/4)$ in Space Group 19 ($P2_12_12_1$). An input with an arbitrary continuous or non-standard origin shift will evaluate to `OPERATION_MISMATCH`.
4. ❌ **PROHIBITED:** *"The matcher automatically computes group closure from generators."*  
   * **Reality:** The matcher compares the query multiset against the complete registered list of operations. Supplying only two generators for a four-operation group will result in `OPERATION_MISMATCH` because closure is not automatically expanded in the fast matcher path.
5. ❌ **PROHIBITED:** *"Passing test suites T1–T10 constitutes a universal mathematical proof of soundness."*  
   * **Reality:** The empirical passing of tests T1–T10 and S1–S16 proves soundness over the tested finite scenarios and the 8 registered catalog settings. It is not an unbounded formal proof over infinite arbitrary input domains.
6. ❌ **PROHIBITED:** *"FSS recognizes space groups under arbitrary change of basis."*  
   * **Reality:** General affine basis change $P \in GL_3(\mathbb{Z})$ (e.g. transformation between standard and non-standard settings, or Niggli/Delaunay lattice reduction) is not implemented. Operations must be supplied in the conventional coordinate orientation of the registered setting.

---

## 2. Technical & Algorithmic Gaps

| Capability | Status | Impact | Proposed Future Resolution |
|:---|:---:|:---|:---|
| **Expanded 230 Catalog** | `NOT_IMPLEMENTED` (8/230) | Queries outside the 8 catalog settings return `NO_CANDIDATES`, `OPERATION_MISMATCH`, or `SETTING_MISMATCH`; they cannot yield `EXACT_MATCH`. | Expand `core/registry.ts` and `REGISTERED_SETTING_IDS` using full ITA Volume A tables or authenticated Gemmi datasets. |
| **Dynamic Group Closure** | `NOT_IMPLEMENTED` in matcher | Incomplete generator sets fail strict matching. | Research module `core/group_closure.ts` implemented in isolation (`ISOLATED_MODULE_TESTED`); unwired from matcher. Pipeline integration remains a proposal for consideration. |
| **Continuous Origin Shift Solver** | `NOT_IMPLEMENTED` (Only 1 shift) | Non-standard origin choices cannot be mapped to canonical settings. | Implement an exact rational linear programming solver for $\vec{w}' = \vec{w} + (W - I)\vec{x}_0 \pmod{\mathbb{Z}^3}$. |
| **Lattice Reduction ($GL_3(\mathbb{Z})$)** | `NOT_IMPLEMENTED` | Alternative cell settings (e.g. $P2_1/n$, $P2_1/a$) evaluate to `OPERATION_MISMATCH`. | Implement Delaunay or Gruber lattice basis reduction. |
| **Classifier UI / REST Exposure** | `PARTIAL` | Endpoint `/api/classify` implemented in `server.ts` (contract pending final review); `ClassifierUI` exists but navigation tab is unexposed in `App.tsx`. | Expose UI navigation switcher upon final approval of classifier API contract. |

---

## 3. Test Reconciliation & Execution Status

Two legacy test debt items identified during Phase 5A were addressed in Phase 5B:
* `core/property_evidence.test.ts`: Updated benchmark report expectation from 4 to 8; replaced index-dependent `records[2]` with robust predicate lookup `records.find(r => r.spaceGroupNumber === 14)!` (`CODE_CONFIRMED`).
* `core/schema/crystallographic_extractor.test.ts`: Updated manifest record count and artifact length expectations from 4 to 8; replaced index-dependent `records[2]` with robust predicate lookup (`CODE_CONFIRMED`).

**Current Test Execution Status:**
* **Baseline Test Suites:** 15 / 15 test suites PASS per execution report (`REPORTED_PASS_WITH_CAVEAT`). Core mathematical and property suites pass assertions cleanly with exit code 0; however, `core/tests/http_api_classify.test.ts` has a known runtime caveat where assertions T1–T5 pass, but the process does not exit cleanly due to open server handles (`REPORTED_PASS_WITH_CAVEAT`).
* **Isolated Research Module (GCL-01):** T1–T15 pass in `core/group_closure.test.ts` per execution report (`TEST_REPORT_ONLY` / unwired module).
* **Static Analysis & Build:** `npm run lint` and `npm run build` pass per execution report.
* Independent external verification across all arbitrary environments remains unverified; claims of unconditional universal test perfection or zero remaining test debt across all unexercised paths are avoided.

---

## 4. Licensing & Intellectual Property Review

* **Current Status:** The repository contains no formal `LICENSE` file.
* **Component Provenance:**
  1. Base FSS system: Developed in Google AI Studio.
  2. GROK donor modules (`operation_set_profile.ts`, `operation_set_match.ts`): Derived from the GROK research archive.
  3. Benchmark data (`gemmi_benchmark_4.json`): Generated from Gemmi crystallographic library data.
* **Action Required by Owner:** The repository owner must determine the appropriate open-source license (e.g. MIT, Apache 2.0, BSD-3-Clause) and verify dual-origin permissions before making the GitHub repository publicly accessible.
