# FSS Integrated Research Stand — System Architecture

**Project:** Fedorov Symmetry Reasoning Stand (FSS)  
**Document:** `docs/ARCHITECTURE.md`  
**Classification:** Canonical System Architecture  
**Status:** Active Integrated Architecture  
**Last Updated:** 2026-10-11  

---

## 1. High-Level Component Topology

The FSS Integrated Stand is organized into four distinct architectural tiers:

```
+-----------------------------------------------------------------------------------------+
| TIER 1: USER INTERFACE & VISUALIZATION (src/ / App.tsx)                                 |
| - React 19 SPA with Tailwind CSS                                                        |
| - Three.js 3D Viewport: Interactive Regular Tetrahedron (TetrahedronViewport.tsx)       |
| - Symmetry Experiment Control: Operation selector, predicate selector, epsilon control  |
| - Evidence Inspection Panel: Real-time JSON evidence generation and clipboard copy       |
| - Harmonic Mode: LatticeVisualizer (2D SVG topological frequency lattice)               |
+-----------------------------------------------------------------------------------------+
                                             ▲
                                             │ HTTP / REST / Vite HMR
                                             ▼
+-----------------------------------------------------------------------------------------+
| TIER 2: SERVER & AGENT DISPATCHER (server.ts)                                           |
| - Express 5 running on Node.js / tsx (Port 3000)                                        |
| - POST /api/experiment -> Invokes core/engine.ts (Deterministic symmetry verification)  |
| - GET /api/experiment/canonical -> Serves canonical structures and operations           |
| - POST /api/synthesis -> Gemini API client for harmonic protocol analysis               |
| - Static file serving for Vite production build in dist/                                |
+-----------------------------------------------------------------------------------------+
                                             │
                                             ▼ In-Process Method Invocations
+-----------------------------------------------------------------------------------------+
| TIER 3: DETERMINISTIC MATHEMATICAL CORE (core/)                                         |
|                                                                                         |
|  [Affine Geometric Engine]                 [Reference Catalog & Exchange]               |
|  - engine.ts (runSymmetryExperiment)       - registry.ts (8 Canonical Settings)         |
|  - dimension.ts (Affine dimension 0-3)     - schema/crystallographic_exchange.ts        |
|  - canonical.ts (Tetrahedron, Ops)         - reference_loader.ts (Gemmi benchmark)      |
|  - group_properties.ts (Order, traces)     - property_evidence.ts                       |
+-----------------------------------------------------------------------------------------+
                                             │
                                             ▼ (In-Memory Algebraic Extension)
+-----------------------------------------------------------------------------------------+
| TIER 4: CLASSIFICATION & MATCHING SUBSYSTEM (EXP-09, Isolated in core/)                |
|                                                                                         |
|  [Stage 1: Invariant Profiler]             [Stage 2: Candidate Matcher]                 |
|  - core/operation_set_profile.ts           - core/operation_set_match.ts                |
|    * buildOperationSetProfile()              * filterCandidates()                       |
|    * Matrix order spectrum                   * matchStrict()                            |
|    * Trace & determinant histograms          * classifyOperationSet()                   |
|                                                                                         |
|  * GATED INTEGRATION BOUNDARY:                                                          |
|    Neither server.ts nor App.tsx currently import classifyOperationSet.                 |
|    The classifier is accessible via CLI, unit tests, and internal TypeScript imports.   |
+-----------------------------------------------------------------------------------------+
```

---

## 2. Component Directory & File Layout

