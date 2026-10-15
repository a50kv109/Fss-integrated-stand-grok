/**
 * Authoritative 230 Space Groups Catalog Data from Gemmi / ITA
 */

export type SpaceGroupDataStatus =
  | "CATALOG_METADATA_AVAILABLE"
  | "MODEL_AVAILABLE"
  | "MODEL_VERIFIED"
  | "MODEL_INCOMPLETE"
  | "NOT_AVAILABLE";

export interface SpaceGroupSettingEntry {
  number: number;
  ccp4: number;
  hm: string;
  ext: string;
  qualifier: string;
  hall: string;
  basis_op_id: number;
  settingId: string;
}

export interface SpaceGroupCatalogItem {
  number: number;
  crystalSystem: "triclinic" | "monoclinic" | "orthorhombic" | "tetragonal" | "trigonal" | "hexagonal" | "cubic";
  standardHm: string;
  standardHall: string;
  centering: string;
  status: SpaceGroupDataStatus;
  settings: SpaceGroupSettingEntry[];
  hasVerifiedModel: boolean;
  verifiedSettings: string[];
}

export const SPACE_GROUPS_230_DATA: SpaceGroupCatalogItem[] = [
  {
    "number": 1,
    "crystalSystem": "triclinic",
    "standardHm": "P 1",
    "standardHall": "P 1",
    "centering": "P",
    "settings": [
      {
        "number": 1,
        "ccp4": 1,
        "hm": "P 1",
        "ext": "0",
        "qualifier": "",
        "hall": "P 1",
        "basis_op_id": 0,
        "settingId": "P1"
      },
      {
        "number": 1,
        "ccp4": 0,
        "hm": "A 1",
        "ext": "0",
        "qualifier": "",
        "hall": "A 1",
        "basis_op_id": 41,
        "settingId": "A1"
      },
      {
        "number": 1,
        "ccp4": 0,
        "hm": "B 1",
        "ext": "0",
        "qualifier": "",
        "hall": "B 1",
        "basis_op_id": 42,
        "settingId": "B1"
      },
      {
        "number": 1,
        "ccp4": 0,
        "hm": "C 1",
        "ext": "0",
        "qualifier": "",
        "hall": "C 1",
        "basis_op_id": 43,
        "settingId": "C1"
      },
      {
        "number": 1,
        "ccp4": 0,
        "hm": "F 1",
        "ext": "0",
        "qualifier": "",
        "hall": "F 1",
        "basis_op_id": 44,
        "settingId": "F1"
      },
      {
        "number": 1,
        "ccp4": 0,
        "hm": "I 1",
        "ext": "0",
        "qualifier": "",
        "hall": "I 1",
        "basis_op_id": 45,
        "settingId": "I1"
      }
    ],
    "hasVerifiedModel": true,
    "status": "MODEL_VERIFIED",
    "verifiedSettings": [
      "P1"
    ]
  },
  {
    "number": 2,
    "crystalSystem": "triclinic",
    "standardHm": "P -1",
    "standardHall": "-P 1",
    "centering": "P",
    "settings": [
      {
        "number": 2,
        "ccp4": 2,
        "hm": "P -1",
        "ext": "0",
        "qualifier": "",
        "hall": "-P 1",
        "basis_op_id": 0,
        "settingId": "P-1"
      },
      {
        "number": 2,
        "ccp4": 0,
        "hm": "A -1",
        "ext": "0",
        "qualifier": "",
        "hall": "-A 1",
        "basis_op_id": 41,
        "settingId": "A-1"
      },
      {
        "number": 2,
        "ccp4": 0,
        "hm": "B -1",
        "ext": "0",
        "qualifier": "",
        "hall": "-B 1",
        "basis_op_id": 42,
        "settingId": "B-1"
      },
      {
        "number": 2,
        "ccp4": 0,
        "hm": "C -1",
        "ext": "0",
        "qualifier": "",
        "hall": "-C 1",
        "basis_op_id": 43,
        "settingId": "C-1"
      },
      {
        "number": 2,
        "ccp4": 0,
        "hm": "F -1",
        "ext": "0",
        "qualifier": "",
        "hall": "-F 1",
        "basis_op_id": 44,
        "settingId": "F-1"
      },
      {
        "number": 2,
        "ccp4": 0,
        "hm": "I -1",
        "ext": "0",
        "qualifier": "",
        "hall": "-I 1",
        "basis_op_id": 45,
        "settingId": "I-1"
      }
    ],
    "hasVerifiedModel": true,
    "status": "MODEL_VERIFIED",
    "verifiedSettings": [
      "P-1"
    ]
  },
  {
    "number": 3,
    "crystalSystem": "monoclinic",
    "standardHm": "P 1 2 1",
    "standardHall": "P 2y",
    "centering": "P",
    "settings": [
      {
        "number": 3,
        "ccp4": 3,
        "hm": "P 1 2 1",
        "ext": "0",
        "qualifier": "b",
        "hall": "P 2y",
        "basis_op_id": 0,
        "settingId": "P121_b"
      },
      {
        "number": 3,
        "ccp4": 1003,
        "hm": "P 1 1 2",
        "ext": "0",
        "qualifier": "c",
        "hall": "P 2",
        "basis_op_id": 1,
        "settingId": "P112_c"
      },
      {
        "number": 3,
        "ccp4": 0,
        "hm": "P 2 1 1",
        "ext": "0",
        "qualifier": "a",
        "hall": "P 2x",
        "basis_op_id": 2,
        "settingId": "P211_a"
      },
      {
        "number": 3,
        "ccp4": 0,
        "hm": "B 1 2 1",
        "ext": "0",
        "qualifier": "b1",
        "hall": "B 2y",
        "basis_op_id": 46,
        "settingId": "B121_b1"
      },
      {
        "number": 3,
        "ccp4": 0,
        "hm": "C 1 1 2",
        "ext": "0",
        "qualifier": "c1",
        "hall": "C 2",
        "basis_op_id": 47,
        "settingId": "C112_c1"
      }
    ],
    "hasVerifiedModel": true,
    "status": "MODEL_VERIFIED",
    "verifiedSettings": [
      "P2"
    ]
  },
  {
    "number": 4,
    "crystalSystem": "monoclinic",
    "standardHm": "P 1 21 1",
    "standardHall": "P 2yb",
    "centering": "P",
    "settings": [
      {
        "number": 4,
        "ccp4": 4,
        "hm": "P 1 21 1",
        "ext": "0",
        "qualifier": "b",
        "hall": "P 2yb",
        "basis_op_id": 0,
        "settingId": "P1211_b"
      },
      {
        "number": 4,
        "ccp4": 1004,
        "hm": "P 1 1 21",
        "ext": "0",
        "qualifier": "c",
        "hall": "P 2c",
        "basis_op_id": 1,
        "settingId": "P1121_c"
      },
      {
        "number": 4,
        "ccp4": 0,
        "hm": "P 21 1 1",
        "ext": "0",
        "qualifier": "a",
        "hall": "P 2xa",
        "basis_op_id": 2,
        "settingId": "P2111_a"
      },
      {
        "number": 4,
        "ccp4": 0,
        "hm": "B 1 21 1",
        "ext": "0",
        "qualifier": "b1",
        "hall": "B 2yb",
        "basis_op_id": 46,
        "settingId": "B1211_b1"
      },
      {
        "number": 4,
        "ccp4": 0,
        "hm": "C 1 1 21",
        "ext": "0",
        "qualifier": "c2",
        "hall": "C 2c",
        "basis_op_id": 47,
        "settingId": "C1121_c2"
      }
    ],
    "hasVerifiedModel": true,
    "status": "MODEL_VERIFIED",
    "verifiedSettings": [
      "P21"
    ]
  },
  {
    "number": 5,
    "crystalSystem": "monoclinic",
    "standardHm": "C 1 2 1",
    "standardHall": "C 2y",
    "centering": "C",
    "settings": [
      {
        "number": 5,
        "ccp4": 5,
        "hm": "C 1 2 1",
        "ext": "0",
        "qualifier": "b1",
        "hall": "C 2y",
        "basis_op_id": 0,
        "settingId": "C2"
      },
      {
        "number": 5,
        "ccp4": 2005,
        "hm": "A 1 2 1",
        "ext": "0",
        "qualifier": "b2",
        "hall": "A 2y",
        "basis_op_id": 3,
        "settingId": "A121_b2"
      },
      {
        "number": 5,
        "ccp4": 4005,
        "hm": "I 1 2 1",
        "ext": "0",
        "qualifier": "b3",
        "hall": "I 2y",
        "basis_op_id": 4,
        "settingId": "I121_b3"
      },
      {
        "number": 5,
        "ccp4": 0,
        "hm": "A 1 1 2",
        "ext": "0",
        "qualifier": "c1",
        "hall": "A 2",
        "basis_op_id": 1,
        "settingId": "A112_c1"
      },
      {
        "number": 5,
        "ccp4": 1005,
        "hm": "B 1 1 2",
        "ext": "0",
        "qualifier": "c2",
        "hall": "B 2",
        "basis_op_id": 5,
        "settingId": "B112_c2"
      },
      {
        "number": 5,
        "ccp4": 0,
        "hm": "I 1 1 2",
        "ext": "0",
        "qualifier": "c3",
        "hall": "I 2",
        "basis_op_id": 6,
        "settingId": "I112_c3"
      },
      {
        "number": 5,
        "ccp4": 0,
        "hm": "B 2 1 1",
        "ext": "0",
        "qualifier": "a1",
        "hall": "B 2x",
        "basis_op_id": 2,
        "settingId": "B211_a1"
      },
      {
        "number": 5,
        "ccp4": 0,
        "hm": "C 2 1 1",
        "ext": "0",
        "qualifier": "a2",
        "hall": "C 2x",
        "basis_op_id": 7,
        "settingId": "C211_a2"
      },
      {
        "number": 5,
        "ccp4": 0,
        "hm": "I 2 1 1",
        "ext": "0",
        "qualifier": "a3",
        "hall": "I 2x",
        "basis_op_id": 8,
        "settingId": "I211_a3"
      },
      {
        "number": 5,
        "ccp4": 5005,
        "hm": "I 1 21 1",
        "ext": "0",
        "qualifier": "b4",
        "hall": "I 2yb",
        "basis_op_id": 38,
        "settingId": "I1211_b4"
      },
      {
        "number": 5,
        "ccp4": 3005,
        "hm": "C 1 21 1",
        "ext": "0",
        "qualifier": "b5",
        "hall": "C 2yb",
        "basis_op_id": 14,
        "settingId": "C1211_b5"
      },
      {
        "number": 5,
        "ccp4": 0,
        "hm": "F 1 2 1",
        "ext": "0",
        "qualifier": "b6",
        "hall": "F 2y",
        "basis_op_id": 48,
        "settingId": "F121_b6"
      }
    ],
    "hasVerifiedModel": true,
    "status": "MODEL_VERIFIED",
    "verifiedSettings": [
      "C2"
    ]
  },
  {
    "number": 6,
    "crystalSystem": "monoclinic",
    "standardHm": "P 1 m 1",
    "standardHall": "P -2y",
    "centering": "P",
    "settings": [
      {
        "number": 6,
        "ccp4": 6,
        "hm": "P 1 m 1",
        "ext": "0",
        "qualifier": "b",
        "hall": "P -2y",
        "basis_op_id": 0,
        "settingId": "P1m1_b"
      },
      {
        "number": 6,
        "ccp4": 1006,
        "hm": "P 1 1 m",
        "ext": "0",
        "qualifier": "c",
        "hall": "P -2",
        "basis_op_id": 1,
        "settingId": "P11m_c"
      },
      {
        "number": 6,
        "ccp4": 0,
        "hm": "P m 1 1",
        "ext": "0",
        "qualifier": "a",
        "hall": "P -2x",
        "basis_op_id": 2,
        "settingId": "Pm11_a"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 7,
    "crystalSystem": "monoclinic",
    "standardHm": "P 1 c 1",
    "standardHall": "P -2yc",
    "centering": "P",
    "settings": [
      {
        "number": 7,
        "ccp4": 7,
        "hm": "P 1 c 1",
        "ext": "0",
        "qualifier": "b1",
        "hall": "P -2yc",
        "basis_op_id": 0,
        "settingId": "P1c1_b1"
      },
      {
        "number": 7,
        "ccp4": 0,
        "hm": "P 1 n 1",
        "ext": "0",
        "qualifier": "b2",
        "hall": "P -2yac",
        "basis_op_id": 9,
        "settingId": "P1n1_b2"
      },
      {
        "number": 7,
        "ccp4": 0,
        "hm": "P 1 a 1",
        "ext": "0",
        "qualifier": "b3",
        "hall": "P -2ya",
        "basis_op_id": 3,
        "settingId": "P1a1_b3"
      },
      {
        "number": 7,
        "ccp4": 0,
        "hm": "P 1 1 a",
        "ext": "0",
        "qualifier": "c1",
        "hall": "P -2a",
        "basis_op_id": 1,
        "settingId": "P11a_c1"
      },
      {
        "number": 7,
        "ccp4": 0,
        "hm": "P 1 1 n",
        "ext": "0",
        "qualifier": "c2",
        "hall": "P -2ab",
        "basis_op_id": 10,
        "settingId": "P11n_c2"
      },
      {
        "number": 7,
        "ccp4": 1007,
        "hm": "P 1 1 b",
        "ext": "0",
        "qualifier": "c3",
        "hall": "P -2b",
        "basis_op_id": 5,
        "settingId": "P11b_c3"
      },
      {
        "number": 7,
        "ccp4": 0,
        "hm": "P b 1 1",
        "ext": "0",
        "qualifier": "a1",
        "hall": "P -2xb",
        "basis_op_id": 2,
        "settingId": "Pb11_a1"
      },
      {
        "number": 7,
        "ccp4": 0,
        "hm": "P n 1 1",
        "ext": "0",
        "qualifier": "a2",
        "hall": "P -2xbc",
        "basis_op_id": 11,
        "settingId": "Pn11_a2"
      },
      {
        "number": 7,
        "ccp4": 0,
        "hm": "P c 1 1",
        "ext": "0",
        "qualifier": "a3",
        "hall": "P -2xc",
        "basis_op_id": 7,
        "settingId": "Pc11_a3"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 8,
    "crystalSystem": "monoclinic",
    "standardHm": "C 1 m 1",
    "standardHall": "C -2y",
    "centering": "C",
    "settings": [
      {
        "number": 8,
        "ccp4": 8,
        "hm": "C 1 m 1",
        "ext": "0",
        "qualifier": "b1",
        "hall": "C -2y",
        "basis_op_id": 0,
        "settingId": "C1m1_b1"
      },
      {
        "number": 8,
        "ccp4": 0,
        "hm": "A 1 m 1",
        "ext": "0",
        "qualifier": "b2",
        "hall": "A -2y",
        "basis_op_id": 3,
        "settingId": "A1m1_b2"
      },
      {
        "number": 8,
        "ccp4": 0,
        "hm": "I 1 m 1",
        "ext": "0",
        "qualifier": "b3",
        "hall": "I -2y",
        "basis_op_id": 4,
        "settingId": "I1m1_b3"
      },
      {
        "number": 8,
        "ccp4": 0,
        "hm": "A 1 1 m",
        "ext": "0",
        "qualifier": "c1",
        "hall": "A -2",
        "basis_op_id": 1,
        "settingId": "A11m_c1"
      },
      {
        "number": 8,
        "ccp4": 1008,
        "hm": "B 1 1 m",
        "ext": "0",
        "qualifier": "c2",
        "hall": "B -2",
        "basis_op_id": 5,
        "settingId": "B11m_c2"
      },
      {
        "number": 8,
        "ccp4": 0,
        "hm": "I 1 1 m",
        "ext": "0",
        "qualifier": "c3",
        "hall": "I -2",
        "basis_op_id": 6,
        "settingId": "I11m_c3"
      },
      {
        "number": 8,
        "ccp4": 0,
        "hm": "B m 1 1",
        "ext": "0",
        "qualifier": "a1",
        "hall": "B -2x",
        "basis_op_id": 2,
        "settingId": "Bm11_a1"
      },
      {
        "number": 8,
        "ccp4": 0,
        "hm": "C m 1 1",
        "ext": "0",
        "qualifier": "a2",
        "hall": "C -2x",
        "basis_op_id": 7,
        "settingId": "Cm11_a2"
      },
      {
        "number": 8,
        "ccp4": 0,
        "hm": "I m 1 1",
        "ext": "0",
        "qualifier": "a3",
        "hall": "I -2x",
        "basis_op_id": 8,
        "settingId": "Im11_a3"
      },
      {
        "number": 8,
        "ccp4": 0,
        "hm": "F 1 m 1",
        "ext": "0",
        "qualifier": "b4",
        "hall": "F -2y",
        "basis_op_id": 48,
        "settingId": "F1m1_b4"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 9,
    "crystalSystem": "monoclinic",
    "standardHm": "C 1 c 1",
    "standardHall": "C -2yc",
    "centering": "C",
    "settings": [
      {
        "number": 9,
        "ccp4": 9,
        "hm": "C 1 c 1",
        "ext": "0",
        "qualifier": "b1",
        "hall": "C -2yc",
        "basis_op_id": 0,
        "settingId": "Cc"
      },
      {
        "number": 9,
        "ccp4": 0,
        "hm": "A 1 n 1",
        "ext": "0",
        "qualifier": "b2",
        "hall": "A -2yab",
        "basis_op_id": 12,
        "settingId": "A1n1_b2"
      },
      {
        "number": 9,
        "ccp4": 0,
        "hm": "I 1 a 1",
        "ext": "0",
        "qualifier": "b3",
        "hall": "I -2ya",
        "basis_op_id": 13,
        "settingId": "I1a1_b3"
      },
      {
        "number": 9,
        "ccp4": 0,
        "hm": "A 1 a 1",
        "ext": "0",
        "qualifier": "-b1",
        "hall": "A -2ya",
        "basis_op_id": 3,
        "settingId": "A1a1_-b1"
      },
      {
        "number": 9,
        "ccp4": 0,
        "hm": "C 1 n 1",
        "ext": "0",
        "qualifier": "-b2",
        "hall": "C -2yac",
        "basis_op_id": 14,
        "settingId": "C1n1_-b2"
      },
      {
        "number": 9,
        "ccp4": 0,
        "hm": "I 1 c 1",
        "ext": "0",
        "qualifier": "-b3",
        "hall": "I -2yc",
        "basis_op_id": 4,
        "settingId": "I1c1_-b3"
      },
      {
        "number": 9,
        "ccp4": 0,
        "hm": "A 1 1 a",
        "ext": "0",
        "qualifier": "c1",
        "hall": "A -2a",
        "basis_op_id": 1,
        "settingId": "A11a_c1"
      },
      {
        "number": 9,
        "ccp4": 0,
        "hm": "B 1 1 n",
        "ext": "0",
        "qualifier": "c2",
        "hall": "B -2ab",
        "basis_op_id": 15,
        "settingId": "B11n_c2"
      },
      {
        "number": 9,
        "ccp4": 0,
        "hm": "I 1 1 b",
        "ext": "0",
        "qualifier": "c3",
        "hall": "I -2b",
        "basis_op_id": 16,
        "settingId": "I11b_c3"
      },
      {
        "number": 9,
        "ccp4": 1009,
        "hm": "B 1 1 b",
        "ext": "0",
        "qualifier": "-c1",
        "hall": "B -2b",
        "basis_op_id": 5,
        "settingId": "B11b_-c1"
      },
      {
        "number": 9,
        "ccp4": 0,
        "hm": "A 1 1 n",
        "ext": "0",
        "qualifier": "-c2",
        "hall": "A -2ab",
        "basis_op_id": 10,
        "settingId": "A11n_-c2"
      },
      {
        "number": 9,
        "ccp4": 0,
        "hm": "I 1 1 a",
        "ext": "0",
        "qualifier": "-c3",
        "hall": "I -2a",
        "basis_op_id": 6,
        "settingId": "I11a_-c3"
      },
      {
        "number": 9,
        "ccp4": 0,
        "hm": "B b 1 1",
        "ext": "0",
        "qualifier": "a1",
        "hall": "B -2xb",
        "basis_op_id": 2,
        "settingId": "Bb11_a1"
      },
      {
        "number": 9,
        "ccp4": 0,
        "hm": "C n 1 1",
        "ext": "0",
        "qualifier": "a2",
        "hall": "C -2xac",
        "basis_op_id": 17,
        "settingId": "Cn11_a2"
      },
      {
        "number": 9,
        "ccp4": 0,
        "hm": "I c 1 1",
        "ext": "0",
        "qualifier": "a3",
        "hall": "I -2xc",
        "basis_op_id": 18,
        "settingId": "Ic11_a3"
      },
      {
        "number": 9,
        "ccp4": 0,
        "hm": "C c 1 1",
        "ext": "0",
        "qualifier": "-a1",
        "hall": "C -2xc",
        "basis_op_id": 7,
        "settingId": "Cc11_-a1"
      },
      {
        "number": 9,
        "ccp4": 0,
        "hm": "B n 1 1",
        "ext": "0",
        "qualifier": "-a2",
        "hall": "B -2xab",
        "basis_op_id": 11,
        "settingId": "Bn11_-a2"
      },
      {
        "number": 9,
        "ccp4": 0,
        "hm": "I b 1 1",
        "ext": "0",
        "qualifier": "-a3",
        "hall": "I -2xb",
        "basis_op_id": 8,
        "settingId": "Ib11_-a3"
      },
      {
        "number": 9,
        "ccp4": 0,
        "hm": "F 1 d 1",
        "ext": "0",
        "qualifier": "b4",
        "hall": "F -2yuw",
        "basis_op_id": 49,
        "settingId": "F1d1_b4"
      }
    ],
    "hasVerifiedModel": true,
    "status": "MODEL_VERIFIED",
    "verifiedSettings": [
      "Cc"
    ]
  },
  {
    "number": 10,
    "crystalSystem": "monoclinic",
    "standardHm": "P 1 2/m 1",
    "standardHall": "-P 2y",
    "centering": "P",
    "settings": [
      {
        "number": 10,
        "ccp4": 10,
        "hm": "P 1 2/m 1",
        "ext": "0",
        "qualifier": "b",
        "hall": "-P 2y",
        "basis_op_id": 0,
        "settingId": "P12/m1_b"
      },
      {
        "number": 10,
        "ccp4": 1010,
        "hm": "P 1 1 2/m",
        "ext": "0",
        "qualifier": "c",
        "hall": "-P 2",
        "basis_op_id": 1,
        "settingId": "P112/m_c"
      },
      {
        "number": 10,
        "ccp4": 0,
        "hm": "P 2/m 1 1",
        "ext": "0",
        "qualifier": "a",
        "hall": "-P 2x",
        "basis_op_id": 2,
        "settingId": "P2/m11_a"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 11,
    "crystalSystem": "monoclinic",
    "standardHm": "P 1 21/m 1",
    "standardHall": "-P 2yb",
    "centering": "P",
    "settings": [
      {
        "number": 11,
        "ccp4": 11,
        "hm": "P 1 21/m 1",
        "ext": "0",
        "qualifier": "b",
        "hall": "-P 2yb",
        "basis_op_id": 0,
        "settingId": "P121/m1_b"
      },
      {
        "number": 11,
        "ccp4": 1011,
        "hm": "P 1 1 21/m",
        "ext": "0",
        "qualifier": "c",
        "hall": "-P 2c",
        "basis_op_id": 1,
        "settingId": "P1121/m_c"
      },
      {
        "number": 11,
        "ccp4": 0,
        "hm": "P 21/m 1 1",
        "ext": "0",
        "qualifier": "a",
        "hall": "-P 2xa",
        "basis_op_id": 2,
        "settingId": "P21/m11_a"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 12,
    "crystalSystem": "monoclinic",
    "standardHm": "C 1 2/m 1",
    "standardHall": "-C 2y",
    "centering": "C",
    "settings": [
      {
        "number": 12,
        "ccp4": 12,
        "hm": "C 1 2/m 1",
        "ext": "0",
        "qualifier": "b1",
        "hall": "-C 2y",
        "basis_op_id": 0,
        "settingId": "C12/m1_b1"
      },
      {
        "number": 12,
        "ccp4": 0,
        "hm": "A 1 2/m 1",
        "ext": "0",
        "qualifier": "b2",
        "hall": "-A 2y",
        "basis_op_id": 3,
        "settingId": "A12/m1_b2"
      },
      {
        "number": 12,
        "ccp4": 0,
        "hm": "I 1 2/m 1",
        "ext": "0",
        "qualifier": "b3",
        "hall": "-I 2y",
        "basis_op_id": 4,
        "settingId": "I12/m1_b3"
      },
      {
        "number": 12,
        "ccp4": 0,
        "hm": "A 1 1 2/m",
        "ext": "0",
        "qualifier": "c1",
        "hall": "-A 2",
        "basis_op_id": 1,
        "settingId": "A112/m_c1"
      },
      {
        "number": 12,
        "ccp4": 1012,
        "hm": "B 1 1 2/m",
        "ext": "0",
        "qualifier": "c2",
        "hall": "-B 2",
        "basis_op_id": 5,
        "settingId": "B112/m_c2"
      },
      {
        "number": 12,
        "ccp4": 0,
        "hm": "I 1 1 2/m",
        "ext": "0",
        "qualifier": "c3",
        "hall": "-I 2",
        "basis_op_id": 6,
        "settingId": "I112/m_c3"
      },
      {
        "number": 12,
        "ccp4": 0,
        "hm": "B 2/m 1 1",
        "ext": "0",
        "qualifier": "a1",
        "hall": "-B 2x",
        "basis_op_id": 2,
        "settingId": "B2/m11_a1"
      },
      {
        "number": 12,
        "ccp4": 0,
        "hm": "C 2/m 1 1",
        "ext": "0",
        "qualifier": "a2",
        "hall": "-C 2x",
        "basis_op_id": 7,
        "settingId": "C2/m11_a2"
      },
      {
        "number": 12,
        "ccp4": 0,
        "hm": "I 2/m 1 1",
        "ext": "0",
        "qualifier": "a3",
        "hall": "-I 2x",
        "basis_op_id": 8,
        "settingId": "I2/m11_a3"
      },
      {
        "number": 12,
        "ccp4": 0,
        "hm": "F 1 2/m 1",
        "ext": "0",
        "qualifier": "b4",
        "hall": "-F 2y",
        "basis_op_id": 48,
        "settingId": "F12/m1_b4"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 13,
    "crystalSystem": "monoclinic",
    "standardHm": "P 1 2/c 1",
    "standardHall": "-P 2yc",
    "centering": "P",
    "settings": [
      {
        "number": 13,
        "ccp4": 13,
        "hm": "P 1 2/c 1",
        "ext": "0",
        "qualifier": "b1",
        "hall": "-P 2yc",
        "basis_op_id": 0,
        "settingId": "P12/c1_b1"
      },
      {
        "number": 13,
        "ccp4": 0,
        "hm": "P 1 2/n 1",
        "ext": "0",
        "qualifier": "b2",
        "hall": "-P 2yac",
        "basis_op_id": 9,
        "settingId": "P12/n1_b2"
      },
      {
        "number": 13,
        "ccp4": 0,
        "hm": "P 1 2/a 1",
        "ext": "0",
        "qualifier": "b3",
        "hall": "-P 2ya",
        "basis_op_id": 3,
        "settingId": "P12/a1_b3"
      },
      {
        "number": 13,
        "ccp4": 0,
        "hm": "P 1 1 2/a",
        "ext": "0",
        "qualifier": "c1",
        "hall": "-P 2a",
        "basis_op_id": 1,
        "settingId": "P112/a_c1"
      },
      {
        "number": 13,
        "ccp4": 0,
        "hm": "P 1 1 2/n",
        "ext": "0",
        "qualifier": "c2",
        "hall": "-P 2ab",
        "basis_op_id": 10,
        "settingId": "P112/n_c2"
      },
      {
        "number": 13,
        "ccp4": 1013,
        "hm": "P 1 1 2/b",
        "ext": "0",
        "qualifier": "c3",
        "hall": "-P 2b",
        "basis_op_id": 5,
        "settingId": "P112/b_c3"
      },
      {
        "number": 13,
        "ccp4": 0,
        "hm": "P 2/b 1 1",
        "ext": "0",
        "qualifier": "a1",
        "hall": "-P 2xb",
        "basis_op_id": 2,
        "settingId": "P2/b11_a1"
      },
      {
        "number": 13,
        "ccp4": 0,
        "hm": "P 2/n 1 1",
        "ext": "0",
        "qualifier": "a2",
        "hall": "-P 2xbc",
        "basis_op_id": 11,
        "settingId": "P2/n11_a2"
      },
      {
        "number": 13,
        "ccp4": 0,
        "hm": "P 2/c 1 1",
        "ext": "0",
        "qualifier": "a3",
        "hall": "-P 2xc",
        "basis_op_id": 7,
        "settingId": "P2/c11_a3"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 14,
    "crystalSystem": "monoclinic",
    "standardHm": "P 1 21/c 1",
    "standardHall": "-P 2ybc",
    "centering": "P",
    "settings": [
      {
        "number": 14,
        "ccp4": 14,
        "hm": "P 1 21/c 1",
        "ext": "0",
        "qualifier": "b1",
        "hall": "-P 2ybc",
        "basis_op_id": 0,
        "settingId": "P121/c1_b1"
      },
      {
        "number": 14,
        "ccp4": 2014,
        "hm": "P 1 21/n 1",
        "ext": "0",
        "qualifier": "b2",
        "hall": "-P 2yn",
        "basis_op_id": 9,
        "settingId": "P121/n1_b2"
      },
      {
        "number": 14,
        "ccp4": 3014,
        "hm": "P 1 21/a 1",
        "ext": "0",
        "qualifier": "b3",
        "hall": "-P 2yab",
        "basis_op_id": 3,
        "settingId": "P121/a1_b3"
      },
      {
        "number": 14,
        "ccp4": 0,
        "hm": "P 1 1 21/a",
        "ext": "0",
        "qualifier": "c1",
        "hall": "-P 2ac",
        "basis_op_id": 1,
        "settingId": "P1121/a_c1"
      },
      {
        "number": 14,
        "ccp4": 0,
        "hm": "P 1 1 21/n",
        "ext": "0",
        "qualifier": "c2",
        "hall": "-P 2n",
        "basis_op_id": 10,
        "settingId": "P1121/n_c2"
      },
      {
        "number": 14,
        "ccp4": 1014,
        "hm": "P 1 1 21/b",
        "ext": "0",
        "qualifier": "c3",
        "hall": "-P 2bc",
        "basis_op_id": 5,
        "settingId": "P1121/b_c3"
      },
      {
        "number": 14,
        "ccp4": 0,
        "hm": "P 21/b 1 1",
        "ext": "0",
        "qualifier": "a1",
        "hall": "-P 2xab",
        "basis_op_id": 2,
        "settingId": "P21/b11_a1"
      },
      {
        "number": 14,
        "ccp4": 0,
        "hm": "P 21/n 1 1",
        "ext": "0",
        "qualifier": "a2",
        "hall": "-P 2xn",
        "basis_op_id": 11,
        "settingId": "P21/n11_a2"
      },
      {
        "number": 14,
        "ccp4": 0,
        "hm": "P 21/c 1 1",
        "ext": "0",
        "qualifier": "a3",
        "hall": "-P 2xac",
        "basis_op_id": 7,
        "settingId": "P21/c11_a3"
      }
    ],
    "hasVerifiedModel": true,
    "status": "MODEL_VERIFIED",
    "verifiedSettings": [
      "P21/c"
    ]
  },
  {
    "number": 15,
    "crystalSystem": "monoclinic",
    "standardHm": "C 1 2/c 1",
    "standardHall": "-C 2yc",
    "centering": "C",
    "settings": [
      {
        "number": 15,
        "ccp4": 15,
        "hm": "C 1 2/c 1",
        "ext": "0",
        "qualifier": "b1",
        "hall": "-C 2yc",
        "basis_op_id": 0,
        "settingId": "C12/c1_b1"
      },
      {
        "number": 15,
        "ccp4": 0,
        "hm": "A 1 2/n 1",
        "ext": "0",
        "qualifier": "b2",
        "hall": "-A 2yab",
        "basis_op_id": 12,
        "settingId": "A12/n1_b2"
      },
      {
        "number": 15,
        "ccp4": 0,
        "hm": "I 1 2/a 1",
        "ext": "0",
        "qualifier": "b3",
        "hall": "-I 2ya",
        "basis_op_id": 13,
        "settingId": "I12/a1_b3"
      },
      {
        "number": 15,
        "ccp4": 0,
        "hm": "A 1 2/a 1",
        "ext": "0",
        "qualifier": "-b1",
        "hall": "-A 2ya",
        "basis_op_id": 3,
        "settingId": "A12/a1_-b1"
      },
      {
        "number": 15,
        "ccp4": 0,
        "hm": "C 1 2/n 1",
        "ext": "0",
        "qualifier": "-b2",
        "hall": "-C 2yac",
        "basis_op_id": 19,
        "settingId": "C12/n1_-b2"
      },
      {
        "number": 15,
        "ccp4": 0,
        "hm": "I 1 2/c 1",
        "ext": "0",
        "qualifier": "-b3",
        "hall": "-I 2yc",
        "basis_op_id": 4,
        "settingId": "I12/c1_-b3"
      },
      {
        "number": 15,
        "ccp4": 0,
        "hm": "A 1 1 2/a",
        "ext": "0",
        "qualifier": "c1",
        "hall": "-A 2a",
        "basis_op_id": 1,
        "settingId": "A112/a_c1"
      },
      {
        "number": 15,
        "ccp4": 0,
        "hm": "B 1 1 2/n",
        "ext": "0",
        "qualifier": "c2",
        "hall": "-B 2ab",
        "basis_op_id": 15,
        "settingId": "B112/n_c2"
      },
      {
        "number": 15,
        "ccp4": 0,
        "hm": "I 1 1 2/b",
        "ext": "0",
        "qualifier": "c3",
        "hall": "-I 2b",
        "basis_op_id": 16,
        "settingId": "I112/b_c3"
      },
      {
        "number": 15,
        "ccp4": 1015,
        "hm": "B 1 1 2/b",
        "ext": "0",
        "qualifier": "-c1",
        "hall": "-B 2b",
        "basis_op_id": 5,
        "settingId": "B112/b_-c1"
      },
      {
        "number": 15,
        "ccp4": 0,
        "hm": "A 1 1 2/n",
        "ext": "0",
        "qualifier": "-c2",
        "hall": "-A 2ab",
        "basis_op_id": 10,
        "settingId": "A112/n_-c2"
      },
      {
        "number": 15,
        "ccp4": 0,
        "hm": "I 1 1 2/a",
        "ext": "0",
        "qualifier": "-c3",
        "hall": "-I 2a",
        "basis_op_id": 6,
        "settingId": "I112/a_-c3"
      },
      {
        "number": 15,
        "ccp4": 0,
        "hm": "B 2/b 1 1",
        "ext": "0",
        "qualifier": "a1",
        "hall": "-B 2xb",
        "basis_op_id": 2,
        "settingId": "B2/b11_a1"
      },
      {
        "number": 15,
        "ccp4": 0,
        "hm": "C 2/n 1 1",
        "ext": "0",
        "qualifier": "a2",
        "hall": "-C 2xac",
        "basis_op_id": 17,
        "settingId": "C2/n11_a2"
      },
      {
        "number": 15,
        "ccp4": 0,
        "hm": "I 2/c 1 1",
        "ext": "0",
        "qualifier": "a3",
        "hall": "-I 2xc",
        "basis_op_id": 18,
        "settingId": "I2/c11_a3"
      },
      {
        "number": 15,
        "ccp4": 0,
        "hm": "C 2/c 1 1",
        "ext": "0",
        "qualifier": "-a1",
        "hall": "-C 2xc",
        "basis_op_id": 7,
        "settingId": "C2/c11_-a1"
      },
      {
        "number": 15,
        "ccp4": 0,
        "hm": "B 2/n 1 1",
        "ext": "0",
        "qualifier": "-a2",
        "hall": "-B 2xab",
        "basis_op_id": 11,
        "settingId": "B2/n11_-a2"
      },
      {
        "number": 15,
        "ccp4": 0,
        "hm": "I 2/b 1 1",
        "ext": "0",
        "qualifier": "-a3",
        "hall": "-I 2xb",
        "basis_op_id": 8,
        "settingId": "I2/b11_-a3"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 16,
    "crystalSystem": "orthorhombic",
    "standardHm": "P 2 2 2",
    "standardHall": "P 2 2",
    "centering": "P",
    "settings": [
      {
        "number": 16,
        "ccp4": 16,
        "hm": "P 2 2 2",
        "ext": "0",
        "qualifier": "",
        "hall": "P 2 2",
        "basis_op_id": 0,
        "settingId": "P222"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 17,
    "crystalSystem": "orthorhombic",
    "standardHm": "P 2 2 21",
    "standardHall": "P 2c 2",
    "centering": "P",
    "settings": [
      {
        "number": 17,
        "ccp4": 17,
        "hm": "P 2 2 21",
        "ext": "0",
        "qualifier": "",
        "hall": "P 2c 2",
        "basis_op_id": 0,
        "settingId": "P2221"
      },
      {
        "number": 17,
        "ccp4": 1017,
        "hm": "P 21 2 2",
        "ext": "0",
        "qualifier": "cab",
        "hall": "P 2a 2a",
        "basis_op_id": 1,
        "settingId": "P2122_cab"
      },
      {
        "number": 17,
        "ccp4": 2017,
        "hm": "P 2 21 2",
        "ext": "0",
        "qualifier": "bca",
        "hall": "P 2 2b",
        "basis_op_id": 2,
        "settingId": "P2212_bca"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 18,
    "crystalSystem": "orthorhombic",
    "standardHm": "P 21 21 2",
    "standardHall": "P 2 2ab",
    "centering": "P",
    "settings": [
      {
        "number": 18,
        "ccp4": 18,
        "hm": "P 21 21 2",
        "ext": "0",
        "qualifier": "",
        "hall": "P 2 2ab",
        "basis_op_id": 0,
        "settingId": "P21212"
      },
      {
        "number": 18,
        "ccp4": 3018,
        "hm": "P 2 21 21",
        "ext": "0",
        "qualifier": "cab",
        "hall": "P 2bc 2",
        "basis_op_id": 1,
        "settingId": "P22121_cab"
      },
      {
        "number": 18,
        "ccp4": 2018,
        "hm": "P 21 2 21",
        "ext": "0",
        "qualifier": "bca",
        "hall": "P 2ac 2ac",
        "basis_op_id": 2,
        "settingId": "P21221_bca"
      },
      {
        "number": 18,
        "ccp4": 1018,
        "hm": "P 21212(a)",
        "ext": "0",
        "qualifier": "",
        "hall": "P 2ab 2a",
        "basis_op_id": 14,
        "settingId": "P21212(a)"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 19,
    "crystalSystem": "orthorhombic",
    "standardHm": "P 21 21 21",
    "standardHall": "P 2ac 2ab",
    "centering": "P",
    "settings": [
      {
        "number": 19,
        "ccp4": 19,
        "hm": "P 21 21 21",
        "ext": "0",
        "qualifier": "",
        "hall": "P 2ac 2ab",
        "basis_op_id": 0,
        "settingId": "P212121"
      }
    ],
    "hasVerifiedModel": true,
    "status": "MODEL_VERIFIED",
    "verifiedSettings": [
      "P212121"
    ]
  },
  {
    "number": 20,
    "crystalSystem": "orthorhombic",
    "standardHm": "C 2 2 21",
    "standardHall": "C 2c 2",
    "centering": "C",
    "settings": [
      {
        "number": 20,
        "ccp4": 20,
        "hm": "C 2 2 21",
        "ext": "0",
        "qualifier": "",
        "hall": "C 2c 2",
        "basis_op_id": 0,
        "settingId": "C2221"
      },
      {
        "number": 20,
        "ccp4": 0,
        "hm": "A 21 2 2",
        "ext": "0",
        "qualifier": "cab",
        "hall": "A 2a 2a",
        "basis_op_id": 1,
        "settingId": "A2122_cab"
      },
      {
        "number": 20,
        "ccp4": 0,
        "hm": "B 2 21 2",
        "ext": "0",
        "qualifier": "bca",
        "hall": "B 2 2b",
        "basis_op_id": 2,
        "settingId": "B2212_bca"
      },
      {
        "number": 20,
        "ccp4": 1020,
        "hm": "C 2 2 21a)",
        "ext": "0",
        "qualifier": "",
        "hall": "C 2ac 2",
        "basis_op_id": 39,
        "settingId": "C2221a)"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 21,
    "crystalSystem": "orthorhombic",
    "standardHm": "C 2 2 2",
    "standardHall": "C 2 2",
    "centering": "C",
    "settings": [
      {
        "number": 21,
        "ccp4": 21,
        "hm": "C 2 2 2",
        "ext": "0",
        "qualifier": "",
        "hall": "C 2 2",
        "basis_op_id": 0,
        "settingId": "C222"
      },
      {
        "number": 21,
        "ccp4": 0,
        "hm": "A 2 2 2",
        "ext": "0",
        "qualifier": "cab",
        "hall": "A 2 2",
        "basis_op_id": 1,
        "settingId": "A222_cab"
      },
      {
        "number": 21,
        "ccp4": 0,
        "hm": "B 2 2 2",
        "ext": "0",
        "qualifier": "bca",
        "hall": "B 2 2",
        "basis_op_id": 2,
        "settingId": "B222_bca"
      },
      {
        "number": 21,
        "ccp4": 1021,
        "hm": "C 2 2 2a",
        "ext": "0",
        "qualifier": "",
        "hall": "C 2ab 2b",
        "basis_op_id": 14,
        "settingId": "C222a"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 22,
    "crystalSystem": "orthorhombic",
    "standardHm": "F 2 2 2",
    "standardHall": "F 2 2",
    "centering": "F",
    "settings": [
      {
        "number": 22,
        "ccp4": 22,
        "hm": "F 2 2 2",
        "ext": "0",
        "qualifier": "",
        "hall": "F 2 2",
        "basis_op_id": 0,
        "settingId": "F222"
      },
      {
        "number": 22,
        "ccp4": 1022,
        "hm": "F 2 2 2a",
        "ext": "0",
        "qualifier": "",
        "hall": "F 2 2c",
        "basis_op_id": 40,
        "settingId": "F222a"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 23,
    "crystalSystem": "orthorhombic",
    "standardHm": "I 2 2 2",
    "standardHall": "I 2 2",
    "centering": "I",
    "settings": [
      {
        "number": 23,
        "ccp4": 23,
        "hm": "I 2 2 2",
        "ext": "0",
        "qualifier": "",
        "hall": "I 2 2",
        "basis_op_id": 0,
        "settingId": "I222"
      },
      {
        "number": 23,
        "ccp4": 1023,
        "hm": "I 2 2 2a",
        "ext": "0",
        "qualifier": "",
        "hall": "I 2ab 2bc",
        "basis_op_id": 33,
        "settingId": "I222a"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 24,
    "crystalSystem": "orthorhombic",
    "standardHm": "I 21 21 21",
    "standardHall": "I 2b 2c",
    "centering": "I",
    "settings": [
      {
        "number": 24,
        "ccp4": 24,
        "hm": "I 21 21 21",
        "ext": "0",
        "qualifier": "",
        "hall": "I 2b 2c",
        "basis_op_id": 0,
        "settingId": "I212121"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 25,
    "crystalSystem": "orthorhombic",
    "standardHm": "P m m 2",
    "standardHall": "P 2 -2",
    "centering": "P",
    "settings": [
      {
        "number": 25,
        "ccp4": 25,
        "hm": "P m m 2",
        "ext": "0",
        "qualifier": "",
        "hall": "P 2 -2",
        "basis_op_id": 0,
        "settingId": "Pmm2"
      },
      {
        "number": 25,
        "ccp4": 0,
        "hm": "P 2 m m",
        "ext": "0",
        "qualifier": "cab",
        "hall": "P -2 2",
        "basis_op_id": 1,
        "settingId": "P2mm_cab"
      },
      {
        "number": 25,
        "ccp4": 0,
        "hm": "P m 2 m",
        "ext": "0",
        "qualifier": "bca",
        "hall": "P -2 -2",
        "basis_op_id": 2,
        "settingId": "Pm2m_bca"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 26,
    "crystalSystem": "orthorhombic",
    "standardHm": "P m c 21",
    "standardHall": "P 2c -2",
    "centering": "P",
    "settings": [
      {
        "number": 26,
        "ccp4": 26,
        "hm": "P m c 21",
        "ext": "0",
        "qualifier": "",
        "hall": "P 2c -2",
        "basis_op_id": 0,
        "settingId": "Pmc21"
      },
      {
        "number": 26,
        "ccp4": 0,
        "hm": "P c m 21",
        "ext": "0",
        "qualifier": "ba-c",
        "hall": "P 2c -2c",
        "basis_op_id": 7,
        "settingId": "Pcm21_ba-c"
      },
      {
        "number": 26,
        "ccp4": 0,
        "hm": "P 21 m a",
        "ext": "0",
        "qualifier": "cab",
        "hall": "P -2a 2a",
        "basis_op_id": 1,
        "settingId": "P21ma_cab"
      },
      {
        "number": 26,
        "ccp4": 0,
        "hm": "P 21 a m",
        "ext": "0",
        "qualifier": "-cba",
        "hall": "P -2 2a",
        "basis_op_id": 3,
        "settingId": "P21am_-cba"
      },
      {
        "number": 26,
        "ccp4": 0,
        "hm": "P b 21 m",
        "ext": "0",
        "qualifier": "bca",
        "hall": "P -2 -2b",
        "basis_op_id": 2,
        "settingId": "Pb21m_bca"
      },
      {
        "number": 26,
        "ccp4": 0,
        "hm": "P m 21 b",
        "ext": "0",
        "qualifier": "a-cb",
        "hall": "P -2b -2",
        "basis_op_id": 5,
        "settingId": "Pm21b_a-cb"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 27,
    "crystalSystem": "orthorhombic",
    "standardHm": "P c c 2",
    "standardHall": "P 2 -2c",
    "centering": "P",
    "settings": [
      {
        "number": 27,
        "ccp4": 27,
        "hm": "P c c 2",
        "ext": "0",
        "qualifier": "",
        "hall": "P 2 -2c",
        "basis_op_id": 0,
        "settingId": "Pcc2"
      },
      {
        "number": 27,
        "ccp4": 0,
        "hm": "P 2 a a",
        "ext": "0",
        "qualifier": "cab",
        "hall": "P -2a 2",
        "basis_op_id": 1,
        "settingId": "P2aa_cab"
      },
      {
        "number": 27,
        "ccp4": 0,
        "hm": "P b 2 b",
        "ext": "0",
        "qualifier": "bca",
        "hall": "P -2b -2b",
        "basis_op_id": 2,
        "settingId": "Pb2b_bca"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 28,
    "crystalSystem": "orthorhombic",
    "standardHm": "P m a 2",
    "standardHall": "P 2 -2a",
    "centering": "P",
    "settings": [
      {
        "number": 28,
        "ccp4": 28,
        "hm": "P m a 2",
        "ext": "0",
        "qualifier": "",
        "hall": "P 2 -2a",
        "basis_op_id": 0,
        "settingId": "Pma2"
      },
      {
        "number": 28,
        "ccp4": 0,
        "hm": "P b m 2",
        "ext": "0",
        "qualifier": "ba-c",
        "hall": "P 2 -2b",
        "basis_op_id": 7,
        "settingId": "Pbm2_ba-c"
      },
      {
        "number": 28,
        "ccp4": 0,
        "hm": "P 2 m b",
        "ext": "0",
        "qualifier": "cab",
        "hall": "P -2b 2",
        "basis_op_id": 1,
        "settingId": "P2mb_cab"
      },
      {
        "number": 28,
        "ccp4": 0,
        "hm": "P 2 c m",
        "ext": "0",
        "qualifier": "-cba",
        "hall": "P -2c 2",
        "basis_op_id": 3,
        "settingId": "P2cm_-cba"
      },
      {
        "number": 28,
        "ccp4": 0,
        "hm": "P c 2 m",
        "ext": "0",
        "qualifier": "bca",
        "hall": "P -2c -2c",
        "basis_op_id": 2,
        "settingId": "Pc2m_bca"
      },
      {
        "number": 28,
        "ccp4": 0,
        "hm": "P m 2 a",
        "ext": "0",
        "qualifier": "a-cb",
        "hall": "P -2a -2a",
        "basis_op_id": 5,
        "settingId": "Pm2a_a-cb"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 29,
    "crystalSystem": "orthorhombic",
    "standardHm": "P c a 21",
    "standardHall": "P 2c -2ac",
    "centering": "P",
    "settings": [
      {
        "number": 29,
        "ccp4": 29,
        "hm": "P c a 21",
        "ext": "0",
        "qualifier": "",
        "hall": "P 2c -2ac",
        "basis_op_id": 0,
        "settingId": "Pca21"
      },
      {
        "number": 29,
        "ccp4": 0,
        "hm": "P b c 21",
        "ext": "0",
        "qualifier": "ba-c",
        "hall": "P 2c -2b",
        "basis_op_id": 7,
        "settingId": "Pbc21_ba-c"
      },
      {
        "number": 29,
        "ccp4": 0,
        "hm": "P 21 a b",
        "ext": "0",
        "qualifier": "cab",
        "hall": "P -2b 2a",
        "basis_op_id": 1,
        "settingId": "P21ab_cab"
      },
      {
        "number": 29,
        "ccp4": 0,
        "hm": "P 21 c a",
        "ext": "0",
        "qualifier": "-cba",
        "hall": "P -2ac 2a",
        "basis_op_id": 3,
        "settingId": "P21ca_-cba"
      },
      {
        "number": 29,
        "ccp4": 0,
        "hm": "P c 21 b",
        "ext": "0",
        "qualifier": "bca",
        "hall": "P -2bc -2c",
        "basis_op_id": 2,
        "settingId": "Pc21b_bca"
      },
      {
        "number": 29,
        "ccp4": 0,
        "hm": "P b 21 a",
        "ext": "0",
        "qualifier": "a-cb",
        "hall": "P -2a -2ab",
        "basis_op_id": 5,
        "settingId": "Pb21a_a-cb"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 30,
    "crystalSystem": "orthorhombic",
    "standardHm": "P n c 2",
    "standardHall": "P 2 -2bc",
    "centering": "P",
    "settings": [
      {
        "number": 30,
        "ccp4": 30,
        "hm": "P n c 2",
        "ext": "0",
        "qualifier": "",
        "hall": "P 2 -2bc",
        "basis_op_id": 0,
        "settingId": "Pnc2"
      },
      {
        "number": 30,
        "ccp4": 0,
        "hm": "P c n 2",
        "ext": "0",
        "qualifier": "ba-c",
        "hall": "P 2 -2ac",
        "basis_op_id": 7,
        "settingId": "Pcn2_ba-c"
      },
      {
        "number": 30,
        "ccp4": 0,
        "hm": "P 2 n a",
        "ext": "0",
        "qualifier": "cab",
        "hall": "P -2ac 2",
        "basis_op_id": 1,
        "settingId": "P2na_cab"
      },
      {
        "number": 30,
        "ccp4": 0,
        "hm": "P 2 a n",
        "ext": "0",
        "qualifier": "-cba",
        "hall": "P -2ab 2",
        "basis_op_id": 3,
        "settingId": "P2an_-cba"
      },
      {
        "number": 30,
        "ccp4": 0,
        "hm": "P b 2 n",
        "ext": "0",
        "qualifier": "bca",
        "hall": "P -2ab -2ab",
        "basis_op_id": 2,
        "settingId": "Pb2n_bca"
      },
      {
        "number": 30,
        "ccp4": 0,
        "hm": "P n 2 b",
        "ext": "0",
        "qualifier": "a-cb",
        "hall": "P -2bc -2bc",
        "basis_op_id": 5,
        "settingId": "Pn2b_a-cb"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 31,
    "crystalSystem": "orthorhombic",
    "standardHm": "P m n 21",
    "standardHall": "P 2ac -2",
    "centering": "P",
    "settings": [
      {
        "number": 31,
        "ccp4": 31,
        "hm": "P m n 21",
        "ext": "0",
        "qualifier": "",
        "hall": "P 2ac -2",
        "basis_op_id": 0,
        "settingId": "Pmn21"
      },
      {
        "number": 31,
        "ccp4": 0,
        "hm": "P n m 21",
        "ext": "0",
        "qualifier": "ba-c",
        "hall": "P 2bc -2bc",
        "basis_op_id": 7,
        "settingId": "Pnm21_ba-c"
      },
      {
        "number": 31,
        "ccp4": 0,
        "hm": "P 21 m n",
        "ext": "0",
        "qualifier": "cab",
        "hall": "P -2ab 2ab",
        "basis_op_id": 1,
        "settingId": "P21mn_cab"
      },
      {
        "number": 31,
        "ccp4": 0,
        "hm": "P 21 n m",
        "ext": "0",
        "qualifier": "-cba",
        "hall": "P -2 2ac",
        "basis_op_id": 3,
        "settingId": "P21nm_-cba"
      },
      {
        "number": 31,
        "ccp4": 0,
        "hm": "P n 21 m",
        "ext": "0",
        "qualifier": "bca",
        "hall": "P -2 -2bc",
        "basis_op_id": 2,
        "settingId": "Pn21m_bca"
      },
      {
        "number": 31,
        "ccp4": 0,
        "hm": "P m 21 n",
        "ext": "0",
        "qualifier": "a-cb",
        "hall": "P -2ab -2",
        "basis_op_id": 5,
        "settingId": "Pm21n_a-cb"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 32,
    "crystalSystem": "orthorhombic",
    "standardHm": "P b a 2",
    "standardHall": "P 2 -2ab",
    "centering": "P",
    "settings": [
      {
        "number": 32,
        "ccp4": 32,
        "hm": "P b a 2",
        "ext": "0",
        "qualifier": "",
        "hall": "P 2 -2ab",
        "basis_op_id": 0,
        "settingId": "Pba2"
      },
      {
        "number": 32,
        "ccp4": 0,
        "hm": "P 2 c b",
        "ext": "0",
        "qualifier": "cab",
        "hall": "P -2bc 2",
        "basis_op_id": 1,
        "settingId": "P2cb_cab"
      },
      {
        "number": 32,
        "ccp4": 0,
        "hm": "P c 2 a",
        "ext": "0",
        "qualifier": "bca",
        "hall": "P -2ac -2ac",
        "basis_op_id": 2,
        "settingId": "Pc2a_bca"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 33,
    "crystalSystem": "orthorhombic",
    "standardHm": "P n a 21",
    "standardHall": "P 2c -2n",
    "centering": "P",
    "settings": [
      {
        "number": 33,
        "ccp4": 33,
        "hm": "P n a 21",
        "ext": "0",
        "qualifier": "",
        "hall": "P 2c -2n",
        "basis_op_id": 0,
        "settingId": "Pna21"
      },
      {
        "number": 33,
        "ccp4": 0,
        "hm": "P b n 21",
        "ext": "0",
        "qualifier": "ba-c",
        "hall": "P 2c -2ab",
        "basis_op_id": 7,
        "settingId": "Pbn21_ba-c"
      },
      {
        "number": 33,
        "ccp4": 0,
        "hm": "P 21 n b",
        "ext": "0",
        "qualifier": "cab",
        "hall": "P -2bc 2a",
        "basis_op_id": 1,
        "settingId": "P21nb_cab"
      },
      {
        "number": 33,
        "ccp4": 0,
        "hm": "P 21 c n",
        "ext": "0",
        "qualifier": "-cba",
        "hall": "P -2n 2a",
        "basis_op_id": 3,
        "settingId": "P21cn_-cba"
      },
      {
        "number": 33,
        "ccp4": 0,
        "hm": "P c 21 n",
        "ext": "0",
        "qualifier": "bca",
        "hall": "P -2n -2ac",
        "basis_op_id": 2,
        "settingId": "Pc21n_bca"
      },
      {
        "number": 33,
        "ccp4": 0,
        "hm": "P n 21 a",
        "ext": "0",
        "qualifier": "a-cb",
        "hall": "P -2ac -2n",
        "basis_op_id": 5,
        "settingId": "Pn21a_a-cb"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 34,
    "crystalSystem": "orthorhombic",
    "standardHm": "P n n 2",
    "standardHall": "P 2 -2n",
    "centering": "P",
    "settings": [
      {
        "number": 34,
        "ccp4": 34,
        "hm": "P n n 2",
        "ext": "0",
        "qualifier": "",
        "hall": "P 2 -2n",
        "basis_op_id": 0,
        "settingId": "Pnn2"
      },
      {
        "number": 34,
        "ccp4": 0,
        "hm": "P 2 n n",
        "ext": "0",
        "qualifier": "cab",
        "hall": "P -2n 2",
        "basis_op_id": 1,
        "settingId": "P2nn_cab"
      },
      {
        "number": 34,
        "ccp4": 0,
        "hm": "P n 2 n",
        "ext": "0",
        "qualifier": "bca",
        "hall": "P -2n -2n",
        "basis_op_id": 2,
        "settingId": "Pn2n_bca"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 35,
    "crystalSystem": "orthorhombic",
    "standardHm": "C m m 2",
    "standardHall": "C 2 -2",
    "centering": "C",
    "settings": [
      {
        "number": 35,
        "ccp4": 35,
        "hm": "C m m 2",
        "ext": "0",
        "qualifier": "",
        "hall": "C 2 -2",
        "basis_op_id": 0,
        "settingId": "Cmm2"
      },
      {
        "number": 35,
        "ccp4": 0,
        "hm": "A 2 m m",
        "ext": "0",
        "qualifier": "cab",
        "hall": "A -2 2",
        "basis_op_id": 1,
        "settingId": "A2mm_cab"
      },
      {
        "number": 35,
        "ccp4": 0,
        "hm": "B m 2 m",
        "ext": "0",
        "qualifier": "bca",
        "hall": "B -2 -2",
        "basis_op_id": 2,
        "settingId": "Bm2m_bca"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 36,
    "crystalSystem": "orthorhombic",
    "standardHm": "C m c 21",
    "standardHall": "C 2c -2",
    "centering": "C",
    "settings": [
      {
        "number": 36,
        "ccp4": 36,
        "hm": "C m c 21",
        "ext": "0",
        "qualifier": "",
        "hall": "C 2c -2",
        "basis_op_id": 0,
        "settingId": "Cmc21"
      },
      {
        "number": 36,
        "ccp4": 0,
        "hm": "C c m 21",
        "ext": "0",
        "qualifier": "ba-c",
        "hall": "C 2c -2c",
        "basis_op_id": 7,
        "settingId": "Ccm21_ba-c"
      },
      {
        "number": 36,
        "ccp4": 0,
        "hm": "A 21 m a",
        "ext": "0",
        "qualifier": "cab",
        "hall": "A -2a 2a",
        "basis_op_id": 1,
        "settingId": "A21ma_cab"
      },
      {
        "number": 36,
        "ccp4": 0,
        "hm": "A 21 a m",
        "ext": "0",
        "qualifier": "-cba",
        "hall": "A -2 2a",
        "basis_op_id": 3,
        "settingId": "A21am_-cba"
      },
      {
        "number": 36,
        "ccp4": 0,
        "hm": "B b 21 m",
        "ext": "0",
        "qualifier": "bca",
        "hall": "B -2 -2b",
        "basis_op_id": 2,
        "settingId": "Bb21m_bca"
      },
      {
        "number": 36,
        "ccp4": 0,
        "hm": "B m 21 b",
        "ext": "0",
        "qualifier": "a-cb",
        "hall": "B -2b -2",
        "basis_op_id": 5,
        "settingId": "Bm21b_a-cb"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 37,
    "crystalSystem": "orthorhombic",
    "standardHm": "C c c 2",
    "standardHall": "C 2 -2c",
    "centering": "C",
    "settings": [
      {
        "number": 37,
        "ccp4": 37,
        "hm": "C c c 2",
        "ext": "0",
        "qualifier": "",
        "hall": "C 2 -2c",
        "basis_op_id": 0,
        "settingId": "Ccc2"
      },
      {
        "number": 37,
        "ccp4": 0,
        "hm": "A 2 a a",
        "ext": "0",
        "qualifier": "cab",
        "hall": "A -2a 2",
        "basis_op_id": 1,
        "settingId": "A2aa_cab"
      },
      {
        "number": 37,
        "ccp4": 0,
        "hm": "B b 2 b",
        "ext": "0",
        "qualifier": "bca",
        "hall": "B -2b -2b",
        "basis_op_id": 2,
        "settingId": "Bb2b_bca"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 38,
    "crystalSystem": "orthorhombic",
    "standardHm": "A m m 2",
    "standardHall": "A 2 -2",
    "centering": "A",
    "settings": [
      {
        "number": 38,
        "ccp4": 38,
        "hm": "A m m 2",
        "ext": "0",
        "qualifier": "",
        "hall": "A 2 -2",
        "basis_op_id": 0,
        "settingId": "Amm2"
      },
      {
        "number": 38,
        "ccp4": 0,
        "hm": "B m m 2",
        "ext": "0",
        "qualifier": "ba-c",
        "hall": "B 2 -2",
        "basis_op_id": 7,
        "settingId": "Bmm2_ba-c"
      },
      {
        "number": 38,
        "ccp4": 0,
        "hm": "B 2 m m",
        "ext": "0",
        "qualifier": "cab",
        "hall": "B -2 2",
        "basis_op_id": 1,
        "settingId": "B2mm_cab"
      },
      {
        "number": 38,
        "ccp4": 0,
        "hm": "C 2 m m",
        "ext": "0",
        "qualifier": "-cba",
        "hall": "C -2 2",
        "basis_op_id": 3,
        "settingId": "C2mm_-cba"
      },
      {
        "number": 38,
        "ccp4": 0,
        "hm": "C m 2 m",
        "ext": "0",
        "qualifier": "bca",
        "hall": "C -2 -2",
        "basis_op_id": 2,
        "settingId": "Cm2m_bca"
      },
      {
        "number": 38,
        "ccp4": 0,
        "hm": "A m 2 m",
        "ext": "0",
        "qualifier": "a-cb",
        "hall": "A -2 -2",
        "basis_op_id": 5,
        "settingId": "Am2m_a-cb"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 39,
    "crystalSystem": "orthorhombic",
    "standardHm": "A b m 2",
    "standardHall": "A 2 -2b",
    "centering": "A",
    "settings": [
      {
        "number": 39,
        "ccp4": 39,
        "hm": "A b m 2",
        "ext": "0",
        "qualifier": "",
        "hall": "A 2 -2b",
        "basis_op_id": 0,
        "settingId": "Abm2"
      },
      {
        "number": 39,
        "ccp4": 0,
        "hm": "B m a 2",
        "ext": "0",
        "qualifier": "ba-c",
        "hall": "B 2 -2a",
        "basis_op_id": 7,
        "settingId": "Bma2_ba-c"
      },
      {
        "number": 39,
        "ccp4": 0,
        "hm": "B 2 c m",
        "ext": "0",
        "qualifier": "cab",
        "hall": "B -2a 2",
        "basis_op_id": 1,
        "settingId": "B2cm_cab"
      },
      {
        "number": 39,
        "ccp4": 0,
        "hm": "C 2 m b",
        "ext": "0",
        "qualifier": "-cba",
        "hall": "C -2a 2",
        "basis_op_id": 3,
        "settingId": "C2mb_-cba"
      },
      {
        "number": 39,
        "ccp4": 0,
        "hm": "C m 2 a",
        "ext": "0",
        "qualifier": "bca",
        "hall": "C -2a -2a",
        "basis_op_id": 2,
        "settingId": "Cm2a_bca"
      },
      {
        "number": 39,
        "ccp4": 0,
        "hm": "A c 2 m",
        "ext": "0",
        "qualifier": "a-cb",
        "hall": "A -2b -2b",
        "basis_op_id": 5,
        "settingId": "Ac2m_a-cb"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 40,
    "crystalSystem": "orthorhombic",
    "standardHm": "A m a 2",
    "standardHall": "A 2 -2a",
    "centering": "A",
    "settings": [
      {
        "number": 40,
        "ccp4": 40,
        "hm": "A m a 2",
        "ext": "0",
        "qualifier": "",
        "hall": "A 2 -2a",
        "basis_op_id": 0,
        "settingId": "Ama2"
      },
      {
        "number": 40,
        "ccp4": 0,
        "hm": "B b m 2",
        "ext": "0",
        "qualifier": "ba-c",
        "hall": "B 2 -2b",
        "basis_op_id": 7,
        "settingId": "Bbm2_ba-c"
      },
      {
        "number": 40,
        "ccp4": 0,
        "hm": "B 2 m b",
        "ext": "0",
        "qualifier": "cab",
        "hall": "B -2b 2",
        "basis_op_id": 1,
        "settingId": "B2mb_cab"
      },
      {
        "number": 40,
        "ccp4": 0,
        "hm": "C 2 c m",
        "ext": "0",
        "qualifier": "-cba",
        "hall": "C -2c 2",
        "basis_op_id": 3,
        "settingId": "C2cm_-cba"
      },
      {
        "number": 40,
        "ccp4": 0,
        "hm": "C c 2 m",
        "ext": "0",
        "qualifier": "bca",
        "hall": "C -2c -2c",
        "basis_op_id": 2,
        "settingId": "Cc2m_bca"
      },
      {
        "number": 40,
        "ccp4": 0,
        "hm": "A m 2 a",
        "ext": "0",
        "qualifier": "a-cb",
        "hall": "A -2a -2a",
        "basis_op_id": 5,
        "settingId": "Am2a_a-cb"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 41,
    "crystalSystem": "orthorhombic",
    "standardHm": "A b a 2",
    "standardHall": "A 2 -2ab",
    "centering": "A",
    "settings": [
      {
        "number": 41,
        "ccp4": 41,
        "hm": "A b a 2",
        "ext": "0",
        "qualifier": "",
        "hall": "A 2 -2ab",
        "basis_op_id": 0,
        "settingId": "Aba2"
      },
      {
        "number": 41,
        "ccp4": 0,
        "hm": "B b a 2",
        "ext": "0",
        "qualifier": "ba-c",
        "hall": "B 2 -2ab",
        "basis_op_id": 7,
        "settingId": "Bba2_ba-c"
      },
      {
        "number": 41,
        "ccp4": 0,
        "hm": "B 2 c b",
        "ext": "0",
        "qualifier": "cab",
        "hall": "B -2ab 2",
        "basis_op_id": 1,
        "settingId": "B2cb_cab"
      },
      {
        "number": 41,
        "ccp4": 0,
        "hm": "C 2 c b",
        "ext": "0",
        "qualifier": "-cba",
        "hall": "C -2ac 2",
        "basis_op_id": 3,
        "settingId": "C2cb_-cba"
      },
      {
        "number": 41,
        "ccp4": 0,
        "hm": "C c 2 a",
        "ext": "0",
        "qualifier": "bca",
        "hall": "C -2ac -2ac",
        "basis_op_id": 2,
        "settingId": "Cc2a_bca"
      },
      {
        "number": 41,
        "ccp4": 0,
        "hm": "A c 2 a",
        "ext": "0",
        "qualifier": "a-cb",
        "hall": "A -2ab -2ab",
        "basis_op_id": 5,
        "settingId": "Ac2a_a-cb"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 42,
    "crystalSystem": "orthorhombic",
    "standardHm": "F m m 2",
    "standardHall": "F 2 -2",
    "centering": "F",
    "settings": [
      {
        "number": 42,
        "ccp4": 42,
        "hm": "F m m 2",
        "ext": "0",
        "qualifier": "",
        "hall": "F 2 -2",
        "basis_op_id": 0,
        "settingId": "Fmm2"
      },
      {
        "number": 42,
        "ccp4": 0,
        "hm": "F 2 m m",
        "ext": "0",
        "qualifier": "cab",
        "hall": "F -2 2",
        "basis_op_id": 1,
        "settingId": "F2mm_cab"
      },
      {
        "number": 42,
        "ccp4": 0,
        "hm": "F m 2 m",
        "ext": "0",
        "qualifier": "bca",
        "hall": "F -2 -2",
        "basis_op_id": 2,
        "settingId": "Fm2m_bca"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 43,
    "crystalSystem": "orthorhombic",
    "standardHm": "F d d 2",
    "standardHall": "F 2 -2d",
    "centering": "F",
    "settings": [
      {
        "number": 43,
        "ccp4": 43,
        "hm": "F d d 2",
        "ext": "0",
        "qualifier": "",
        "hall": "F 2 -2d",
        "basis_op_id": 0,
        "settingId": "Fdd2"
      },
      {
        "number": 43,
        "ccp4": 0,
        "hm": "F 2 d d",
        "ext": "0",
        "qualifier": "cab",
        "hall": "F -2d 2",
        "basis_op_id": 1,
        "settingId": "F2dd_cab"
      },
      {
        "number": 43,
        "ccp4": 0,
        "hm": "F d 2 d",
        "ext": "0",
        "qualifier": "bca",
        "hall": "F -2d -2d",
        "basis_op_id": 2,
        "settingId": "Fd2d_bca"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 44,
    "crystalSystem": "orthorhombic",
    "standardHm": "I m m 2",
    "standardHall": "I 2 -2",
    "centering": "I",
    "settings": [
      {
        "number": 44,
        "ccp4": 44,
        "hm": "I m m 2",
        "ext": "0",
        "qualifier": "",
        "hall": "I 2 -2",
        "basis_op_id": 0,
        "settingId": "Imm2"
      },
      {
        "number": 44,
        "ccp4": 0,
        "hm": "I 2 m m",
        "ext": "0",
        "qualifier": "cab",
        "hall": "I -2 2",
        "basis_op_id": 1,
        "settingId": "I2mm_cab"
      },
      {
        "number": 44,
        "ccp4": 0,
        "hm": "I m 2 m",
        "ext": "0",
        "qualifier": "bca",
        "hall": "I -2 -2",
        "basis_op_id": 2,
        "settingId": "Im2m_bca"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 45,
    "crystalSystem": "orthorhombic",
    "standardHm": "I b a 2",
    "standardHall": "I 2 -2c",
    "centering": "I",
    "settings": [
      {
        "number": 45,
        "ccp4": 45,
        "hm": "I b a 2",
        "ext": "0",
        "qualifier": "",
        "hall": "I 2 -2c",
        "basis_op_id": 0,
        "settingId": "Iba2"
      },
      {
        "number": 45,
        "ccp4": 0,
        "hm": "I 2 c b",
        "ext": "0",
        "qualifier": "cab",
        "hall": "I -2a 2",
        "basis_op_id": 1,
        "settingId": "I2cb_cab"
      },
      {
        "number": 45,
        "ccp4": 0,
        "hm": "I c 2 a",
        "ext": "0",
        "qualifier": "bca",
        "hall": "I -2b -2b",
        "basis_op_id": 2,
        "settingId": "Ic2a_bca"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 46,
    "crystalSystem": "orthorhombic",
    "standardHm": "I m a 2",
    "standardHall": "I 2 -2a",
    "centering": "I",
    "settings": [
      {
        "number": 46,
        "ccp4": 46,
        "hm": "I m a 2",
        "ext": "0",
        "qualifier": "",
        "hall": "I 2 -2a",
        "basis_op_id": 0,
        "settingId": "Ima2"
      },
      {
        "number": 46,
        "ccp4": 0,
        "hm": "I b m 2",
        "ext": "0",
        "qualifier": "ba-c",
        "hall": "I 2 -2b",
        "basis_op_id": 7,
        "settingId": "Ibm2_ba-c"
      },
      {
        "number": 46,
        "ccp4": 0,
        "hm": "I 2 m b",
        "ext": "0",
        "qualifier": "cab",
        "hall": "I -2b 2",
        "basis_op_id": 1,
        "settingId": "I2mb_cab"
      },
      {
        "number": 46,
        "ccp4": 0,
        "hm": "I 2 c m",
        "ext": "0",
        "qualifier": "-cba",
        "hall": "I -2c 2",
        "basis_op_id": 3,
        "settingId": "I2cm_-cba"
      },
      {
        "number": 46,
        "ccp4": 0,
        "hm": "I c 2 m",
        "ext": "0",
        "qualifier": "bca",
        "hall": "I -2c -2c",
        "basis_op_id": 2,
        "settingId": "Ic2m_bca"
      },
      {
        "number": 46,
        "ccp4": 0,
        "hm": "I m 2 a",
        "ext": "0",
        "qualifier": "a-cb",
        "hall": "I -2a -2a",
        "basis_op_id": 5,
        "settingId": "Im2a_a-cb"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 47,
    "crystalSystem": "orthorhombic",
    "standardHm": "P m m m",
    "standardHall": "-P 2 2",
    "centering": "P",
    "settings": [
      {
        "number": 47,
        "ccp4": 47,
        "hm": "P m m m",
        "ext": "0",
        "qualifier": "",
        "hall": "-P 2 2",
        "basis_op_id": 0,
        "settingId": "Pmmm"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 48,
    "crystalSystem": "orthorhombic",
    "standardHm": "P n n n",
    "standardHall": "P 2 2 -1n",
    "centering": "P",
    "settings": [
      {
        "number": 48,
        "ccp4": 48,
        "hm": "P n n n",
        "ext": "1",
        "qualifier": "",
        "hall": "P 2 2 -1n",
        "basis_op_id": 20,
        "settingId": "Pnnn"
      },
      {
        "number": 48,
        "ccp4": 0,
        "hm": "P n n n",
        "ext": "2",
        "qualifier": "",
        "hall": "-P 2ab 2bc",
        "basis_op_id": 0,
        "settingId": "Pnnn"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 49,
    "crystalSystem": "orthorhombic",
    "standardHm": "P c c m",
    "standardHall": "-P 2 2c",
    "centering": "P",
    "settings": [
      {
        "number": 49,
        "ccp4": 49,
        "hm": "P c c m",
        "ext": "0",
        "qualifier": "",
        "hall": "-P 2 2c",
        "basis_op_id": 0,
        "settingId": "Pccm"
      },
      {
        "number": 49,
        "ccp4": 0,
        "hm": "P m a a",
        "ext": "0",
        "qualifier": "cab",
        "hall": "-P 2a 2",
        "basis_op_id": 1,
        "settingId": "Pmaa_cab"
      },
      {
        "number": 49,
        "ccp4": 0,
        "hm": "P b m b",
        "ext": "0",
        "qualifier": "bca",
        "hall": "-P 2b 2b",
        "basis_op_id": 2,
        "settingId": "Pbmb_bca"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 50,
    "crystalSystem": "orthorhombic",
    "standardHm": "P b a n",
    "standardHall": "P 2 2 -1ab",
    "centering": "P",
    "settings": [
      {
        "number": 50,
        "ccp4": 50,
        "hm": "P b a n",
        "ext": "1",
        "qualifier": "",
        "hall": "P 2 2 -1ab",
        "basis_op_id": 21,
        "settingId": "Pban"
      },
      {
        "number": 50,
        "ccp4": 0,
        "hm": "P b a n",
        "ext": "2",
        "qualifier": "",
        "hall": "-P 2ab 2b",
        "basis_op_id": 0,
        "settingId": "Pban"
      },
      {
        "number": 50,
        "ccp4": 0,
        "hm": "P n c b",
        "ext": "1",
        "qualifier": "cab",
        "hall": "P 2 2 -1bc",
        "basis_op_id": 22,
        "settingId": "Pncb_cab"
      },
      {
        "number": 50,
        "ccp4": 0,
        "hm": "P n c b",
        "ext": "2",
        "qualifier": "cab",
        "hall": "-P 2b 2bc",
        "basis_op_id": 1,
        "settingId": "Pncb_cab"
      },
      {
        "number": 50,
        "ccp4": 0,
        "hm": "P c n a",
        "ext": "1",
        "qualifier": "bca",
        "hall": "P 2 2 -1ac",
        "basis_op_id": 23,
        "settingId": "Pcna_bca"
      },
      {
        "number": 50,
        "ccp4": 0,
        "hm": "P c n a",
        "ext": "2",
        "qualifier": "bca",
        "hall": "-P 2a 2c",
        "basis_op_id": 2,
        "settingId": "Pcna_bca"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 51,
    "crystalSystem": "orthorhombic",
    "standardHm": "P m m a",
    "standardHall": "-P 2a 2a",
    "centering": "P",
    "settings": [
      {
        "number": 51,
        "ccp4": 51,
        "hm": "P m m a",
        "ext": "0",
        "qualifier": "",
        "hall": "-P 2a 2a",
        "basis_op_id": 0,
        "settingId": "Pmma"
      },
      {
        "number": 51,
        "ccp4": 0,
        "hm": "P m m b",
        "ext": "0",
        "qualifier": "ba-c",
        "hall": "-P 2b 2",
        "basis_op_id": 7,
        "settingId": "Pmmb_ba-c"
      },
      {
        "number": 51,
        "ccp4": 0,
        "hm": "P b m m",
        "ext": "0",
        "qualifier": "cab",
        "hall": "-P 2 2b",
        "basis_op_id": 1,
        "settingId": "Pbmm_cab"
      },
      {
        "number": 51,
        "ccp4": 0,
        "hm": "P c m m",
        "ext": "0",
        "qualifier": "-cba",
        "hall": "-P 2c 2c",
        "basis_op_id": 3,
        "settingId": "Pcmm_-cba"
      },
      {
        "number": 51,
        "ccp4": 0,
        "hm": "P m c m",
        "ext": "0",
        "qualifier": "bca",
        "hall": "-P 2c 2",
        "basis_op_id": 2,
        "settingId": "Pmcm_bca"
      },
      {
        "number": 51,
        "ccp4": 0,
        "hm": "P m a m",
        "ext": "0",
        "qualifier": "a-cb",
        "hall": "-P 2 2a",
        "basis_op_id": 5,
        "settingId": "Pmam_a-cb"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 52,
    "crystalSystem": "orthorhombic",
    "standardHm": "P n n a",
    "standardHall": "-P 2a 2bc",
    "centering": "P",
    "settings": [
      {
        "number": 52,
        "ccp4": 52,
        "hm": "P n n a",
        "ext": "0",
        "qualifier": "",
        "hall": "-P 2a 2bc",
        "basis_op_id": 0,
        "settingId": "Pnna"
      },
      {
        "number": 52,
        "ccp4": 0,
        "hm": "P n n b",
        "ext": "0",
        "qualifier": "ba-c",
        "hall": "-P 2b 2n",
        "basis_op_id": 7,
        "settingId": "Pnnb_ba-c"
      },
      {
        "number": 52,
        "ccp4": 0,
        "hm": "P b n n",
        "ext": "0",
        "qualifier": "cab",
        "hall": "-P 2n 2b",
        "basis_op_id": 1,
        "settingId": "Pbnn_cab"
      },
      {
        "number": 52,
        "ccp4": 0,
        "hm": "P c n n",
        "ext": "0",
        "qualifier": "-cba",
        "hall": "-P 2ab 2c",
        "basis_op_id": 3,
        "settingId": "Pcnn_-cba"
      },
      {
        "number": 52,
        "ccp4": 0,
        "hm": "P n c n",
        "ext": "0",
        "qualifier": "bca",
        "hall": "-P 2ab 2n",
        "basis_op_id": 2,
        "settingId": "Pncn_bca"
      },
      {
        "number": 52,
        "ccp4": 0,
        "hm": "P n a n",
        "ext": "0",
        "qualifier": "a-cb",
        "hall": "-P 2n 2bc",
        "basis_op_id": 5,
        "settingId": "Pnan_a-cb"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 53,
    "crystalSystem": "orthorhombic",
    "standardHm": "P m n a",
    "standardHall": "-P 2ac 2",
    "centering": "P",
    "settings": [
      {
        "number": 53,
        "ccp4": 53,
        "hm": "P m n a",
        "ext": "0",
        "qualifier": "",
        "hall": "-P 2ac 2",
        "basis_op_id": 0,
        "settingId": "Pmna"
      },
      {
        "number": 53,
        "ccp4": 0,
        "hm": "P n m b",
        "ext": "0",
        "qualifier": "ba-c",
        "hall": "-P 2bc 2bc",
        "basis_op_id": 7,
        "settingId": "Pnmb_ba-c"
      },
      {
        "number": 53,
        "ccp4": 0,
        "hm": "P b m n",
        "ext": "0",
        "qualifier": "cab",
        "hall": "-P 2ab 2ab",
        "basis_op_id": 1,
        "settingId": "Pbmn_cab"
      },
      {
        "number": 53,
        "ccp4": 0,
        "hm": "P c n m",
        "ext": "0",
        "qualifier": "-cba",
        "hall": "-P 2 2ac",
        "basis_op_id": 3,
        "settingId": "Pcnm_-cba"
      },
      {
        "number": 53,
        "ccp4": 0,
        "hm": "P n c m",
        "ext": "0",
        "qualifier": "bca",
        "hall": "-P 2 2bc",
        "basis_op_id": 2,
        "settingId": "Pncm_bca"
      },
      {
        "number": 53,
        "ccp4": 0,
        "hm": "P m a n",
        "ext": "0",
        "qualifier": "a-cb",
        "hall": "-P 2ab 2",
        "basis_op_id": 5,
        "settingId": "Pman_a-cb"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 54,
    "crystalSystem": "orthorhombic",
    "standardHm": "P c c a",
    "standardHall": "-P 2a 2ac",
    "centering": "P",
    "settings": [
      {
        "number": 54,
        "ccp4": 54,
        "hm": "P c c a",
        "ext": "0",
        "qualifier": "",
        "hall": "-P 2a 2ac",
        "basis_op_id": 0,
        "settingId": "Pcca"
      },
      {
        "number": 54,
        "ccp4": 0,
        "hm": "P c c b",
        "ext": "0",
        "qualifier": "ba-c",
        "hall": "-P 2b 2c",
        "basis_op_id": 7,
        "settingId": "Pccb_ba-c"
      },
      {
        "number": 54,
        "ccp4": 0,
        "hm": "P b a a",
        "ext": "0",
        "qualifier": "cab",
        "hall": "-P 2a 2b",
        "basis_op_id": 1,
        "settingId": "Pbaa_cab"
      },
      {
        "number": 54,
        "ccp4": 0,
        "hm": "P c a a",
        "ext": "0",
        "qualifier": "-cba",
        "hall": "-P 2ac 2c",
        "basis_op_id": 3,
        "settingId": "Pcaa_-cba"
      },
      {
        "number": 54,
        "ccp4": 0,
        "hm": "P b c b",
        "ext": "0",
        "qualifier": "bca",
        "hall": "-P 2bc 2b",
        "basis_op_id": 2,
        "settingId": "Pbcb_bca"
      },
      {
        "number": 54,
        "ccp4": 0,
        "hm": "P b a b",
        "ext": "0",
        "qualifier": "a-cb",
        "hall": "-P 2b 2ab",
        "basis_op_id": 5,
        "settingId": "Pbab_a-cb"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 55,
    "crystalSystem": "orthorhombic",
    "standardHm": "P b a m",
    "standardHall": "-P 2 2ab",
    "centering": "P",
    "settings": [
      {
        "number": 55,
        "ccp4": 55,
        "hm": "P b a m",
        "ext": "0",
        "qualifier": "",
        "hall": "-P 2 2ab",
        "basis_op_id": 0,
        "settingId": "Pbam"
      },
      {
        "number": 55,
        "ccp4": 0,
        "hm": "P m c b",
        "ext": "0",
        "qualifier": "cab",
        "hall": "-P 2bc 2",
        "basis_op_id": 1,
        "settingId": "Pmcb_cab"
      },
      {
        "number": 55,
        "ccp4": 0,
        "hm": "P c m a",
        "ext": "0",
        "qualifier": "bca",
        "hall": "-P 2ac 2ac",
        "basis_op_id": 2,
        "settingId": "Pcma_bca"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 56,
    "crystalSystem": "orthorhombic",
    "standardHm": "P c c n",
    "standardHall": "-P 2ab 2ac",
    "centering": "P",
    "settings": [
      {
        "number": 56,
        "ccp4": 56,
        "hm": "P c c n",
        "ext": "0",
        "qualifier": "",
        "hall": "-P 2ab 2ac",
        "basis_op_id": 0,
        "settingId": "Pccn"
      },
      {
        "number": 56,
        "ccp4": 0,
        "hm": "P n a a",
        "ext": "0",
        "qualifier": "cab",
        "hall": "-P 2ac 2bc",
        "basis_op_id": 1,
        "settingId": "Pnaa_cab"
      },
      {
        "number": 56,
        "ccp4": 0,
        "hm": "P b n b",
        "ext": "0",
        "qualifier": "bca",
        "hall": "-P 2bc 2ab",
        "basis_op_id": 2,
        "settingId": "Pbnb_bca"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 57,
    "crystalSystem": "orthorhombic",
    "standardHm": "P b c m",
    "standardHall": "-P 2c 2b",
    "centering": "P",
    "settings": [
      {
        "number": 57,
        "ccp4": 57,
        "hm": "P b c m",
        "ext": "0",
        "qualifier": "",
        "hall": "-P 2c 2b",
        "basis_op_id": 0,
        "settingId": "Pbcm"
      },
      {
        "number": 57,
        "ccp4": 0,
        "hm": "P c a m",
        "ext": "0",
        "qualifier": "ba-c",
        "hall": "-P 2c 2ac",
        "basis_op_id": 7,
        "settingId": "Pcam_ba-c"
      },
      {
        "number": 57,
        "ccp4": 0,
        "hm": "P m c a",
        "ext": "0",
        "qualifier": "cab",
        "hall": "-P 2ac 2a",
        "basis_op_id": 1,
        "settingId": "Pmca_cab"
      },
      {
        "number": 57,
        "ccp4": 0,
        "hm": "P m a b",
        "ext": "0",
        "qualifier": "-cba",
        "hall": "-P 2b 2a",
        "basis_op_id": 3,
        "settingId": "Pmab_-cba"
      },
      {
        "number": 57,
        "ccp4": 0,
        "hm": "P b m a",
        "ext": "0",
        "qualifier": "bca",
        "hall": "-P 2a 2ab",
        "basis_op_id": 2,
        "settingId": "Pbma_bca"
      },
      {
        "number": 57,
        "ccp4": 0,
        "hm": "P c m b",
        "ext": "0",
        "qualifier": "a-cb",
        "hall": "-P 2bc 2c",
        "basis_op_id": 5,
        "settingId": "Pcmb_a-cb"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 58,
    "crystalSystem": "orthorhombic",
    "standardHm": "P n n m",
    "standardHall": "-P 2 2n",
    "centering": "P",
    "settings": [
      {
        "number": 58,
        "ccp4": 58,
        "hm": "P n n m",
        "ext": "0",
        "qualifier": "",
        "hall": "-P 2 2n",
        "basis_op_id": 0,
        "settingId": "Pnnm"
      },
      {
        "number": 58,
        "ccp4": 0,
        "hm": "P m n n",
        "ext": "0",
        "qualifier": "cab",
        "hall": "-P 2n 2",
        "basis_op_id": 1,
        "settingId": "Pmnn_cab"
      },
      {
        "number": 58,
        "ccp4": 0,
        "hm": "P n m n",
        "ext": "0",
        "qualifier": "bca",
        "hall": "-P 2n 2n",
        "basis_op_id": 2,
        "settingId": "Pnmn_bca"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 59,
    "crystalSystem": "orthorhombic",
    "standardHm": "P m m n",
    "standardHall": "P 2 2ab -1ab",
    "centering": "P",
    "settings": [
      {
        "number": 59,
        "ccp4": 59,
        "hm": "P m m n",
        "ext": "1",
        "qualifier": "",
        "hall": "P 2 2ab -1ab",
        "basis_op_id": 21,
        "settingId": "Pmmn"
      },
      {
        "number": 59,
        "ccp4": 1059,
        "hm": "P m m n",
        "ext": "2",
        "qualifier": "",
        "hall": "-P 2ab 2a",
        "basis_op_id": 0,
        "settingId": "Pmmn"
      },
      {
        "number": 59,
        "ccp4": 0,
        "hm": "P n m m",
        "ext": "1",
        "qualifier": "cab",
        "hall": "P 2bc 2 -1bc",
        "basis_op_id": 22,
        "settingId": "Pnmm_cab"
      },
      {
        "number": 59,
        "ccp4": 0,
        "hm": "P n m m",
        "ext": "2",
        "qualifier": "cab",
        "hall": "-P 2c 2bc",
        "basis_op_id": 1,
        "settingId": "Pnmm_cab"
      },
      {
        "number": 59,
        "ccp4": 0,
        "hm": "P m n m",
        "ext": "1",
        "qualifier": "bca",
        "hall": "P 2ac 2ac -1ac",
        "basis_op_id": 23,
        "settingId": "Pmnm_bca"
      },
      {
        "number": 59,
        "ccp4": 0,
        "hm": "P m n m",
        "ext": "2",
        "qualifier": "bca",
        "hall": "-P 2c 2a",
        "basis_op_id": 2,
        "settingId": "Pmnm_bca"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 60,
    "crystalSystem": "orthorhombic",
    "standardHm": "P b c n",
    "standardHall": "-P 2n 2ab",
    "centering": "P",
    "settings": [
      {
        "number": 60,
        "ccp4": 60,
        "hm": "P b c n",
        "ext": "0",
        "qualifier": "",
        "hall": "-P 2n 2ab",
        "basis_op_id": 0,
        "settingId": "Pbcn"
      },
      {
        "number": 60,
        "ccp4": 0,
        "hm": "P c a n",
        "ext": "0",
        "qualifier": "ba-c",
        "hall": "-P 2n 2c",
        "basis_op_id": 7,
        "settingId": "Pcan_ba-c"
      },
      {
        "number": 60,
        "ccp4": 0,
        "hm": "P n c a",
        "ext": "0",
        "qualifier": "cab",
        "hall": "-P 2a 2n",
        "basis_op_id": 1,
        "settingId": "Pnca_cab"
      },
      {
        "number": 60,
        "ccp4": 0,
        "hm": "P n a b",
        "ext": "0",
        "qualifier": "-cba",
        "hall": "-P 2bc 2n",
        "basis_op_id": 3,
        "settingId": "Pnab_-cba"
      },
      {
        "number": 60,
        "ccp4": 0,
        "hm": "P b n a",
        "ext": "0",
        "qualifier": "bca",
        "hall": "-P 2ac 2b",
        "basis_op_id": 2,
        "settingId": "Pbna_bca"
      },
      {
        "number": 60,
        "ccp4": 0,
        "hm": "P c n b",
        "ext": "0",
        "qualifier": "a-cb",
        "hall": "-P 2b 2ac",
        "basis_op_id": 5,
        "settingId": "Pcnb_a-cb"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 61,
    "crystalSystem": "orthorhombic",
    "standardHm": "P b c a",
    "standardHall": "-P 2ac 2ab",
    "centering": "P",
    "settings": [
      {
        "number": 61,
        "ccp4": 61,
        "hm": "P b c a",
        "ext": "0",
        "qualifier": "",
        "hall": "-P 2ac 2ab",
        "basis_op_id": 0,
        "settingId": "Pbca"
      },
      {
        "number": 61,
        "ccp4": 0,
        "hm": "P c a b",
        "ext": "0",
        "qualifier": "ba-c",
        "hall": "-P 2bc 2ac",
        "basis_op_id": 3,
        "settingId": "Pcab_ba-c"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 62,
    "crystalSystem": "orthorhombic",
    "standardHm": "P n m a",
    "standardHall": "-P 2ac 2n",
    "centering": "P",
    "settings": [
      {
        "number": 62,
        "ccp4": 62,
        "hm": "P n m a",
        "ext": "0",
        "qualifier": "",
        "hall": "-P 2ac 2n",
        "basis_op_id": 0,
        "settingId": "Pnma"
      },
      {
        "number": 62,
        "ccp4": 0,
        "hm": "P m n b",
        "ext": "0",
        "qualifier": "ba-c",
        "hall": "-P 2bc 2a",
        "basis_op_id": 7,
        "settingId": "Pmnb_ba-c"
      },
      {
        "number": 62,
        "ccp4": 0,
        "hm": "P b n m",
        "ext": "0",
        "qualifier": "cab",
        "hall": "-P 2c 2ab",
        "basis_op_id": 1,
        "settingId": "Pbnm_cab"
      },
      {
        "number": 62,
        "ccp4": 0,
        "hm": "P c m n",
        "ext": "0",
        "qualifier": "-cba",
        "hall": "-P 2n 2ac",
        "basis_op_id": 3,
        "settingId": "Pcmn_-cba"
      },
      {
        "number": 62,
        "ccp4": 0,
        "hm": "P m c n",
        "ext": "0",
        "qualifier": "bca",
        "hall": "-P 2n 2a",
        "basis_op_id": 2,
        "settingId": "Pmcn_bca"
      },
      {
        "number": 62,
        "ccp4": 0,
        "hm": "P n a m",
        "ext": "0",
        "qualifier": "a-cb",
        "hall": "-P 2c 2n",
        "basis_op_id": 5,
        "settingId": "Pnam_a-cb"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 63,
    "crystalSystem": "orthorhombic",
    "standardHm": "C m c m",
    "standardHall": "-C 2c 2",
    "centering": "C",
    "settings": [
      {
        "number": 63,
        "ccp4": 63,
        "hm": "C m c m",
        "ext": "0",
        "qualifier": "",
        "hall": "-C 2c 2",
        "basis_op_id": 0,
        "settingId": "Cmcm"
      },
      {
        "number": 63,
        "ccp4": 0,
        "hm": "C c m m",
        "ext": "0",
        "qualifier": "ba-c",
        "hall": "-C 2c 2c",
        "basis_op_id": 7,
        "settingId": "Ccmm_ba-c"
      },
      {
        "number": 63,
        "ccp4": 0,
        "hm": "A m m a",
        "ext": "0",
        "qualifier": "cab",
        "hall": "-A 2a 2a",
        "basis_op_id": 1,
        "settingId": "Amma_cab"
      },
      {
        "number": 63,
        "ccp4": 0,
        "hm": "A m a m",
        "ext": "0",
        "qualifier": "-cba",
        "hall": "-A 2 2a",
        "basis_op_id": 3,
        "settingId": "Amam_-cba"
      },
      {
        "number": 63,
        "ccp4": 0,
        "hm": "B b m m",
        "ext": "0",
        "qualifier": "bca",
        "hall": "-B 2 2b",
        "basis_op_id": 2,
        "settingId": "Bbmm_bca"
      },
      {
        "number": 63,
        "ccp4": 0,
        "hm": "B m m b",
        "ext": "0",
        "qualifier": "a-cb",
        "hall": "-B 2b 2",
        "basis_op_id": 5,
        "settingId": "Bmmb_a-cb"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 64,
    "crystalSystem": "orthorhombic",
    "standardHm": "C m c a",
    "standardHall": "-C 2ac 2",
    "centering": "C",
    "settings": [
      {
        "number": 64,
        "ccp4": 64,
        "hm": "C m c a",
        "ext": "0",
        "qualifier": "",
        "hall": "-C 2ac 2",
        "basis_op_id": 0,
        "settingId": "Cmca"
      },
      {
        "number": 64,
        "ccp4": 0,
        "hm": "C c m b",
        "ext": "0",
        "qualifier": "ba-c",
        "hall": "-C 2ac 2ac",
        "basis_op_id": 7,
        "settingId": "Ccmb_ba-c"
      },
      {
        "number": 64,
        "ccp4": 0,
        "hm": "A b m a",
        "ext": "0",
        "qualifier": "cab",
        "hall": "-A 2ab 2ab",
        "basis_op_id": 1,
        "settingId": "Abma_cab"
      },
      {
        "number": 64,
        "ccp4": 0,
        "hm": "A c a m",
        "ext": "0",
        "qualifier": "-cba",
        "hall": "-A 2 2ab",
        "basis_op_id": 3,
        "settingId": "Acam_-cba"
      },
      {
        "number": 64,
        "ccp4": 0,
        "hm": "B b c m",
        "ext": "0",
        "qualifier": "bca",
        "hall": "-B 2 2ab",
        "basis_op_id": 2,
        "settingId": "Bbcm_bca"
      },
      {
        "number": 64,
        "ccp4": 0,
        "hm": "B m a b",
        "ext": "0",
        "qualifier": "a-cb",
        "hall": "-B 2ab 2",
        "basis_op_id": 5,
        "settingId": "Bmab_a-cb"
      },
      {
        "number": 64,
        "ccp4": 0,
        "hm": "A b a m",
        "ext": "0",
        "qualifier": "",
        "hall": "-A 2 2ab",
        "basis_op_id": 3,
        "settingId": "Abam"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 65,
    "crystalSystem": "orthorhombic",
    "standardHm": "C m m m",
    "standardHall": "-C 2 2",
    "centering": "C",
    "settings": [
      {
        "number": 65,
        "ccp4": 65,
        "hm": "C m m m",
        "ext": "0",
        "qualifier": "",
        "hall": "-C 2 2",
        "basis_op_id": 0,
        "settingId": "Cmmm"
      },
      {
        "number": 65,
        "ccp4": 0,
        "hm": "A m m m",
        "ext": "0",
        "qualifier": "cab",
        "hall": "-A 2 2",
        "basis_op_id": 1,
        "settingId": "Ammm_cab"
      },
      {
        "number": 65,
        "ccp4": 0,
        "hm": "B m m m",
        "ext": "0",
        "qualifier": "bca",
        "hall": "-B 2 2",
        "basis_op_id": 2,
        "settingId": "Bmmm_bca"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 66,
    "crystalSystem": "orthorhombic",
    "standardHm": "C c c m",
    "standardHall": "-C 2 2c",
    "centering": "C",
    "settings": [
      {
        "number": 66,
        "ccp4": 66,
        "hm": "C c c m",
        "ext": "0",
        "qualifier": "",
        "hall": "-C 2 2c",
        "basis_op_id": 0,
        "settingId": "Cccm"
      },
      {
        "number": 66,
        "ccp4": 0,
        "hm": "A m a a",
        "ext": "0",
        "qualifier": "cab",
        "hall": "-A 2a 2",
        "basis_op_id": 1,
        "settingId": "Amaa_cab"
      },
      {
        "number": 66,
        "ccp4": 0,
        "hm": "B b m b",
        "ext": "0",
        "qualifier": "bca",
        "hall": "-B 2b 2b",
        "basis_op_id": 2,
        "settingId": "Bbmb_bca"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 67,
    "crystalSystem": "orthorhombic",
    "standardHm": "C m m a",
    "standardHall": "-C 2a 2",
    "centering": "C",
    "settings": [
      {
        "number": 67,
        "ccp4": 67,
        "hm": "C m m a",
        "ext": "0",
        "qualifier": "",
        "hall": "-C 2a 2",
        "basis_op_id": 0,
        "settingId": "Cmma"
      },
      {
        "number": 67,
        "ccp4": 0,
        "hm": "C m m b",
        "ext": "0",
        "qualifier": "ba-c",
        "hall": "-C 2a 2a",
        "basis_op_id": 14,
        "settingId": "Cmmb_ba-c"
      },
      {
        "number": 67,
        "ccp4": 0,
        "hm": "A b m m",
        "ext": "0",
        "qualifier": "cab",
        "hall": "-A 2b 2b",
        "basis_op_id": 1,
        "settingId": "Abmm_cab"
      },
      {
        "number": 67,
        "ccp4": 0,
        "hm": "A c m m",
        "ext": "0",
        "qualifier": "-cba",
        "hall": "-A 2 2b",
        "basis_op_id": 3,
        "settingId": "Acmm_-cba"
      },
      {
        "number": 67,
        "ccp4": 0,
        "hm": "B m c m",
        "ext": "0",
        "qualifier": "bca",
        "hall": "-B 2 2a",
        "basis_op_id": 2,
        "settingId": "Bmcm_bca"
      },
      {
        "number": 67,
        "ccp4": 0,
        "hm": "B m a m",
        "ext": "0",
        "qualifier": "a-cb",
        "hall": "-B 2a 2",
        "basis_op_id": 5,
        "settingId": "Bmam_a-cb"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 68,
    "crystalSystem": "orthorhombic",
    "standardHm": "C c c a",
    "standardHall": "C 2 2 -1ac",
    "centering": "C",
    "settings": [
      {
        "number": 68,
        "ccp4": 68,
        "hm": "C c c a",
        "ext": "1",
        "qualifier": "",
        "hall": "C 2 2 -1ac",
        "basis_op_id": 24,
        "settingId": "Ccca"
      },
      {
        "number": 68,
        "ccp4": 0,
        "hm": "C c c a",
        "ext": "2",
        "qualifier": "",
        "hall": "-C 2a 2ac",
        "basis_op_id": 0,
        "settingId": "Ccca"
      },
      {
        "number": 68,
        "ccp4": 0,
        "hm": "C c c b",
        "ext": "1",
        "qualifier": "ba-c",
        "hall": "C 2 2 -1ac",
        "basis_op_id": 24,
        "settingId": "Cccb_ba-c"
      },
      {
        "number": 68,
        "ccp4": 0,
        "hm": "C c c b",
        "ext": "2",
        "qualifier": "ba-c",
        "hall": "-C 2a 2c",
        "basis_op_id": 21,
        "settingId": "Cccb_ba-c"
      },
      {
        "number": 68,
        "ccp4": 0,
        "hm": "A b a a",
        "ext": "1",
        "qualifier": "cab",
        "hall": "A 2 2 -1ab",
        "basis_op_id": 25,
        "settingId": "Abaa_cab"
      },
      {
        "number": 68,
        "ccp4": 0,
        "hm": "A b a a",
        "ext": "2",
        "qualifier": "cab",
        "hall": "-A 2a 2b",
        "basis_op_id": 1,
        "settingId": "Abaa_cab"
      },
      {
        "number": 68,
        "ccp4": 0,
        "hm": "A c a a",
        "ext": "1",
        "qualifier": "-cba",
        "hall": "A 2 2 -1ab",
        "basis_op_id": 25,
        "settingId": "Acaa_-cba"
      },
      {
        "number": 68,
        "ccp4": 0,
        "hm": "A c a a",
        "ext": "2",
        "qualifier": "-cba",
        "hall": "-A 2ab 2b",
        "basis_op_id": 3,
        "settingId": "Acaa_-cba"
      },
      {
        "number": 68,
        "ccp4": 0,
        "hm": "B b c b",
        "ext": "1",
        "qualifier": "bca",
        "hall": "B 2 2 -1ab",
        "basis_op_id": 26,
        "settingId": "Bbcb_bca"
      },
      {
        "number": 68,
        "ccp4": 0,
        "hm": "B b c b",
        "ext": "2",
        "qualifier": "bca",
        "hall": "-B 2ab 2b",
        "basis_op_id": 2,
        "settingId": "Bbcb_bca"
      },
      {
        "number": 68,
        "ccp4": 0,
        "hm": "B b a b",
        "ext": "1",
        "qualifier": "a-cb",
        "hall": "B 2 2 -1ab",
        "basis_op_id": 26,
        "settingId": "Bbab_a-cb"
      },
      {
        "number": 68,
        "ccp4": 0,
        "hm": "B b a b",
        "ext": "2",
        "qualifier": "a-cb",
        "hall": "-B 2b 2ab",
        "basis_op_id": 5,
        "settingId": "Bbab_a-cb"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 69,
    "crystalSystem": "orthorhombic",
    "standardHm": "F m m m",
    "standardHall": "-F 2 2",
    "centering": "F",
    "settings": [
      {
        "number": 69,
        "ccp4": 69,
        "hm": "F m m m",
        "ext": "0",
        "qualifier": "",
        "hall": "-F 2 2",
        "basis_op_id": 0,
        "settingId": "Fmmm"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 70,
    "crystalSystem": "orthorhombic",
    "standardHm": "F d d d",
    "standardHall": "F 2 2 -1d",
    "centering": "F",
    "settings": [
      {
        "number": 70,
        "ccp4": 70,
        "hm": "F d d d",
        "ext": "1",
        "qualifier": "",
        "hall": "F 2 2 -1d",
        "basis_op_id": 27,
        "settingId": "Fddd"
      },
      {
        "number": 70,
        "ccp4": 0,
        "hm": "F d d d",
        "ext": "2",
        "qualifier": "",
        "hall": "-F 2uv 2vw",
        "basis_op_id": 0,
        "settingId": "Fddd"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 71,
    "crystalSystem": "orthorhombic",
    "standardHm": "I m m m",
    "standardHall": "-I 2 2",
    "centering": "I",
    "settings": [
      {
        "number": 71,
        "ccp4": 71,
        "hm": "I m m m",
        "ext": "0",
        "qualifier": "",
        "hall": "-I 2 2",
        "basis_op_id": 0,
        "settingId": "Immm"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 72,
    "crystalSystem": "orthorhombic",
    "standardHm": "I b a m",
    "standardHall": "-I 2 2c",
    "centering": "I",
    "settings": [
      {
        "number": 72,
        "ccp4": 72,
        "hm": "I b a m",
        "ext": "0",
        "qualifier": "",
        "hall": "-I 2 2c",
        "basis_op_id": 0,
        "settingId": "Ibam"
      },
      {
        "number": 72,
        "ccp4": 0,
        "hm": "I m c b",
        "ext": "0",
        "qualifier": "cab",
        "hall": "-I 2a 2",
        "basis_op_id": 1,
        "settingId": "Imcb_cab"
      },
      {
        "number": 72,
        "ccp4": 0,
        "hm": "I c m a",
        "ext": "0",
        "qualifier": "bca",
        "hall": "-I 2b 2b",
        "basis_op_id": 2,
        "settingId": "Icma_bca"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 73,
    "crystalSystem": "orthorhombic",
    "standardHm": "I b c a",
    "standardHall": "-I 2b 2c",
    "centering": "I",
    "settings": [
      {
        "number": 73,
        "ccp4": 73,
        "hm": "I b c a",
        "ext": "0",
        "qualifier": "",
        "hall": "-I 2b 2c",
        "basis_op_id": 0,
        "settingId": "Ibca"
      },
      {
        "number": 73,
        "ccp4": 0,
        "hm": "I c a b",
        "ext": "0",
        "qualifier": "ba-c",
        "hall": "-I 2a 2b",
        "basis_op_id": 28,
        "settingId": "Icab_ba-c"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 74,
    "crystalSystem": "orthorhombic",
    "standardHm": "I m m a",
    "standardHall": "-I 2b 2",
    "centering": "I",
    "settings": [
      {
        "number": 74,
        "ccp4": 74,
        "hm": "I m m a",
        "ext": "0",
        "qualifier": "",
        "hall": "-I 2b 2",
        "basis_op_id": 0,
        "settingId": "Imma"
      },
      {
        "number": 74,
        "ccp4": 0,
        "hm": "I m m b",
        "ext": "0",
        "qualifier": "ba-c",
        "hall": "-I 2a 2a",
        "basis_op_id": 28,
        "settingId": "Immb_ba-c"
      },
      {
        "number": 74,
        "ccp4": 0,
        "hm": "I b m m",
        "ext": "0",
        "qualifier": "cab",
        "hall": "-I 2c 2c",
        "basis_op_id": 1,
        "settingId": "Ibmm_cab"
      },
      {
        "number": 74,
        "ccp4": 0,
        "hm": "I c m m",
        "ext": "0",
        "qualifier": "-cba",
        "hall": "-I 2 2b",
        "basis_op_id": 3,
        "settingId": "Icmm_-cba"
      },
      {
        "number": 74,
        "ccp4": 0,
        "hm": "I m c m",
        "ext": "0",
        "qualifier": "bca",
        "hall": "-I 2 2a",
        "basis_op_id": 2,
        "settingId": "Imcm_bca"
      },
      {
        "number": 74,
        "ccp4": 0,
        "hm": "I m a m",
        "ext": "0",
        "qualifier": "a-cb",
        "hall": "-I 2c 2",
        "basis_op_id": 5,
        "settingId": "Imam_a-cb"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 75,
    "crystalSystem": "tetragonal",
    "standardHm": "P 4",
    "standardHall": "P 4",
    "centering": "P",
    "settings": [
      {
        "number": 75,
        "ccp4": 75,
        "hm": "P 4",
        "ext": "0",
        "qualifier": "",
        "hall": "P 4",
        "basis_op_id": 0,
        "settingId": "P4"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 76,
    "crystalSystem": "tetragonal",
    "standardHm": "P 41",
    "standardHall": "P 4w",
    "centering": "P",
    "settings": [
      {
        "number": 76,
        "ccp4": 76,
        "hm": "P 41",
        "ext": "0",
        "qualifier": "",
        "hall": "P 4w",
        "basis_op_id": 0,
        "settingId": "P41"
      }
    ],
    "hasVerifiedModel": true,
    "status": "MODEL_VERIFIED",
    "verifiedSettings": [
      "P41"
    ]
  },
  {
    "number": 77,
    "crystalSystem": "tetragonal",
    "standardHm": "P 42",
    "standardHall": "P 4c",
    "centering": "P",
    "settings": [
      {
        "number": 77,
        "ccp4": 77,
        "hm": "P 42",
        "ext": "0",
        "qualifier": "",
        "hall": "P 4c",
        "basis_op_id": 0,
        "settingId": "P42"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 78,
    "crystalSystem": "tetragonal",
    "standardHm": "P 43",
    "standardHall": "P 4cw",
    "centering": "P",
    "settings": [
      {
        "number": 78,
        "ccp4": 78,
        "hm": "P 43",
        "ext": "0",
        "qualifier": "",
        "hall": "P 4cw",
        "basis_op_id": 0,
        "settingId": "P43"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 79,
    "crystalSystem": "tetragonal",
    "standardHm": "I 4",
    "standardHall": "I 4",
    "centering": "I",
    "settings": [
      {
        "number": 79,
        "ccp4": 79,
        "hm": "I 4",
        "ext": "0",
        "qualifier": "",
        "hall": "I 4",
        "basis_op_id": 0,
        "settingId": "I4"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 80,
    "crystalSystem": "tetragonal",
    "standardHm": "I 41",
    "standardHall": "I 4bw",
    "centering": "I",
    "settings": [
      {
        "number": 80,
        "ccp4": 80,
        "hm": "I 41",
        "ext": "0",
        "qualifier": "",
        "hall": "I 4bw",
        "basis_op_id": 0,
        "settingId": "I41"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 81,
    "crystalSystem": "tetragonal",
    "standardHm": "P -4",
    "standardHall": "P -4",
    "centering": "P",
    "settings": [
      {
        "number": 81,
        "ccp4": 81,
        "hm": "P -4",
        "ext": "0",
        "qualifier": "",
        "hall": "P -4",
        "basis_op_id": 0,
        "settingId": "P-4"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 82,
    "crystalSystem": "tetragonal",
    "standardHm": "I -4",
    "standardHall": "I -4",
    "centering": "I",
    "settings": [
      {
        "number": 82,
        "ccp4": 82,
        "hm": "I -4",
        "ext": "0",
        "qualifier": "",
        "hall": "I -4",
        "basis_op_id": 0,
        "settingId": "I-4"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 83,
    "crystalSystem": "tetragonal",
    "standardHm": "P 4/m",
    "standardHall": "-P 4",
    "centering": "P",
    "settings": [
      {
        "number": 83,
        "ccp4": 83,
        "hm": "P 4/m",
        "ext": "0",
        "qualifier": "",
        "hall": "-P 4",
        "basis_op_id": 0,
        "settingId": "P4/m"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 84,
    "crystalSystem": "tetragonal",
    "standardHm": "P 42/m",
    "standardHall": "-P 4c",
    "centering": "P",
    "settings": [
      {
        "number": 84,
        "ccp4": 84,
        "hm": "P 42/m",
        "ext": "0",
        "qualifier": "",
        "hall": "-P 4c",
        "basis_op_id": 0,
        "settingId": "P42/m"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 85,
    "crystalSystem": "tetragonal",
    "standardHm": "P 4/n",
    "standardHall": "P 4ab -1ab",
    "centering": "P",
    "settings": [
      {
        "number": 85,
        "ccp4": 85,
        "hm": "P 4/n",
        "ext": "1",
        "qualifier": "",
        "hall": "P 4ab -1ab",
        "basis_op_id": 29,
        "settingId": "P4/n"
      },
      {
        "number": 85,
        "ccp4": 0,
        "hm": "P 4/n",
        "ext": "2",
        "qualifier": "",
        "hall": "-P 4a",
        "basis_op_id": 0,
        "settingId": "P4/n"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 86,
    "crystalSystem": "tetragonal",
    "standardHm": "P 42/n",
    "standardHall": "P 4n -1n",
    "centering": "P",
    "settings": [
      {
        "number": 86,
        "ccp4": 86,
        "hm": "P 42/n",
        "ext": "1",
        "qualifier": "",
        "hall": "P 4n -1n",
        "basis_op_id": 30,
        "settingId": "P42/n"
      },
      {
        "number": 86,
        "ccp4": 0,
        "hm": "P 42/n",
        "ext": "2",
        "qualifier": "",
        "hall": "-P 4bc",
        "basis_op_id": 0,
        "settingId": "P42/n"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 87,
    "crystalSystem": "tetragonal",
    "standardHm": "I 4/m",
    "standardHall": "-I 4",
    "centering": "I",
    "settings": [
      {
        "number": 87,
        "ccp4": 87,
        "hm": "I 4/m",
        "ext": "0",
        "qualifier": "",
        "hall": "-I 4",
        "basis_op_id": 0,
        "settingId": "I4/m"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 88,
    "crystalSystem": "tetragonal",
    "standardHm": "I 41/a",
    "standardHall": "I 4bw -1bw",
    "centering": "I",
    "settings": [
      {
        "number": 88,
        "ccp4": 88,
        "hm": "I 41/a",
        "ext": "1",
        "qualifier": "",
        "hall": "I 4bw -1bw",
        "basis_op_id": 31,
        "settingId": "I41/a"
      },
      {
        "number": 88,
        "ccp4": 0,
        "hm": "I 41/a",
        "ext": "2",
        "qualifier": "",
        "hall": "-I 4ad",
        "basis_op_id": 0,
        "settingId": "I41/a"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 89,
    "crystalSystem": "tetragonal",
    "standardHm": "P 4 2 2",
    "standardHall": "P 4 2",
    "centering": "P",
    "settings": [
      {
        "number": 89,
        "ccp4": 89,
        "hm": "P 4 2 2",
        "ext": "0",
        "qualifier": "",
        "hall": "P 4 2",
        "basis_op_id": 0,
        "settingId": "P422"
      },
      {
        "number": 89,
        "ccp4": 0,
        "hm": "C 4 2 2",
        "ext": "0",
        "qualifier": "",
        "hall": "C 4 2",
        "basis_op_id": 50,
        "settingId": "C422"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 90,
    "crystalSystem": "tetragonal",
    "standardHm": "P 4 21 2",
    "standardHall": "P 4ab 2ab",
    "centering": "P",
    "settings": [
      {
        "number": 90,
        "ccp4": 90,
        "hm": "P 4 21 2",
        "ext": "0",
        "qualifier": "",
        "hall": "P 4ab 2ab",
        "basis_op_id": 0,
        "settingId": "P4212"
      },
      {
        "number": 90,
        "ccp4": 0,
        "hm": "C 4 2 21",
        "ext": "0",
        "qualifier": "",
        "hall": "C 4a 2",
        "basis_op_id": 50,
        "settingId": "C4221"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 91,
    "crystalSystem": "tetragonal",
    "standardHm": "P 41 2 2",
    "standardHall": "P 4w 2c",
    "centering": "P",
    "settings": [
      {
        "number": 91,
        "ccp4": 91,
        "hm": "P 41 2 2",
        "ext": "0",
        "qualifier": "",
        "hall": "P 4w 2c",
        "basis_op_id": 0,
        "settingId": "P4122"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 92,
    "crystalSystem": "tetragonal",
    "standardHm": "P 41 21 2",
    "standardHall": "P 4abw 2nw",
    "centering": "P",
    "settings": [
      {
        "number": 92,
        "ccp4": 92,
        "hm": "P 41 21 2",
        "ext": "0",
        "qualifier": "",
        "hall": "P 4abw 2nw",
        "basis_op_id": 0,
        "settingId": "P41212"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 93,
    "crystalSystem": "tetragonal",
    "standardHm": "P 42 2 2",
    "standardHall": "P 4c 2",
    "centering": "P",
    "settings": [
      {
        "number": 93,
        "ccp4": 93,
        "hm": "P 42 2 2",
        "ext": "0",
        "qualifier": "",
        "hall": "P 4c 2",
        "basis_op_id": 0,
        "settingId": "P4222"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 94,
    "crystalSystem": "tetragonal",
    "standardHm": "P 42 21 2",
    "standardHall": "P 4n 2n",
    "centering": "P",
    "settings": [
      {
        "number": 94,
        "ccp4": 94,
        "hm": "P 42 21 2",
        "ext": "0",
        "qualifier": "",
        "hall": "P 4n 2n",
        "basis_op_id": 0,
        "settingId": "P42212"
      },
      {
        "number": 94,
        "ccp4": 1094,
        "hm": "P 42 21 2a",
        "ext": "0",
        "qualifier": "",
        "hall": "P 4bc 2a",
        "basis_op_id": 20,
        "settingId": "P42212a"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 95,
    "crystalSystem": "tetragonal",
    "standardHm": "P 43 2 2",
    "standardHall": "P 4cw 2c",
    "centering": "P",
    "settings": [
      {
        "number": 95,
        "ccp4": 95,
        "hm": "P 43 2 2",
        "ext": "0",
        "qualifier": "",
        "hall": "P 4cw 2c",
        "basis_op_id": 0,
        "settingId": "P4322"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 96,
    "crystalSystem": "tetragonal",
    "standardHm": "P 43 21 2",
    "standardHall": "P 4nw 2abw",
    "centering": "P",
    "settings": [
      {
        "number": 96,
        "ccp4": 96,
        "hm": "P 43 21 2",
        "ext": "0",
        "qualifier": "",
        "hall": "P 4nw 2abw",
        "basis_op_id": 0,
        "settingId": "P43212"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 97,
    "crystalSystem": "tetragonal",
    "standardHm": "I 4 2 2",
    "standardHall": "I 4 2",
    "centering": "I",
    "settings": [
      {
        "number": 97,
        "ccp4": 97,
        "hm": "I 4 2 2",
        "ext": "0",
        "qualifier": "",
        "hall": "I 4 2",
        "basis_op_id": 0,
        "settingId": "I422"
      },
      {
        "number": 97,
        "ccp4": 0,
        "hm": "F 4 2 2",
        "ext": "0",
        "qualifier": "",
        "hall": "F 4 2",
        "basis_op_id": 50,
        "settingId": "F422"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 98,
    "crystalSystem": "tetragonal",
    "standardHm": "I 41 2 2",
    "standardHall": "I 4bw 2bw",
    "centering": "I",
    "settings": [
      {
        "number": 98,
        "ccp4": 98,
        "hm": "I 41 2 2",
        "ext": "0",
        "qualifier": "",
        "hall": "I 4bw 2bw",
        "basis_op_id": 0,
        "settingId": "I4122"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 99,
    "crystalSystem": "tetragonal",
    "standardHm": "P 4 m m",
    "standardHall": "P 4 -2",
    "centering": "P",
    "settings": [
      {
        "number": 99,
        "ccp4": 99,
        "hm": "P 4 m m",
        "ext": "0",
        "qualifier": "",
        "hall": "P 4 -2",
        "basis_op_id": 0,
        "settingId": "P4mm"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 100,
    "crystalSystem": "tetragonal",
    "standardHm": "P 4 b m",
    "standardHall": "P 4 -2ab",
    "centering": "P",
    "settings": [
      {
        "number": 100,
        "ccp4": 100,
        "hm": "P 4 b m",
        "ext": "0",
        "qualifier": "",
        "hall": "P 4 -2ab",
        "basis_op_id": 0,
        "settingId": "P4bm"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 101,
    "crystalSystem": "tetragonal",
    "standardHm": "P 42 c m",
    "standardHall": "P 4c -2c",
    "centering": "P",
    "settings": [
      {
        "number": 101,
        "ccp4": 101,
        "hm": "P 42 c m",
        "ext": "0",
        "qualifier": "",
        "hall": "P 4c -2c",
        "basis_op_id": 0,
        "settingId": "P42cm"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 102,
    "crystalSystem": "tetragonal",
    "standardHm": "P 42 n m",
    "standardHall": "P 4n -2n",
    "centering": "P",
    "settings": [
      {
        "number": 102,
        "ccp4": 102,
        "hm": "P 42 n m",
        "ext": "0",
        "qualifier": "",
        "hall": "P 4n -2n",
        "basis_op_id": 0,
        "settingId": "P42nm"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 103,
    "crystalSystem": "tetragonal",
    "standardHm": "P 4 c c",
    "standardHall": "P 4 -2c",
    "centering": "P",
    "settings": [
      {
        "number": 103,
        "ccp4": 103,
        "hm": "P 4 c c",
        "ext": "0",
        "qualifier": "",
        "hall": "P 4 -2c",
        "basis_op_id": 0,
        "settingId": "P4cc"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 104,
    "crystalSystem": "tetragonal",
    "standardHm": "P 4 n c",
    "standardHall": "P 4 -2n",
    "centering": "P",
    "settings": [
      {
        "number": 104,
        "ccp4": 104,
        "hm": "P 4 n c",
        "ext": "0",
        "qualifier": "",
        "hall": "P 4 -2n",
        "basis_op_id": 0,
        "settingId": "P4nc"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 105,
    "crystalSystem": "tetragonal",
    "standardHm": "P 42 m c",
    "standardHall": "P 4c -2",
    "centering": "P",
    "settings": [
      {
        "number": 105,
        "ccp4": 105,
        "hm": "P 42 m c",
        "ext": "0",
        "qualifier": "",
        "hall": "P 4c -2",
        "basis_op_id": 0,
        "settingId": "P42mc"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 106,
    "crystalSystem": "tetragonal",
    "standardHm": "P 42 b c",
    "standardHall": "P 4c -2ab",
    "centering": "P",
    "settings": [
      {
        "number": 106,
        "ccp4": 106,
        "hm": "P 42 b c",
        "ext": "0",
        "qualifier": "",
        "hall": "P 4c -2ab",
        "basis_op_id": 0,
        "settingId": "P42bc"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 107,
    "crystalSystem": "tetragonal",
    "standardHm": "I 4 m m",
    "standardHall": "I 4 -2",
    "centering": "I",
    "settings": [
      {
        "number": 107,
        "ccp4": 107,
        "hm": "I 4 m m",
        "ext": "0",
        "qualifier": "",
        "hall": "I 4 -2",
        "basis_op_id": 0,
        "settingId": "I4mm"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 108,
    "crystalSystem": "tetragonal",
    "standardHm": "I 4 c m",
    "standardHall": "I 4 -2c",
    "centering": "I",
    "settings": [
      {
        "number": 108,
        "ccp4": 108,
        "hm": "I 4 c m",
        "ext": "0",
        "qualifier": "",
        "hall": "I 4 -2c",
        "basis_op_id": 0,
        "settingId": "I4cm"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 109,
    "crystalSystem": "tetragonal",
    "standardHm": "I 41 m d",
    "standardHall": "I 4bw -2",
    "centering": "I",
    "settings": [
      {
        "number": 109,
        "ccp4": 109,
        "hm": "I 41 m d",
        "ext": "0",
        "qualifier": "",
        "hall": "I 4bw -2",
        "basis_op_id": 0,
        "settingId": "I41md"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 110,
    "crystalSystem": "tetragonal",
    "standardHm": "I 41 c d",
    "standardHall": "I 4bw -2c",
    "centering": "I",
    "settings": [
      {
        "number": 110,
        "ccp4": 110,
        "hm": "I 41 c d",
        "ext": "0",
        "qualifier": "",
        "hall": "I 4bw -2c",
        "basis_op_id": 0,
        "settingId": "I41cd"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 111,
    "crystalSystem": "tetragonal",
    "standardHm": "P -4 2 m",
    "standardHall": "P -4 2",
    "centering": "P",
    "settings": [
      {
        "number": 111,
        "ccp4": 111,
        "hm": "P -4 2 m",
        "ext": "0",
        "qualifier": "",
        "hall": "P -4 2",
        "basis_op_id": 0,
        "settingId": "P-42m"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 112,
    "crystalSystem": "tetragonal",
    "standardHm": "P -4 2 c",
    "standardHall": "P -4 2c",
    "centering": "P",
    "settings": [
      {
        "number": 112,
        "ccp4": 112,
        "hm": "P -4 2 c",
        "ext": "0",
        "qualifier": "",
        "hall": "P -4 2c",
        "basis_op_id": 0,
        "settingId": "P-42c"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 113,
    "crystalSystem": "tetragonal",
    "standardHm": "P -4 21 m",
    "standardHall": "P -4 2ab",
    "centering": "P",
    "settings": [
      {
        "number": 113,
        "ccp4": 113,
        "hm": "P -4 21 m",
        "ext": "0",
        "qualifier": "",
        "hall": "P -4 2ab",
        "basis_op_id": 0,
        "settingId": "P-421m"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 114,
    "crystalSystem": "tetragonal",
    "standardHm": "P -4 21 c",
    "standardHall": "P -4 2n",
    "centering": "P",
    "settings": [
      {
        "number": 114,
        "ccp4": 114,
        "hm": "P -4 21 c",
        "ext": "0",
        "qualifier": "",
        "hall": "P -4 2n",
        "basis_op_id": 0,
        "settingId": "P-421c"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 115,
    "crystalSystem": "tetragonal",
    "standardHm": "P -4 m 2",
    "standardHall": "P -4 -2",
    "centering": "P",
    "settings": [
      {
        "number": 115,
        "ccp4": 115,
        "hm": "P -4 m 2",
        "ext": "0",
        "qualifier": "",
        "hall": "P -4 -2",
        "basis_op_id": 0,
        "settingId": "P-4m2"
      },
      {
        "number": 115,
        "ccp4": 0,
        "hm": "C -4 2 m",
        "ext": "0",
        "qualifier": "",
        "hall": "C -4 2",
        "basis_op_id": 50,
        "settingId": "C-42m"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 116,
    "crystalSystem": "tetragonal",
    "standardHm": "P -4 c 2",
    "standardHall": "P -4 -2c",
    "centering": "P",
    "settings": [
      {
        "number": 116,
        "ccp4": 116,
        "hm": "P -4 c 2",
        "ext": "0",
        "qualifier": "",
        "hall": "P -4 -2c",
        "basis_op_id": 0,
        "settingId": "P-4c2"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 117,
    "crystalSystem": "tetragonal",
    "standardHm": "P -4 b 2",
    "standardHall": "P -4 -2ab",
    "centering": "P",
    "settings": [
      {
        "number": 117,
        "ccp4": 117,
        "hm": "P -4 b 2",
        "ext": "0",
        "qualifier": "",
        "hall": "P -4 -2ab",
        "basis_op_id": 0,
        "settingId": "P-4b2"
      },
      {
        "number": 117,
        "ccp4": 0,
        "hm": "C -4 2 b",
        "ext": "0",
        "qualifier": "",
        "hall": "C -4 2ya",
        "basis_op_id": 50,
        "settingId": "C-42b"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 118,
    "crystalSystem": "tetragonal",
    "standardHm": "P -4 n 2",
    "standardHall": "P -4 -2n",
    "centering": "P",
    "settings": [
      {
        "number": 118,
        "ccp4": 118,
        "hm": "P -4 n 2",
        "ext": "0",
        "qualifier": "",
        "hall": "P -4 -2n",
        "basis_op_id": 0,
        "settingId": "P-4n2"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 119,
    "crystalSystem": "tetragonal",
    "standardHm": "I -4 m 2",
    "standardHall": "I -4 -2",
    "centering": "I",
    "settings": [
      {
        "number": 119,
        "ccp4": 119,
        "hm": "I -4 m 2",
        "ext": "0",
        "qualifier": "",
        "hall": "I -4 -2",
        "basis_op_id": 0,
        "settingId": "I-4m2"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 120,
    "crystalSystem": "tetragonal",
    "standardHm": "I -4 c 2",
    "standardHall": "I -4 -2c",
    "centering": "I",
    "settings": [
      {
        "number": 120,
        "ccp4": 120,
        "hm": "I -4 c 2",
        "ext": "0",
        "qualifier": "",
        "hall": "I -4 -2c",
        "basis_op_id": 0,
        "settingId": "I-4c2"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 121,
    "crystalSystem": "tetragonal",
    "standardHm": "I -4 2 m",
    "standardHall": "I -4 2",
    "centering": "I",
    "settings": [
      {
        "number": 121,
        "ccp4": 121,
        "hm": "I -4 2 m",
        "ext": "0",
        "qualifier": "",
        "hall": "I -4 2",
        "basis_op_id": 0,
        "settingId": "I-42m"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 122,
    "crystalSystem": "tetragonal",
    "standardHm": "I -4 2 d",
    "standardHall": "I -4 2bw",
    "centering": "I",
    "settings": [
      {
        "number": 122,
        "ccp4": 122,
        "hm": "I -4 2 d",
        "ext": "0",
        "qualifier": "",
        "hall": "I -4 2bw",
        "basis_op_id": 0,
        "settingId": "I-42d"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 123,
    "crystalSystem": "tetragonal",
    "standardHm": "P 4/m m m",
    "standardHall": "-P 4 2",
    "centering": "P",
    "settings": [
      {
        "number": 123,
        "ccp4": 123,
        "hm": "P 4/m m m",
        "ext": "0",
        "qualifier": "",
        "hall": "-P 4 2",
        "basis_op_id": 0,
        "settingId": "P4/mmm"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 124,
    "crystalSystem": "tetragonal",
    "standardHm": "P 4/m c c",
    "standardHall": "-P 4 2c",
    "centering": "P",
    "settings": [
      {
        "number": 124,
        "ccp4": 124,
        "hm": "P 4/m c c",
        "ext": "0",
        "qualifier": "",
        "hall": "-P 4 2c",
        "basis_op_id": 0,
        "settingId": "P4/mcc"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 125,
    "crystalSystem": "tetragonal",
    "standardHm": "P 4/n b m",
    "standardHall": "P 4 2 -1ab",
    "centering": "P",
    "settings": [
      {
        "number": 125,
        "ccp4": 125,
        "hm": "P 4/n b m",
        "ext": "1",
        "qualifier": "",
        "hall": "P 4 2 -1ab",
        "basis_op_id": 21,
        "settingId": "P4/nbm"
      },
      {
        "number": 125,
        "ccp4": 0,
        "hm": "P 4/n b m",
        "ext": "2",
        "qualifier": "",
        "hall": "-P 4a 2b",
        "basis_op_id": 0,
        "settingId": "P4/nbm"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 126,
    "crystalSystem": "tetragonal",
    "standardHm": "P 4/n n c",
    "standardHall": "P 4 2 -1n",
    "centering": "P",
    "settings": [
      {
        "number": 126,
        "ccp4": 126,
        "hm": "P 4/n n c",
        "ext": "1",
        "qualifier": "",
        "hall": "P 4 2 -1n",
        "basis_op_id": 20,
        "settingId": "P4/nnc"
      },
      {
        "number": 126,
        "ccp4": 0,
        "hm": "P 4/n n c",
        "ext": "2",
        "qualifier": "",
        "hall": "-P 4a 2bc",
        "basis_op_id": 0,
        "settingId": "P4/nnc"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 127,
    "crystalSystem": "tetragonal",
    "standardHm": "P 4/m b m",
    "standardHall": "-P 4 2ab",
    "centering": "P",
    "settings": [
      {
        "number": 127,
        "ccp4": 127,
        "hm": "P 4/m b m",
        "ext": "0",
        "qualifier": "",
        "hall": "-P 4 2ab",
        "basis_op_id": 0,
        "settingId": "P4/mbm"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 128,
    "crystalSystem": "tetragonal",
    "standardHm": "P 4/m n c",
    "standardHall": "-P 4 2n",
    "centering": "P",
    "settings": [
      {
        "number": 128,
        "ccp4": 128,
        "hm": "P 4/m n c",
        "ext": "0",
        "qualifier": "",
        "hall": "-P 4 2n",
        "basis_op_id": 0,
        "settingId": "P4/mnc"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 129,
    "crystalSystem": "tetragonal",
    "standardHm": "P 4/n m m",
    "standardHall": "P 4ab 2ab -1ab",
    "centering": "P",
    "settings": [
      {
        "number": 129,
        "ccp4": 129,
        "hm": "P 4/n m m",
        "ext": "1",
        "qualifier": "",
        "hall": "P 4ab 2ab -1ab",
        "basis_op_id": 29,
        "settingId": "P4/nmm"
      },
      {
        "number": 129,
        "ccp4": 0,
        "hm": "P 4/n m m",
        "ext": "2",
        "qualifier": "",
        "hall": "-P 4a 2a",
        "basis_op_id": 0,
        "settingId": "P4/nmm"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 130,
    "crystalSystem": "tetragonal",
    "standardHm": "P 4/n c c",
    "standardHall": "P 4ab 2n -1ab",
    "centering": "P",
    "settings": [
      {
        "number": 130,
        "ccp4": 130,
        "hm": "P 4/n c c",
        "ext": "1",
        "qualifier": "",
        "hall": "P 4ab 2n -1ab",
        "basis_op_id": 29,
        "settingId": "P4/ncc"
      },
      {
        "number": 130,
        "ccp4": 0,
        "hm": "P 4/n c c",
        "ext": "2",
        "qualifier": "",
        "hall": "-P 4a 2ac",
        "basis_op_id": 0,
        "settingId": "P4/ncc"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 131,
    "crystalSystem": "tetragonal",
    "standardHm": "P 42/m m c",
    "standardHall": "-P 4c 2",
    "centering": "P",
    "settings": [
      {
        "number": 131,
        "ccp4": 131,
        "hm": "P 42/m m c",
        "ext": "0",
        "qualifier": "",
        "hall": "-P 4c 2",
        "basis_op_id": 0,
        "settingId": "P42/mmc"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 132,
    "crystalSystem": "tetragonal",
    "standardHm": "P 42/m c m",
    "standardHall": "-P 4c 2c",
    "centering": "P",
    "settings": [
      {
        "number": 132,
        "ccp4": 132,
        "hm": "P 42/m c m",
        "ext": "0",
        "qualifier": "",
        "hall": "-P 4c 2c",
        "basis_op_id": 0,
        "settingId": "P42/mcm"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 133,
    "crystalSystem": "tetragonal",
    "standardHm": "P 42/n b c",
    "standardHall": "P 4n 2c -1n",
    "centering": "P",
    "settings": [
      {
        "number": 133,
        "ccp4": 133,
        "hm": "P 42/n b c",
        "ext": "1",
        "qualifier": "",
        "hall": "P 4n 2c -1n",
        "basis_op_id": 32,
        "settingId": "P42/nbc"
      },
      {
        "number": 133,
        "ccp4": 0,
        "hm": "P 42/n b c",
        "ext": "2",
        "qualifier": "",
        "hall": "-P 4ac 2b",
        "basis_op_id": 0,
        "settingId": "P42/nbc"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 134,
    "crystalSystem": "tetragonal",
    "standardHm": "P 42/n n m",
    "standardHall": "P 4n 2 -1n",
    "centering": "P",
    "settings": [
      {
        "number": 134,
        "ccp4": 134,
        "hm": "P 42/n n m",
        "ext": "1",
        "qualifier": "",
        "hall": "P 4n 2 -1n",
        "basis_op_id": 33,
        "settingId": "P42/nnm"
      },
      {
        "number": 134,
        "ccp4": 0,
        "hm": "P 42/n n m",
        "ext": "2",
        "qualifier": "",
        "hall": "-P 4ac 2bc",
        "basis_op_id": 0,
        "settingId": "P42/nnm"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 135,
    "crystalSystem": "tetragonal",
    "standardHm": "P 42/m b c",
    "standardHall": "-P 4c 2ab",
    "centering": "P",
    "settings": [
      {
        "number": 135,
        "ccp4": 135,
        "hm": "P 42/m b c",
        "ext": "0",
        "qualifier": "",
        "hall": "-P 4c 2ab",
        "basis_op_id": 0,
        "settingId": "P42/mbc"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 136,
    "crystalSystem": "tetragonal",
    "standardHm": "P 42/m n m",
    "standardHall": "-P 4n 2n",
    "centering": "P",
    "settings": [
      {
        "number": 136,
        "ccp4": 136,
        "hm": "P 42/m n m",
        "ext": "0",
        "qualifier": "",
        "hall": "-P 4n 2n",
        "basis_op_id": 0,
        "settingId": "P42/mnm"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 137,
    "crystalSystem": "tetragonal",
    "standardHm": "P 42/n m c",
    "standardHall": "P 4n 2n -1n",
    "centering": "P",
    "settings": [
      {
        "number": 137,
        "ccp4": 137,
        "hm": "P 42/n m c",
        "ext": "1",
        "qualifier": "",
        "hall": "P 4n 2n -1n",
        "basis_op_id": 32,
        "settingId": "P42/nmc"
      },
      {
        "number": 137,
        "ccp4": 0,
        "hm": "P 42/n m c",
        "ext": "2",
        "qualifier": "",
        "hall": "-P 4ac 2a",
        "basis_op_id": 0,
        "settingId": "P42/nmc"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 138,
    "crystalSystem": "tetragonal",
    "standardHm": "P 42/n c m",
    "standardHall": "P 4n 2ab -1n",
    "centering": "P",
    "settings": [
      {
        "number": 138,
        "ccp4": 138,
        "hm": "P 42/n c m",
        "ext": "1",
        "qualifier": "",
        "hall": "P 4n 2ab -1n",
        "basis_op_id": 33,
        "settingId": "P42/ncm"
      },
      {
        "number": 138,
        "ccp4": 0,
        "hm": "P 42/n c m",
        "ext": "2",
        "qualifier": "",
        "hall": "-P 4ac 2ac",
        "basis_op_id": 0,
        "settingId": "P42/ncm"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 139,
    "crystalSystem": "tetragonal",
    "standardHm": "I 4/m m m",
    "standardHall": "-I 4 2",
    "centering": "I",
    "settings": [
      {
        "number": 139,
        "ccp4": 139,
        "hm": "I 4/m m m",
        "ext": "0",
        "qualifier": "",
        "hall": "-I 4 2",
        "basis_op_id": 0,
        "settingId": "I4/mmm"
      },
      {
        "number": 139,
        "ccp4": 0,
        "hm": "F 4/m m m",
        "ext": "0",
        "qualifier": "",
        "hall": "-F 4 2",
        "basis_op_id": 50,
        "settingId": "F4/mmm"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 140,
    "crystalSystem": "tetragonal",
    "standardHm": "I 4/m c m",
    "standardHall": "-I 4 2c",
    "centering": "I",
    "settings": [
      {
        "number": 140,
        "ccp4": 140,
        "hm": "I 4/m c m",
        "ext": "0",
        "qualifier": "",
        "hall": "-I 4 2c",
        "basis_op_id": 0,
        "settingId": "I4/mcm"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 141,
    "crystalSystem": "tetragonal",
    "standardHm": "I 41/a m d",
    "standardHall": "I 4bw 2bw -1bw",
    "centering": "I",
    "settings": [
      {
        "number": 141,
        "ccp4": 141,
        "hm": "I 41/a m d",
        "ext": "1",
        "qualifier": "",
        "hall": "I 4bw 2bw -1bw",
        "basis_op_id": 34,
        "settingId": "I41/amd"
      },
      {
        "number": 141,
        "ccp4": 0,
        "hm": "I 41/a m d",
        "ext": "2",
        "qualifier": "",
        "hall": "-I 4bd 2",
        "basis_op_id": 0,
        "settingId": "I41/amd"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 142,
    "crystalSystem": "tetragonal",
    "standardHm": "I 41/a c d",
    "standardHall": "I 4bw 2aw -1bw",
    "centering": "I",
    "settings": [
      {
        "number": 142,
        "ccp4": 142,
        "hm": "I 41/a c d",
        "ext": "1",
        "qualifier": "",
        "hall": "I 4bw 2aw -1bw",
        "basis_op_id": 35,
        "settingId": "I41/acd"
      },
      {
        "number": 142,
        "ccp4": 0,
        "hm": "I 41/a c d",
        "ext": "2",
        "qualifier": "",
        "hall": "-I 4bd 2c",
        "basis_op_id": 0,
        "settingId": "I41/acd"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 143,
    "crystalSystem": "trigonal",
    "standardHm": "P 3",
    "standardHall": "P 3",
    "centering": "P",
    "settings": [
      {
        "number": 143,
        "ccp4": 143,
        "hm": "P 3",
        "ext": "0",
        "qualifier": "",
        "hall": "P 3",
        "basis_op_id": 0,
        "settingId": "P3"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 144,
    "crystalSystem": "trigonal",
    "standardHm": "P 31",
    "standardHall": "P 31",
    "centering": "P",
    "settings": [
      {
        "number": 144,
        "ccp4": 144,
        "hm": "P 31",
        "ext": "0",
        "qualifier": "",
        "hall": "P 31",
        "basis_op_id": 0,
        "settingId": "P31"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 145,
    "crystalSystem": "trigonal",
    "standardHm": "P 32",
    "standardHall": "P 32",
    "centering": "P",
    "settings": [
      {
        "number": 145,
        "ccp4": 145,
        "hm": "P 32",
        "ext": "0",
        "qualifier": "",
        "hall": "P 32",
        "basis_op_id": 0,
        "settingId": "P32"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 146,
    "crystalSystem": "trigonal",
    "standardHm": "R 3",
    "standardHall": "R 3",
    "centering": "R",
    "settings": [
      {
        "number": 146,
        "ccp4": 146,
        "hm": "R 3",
        "ext": "H",
        "qualifier": "",
        "hall": "R 3",
        "basis_op_id": 0,
        "settingId": "R3"
      },
      {
        "number": 146,
        "ccp4": 1146,
        "hm": "R 3",
        "ext": "R",
        "qualifier": "",
        "hall": "P 3*",
        "basis_op_id": 36,
        "settingId": "R3"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 147,
    "crystalSystem": "trigonal",
    "standardHm": "P -3",
    "standardHall": "-P 3",
    "centering": "P",
    "settings": [
      {
        "number": 147,
        "ccp4": 147,
        "hm": "P -3",
        "ext": "0",
        "qualifier": "",
        "hall": "-P 3",
        "basis_op_id": 0,
        "settingId": "P-3"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 148,
    "crystalSystem": "trigonal",
    "standardHm": "R -3",
    "standardHall": "-R 3",
    "centering": "R",
    "settings": [
      {
        "number": 148,
        "ccp4": 148,
        "hm": "R -3",
        "ext": "H",
        "qualifier": "",
        "hall": "-R 3",
        "basis_op_id": 0,
        "settingId": "R-3"
      },
      {
        "number": 148,
        "ccp4": 1148,
        "hm": "R -3",
        "ext": "R",
        "qualifier": "",
        "hall": "-P 3*",
        "basis_op_id": 36,
        "settingId": "R-3"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 149,
    "crystalSystem": "trigonal",
    "standardHm": "P 3 1 2",
    "standardHall": "P 3 2",
    "centering": "P",
    "settings": [
      {
        "number": 149,
        "ccp4": 149,
        "hm": "P 3 1 2",
        "ext": "0",
        "qualifier": "",
        "hall": "P 3 2",
        "basis_op_id": 0,
        "settingId": "P312"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 150,
    "crystalSystem": "trigonal",
    "standardHm": "P 3 2 1",
    "standardHall": "P 3 2\"",
    "centering": "P",
    "settings": [
      {
        "number": 150,
        "ccp4": 150,
        "hm": "P 3 2 1",
        "ext": "0",
        "qualifier": "",
        "hall": "P 3 2\"",
        "basis_op_id": 0,
        "settingId": "P321"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 151,
    "crystalSystem": "trigonal",
    "standardHm": "P 31 1 2",
    "standardHall": "P 31 2 (0 0 4)",
    "centering": "P",
    "settings": [
      {
        "number": 151,
        "ccp4": 151,
        "hm": "P 31 1 2",
        "ext": "0",
        "qualifier": "",
        "hall": "P 31 2 (0 0 4)",
        "basis_op_id": 0,
        "settingId": "P3112"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 152,
    "crystalSystem": "trigonal",
    "standardHm": "P 31 2 1",
    "standardHall": "P 31 2\"",
    "centering": "P",
    "settings": [
      {
        "number": 152,
        "ccp4": 152,
        "hm": "P 31 2 1",
        "ext": "0",
        "qualifier": "",
        "hall": "P 31 2\"",
        "basis_op_id": 0,
        "settingId": "P3121"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 153,
    "crystalSystem": "trigonal",
    "standardHm": "P 32 1 2",
    "standardHall": "P 32 2 (0 0 2)",
    "centering": "P",
    "settings": [
      {
        "number": 153,
        "ccp4": 153,
        "hm": "P 32 1 2",
        "ext": "0",
        "qualifier": "",
        "hall": "P 32 2 (0 0 2)",
        "basis_op_id": 0,
        "settingId": "P3212"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 154,
    "crystalSystem": "trigonal",
    "standardHm": "P 32 2 1",
    "standardHall": "P 32 2\"",
    "centering": "P",
    "settings": [
      {
        "number": 154,
        "ccp4": 154,
        "hm": "P 32 2 1",
        "ext": "0",
        "qualifier": "",
        "hall": "P 32 2\"",
        "basis_op_id": 0,
        "settingId": "P3221"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 155,
    "crystalSystem": "trigonal",
    "standardHm": "R 3 2",
    "standardHall": "R 3 2\"",
    "centering": "R",
    "settings": [
      {
        "number": 155,
        "ccp4": 155,
        "hm": "R 3 2",
        "ext": "H",
        "qualifier": "",
        "hall": "R 3 2\"",
        "basis_op_id": 0,
        "settingId": "R32"
      },
      {
        "number": 155,
        "ccp4": 1155,
        "hm": "R 3 2",
        "ext": "R",
        "qualifier": "",
        "hall": "P 3* 2",
        "basis_op_id": 36,
        "settingId": "R32"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 156,
    "crystalSystem": "trigonal",
    "standardHm": "P 3 m 1",
    "standardHall": "P 3 -2\"",
    "centering": "P",
    "settings": [
      {
        "number": 156,
        "ccp4": 156,
        "hm": "P 3 m 1",
        "ext": "0",
        "qualifier": "",
        "hall": "P 3 -2\"",
        "basis_op_id": 0,
        "settingId": "P3m1"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 157,
    "crystalSystem": "trigonal",
    "standardHm": "P 3 1 m",
    "standardHall": "P 3 -2",
    "centering": "P",
    "settings": [
      {
        "number": 157,
        "ccp4": 157,
        "hm": "P 3 1 m",
        "ext": "0",
        "qualifier": "",
        "hall": "P 3 -2",
        "basis_op_id": 0,
        "settingId": "P31m"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 158,
    "crystalSystem": "trigonal",
    "standardHm": "P 3 c 1",
    "standardHall": "P 3 -2\"c",
    "centering": "P",
    "settings": [
      {
        "number": 158,
        "ccp4": 158,
        "hm": "P 3 c 1",
        "ext": "0",
        "qualifier": "",
        "hall": "P 3 -2\"c",
        "basis_op_id": 0,
        "settingId": "P3c1"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 159,
    "crystalSystem": "trigonal",
    "standardHm": "P 3 1 c",
    "standardHall": "P 3 -2c",
    "centering": "P",
    "settings": [
      {
        "number": 159,
        "ccp4": 159,
        "hm": "P 3 1 c",
        "ext": "0",
        "qualifier": "",
        "hall": "P 3 -2c",
        "basis_op_id": 0,
        "settingId": "P31c"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 160,
    "crystalSystem": "trigonal",
    "standardHm": "R 3 m",
    "standardHall": "R 3 -2\"",
    "centering": "R",
    "settings": [
      {
        "number": 160,
        "ccp4": 160,
        "hm": "R 3 m",
        "ext": "H",
        "qualifier": "",
        "hall": "R 3 -2\"",
        "basis_op_id": 0,
        "settingId": "R3m"
      },
      {
        "number": 160,
        "ccp4": 1160,
        "hm": "R 3 m",
        "ext": "R",
        "qualifier": "",
        "hall": "P 3* -2",
        "basis_op_id": 36,
        "settingId": "R3m"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 161,
    "crystalSystem": "trigonal",
    "standardHm": "R 3 c",
    "standardHall": "R 3 -2\"c",
    "centering": "R",
    "settings": [
      {
        "number": 161,
        "ccp4": 161,
        "hm": "R 3 c",
        "ext": "H",
        "qualifier": "",
        "hall": "R 3 -2\"c",
        "basis_op_id": 0,
        "settingId": "R3c"
      },
      {
        "number": 161,
        "ccp4": 1161,
        "hm": "R 3 c",
        "ext": "R",
        "qualifier": "",
        "hall": "P 3* -2n",
        "basis_op_id": 36,
        "settingId": "R3c"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 162,
    "crystalSystem": "trigonal",
    "standardHm": "P -3 1 m",
    "standardHall": "-P 3 2",
    "centering": "P",
    "settings": [
      {
        "number": 162,
        "ccp4": 162,
        "hm": "P -3 1 m",
        "ext": "0",
        "qualifier": "",
        "hall": "-P 3 2",
        "basis_op_id": 0,
        "settingId": "P-31m"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 163,
    "crystalSystem": "trigonal",
    "standardHm": "P -3 1 c",
    "standardHall": "-P 3 2c",
    "centering": "P",
    "settings": [
      {
        "number": 163,
        "ccp4": 163,
        "hm": "P -3 1 c",
        "ext": "0",
        "qualifier": "",
        "hall": "-P 3 2c",
        "basis_op_id": 0,
        "settingId": "P-31c"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 164,
    "crystalSystem": "trigonal",
    "standardHm": "P -3 m 1",
    "standardHall": "-P 3 2\"",
    "centering": "P",
    "settings": [
      {
        "number": 164,
        "ccp4": 164,
        "hm": "P -3 m 1",
        "ext": "0",
        "qualifier": "",
        "hall": "-P 3 2\"",
        "basis_op_id": 0,
        "settingId": "P-3m1"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 165,
    "crystalSystem": "trigonal",
    "standardHm": "P -3 c 1",
    "standardHall": "-P 3 2\"c",
    "centering": "P",
    "settings": [
      {
        "number": 165,
        "ccp4": 165,
        "hm": "P -3 c 1",
        "ext": "0",
        "qualifier": "",
        "hall": "-P 3 2\"c",
        "basis_op_id": 0,
        "settingId": "P-3c1"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 166,
    "crystalSystem": "trigonal",
    "standardHm": "R -3 m",
    "standardHall": "-R 3 2\"",
    "centering": "R",
    "settings": [
      {
        "number": 166,
        "ccp4": 166,
        "hm": "R -3 m",
        "ext": "H",
        "qualifier": "",
        "hall": "-R 3 2\"",
        "basis_op_id": 0,
        "settingId": "R-3m"
      },
      {
        "number": 166,
        "ccp4": 1166,
        "hm": "R -3 m",
        "ext": "R",
        "qualifier": "",
        "hall": "-P 3* 2",
        "basis_op_id": 36,
        "settingId": "R-3m"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 167,
    "crystalSystem": "trigonal",
    "standardHm": "R -3 c",
    "standardHall": "-R 3 2\"c",
    "centering": "R",
    "settings": [
      {
        "number": 167,
        "ccp4": 167,
        "hm": "R -3 c",
        "ext": "H",
        "qualifier": "",
        "hall": "-R 3 2\"c",
        "basis_op_id": 0,
        "settingId": "R-3c"
      },
      {
        "number": 167,
        "ccp4": 1167,
        "hm": "R -3 c",
        "ext": "R",
        "qualifier": "",
        "hall": "-P 3* 2n",
        "basis_op_id": 36,
        "settingId": "R-3c"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 168,
    "crystalSystem": "hexagonal",
    "standardHm": "P 6",
    "standardHall": "P 6",
    "centering": "P",
    "settings": [
      {
        "number": 168,
        "ccp4": 168,
        "hm": "P 6",
        "ext": "0",
        "qualifier": "",
        "hall": "P 6",
        "basis_op_id": 0,
        "settingId": "P6"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 169,
    "crystalSystem": "hexagonal",
    "standardHm": "P 61",
    "standardHall": "P 61",
    "centering": "P",
    "settings": [
      {
        "number": 169,
        "ccp4": 169,
        "hm": "P 61",
        "ext": "0",
        "qualifier": "",
        "hall": "P 61",
        "basis_op_id": 0,
        "settingId": "P61"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 170,
    "crystalSystem": "hexagonal",
    "standardHm": "P 65",
    "standardHall": "P 65",
    "centering": "P",
    "settings": [
      {
        "number": 170,
        "ccp4": 170,
        "hm": "P 65",
        "ext": "0",
        "qualifier": "",
        "hall": "P 65",
        "basis_op_id": 0,
        "settingId": "P65"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 171,
    "crystalSystem": "hexagonal",
    "standardHm": "P 62",
    "standardHall": "P 62",
    "centering": "P",
    "settings": [
      {
        "number": 171,
        "ccp4": 171,
        "hm": "P 62",
        "ext": "0",
        "qualifier": "",
        "hall": "P 62",
        "basis_op_id": 0,
        "settingId": "P62"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 172,
    "crystalSystem": "hexagonal",
    "standardHm": "P 64",
    "standardHall": "P 64",
    "centering": "P",
    "settings": [
      {
        "number": 172,
        "ccp4": 172,
        "hm": "P 64",
        "ext": "0",
        "qualifier": "",
        "hall": "P 64",
        "basis_op_id": 0,
        "settingId": "P64"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 173,
    "crystalSystem": "hexagonal",
    "standardHm": "P 63",
    "standardHall": "P 6c",
    "centering": "P",
    "settings": [
      {
        "number": 173,
        "ccp4": 173,
        "hm": "P 63",
        "ext": "0",
        "qualifier": "",
        "hall": "P 6c",
        "basis_op_id": 0,
        "settingId": "P63"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 174,
    "crystalSystem": "hexagonal",
    "standardHm": "P -6",
    "standardHall": "P -6",
    "centering": "P",
    "settings": [
      {
        "number": 174,
        "ccp4": 174,
        "hm": "P -6",
        "ext": "0",
        "qualifier": "",
        "hall": "P -6",
        "basis_op_id": 0,
        "settingId": "P-6"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 175,
    "crystalSystem": "hexagonal",
    "standardHm": "P 6/m",
    "standardHall": "-P 6",
    "centering": "P",
    "settings": [
      {
        "number": 175,
        "ccp4": 175,
        "hm": "P 6/m",
        "ext": "0",
        "qualifier": "",
        "hall": "-P 6",
        "basis_op_id": 0,
        "settingId": "P6/m"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 176,
    "crystalSystem": "hexagonal",
    "standardHm": "P 63/m",
    "standardHall": "-P 6c",
    "centering": "P",
    "settings": [
      {
        "number": 176,
        "ccp4": 176,
        "hm": "P 63/m",
        "ext": "0",
        "qualifier": "",
        "hall": "-P 6c",
        "basis_op_id": 0,
        "settingId": "P63/m"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 177,
    "crystalSystem": "hexagonal",
    "standardHm": "P 6 2 2",
    "standardHall": "P 6 2",
    "centering": "P",
    "settings": [
      {
        "number": 177,
        "ccp4": 177,
        "hm": "P 6 2 2",
        "ext": "0",
        "qualifier": "",
        "hall": "P 6 2",
        "basis_op_id": 0,
        "settingId": "P622"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 178,
    "crystalSystem": "hexagonal",
    "standardHm": "P 61 2 2",
    "standardHall": "P 61 2 (0 0 5)",
    "centering": "P",
    "settings": [
      {
        "number": 178,
        "ccp4": 178,
        "hm": "P 61 2 2",
        "ext": "0",
        "qualifier": "",
        "hall": "P 61 2 (0 0 5)",
        "basis_op_id": 0,
        "settingId": "P6122"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 179,
    "crystalSystem": "hexagonal",
    "standardHm": "P 65 2 2",
    "standardHall": "P 65 2 (0 0 1)",
    "centering": "P",
    "settings": [
      {
        "number": 179,
        "ccp4": 179,
        "hm": "P 65 2 2",
        "ext": "0",
        "qualifier": "",
        "hall": "P 65 2 (0 0 1)",
        "basis_op_id": 0,
        "settingId": "P6522"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 180,
    "crystalSystem": "hexagonal",
    "standardHm": "P 62 2 2",
    "standardHall": "P 62 2 (0 0 4)",
    "centering": "P",
    "settings": [
      {
        "number": 180,
        "ccp4": 180,
        "hm": "P 62 2 2",
        "ext": "0",
        "qualifier": "",
        "hall": "P 62 2 (0 0 4)",
        "basis_op_id": 0,
        "settingId": "P6222"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 181,
    "crystalSystem": "hexagonal",
    "standardHm": "P 64 2 2",
    "standardHall": "P 64 2 (0 0 2)",
    "centering": "P",
    "settings": [
      {
        "number": 181,
        "ccp4": 181,
        "hm": "P 64 2 2",
        "ext": "0",
        "qualifier": "",
        "hall": "P 64 2 (0 0 2)",
        "basis_op_id": 0,
        "settingId": "P6422"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 182,
    "crystalSystem": "hexagonal",
    "standardHm": "P 63 2 2",
    "standardHall": "P 6c 2c",
    "centering": "P",
    "settings": [
      {
        "number": 182,
        "ccp4": 182,
        "hm": "P 63 2 2",
        "ext": "0",
        "qualifier": "",
        "hall": "P 6c 2c",
        "basis_op_id": 0,
        "settingId": "P6322"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 183,
    "crystalSystem": "hexagonal",
    "standardHm": "P 6 m m",
    "standardHall": "P 6 -2",
    "centering": "P",
    "settings": [
      {
        "number": 183,
        "ccp4": 183,
        "hm": "P 6 m m",
        "ext": "0",
        "qualifier": "",
        "hall": "P 6 -2",
        "basis_op_id": 0,
        "settingId": "P6mm"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 184,
    "crystalSystem": "hexagonal",
    "standardHm": "P 6 c c",
    "standardHall": "P 6 -2c",
    "centering": "P",
    "settings": [
      {
        "number": 184,
        "ccp4": 184,
        "hm": "P 6 c c",
        "ext": "0",
        "qualifier": "",
        "hall": "P 6 -2c",
        "basis_op_id": 0,
        "settingId": "P6cc"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 185,
    "crystalSystem": "hexagonal",
    "standardHm": "P 63 c m",
    "standardHall": "P 6c -2",
    "centering": "P",
    "settings": [
      {
        "number": 185,
        "ccp4": 185,
        "hm": "P 63 c m",
        "ext": "0",
        "qualifier": "",
        "hall": "P 6c -2",
        "basis_op_id": 0,
        "settingId": "P63cm"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 186,
    "crystalSystem": "hexagonal",
    "standardHm": "P 63 m c",
    "standardHall": "P 6c -2c",
    "centering": "P",
    "settings": [
      {
        "number": 186,
        "ccp4": 186,
        "hm": "P 63 m c",
        "ext": "0",
        "qualifier": "",
        "hall": "P 6c -2c",
        "basis_op_id": 0,
        "settingId": "P63mc"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 187,
    "crystalSystem": "hexagonal",
    "standardHm": "P -6 m 2",
    "standardHall": "P -6 2",
    "centering": "P",
    "settings": [
      {
        "number": 187,
        "ccp4": 187,
        "hm": "P -6 m 2",
        "ext": "0",
        "qualifier": "",
        "hall": "P -6 2",
        "basis_op_id": 0,
        "settingId": "P-6m2"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 188,
    "crystalSystem": "hexagonal",
    "standardHm": "P -6 c 2",
    "standardHall": "P -6c 2",
    "centering": "P",
    "settings": [
      {
        "number": 188,
        "ccp4": 188,
        "hm": "P -6 c 2",
        "ext": "0",
        "qualifier": "",
        "hall": "P -6c 2",
        "basis_op_id": 0,
        "settingId": "P-6c2"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 189,
    "crystalSystem": "hexagonal",
    "standardHm": "P -6 2 m",
    "standardHall": "P -6 -2",
    "centering": "P",
    "settings": [
      {
        "number": 189,
        "ccp4": 189,
        "hm": "P -6 2 m",
        "ext": "0",
        "qualifier": "",
        "hall": "P -6 -2",
        "basis_op_id": 0,
        "settingId": "P-62m"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 190,
    "crystalSystem": "hexagonal",
    "standardHm": "P -6 2 c",
    "standardHall": "P -6c -2c",
    "centering": "P",
    "settings": [
      {
        "number": 190,
        "ccp4": 190,
        "hm": "P -6 2 c",
        "ext": "0",
        "qualifier": "",
        "hall": "P -6c -2c",
        "basis_op_id": 0,
        "settingId": "P-62c"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 191,
    "crystalSystem": "hexagonal",
    "standardHm": "P 6/m m m",
    "standardHall": "-P 6 2",
    "centering": "P",
    "settings": [
      {
        "number": 191,
        "ccp4": 191,
        "hm": "P 6/m m m",
        "ext": "0",
        "qualifier": "",
        "hall": "-P 6 2",
        "basis_op_id": 0,
        "settingId": "P6/mmm"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 192,
    "crystalSystem": "hexagonal",
    "standardHm": "P 6/m c c",
    "standardHall": "-P 6 2c",
    "centering": "P",
    "settings": [
      {
        "number": 192,
        "ccp4": 192,
        "hm": "P 6/m c c",
        "ext": "0",
        "qualifier": "",
        "hall": "-P 6 2c",
        "basis_op_id": 0,
        "settingId": "P6/mcc"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 193,
    "crystalSystem": "hexagonal",
    "standardHm": "P 63/m c m",
    "standardHall": "-P 6c 2",
    "centering": "P",
    "settings": [
      {
        "number": 193,
        "ccp4": 193,
        "hm": "P 63/m c m",
        "ext": "0",
        "qualifier": "",
        "hall": "-P 6c 2",
        "basis_op_id": 0,
        "settingId": "P63/mcm"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 194,
    "crystalSystem": "hexagonal",
    "standardHm": "P 63/m m c",
    "standardHall": "-P 6c 2c",
    "centering": "P",
    "settings": [
      {
        "number": 194,
        "ccp4": 194,
        "hm": "P 63/m m c",
        "ext": "0",
        "qualifier": "",
        "hall": "-P 6c 2c",
        "basis_op_id": 0,
        "settingId": "P63/mmc"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 195,
    "crystalSystem": "cubic",
    "standardHm": "P 2 3",
    "standardHall": "P 2 2 3",
    "centering": "P",
    "settings": [
      {
        "number": 195,
        "ccp4": 195,
        "hm": "P 2 3",
        "ext": "0",
        "qualifier": "",
        "hall": "P 2 2 3",
        "basis_op_id": 0,
        "settingId": "P23"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 196,
    "crystalSystem": "cubic",
    "standardHm": "F 2 3",
    "standardHall": "F 2 2 3",
    "centering": "F",
    "settings": [
      {
        "number": 196,
        "ccp4": 196,
        "hm": "F 2 3",
        "ext": "0",
        "qualifier": "",
        "hall": "F 2 2 3",
        "basis_op_id": 0,
        "settingId": "F23"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 197,
    "crystalSystem": "cubic",
    "standardHm": "I 2 3",
    "standardHall": "I 2 2 3",
    "centering": "I",
    "settings": [
      {
        "number": 197,
        "ccp4": 197,
        "hm": "I 2 3",
        "ext": "0",
        "qualifier": "",
        "hall": "I 2 2 3",
        "basis_op_id": 0,
        "settingId": "I23"
      },
      {
        "number": 197,
        "ccp4": 1197,
        "hm": "I 2 3a",
        "ext": "0",
        "qualifier": "",
        "hall": "I 2ab 2bc 3",
        "basis_op_id": 30,
        "settingId": "I23a"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 198,
    "crystalSystem": "cubic",
    "standardHm": "P 21 3",
    "standardHall": "P 2ac 2ab 3",
    "centering": "P",
    "settings": [
      {
        "number": 198,
        "ccp4": 198,
        "hm": "P 21 3",
        "ext": "0",
        "qualifier": "",
        "hall": "P 2ac 2ab 3",
        "basis_op_id": 0,
        "settingId": "P213"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 199,
    "crystalSystem": "cubic",
    "standardHm": "I 21 3",
    "standardHall": "I 2b 2c 3",
    "centering": "I",
    "settings": [
      {
        "number": 199,
        "ccp4": 199,
        "hm": "I 21 3",
        "ext": "0",
        "qualifier": "",
        "hall": "I 2b 2c 3",
        "basis_op_id": 0,
        "settingId": "I213"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 200,
    "crystalSystem": "cubic",
    "standardHm": "P m -3",
    "standardHall": "-P 2 2 3",
    "centering": "P",
    "settings": [
      {
        "number": 200,
        "ccp4": 200,
        "hm": "P m -3",
        "ext": "0",
        "qualifier": "",
        "hall": "-P 2 2 3",
        "basis_op_id": 0,
        "settingId": "Pm-3"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 201,
    "crystalSystem": "cubic",
    "standardHm": "P n -3",
    "standardHall": "P 2 2 3 -1n",
    "centering": "P",
    "settings": [
      {
        "number": 201,
        "ccp4": 201,
        "hm": "P n -3",
        "ext": "1",
        "qualifier": "",
        "hall": "P 2 2 3 -1n",
        "basis_op_id": 20,
        "settingId": "Pn-3"
      },
      {
        "number": 201,
        "ccp4": 0,
        "hm": "P n -3",
        "ext": "2",
        "qualifier": "",
        "hall": "-P 2ab 2bc 3",
        "basis_op_id": 0,
        "settingId": "Pn-3"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 202,
    "crystalSystem": "cubic",
    "standardHm": "F m -3",
    "standardHall": "-F 2 2 3",
    "centering": "F",
    "settings": [
      {
        "number": 202,
        "ccp4": 202,
        "hm": "F m -3",
        "ext": "0",
        "qualifier": "",
        "hall": "-F 2 2 3",
        "basis_op_id": 0,
        "settingId": "Fm-3"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 203,
    "crystalSystem": "cubic",
    "standardHm": "F d -3",
    "standardHall": "F 2 2 3 -1d",
    "centering": "F",
    "settings": [
      {
        "number": 203,
        "ccp4": 203,
        "hm": "F d -3",
        "ext": "1",
        "qualifier": "",
        "hall": "F 2 2 3 -1d",
        "basis_op_id": 27,
        "settingId": "Fd-3"
      },
      {
        "number": 203,
        "ccp4": 0,
        "hm": "F d -3",
        "ext": "2",
        "qualifier": "",
        "hall": "-F 2uv 2vw 3",
        "basis_op_id": 0,
        "settingId": "Fd-3"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 204,
    "crystalSystem": "cubic",
    "standardHm": "I m -3",
    "standardHall": "-I 2 2 3",
    "centering": "I",
    "settings": [
      {
        "number": 204,
        "ccp4": 204,
        "hm": "I m -3",
        "ext": "0",
        "qualifier": "",
        "hall": "-I 2 2 3",
        "basis_op_id": 0,
        "settingId": "Im-3"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 205,
    "crystalSystem": "cubic",
    "standardHm": "P a -3",
    "standardHall": "-P 2ac 2ab 3",
    "centering": "P",
    "settings": [
      {
        "number": 205,
        "ccp4": 205,
        "hm": "P a -3",
        "ext": "0",
        "qualifier": "",
        "hall": "-P 2ac 2ab 3",
        "basis_op_id": 0,
        "settingId": "Pa-3"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 206,
    "crystalSystem": "cubic",
    "standardHm": "I a -3",
    "standardHall": "-I 2b 2c 3",
    "centering": "I",
    "settings": [
      {
        "number": 206,
        "ccp4": 206,
        "hm": "I a -3",
        "ext": "0",
        "qualifier": "",
        "hall": "-I 2b 2c 3",
        "basis_op_id": 0,
        "settingId": "Ia-3"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 207,
    "crystalSystem": "cubic",
    "standardHm": "P 4 3 2",
    "standardHall": "P 4 2 3",
    "centering": "P",
    "settings": [
      {
        "number": 207,
        "ccp4": 207,
        "hm": "P 4 3 2",
        "ext": "0",
        "qualifier": "",
        "hall": "P 4 2 3",
        "basis_op_id": 0,
        "settingId": "P432"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 208,
    "crystalSystem": "cubic",
    "standardHm": "P 42 3 2",
    "standardHall": "P 4n 2 3",
    "centering": "P",
    "settings": [
      {
        "number": 208,
        "ccp4": 208,
        "hm": "P 42 3 2",
        "ext": "0",
        "qualifier": "",
        "hall": "P 4n 2 3",
        "basis_op_id": 0,
        "settingId": "P4232"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 209,
    "crystalSystem": "cubic",
    "standardHm": "F 4 3 2",
    "standardHall": "F 4 2 3",
    "centering": "F",
    "settings": [
      {
        "number": 209,
        "ccp4": 209,
        "hm": "F 4 3 2",
        "ext": "0",
        "qualifier": "",
        "hall": "F 4 2 3",
        "basis_op_id": 0,
        "settingId": "F432"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 210,
    "crystalSystem": "cubic",
    "standardHm": "F 41 3 2",
    "standardHall": "F 4d 2 3",
    "centering": "F",
    "settings": [
      {
        "number": 210,
        "ccp4": 210,
        "hm": "F 41 3 2",
        "ext": "0",
        "qualifier": "",
        "hall": "F 4d 2 3",
        "basis_op_id": 0,
        "settingId": "F4132"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 211,
    "crystalSystem": "cubic",
    "standardHm": "I 4 3 2",
    "standardHall": "I 4 2 3",
    "centering": "I",
    "settings": [
      {
        "number": 211,
        "ccp4": 211,
        "hm": "I 4 3 2",
        "ext": "0",
        "qualifier": "",
        "hall": "I 4 2 3",
        "basis_op_id": 0,
        "settingId": "I432"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 212,
    "crystalSystem": "cubic",
    "standardHm": "P 43 3 2",
    "standardHall": "P 4acd 2ab 3",
    "centering": "P",
    "settings": [
      {
        "number": 212,
        "ccp4": 212,
        "hm": "P 43 3 2",
        "ext": "0",
        "qualifier": "",
        "hall": "P 4acd 2ab 3",
        "basis_op_id": 0,
        "settingId": "P4332"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 213,
    "crystalSystem": "cubic",
    "standardHm": "P 41 3 2",
    "standardHall": "P 4bd 2ab 3",
    "centering": "P",
    "settings": [
      {
        "number": 213,
        "ccp4": 213,
        "hm": "P 41 3 2",
        "ext": "0",
        "qualifier": "",
        "hall": "P 4bd 2ab 3",
        "basis_op_id": 0,
        "settingId": "P4132"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 214,
    "crystalSystem": "cubic",
    "standardHm": "I 41 3 2",
    "standardHall": "I 4bd 2c 3",
    "centering": "I",
    "settings": [
      {
        "number": 214,
        "ccp4": 214,
        "hm": "I 41 3 2",
        "ext": "0",
        "qualifier": "",
        "hall": "I 4bd 2c 3",
        "basis_op_id": 0,
        "settingId": "I4132"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 215,
    "crystalSystem": "cubic",
    "standardHm": "P -4 3 m",
    "standardHall": "P -4 2 3",
    "centering": "P",
    "settings": [
      {
        "number": 215,
        "ccp4": 215,
        "hm": "P -4 3 m",
        "ext": "0",
        "qualifier": "",
        "hall": "P -4 2 3",
        "basis_op_id": 0,
        "settingId": "P-43m"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 216,
    "crystalSystem": "cubic",
    "standardHm": "F -4 3 m",
    "standardHall": "F -4 2 3",
    "centering": "F",
    "settings": [
      {
        "number": 216,
        "ccp4": 216,
        "hm": "F -4 3 m",
        "ext": "0",
        "qualifier": "",
        "hall": "F -4 2 3",
        "basis_op_id": 0,
        "settingId": "F-43m"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 217,
    "crystalSystem": "cubic",
    "standardHm": "I -4 3 m",
    "standardHall": "I -4 2 3",
    "centering": "I",
    "settings": [
      {
        "number": 217,
        "ccp4": 217,
        "hm": "I -4 3 m",
        "ext": "0",
        "qualifier": "",
        "hall": "I -4 2 3",
        "basis_op_id": 0,
        "settingId": "I-43m"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 218,
    "crystalSystem": "cubic",
    "standardHm": "P -4 3 n",
    "standardHall": "P -4n 2 3",
    "centering": "P",
    "settings": [
      {
        "number": 218,
        "ccp4": 218,
        "hm": "P -4 3 n",
        "ext": "0",
        "qualifier": "",
        "hall": "P -4n 2 3",
        "basis_op_id": 0,
        "settingId": "P-43n"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 219,
    "crystalSystem": "cubic",
    "standardHm": "F -4 3 c",
    "standardHall": "F -4a 2 3",
    "centering": "F",
    "settings": [
      {
        "number": 219,
        "ccp4": 219,
        "hm": "F -4 3 c",
        "ext": "0",
        "qualifier": "",
        "hall": "F -4a 2 3",
        "basis_op_id": 0,
        "settingId": "F-43c"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 220,
    "crystalSystem": "cubic",
    "standardHm": "I -4 3 d",
    "standardHall": "I -4bd 2c 3",
    "centering": "I",
    "settings": [
      {
        "number": 220,
        "ccp4": 220,
        "hm": "I -4 3 d",
        "ext": "0",
        "qualifier": "",
        "hall": "I -4bd 2c 3",
        "basis_op_id": 0,
        "settingId": "I-43d"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 221,
    "crystalSystem": "cubic",
    "standardHm": "P m -3 m",
    "standardHall": "-P 4 2 3",
    "centering": "P",
    "settings": [
      {
        "number": 221,
        "ccp4": 221,
        "hm": "P m -3 m",
        "ext": "0",
        "qualifier": "",
        "hall": "-P 4 2 3",
        "basis_op_id": 0,
        "settingId": "Pm-3m"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 222,
    "crystalSystem": "cubic",
    "standardHm": "P n -3 n",
    "standardHall": "P 4 2 3 -1n",
    "centering": "P",
    "settings": [
      {
        "number": 222,
        "ccp4": 222,
        "hm": "P n -3 n",
        "ext": "1",
        "qualifier": "",
        "hall": "P 4 2 3 -1n",
        "basis_op_id": 20,
        "settingId": "Pn-3n"
      },
      {
        "number": 222,
        "ccp4": 0,
        "hm": "P n -3 n",
        "ext": "2",
        "qualifier": "",
        "hall": "-P 4a 2bc 3",
        "basis_op_id": 0,
        "settingId": "Pn-3n"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 223,
    "crystalSystem": "cubic",
    "standardHm": "P m -3 n",
    "standardHall": "-P 4n 2 3",
    "centering": "P",
    "settings": [
      {
        "number": 223,
        "ccp4": 223,
        "hm": "P m -3 n",
        "ext": "0",
        "qualifier": "",
        "hall": "-P 4n 2 3",
        "basis_op_id": 0,
        "settingId": "Pm-3n"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 224,
    "crystalSystem": "cubic",
    "standardHm": "P n -3 m",
    "standardHall": "P 4n 2 3 -1n",
    "centering": "P",
    "settings": [
      {
        "number": 224,
        "ccp4": 224,
        "hm": "P n -3 m",
        "ext": "1",
        "qualifier": "",
        "hall": "P 4n 2 3 -1n",
        "basis_op_id": 30,
        "settingId": "Pn-3m"
      },
      {
        "number": 224,
        "ccp4": 0,
        "hm": "P n -3 m",
        "ext": "2",
        "qualifier": "",
        "hall": "-P 4bc 2bc 3",
        "basis_op_id": 0,
        "settingId": "Pn-3m"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 225,
    "crystalSystem": "cubic",
    "standardHm": "F m -3 m",
    "standardHall": "-F 4 2 3",
    "centering": "F",
    "settings": [
      {
        "number": 225,
        "ccp4": 225,
        "hm": "F m -3 m",
        "ext": "0",
        "qualifier": "",
        "hall": "-F 4 2 3",
        "basis_op_id": 0,
        "settingId": "Fm-3m"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 226,
    "crystalSystem": "cubic",
    "standardHm": "F m -3 c",
    "standardHall": "-F 4a 2 3",
    "centering": "F",
    "settings": [
      {
        "number": 226,
        "ccp4": 226,
        "hm": "F m -3 c",
        "ext": "0",
        "qualifier": "",
        "hall": "-F 4a 2 3",
        "basis_op_id": 0,
        "settingId": "Fm-3c"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 227,
    "crystalSystem": "cubic",
    "standardHm": "F d -3 m",
    "standardHall": "F 4d 2 3 -1d",
    "centering": "F",
    "settings": [
      {
        "number": 227,
        "ccp4": 227,
        "hm": "F d -3 m",
        "ext": "1",
        "qualifier": "",
        "hall": "F 4d 2 3 -1d",
        "basis_op_id": 27,
        "settingId": "Fd-3m"
      },
      {
        "number": 227,
        "ccp4": 0,
        "hm": "F d -3 m",
        "ext": "2",
        "qualifier": "",
        "hall": "-F 4vw 2vw 3",
        "basis_op_id": 0,
        "settingId": "Fd-3m"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 228,
    "crystalSystem": "cubic",
    "standardHm": "F d -3 c",
    "standardHall": "F 4d 2 3 -1ad",
    "centering": "F",
    "settings": [
      {
        "number": 228,
        "ccp4": 228,
        "hm": "F d -3 c",
        "ext": "1",
        "qualifier": "",
        "hall": "F 4d 2 3 -1ad",
        "basis_op_id": 37,
        "settingId": "Fd-3c"
      },
      {
        "number": 228,
        "ccp4": 0,
        "hm": "F d -3 c",
        "ext": "2",
        "qualifier": "",
        "hall": "-F 4ud 2vw 3",
        "basis_op_id": 0,
        "settingId": "Fd-3c"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 229,
    "crystalSystem": "cubic",
    "standardHm": "I m -3 m",
    "standardHall": "-I 4 2 3",
    "centering": "I",
    "settings": [
      {
        "number": 229,
        "ccp4": 229,
        "hm": "I m -3 m",
        "ext": "0",
        "qualifier": "",
        "hall": "-I 4 2 3",
        "basis_op_id": 0,
        "settingId": "Im-3m"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  },
  {
    "number": 230,
    "crystalSystem": "cubic",
    "standardHm": "I a -3 d",
    "standardHall": "-I 4bd 2c 3",
    "centering": "I",
    "settings": [
      {
        "number": 230,
        "ccp4": 230,
        "hm": "I a -3 d",
        "ext": "0",
        "qualifier": "",
        "hall": "-I 4bd 2c 3",
        "basis_op_id": 0,
        "settingId": "Ia-3d"
      }
    ],
    "hasVerifiedModel": false,
    "status": "CATALOG_METADATA_AVAILABLE",
    "verifiedSettings": []
  }
];
