# FSS — Known Issues

## SG 227 Discrepancies
* **Symptom:** Generator produces 16 atoms for Si instead of 8; claims 96 operations instead of 192.
* **Status:** Diagnosed, fix planned.
* **Evidence:** Test `core/tests/sg227_comparison.test.ts` resulted in FAILED.
* **Closing Condition:** Implementation matches independent reference (192 ops).

## General
* **Catalog Completeness:** Catalog is partial (research-oriented), not a fully validated library of 230 space groups.
* **Testing Status:** Most components have test code available but lack confirmed execution logs (status: IMPLEMENTED_UNVERIFIED).
* **Dependency:** Missing external crystallographic libraries (spglib/gemmi) in sandbox.