```
.
├── App.tsx                     # Main React UI entry point (Tetrahedron Stand)
├── components/
│   ├── TetrahedronViewport.tsx # Three.js interactive 3D rendering of vertices & axes
│   └── LatticeVisualizer.tsx   # SVG lattice visualizer for space group modes
├── core/
│   ├── canonical.ts            # Canonical regular tetrahedron & symmetry operations
│   ├── dimension.ts            # 3D affine dimensionality calculator (0D, 1D, 2D, 3D)
│   ├── engine.ts               # Deterministic symmetry experiment execution engine
│   ├── filter_soundness.test.ts# EXP-09 candidate filter soundness test suite
│   ├── generator.ts            # Group generator algorithms
│   ├── group_properties.ts     # Affine algebra, matrix order detection, inversion midpoint
│   ├── importer.ts             # Crystallographic data importing routines
│   ├── operation_set_match.ts  # EXP-09 candidate filter & strict canonical matcher
│   ├── operation_set_profile.ts# EXP-09 coordinate-independent invariant profiler
│   ├── property_evidence.ts    # Evidence reporting for group properties
│   ├── reference_loader.ts     # Gemmi benchmark artifact loader & origin shift analyzer
│   ├── registry.ts             # Working catalog of 8 canonical space group settings
│   ├── schema/
│   │   ├── crystallographic_exchange.ts # BigInt ExactRational arithmetic & validation
│   │   └── crystallographic_extractor.ts# Data extraction tools
│   ├── symmetry_adapter.ts     # Bridge between internal types and external formats
│   ├── types.ts                # TypeScript interfaces for geometry and evidence
│   └── visualization_contract.ts# Contract for 3D rendering data structures
├── data/
│   └── crystallography/
│       └── gemmi_benchmark_4.json # 8-setting benchmark artifact from Gemmi
├── docs/                       # Comprehensive documentation suite
├── server.ts                   # Express server and API endpoints
└── package.json                # Project dependencies and npm scripts
```

---

## 3. Data Flow Pipelines

### A. The Interactive Verification Pipeline (Active in UI)
1. User selects a structure (`CANONICAL_TETRAHEDRON`) and an affine operation (e.g. $C_3$ 120° rotation or reflection).
2. User configures verification predicate (`PRESERVES_STRUCTURE`, `INVARIANT_SUBSPACE`) and distance threshold $\epsilon = 10^{-5}$.
3. UI invokes `runSymmetryExperiment(...)` from `core/engine.ts`:
   - Structure vertices are transformed via matrix multiplication $v' = W \cdot v + w$.
   - A bipartite nearest-neighbor matching algorithm pairs original and transformed vertices.
   - Root-mean-square deviation (RMSD) and max distance are computed.
   - A deterministic `Evidence` object is generated with timestamp, input hash, and boolean verdict.
4. UI renders the result in real-time in the Three.js viewport and emits full JSON evidence.

### B. The Space Group Classification Pipeline (EXP-09, In-Memory)
1. **Input:** Array of affine operations $(W, w)$ with exact rational translations.
2. **Stage 0 (Profile Extraction):** `buildOperationSetProfile` normalizes translations mod 1, computes distinct operation count, matrix orders, trace histogram, and inversion flag.
3. **Stage 1 (Candidate Filtering):** `filterCandidates` compares the invariant profile against the 8 settings in `SymmetryCatalog` and prunes incompatible groups (zero false negatives for catalog settings).
4. **Stage 2 (Strict Canonical Matching):** `matchStrict` generates canonical keys `${JSON(W)}|${w mod 1}` and evaluates bijective set equality. If exact match fails, it evaluates exact origin shift $x_0 = (1/4, 1/4, 1/4)$ for Group 19.
5. **Report Emission:** `classifyOperationSet` returns a typed `TwoStageMatchReport` with an explicit verdict.

---

## 4. Isolation & Gating Rationale

Why is the Classifier Subsystem not directly wired to the UI or REST API?
1. **Epistemic Discipline:** The working catalog contains 8 space group settings. Exposing it in the UI as a general "Space Group Identifier" risks misleading users into assuming it classifies all 230 space groups.
2. **Missing Group Closure Step:** Arbitrary user inputs might be incomplete generator sets. Without an automated closure engine, incomplete inputs will produce `OPERATION_MISMATCH` instead of being expanded.
3. **Intentional Human Review Gate:** In compliance with Phase 4E and Phase 5A requirements, code changes are locked until the normative contract and repository architecture are formally documented and approved.
