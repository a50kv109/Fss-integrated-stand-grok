/**
 * Crystal Structure Generator
 * Generates atomic positions from a space group and atomic basis.
 */

export interface Rational {
  numerator: number;
  denominator: number;
}

export interface Operation {
  W: number[][]; // 3x3 matrix of integers
  w: Rational[]; // 3x1 vector of rationals
}

export interface AtomBasis {
  element: string;
  coords: Rational[];
}

export interface GeneratedAtom {
  element: string;
  coords: Rational[];
}

// Rational arithmetic helpers
function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function simplify(r: Rational): Rational {
  const common = gcd(Math.abs(r.numerator), Math.abs(r.denominator));
  const res = { numerator: r.numerator / common, denominator: r.denominator / common };
  if (res.denominator < 0) {
    res.numerator = -res.numerator;
    res.denominator = -res.denominator;
  }
  return res;
}

function add(a: Rational, b: Rational): Rational {
  return simplify({
    numerator: a.numerator * b.denominator + b.numerator * a.denominator,
    denominator: a.denominator * b.denominator
  });
}

function multiply(a: Rational, b: Rational): Rational {
  return simplify({
    numerator: a.numerator * b.numerator,
    denominator: a.denominator * b.denominator
  });
}

function sub(a: Rational, b: Rational): Rational {
  return simplify({
    numerator: a.numerator * b.denominator - b.numerator * a.denominator,
    denominator: a.denominator * b.denominator
  });
}

// Modulo 1: returns value in [0, 1)
function mod1(r: Rational): Rational {
  let num = r.numerator % r.denominator;
  if (num < 0) num += r.denominator;
  return simplify({ numerator: num, denominator: r.denominator });
}

export function generateCrystalStructure(
  operations: Operation[],
  basis: AtomBasis[]
): GeneratedAtom[] {
  const generated: GeneratedAtom[] = [];

  for (const atom of basis) {
    for (const op of operations) {
      // W * pos + w
      const newPos: Rational[] = [
        { numerator: 0, denominator: 1 },
        { numerator: 0, denominator: 1 },
        { numerator: 0, denominator: 1 }
      ];

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const matVal = { numerator: op.W[i][j], denominator: 1 };
          newPos[i] = add(newPos[i], multiply(matVal, atom.coords[j]));
        }
        newPos[i] = add(newPos[i], op.w[i]);
        newPos[i] = mod1(newPos[i]);
      }

      generated.push({ element: atom.element, coords: newPos });
    }
  }

  // Remove equivalents
  return removeDuplicates(generated);
}

function isEquivalent(a: Rational[], b: Rational[]): boolean {
  for (let i = 0; i < 3; i++) {
    const diffNum = a[i].numerator * b[i].denominator - b[i].numerator * a[i].denominator;
    const diffDen = a[i].denominator * b[i].denominator;
    // Check if diff is integer
    if (diffNum % diffDen !== 0) return false;
  }
  return true;
}

function removeDuplicates(atoms: GeneratedAtom[]): GeneratedAtom[] {
  const unique: GeneratedAtom[] = [];
  for (const atom of atoms) {
    if (!unique.some(u => u.element === atom.element && isEquivalent(u.coords, atom.coords))) {
      unique.push(atom);
    }
  }
  return unique;
}
