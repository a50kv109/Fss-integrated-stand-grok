# Fedorov Symmetry Stand (FSS)

**A Deterministic Crystallographic Symmetry Reasoning & Classification Environment**

## 1. Overview & Mission
The **Fedorov Symmetry Reasoning Stand (FSS)** is an research-oriented stand designed for the deterministic verification, analysis, and representation matching of crystallographic space groups.

FSS provides:
* A **deterministic vector-affine geometric engine** for testing symmetry operations on structures with exact rational arithmetic.
* An **interactive 3D visualization environment** for symmetry experiments.
* An **in-memory classification subsystem** combining invariant profiling with canonical key matching modulo unit-cell translations $\mathbb{Z}^3$.

## 2. Current System Status (Baseline)
The system is in a **prototype research phase**. While the mathematical core and research architecture are established, the library of space groups, full catalog of operations, and verification of scientific correctness remain in progress.

* **Mathematical Core:** Implemented and functional for tested scenarios.
* **Space Group Coverage:** Partial. The registry contains a limited set of settings for research purposes.
* **Verification Status:** Ongoing. SG 227 (Fd-3m) is currently under diagnostic audit due to observed discrepancies in operations (96 vs 192) and atom count (16 vs 8).
* **Documentation Status:** This baseline documentation reflects the confirmed state as of 2026-10-14.

## 3. Documentation Index
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md): Component topology and data flow.
- [docs/VERIFICATION_STATUS.md](docs/VERIFICATION_STATUS.md): Registry of evidence and status for modules.
- [docs/KNOWN_ISSUES.md](docs/KNOWN_ISSUES.md): Known defects and limitations.

## 4. Environment & Getting Started
* **Node.js:** v18.0.0 or higher.
* **Installation:** `npm install`
* **Development:** `npm run dev`

---
*Status: Research Prototype — Not for production use.*
