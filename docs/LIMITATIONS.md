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
   * **Reality:** FSS currently contains exactly **8 space group settings** in its working catalog. Any query outside these 8 will return `NO_CANDIDATES`.
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
| **Expanded 230 Catalog** | `NOT_IMPLEMENTED` (8/230) | Queries for the other 222 space groups return `NO_CANDIDATES`. | Expand `core/registry.ts` using full ITA Volume A tables or authenticated Gemmi datasets. |
| **Dynamic Group Closure** | `NOT_IMPLEMENTED` in matcher | Incomplete generator sets fail strict matching. | Implement `group_closure.ts` to compute $\langle S \rangle$ via Todd-Coxeter or Schreier-Sims algorithms. |
| **Continuous Origin Shift Solver** | `NOT_IMPLEMENTED` (Only 1 shift) | Non-standard origin choices cannot be mapped to canonical settings. | Implement an exact rational linear programming solver for $\vec{w}' = \vec{w} + (W - I)\vec{x}_0 \pmod{\mathbb{Z}^3}$. |
| **Lattice Reduction ($GL_3(\mathbb{Z})$)** | `NOT_IMPLEMENTED` | Alternative cell settings (e.g. $P2_1/n$, $P2_1/a$) evaluate to `OPERATION_MISMATCH`. | Implement Delaunay or Gruber lattice basis reduction. |
| **Classifier UI / REST Exposure** | `NOT_IMPLEMENTED` (Sealed) | Users cannot run the classifier from the web interface. | Implement `/api/classify` endpoint and React match inspector component. |

---

## 3. Legacy Test Debt

* `core/property_evidence.test.ts` (asserts `reports.length === 4`, actual: 8)
* `core/schema/crystallographic_extractor.test.ts` (asserts `manifest.recordCount === 4`, actual: 8)

Both test files fail due to stale assertions from early development before the benchmark was expanded to 8 settings. They are preserved without modifications in Phase 5A to maintain zero code edits, and will be reconciled in Phase 5B.

---

## 4. Licensing & Intellectual Property Review

* **Current Status:** The repository contains no formal `LICENSE` file.
* **Component Provenance:**
  1. Base FSS system: Developed in Google AI Studio.
  2. GROK donor modules (`operation_set_profile.ts`, `operation_set_match.ts`): Derived from the GROK research archive.
  3. Benchmark data (`gemmi_benchmark_4.json`): Generated from Gemmi crystallographic library data.
* **Action Required by Owner:** The repository owner must determine the appropriate open-source license (e.g. MIT, Apache 2.0, BSD-3-Clause) and verify dual-origin permissions before making the GitHub repository publicly accessible.
