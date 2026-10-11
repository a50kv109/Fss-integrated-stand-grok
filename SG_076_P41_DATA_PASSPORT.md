# Data Passport: Space Group No. 76 (P 41)

## 1. Metadata
- **Number**: 76
- **Hermann–Mauguin Symbol**: P 41
- **Hall Symbol**: P 4w (Source: AFLOW/CCTBX/IUCr)
- **Crystal System**: Tetragonal
- **Point Group**: 4
- **Number of Operations**: 4

## 2. Operations (Canonical)
| # | Operator | Rotation (W) | Translation (w) |
|---|---|---|---|
| 1 | (x, y, z) | [[1,0,0], [0,1,0], [0,0,1]] | {numerator: 0, denominator: 1}, {numerator: 0, denominator: 1}, {numerator: 0, denominator: 1} |
| 2 | (-y, x, z+1/4) | [[0,-1,0], [1,0,0], [0,0,1]] | {numerator: 0, denominator: 1}, {numerator: 0, denominator: 1}, {numerator: 1, denominator: 4} |
| 3 | (-x, -y, z+1/2) | [[-1,0,0], [0,-1,0], [0,0,1]] | {numerator: 0, denominator: 1}, {numerator: 0, denominator: 1}, {numerator: 1, denominator: 2} |
| 4 | (y, -x, z+3/4) | [[0,1,0], [-1,0,0], [0,0,1]] | {numerator: 0, denominator: 1}, {numerator: 0, denominator: 1}, {numerator: 3, denominator: 4} |

## 3. Mathematical Verification
- **Screw Axis**: Operations define a $4_1$ screw axis along the [0,0,1] direction.
- **Generator Check**: The fourth power of operation #2 (the generator) is equal to a full integer translation $(0, 0, 1)$ along the c-axis, confirming the $4_1$ symmetry.
- **Verification Methodology**:
    - **Analytic**: Closure under group composition and symmetry properties of the screw axis generator have been verified analytically.
    - **Programmatic (Self-Consistency)**: The set of operations was verified against the classifier (`core/operation_set_match.ts`) using self-consistency check (`scripts/audit_sg76.ts`), resulting in `EXACT_MATCH`.
    - **Note**: Independent verification of operations against external crystallographic data is still required for absolute validation.
- **Registration Report**: Detailed mathematical analysis and validation can be found in `/docs/analysis/SG_076_P41_REGISTRATION_REPORT.md`.

## 4. Status
- **Protocol Stage**: 8. ACCEPT & DOCUMENT
- **Registration Status**: REGISTERED
- **Mathematical Status**: MATH_VERIFIED (Self-consistency only)
- **Integration Status**: INTEGRATION_VERIFIED
- **Reference**: Follows [SG-IMPORT-PROTOCOL.md](/docs/SG-IMPORT-PROTOCOL.md)
