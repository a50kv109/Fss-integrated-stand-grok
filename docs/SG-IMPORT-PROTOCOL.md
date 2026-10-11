# SG-IMPORT-PROTOCOL.md

## Standard Space Group Registration & Verification Protocol

### Purpose
To define a normalized, rigorous algorithm for the intake, mathematical verification, registration, and integration testing of any new space group in FSS V2. All future group registrations MUST follow this protocol.

### Stages of Registration

1. **IDENTIFY**: Confirm space group number, HM symbol, and Hall symbol with authoritative sources (ITA, CCTBX). Status: `UNVERIFIED`.
2. **NORMALIZE**: Translate operations into canonical FSS format (Rotation matrix, fractional translation).
3. **VALIDATE DATA**: Verify syntax and type compliance with `SymmetryRecord`. Status: `DATA_VALIDATED`.
4. **VERIFY MATH**:
    - Perform manual derivation of fundamental symmetries (e.g., screw axes).
    - Perform programmatic self-consistency checks.
    - Status: `MATH_VERIFIED`.
5. **RECONCILE**: Generate `ANALYSIS/SG_XXX_REGISTRATION_REPORT.md` detailing proofs and limitations.
6. **REGISTER**: Add entry to `core/registry.ts`. Status: `REGISTERED`.
7. **INTEGRATE**: Add unit tests to `core/registry.test.ts`. Verify integration via classifier. Status: `INTEGRATION_VERIFIED`.
8. **ACCEPT & DOCUMENT**: Finalize `DATA_PASSPORT.md` and `REGISTRATION_REPORT.md`. Status: `COMPLIANT`.

### Status Codes
- `UNVERIFIED`: Initial stage.
- `DATA_VALIDATED`: Basic data validated.
- `MATH_VERIFIED`: Math verified.
- `REGISTERED`: In registry.ts.
- `INTEGRATION_VERIFIED`: Classifier integration tested.
- `COMPLIANT`: Documentation finalized, all checks passed.

*Note: The enforcement of this protocol is procedural/normative and not currently strictly enforced by automated build tooling.*
