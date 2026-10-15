/**
 * Semiconductor Structures Module for FSS
 * Separates space group, cell parameters, and atomic basis for key microelectronic materials:
 * Si, Ge, GaAs, 3C-SiC, GaN.
 */

export interface AtomSite {
  element: string;
  label: string;
  fractionalCoordinates: [number, number, number];
  wyckoffLetter?: string;
  siteSymmetry?: string;
}

export interface SemiconductorStructure {
  materialName: string;
  formula: string;
  spaceGroupNumber: number;
  hmSymbol: string;
  settingId: string;
  crystalSystem: string;
  latticeParameters: {
    a: number; // Angstroms
    b?: number;
    c?: number; // Angstroms (for hexagonal)
    alpha?: number; // degrees
    beta?: number;
    gamma?: number;
  };
  atomicBasis: AtomSite[];
  description: string;
}

export const SEMICONDUCTOR_STRUCTURES: SemiconductorStructure[] = [
  {
    materialName: "Silicon",
    formula: "Si",
    spaceGroupNumber: 227,
    hmSymbol: "F d -3 m",
    settingId: "Fd-3m",
    crystalSystem: "Cubic",
    latticeParameters: {
      a: 5.431,
      alpha: 90,
      beta: 90,
      gamma: 90
    },
    atomicBasis: [
      { element: "Si", label: "Si1", fractionalCoordinates: [0.125, 0.125, 0.125], wyckoffLetter: "8a", siteSymmetry: "-3m" }
    ],
    description: "Diamond cubic structure with two interpenetrating face-centered cubic lattices offset by (1/4, 1/4, 1/4)."
  },
  {
    materialName: "Germanium",
    formula: "Ge",
    spaceGroupNumber: 227,
    hmSymbol: "F d -3 m",
    settingId: "Fd-3m",
    crystalSystem: "Cubic",
    latticeParameters: {
      a: 5.658,
      alpha: 90,
      beta: 90,
      gamma: 90
    },
    atomicBasis: [
      { element: "Ge", label: "Ge1", fractionalCoordinates: [0, 0, 0], wyckoffLetter: "8a", siteSymmetry: "-43m" },
      { element: "Ge", label: "Ge2", fractionalCoordinates: [0.25, 0.25, 0.25], wyckoffLetter: "8a", siteSymmetry: "-43m" }
    ],
    description: "Diamond cubic structure analogous to silicon with larger lattice constant."
  },
  {
    materialName: "Gallium Arsenide",
    formula: "GaAs",
    spaceGroupNumber: 216,
    hmSymbol: "F -4 3 m",
    settingId: "F-43m",
    crystalSystem: "Cubic",
    latticeParameters: {
      a: 5.653,
      alpha: 90,
      beta: 90,
      gamma: 90
    },
    atomicBasis: [
      { element: "Ga", label: "Ga1", fractionalCoordinates: [0, 0, 0], wyckoffLetter: "4a", siteSymmetry: "-43m" },
      { element: "As", label: "As1", fractionalCoordinates: [0.25, 0.25, 0.25], wyckoffLetter: "4c", siteSymmetry: "-43m" }
    ],
    description: "Zincblende structure lacking inversion center, composed of two interpenetrating FCC sublattices of Ga and As."
  },
  {
    materialName: "Cubic Silicon Carbide",
    formula: "3C-SiC",
    spaceGroupNumber: 216,
    hmSymbol: "F -4 3 m",
    settingId: "F-43m",
    crystalSystem: "Cubic",
    latticeParameters: {
      a: 4.359,
      alpha: 90,
      beta: 90,
      gamma: 90
    },
    atomicBasis: [
      { element: "Si", label: "Si1", fractionalCoordinates: [0, 0, 0], wyckoffLetter: "4a", siteSymmetry: "-43m" },
      { element: "C", label: "C1", fractionalCoordinates: [0.25, 0.25, 0.25], wyckoffLetter: "4c", siteSymmetry: "-43m" }
    ],
    description: "Zincblende (beta-SiC) wide bandgap semiconductor structure."
  },
  {
    materialName: "Gallium Nitride (Wurtzite)",
    formula: "GaN",
    spaceGroupNumber: 186,
    hmSymbol: "P 6_3 m c",
    settingId: "P6_3mc",
    crystalSystem: "Hexagonal",
    latticeParameters: {
      a: 3.189,
      c: 5.185,
      alpha: 90,
      beta: 90,
      gamma: 120
    },
    atomicBasis: [
      { element: "Ga", label: "Ga1", fractionalCoordinates: [1/3, 2/3, 0], wyckoffLetter: "2b", siteSymmetry: "3m" },
      { element: "Ga", label: "Ga2", fractionalCoordinates: [2/3, 1/3, 0.5], wyckoffLetter: "2b", siteSymmetry: "3m" },
      { element: "N", label: "N1", fractionalCoordinates: [1/3, 2/3, 0.375], wyckoffLetter: "2b", siteSymmetry: "3m" },
      { element: "N", label: "N2", fractionalCoordinates: [2/3, 1/3, 0.875], wyckoffLetter: "2b", siteSymmetry: "3m" }
    ],
    description: "Wurtzite hexagonal structure featuring screw axis 6_3 and non-centrosymmetric polar c-axis."
  }
];

export function getSemiconductorByFormula(formula: string): SemiconductorStructure | undefined {
  return SEMICONDUCTOR_STRUCTURES.find(s => s.formula.toLowerCase() === formula.toLowerCase());
}
