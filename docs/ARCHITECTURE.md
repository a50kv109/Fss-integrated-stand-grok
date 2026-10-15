# FSS — System Architecture

**Document:** `docs/ARCHITECTURE.md`  
**Status:** Baseline (Research Prototype)  
**Last Updated:** 2026-10-14  

---

## 1. High-Level Component Topology

FSS is organized into three tiers:

### Tier 1: Mathematical Core (`core/`)
* **`core/engine.ts`**: Runs symmetry experiments.
* **`core/generator.ts`**: Implements group generator algorithms.
* **`core/group_closure.ts`**: Computes group closure (research module, isolated).
* **`core/registry.ts`**: Catalog of space group settings.
* **`core/operation_set_match.ts`**: Two-stage candidate matcher.
* **`core/semiconductor_structures.ts`**: Basis for Si/Ge structures.
* **`core/space_group_catalog.ts`**: Space group catalog management.
* **`core/space_group_data_230.ts`**: Data for space groups (status: partial/research).

### Tier 2: Classification & Matching
* **`core/operation_set_match.ts`**: Matcher functionality.
* **`core/operation_set_profile.ts`**: Invariant profiler.

### Tier 3: Interface & Server
* **`App.tsx`**: React UI entry point.
* **`server.ts`**: API entry point.

---

## 2. Limitations
* The system is a research environment, not a fully validated library of all 230 space groups.
* The classification subsystem is gated and experimental.
* SG 227 (Fd-3m) results are currently under audit (see [docs/KNOWN_ISSUES.md](docs/KNOWN_ISSUES.md)).
