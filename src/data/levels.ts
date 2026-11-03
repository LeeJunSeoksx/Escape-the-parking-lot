import { Level } from "../types/game";

export const INITIAL_LEVELS: Level[] = [
  {
    "id": "beg-1",
    "stageNumber": 1,
    "title": "첫 번째 탈출 (First Escape)",
    "difficulty": "beginner",
    "parMoves": 4,
    "description": "초보 운전자를 위한 기초 스테이지! 최소 4번의 이동으로 빨간 스포츠카를 탈출시키세요.",
    "vehicles": [
      {
        "id": "B",
        "row": 0,
        "col": 0,
        "length": 3,
        "orientation": "H",
        "color": "yellow",
        "label": "B"
      },
      {
        "id": "C",
        "row": 0,
        "col": 3,
        "length": 2,
        "orientation": "H",
        "color": "green",
        "label": "C"
      },
      {
        "id": "H",
        "row": 1,
        "col": 2,
        "length": 2,
        "orientation": "V",
        "color": "blue",
        "label": "H"
      },
      {
        "id": "I",
        "row": 1,
        "col": 3,
        "length": 2,
        "orientation": "V",
        "color": "purple",
        "label": "I"
      },
      {
        "id": "red",
        "row": 2,
        "col": 0,
        "length": 2,
        "orientation": "H",
        "color": "red",
        "label": "주인공"
      },
      {
        "id": "G",
        "row": 3,
        "col": 0,
        "length": 2,
        "orientation": "V",
        "color": "orange",
        "label": "G"
      },
      {
        "id": "D",
        "row": 3,
        "col": 1,
        "length": 2,
        "orientation": "H",
        "color": "cyan",
        "label": "D"
      }
    ]
  },
  {
    "id": "beg-2",
    "stageNumber": 2,
    "title": "골목길 비우기 (Clear the Alley)",
    "difficulty": "beginner",
    "parMoves": 4,
    "description": "초보 운전자를 위한 기초 스테이지! 최소 4번의 이동으로 빨간 스포츠카를 탈출시키세요.",
    "vehicles": [
      {
        "id": "B",
        "row": 0,
        "col": 0,
        "length": 3,
        "orientation": "H",
        "color": "yellow",
        "label": "B"
      },
      {
        "id": "C",
        "row": 0,
        "col": 3,
        "length": 2,
        "orientation": "H",
        "color": "green",
        "label": "C"
      },
      {
        "id": "L",
        "row": 0,
        "col": 5,
        "length": 2,
        "orientation": "V",
        "color": "blue",
        "label": "L"
      },
      {
        "id": "I",
        "row": 1,
        "col": 0,
        "length": 2,
        "orientation": "V",
        "color": "purple",
        "label": "I"
      },
      {
        "id": "D",
        "row": 1,
        "col": 1,
        "length": 2,
        "orientation": "H",
        "color": "orange",
        "label": "D"
      },
      {
        "id": "K",
        "row": 1,
        "col": 3,
        "length": 2,
        "orientation": "V",
        "color": "cyan",
        "label": "K"
      },
      {
        "id": "red",
        "row": 2,
        "col": 1,
        "length": 2,
        "orientation": "H",
        "color": "red",
        "label": "주인공"
      },
      {
        "id": "M",
        "row": 2,
        "col": 5,
        "length": 2,
        "orientation": "V",
        "color": "pink",
        "label": "M"
      },
      {
        "id": "J",
        "row": 3,
        "col": 2,
        "length": 2,
        "orientation": "V",
        "color": "lime",
        "label": "J"
      },
      {
        "id": "E",
        "row": 3,
        "col": 3,
        "length": 2,
        "orientation": "H",
        "color": "amber",
        "label": "E"
      },
      {
        "id": "F",
        "row": 4,
        "col": 0,
        "length": 2,
        "orientation": "H",
        "color": "teal",
        "label": "F"
      }
    ]
  },
  {
    "id": "beg-3",
    "stageNumber": 3,
    "title": "교차로 양보 (Intersection Yield)",
    "difficulty": "beginner",
    "parMoves": 5,
    "description": "초보 운전자를 위한 기초 스테이지! 최소 5번의 이동으로 빨간 스포츠카를 탈출시키세요.",
    "vehicles": [
      {
        "id": "C",
        "row": 0,
        "col": 1,
        "length": 2,
        "orientation": "H",
        "color": "yellow",
        "label": "C"
      },
      {
        "id": "I",
        "row": 0,
        "col": 3,
        "length": 2,
        "orientation": "V",
        "color": "green",
        "label": "I"
      },
      {
        "id": "K",
        "row": 0,
        "col": 4,
        "length": 2,
        "orientation": "V",
        "color": "blue",
        "label": "K"
      },
      {
        "id": "M",
        "row": 0,
        "col": 5,
        "length": 3,
        "orientation": "V",
        "color": "purple",
        "label": "M"
      },
      {
        "id": "H",
        "row": 1,
        "col": 2,
        "length": 2,
        "orientation": "V",
        "color": "orange",
        "label": "H"
      },
      {
        "id": "red",
        "row": 2,
        "col": 0,
        "length": 2,
        "orientation": "H",
        "color": "red",
        "label": "주인공"
      },
      {
        "id": "L",
        "row": 2,
        "col": 4,
        "length": 3,
        "orientation": "V",
        "color": "cyan",
        "label": "L"
      },
      {
        "id": "F",
        "row": 3,
        "col": 0,
        "length": 2,
        "orientation": "V",
        "color": "pink",
        "label": "F"
      },
      {
        "id": "G",
        "row": 3,
        "col": 1,
        "length": 2,
        "orientation": "V",
        "color": "lime",
        "label": "G"
      },
      {
        "id": "D",
        "row": 3,
        "col": 2,
        "length": 2,
        "orientation": "H",
        "color": "amber",
        "label": "D"
      },
      {
        "id": "J",
        "row": 4,
        "col": 3,
        "length": 2,
        "orientation": "V",
        "color": "teal",
        "label": "J"
      },
      {
        "id": "E",
        "row": 5,
        "col": 0,
        "length": 2,
        "orientation": "H",
        "color": "police",
        "label": "E"
      }
    ]
  },
  {
    "id": "beg-4",
    "stageNumber": 4,
    "title": "노란 택시 우회 (Yellow Taxi Bypass)",
    "difficulty": "beginner",
    "parMoves": 6,
    "description": "초보 운전자를 위한 기초 스테이지! 최소 6번의 이동으로 빨간 스포츠카를 탈출시키세요.",
    "vehicles": [
      {
        "id": "K",
        "row": 0,
        "col": 2,
        "length": 3,
        "orientation": "V",
        "color": "yellow",
        "label": "K"
      },
      {
        "id": "C",
        "row": 0,
        "col": 4,
        "length": 2,
        "orientation": "H",
        "color": "green",
        "label": "C"
      },
      {
        "id": "I",
        "row": 1,
        "col": 0,
        "length": 2,
        "orientation": "V",
        "color": "blue",
        "label": "I"
      },
      {
        "id": "J",
        "row": 1,
        "col": 1,
        "length": 2,
        "orientation": "V",
        "color": "purple",
        "label": "J"
      },
      {
        "id": "D",
        "row": 1,
        "col": 3,
        "length": 3,
        "orientation": "H",
        "color": "orange",
        "label": "D"
      },
      {
        "id": "red",
        "row": 2,
        "col": 3,
        "length": 2,
        "orientation": "H",
        "color": "red",
        "label": "주인공"
      },
      {
        "id": "M",
        "row": 2,
        "col": 5,
        "length": 2,
        "orientation": "V",
        "color": "cyan",
        "label": "M"
      },
      {
        "id": "F",
        "row": 3,
        "col": 1,
        "length": 2,
        "orientation": "H",
        "color": "pink",
        "label": "F"
      },
      {
        "id": "L",
        "row": 3,
        "col": 3,
        "length": 2,
        "orientation": "V",
        "color": "lime",
        "label": "L"
      },
      {
        "id": "G",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "H",
        "color": "amber",
        "label": "G"
      },
      {
        "id": "H",
        "row": 5,
        "col": 1,
        "length": 3,
        "orientation": "H",
        "color": "teal",
        "label": "H"
      }
    ]
  },
  {
    "id": "beg-5",
    "stageNumber": 5,
    "title": "출구 라인 확보 (Secure the Exit)",
    "difficulty": "beginner",
    "parMoves": 8,
    "description": "초보 운전자를 위한 기초 스테이지! 최소 8번의 이동으로 빨간 스포츠카를 탈출시키세요.",
    "vehicles": [
      {
        "id": "B",
        "row": 0,
        "col": 0,
        "length": 2,
        "orientation": "H",
        "color": "yellow",
        "label": "B"
      },
      {
        "id": "C",
        "row": 0,
        "col": 2,
        "length": 2,
        "orientation": "H",
        "color": "green",
        "label": "C"
      },
      {
        "id": "K",
        "row": 1,
        "col": 2,
        "length": 3,
        "orientation": "V",
        "color": "blue",
        "label": "K"
      },
      {
        "id": "red",
        "row": 2,
        "col": 0,
        "length": 2,
        "orientation": "H",
        "color": "red",
        "label": "주인공"
      },
      {
        "id": "L",
        "row": 2,
        "col": 3,
        "length": 2,
        "orientation": "V",
        "color": "purple",
        "label": "L"
      },
      {
        "id": "F",
        "row": 3,
        "col": 0,
        "length": 2,
        "orientation": "H",
        "color": "orange",
        "label": "F"
      },
      {
        "id": "G",
        "row": 3,
        "col": 4,
        "length": 2,
        "orientation": "H",
        "color": "cyan",
        "label": "G"
      },
      {
        "id": "J",
        "row": 4,
        "col": 0,
        "length": 2,
        "orientation": "V",
        "color": "pink",
        "label": "J"
      },
      {
        "id": "H",
        "row": 4,
        "col": 2,
        "length": 2,
        "orientation": "H",
        "color": "lime",
        "label": "H"
      },
      {
        "id": "M",
        "row": 4,
        "col": 5,
        "length": 2,
        "orientation": "V",
        "color": "amber",
        "label": "M"
      },
      {
        "id": "I",
        "row": 5,
        "col": 1,
        "length": 3,
        "orientation": "H",
        "color": "teal",
        "label": "I"
      }
    ]
  },
  {
    "id": "beg-6",
    "stageNumber": 6,
    "title": "주차장 워밍업 (Parking Warmup)",
    "difficulty": "beginner",
    "parMoves": 8,
    "description": "초보 운전자를 위한 기초 스테이지! 최소 8번의 이동으로 빨간 스포츠카를 탈출시키세요.",
    "vehicles": [
      {
        "id": "B",
        "row": 0,
        "col": 0,
        "length": 3,
        "orientation": "H",
        "color": "yellow",
        "label": "B"
      },
      {
        "id": "J",
        "row": 1,
        "col": 2,
        "length": 2,
        "orientation": "V",
        "color": "green",
        "label": "J"
      },
      {
        "id": "C",
        "row": 1,
        "col": 3,
        "length": 2,
        "orientation": "H",
        "color": "blue",
        "label": "C"
      },
      {
        "id": "red",
        "row": 2,
        "col": 0,
        "length": 2,
        "orientation": "H",
        "color": "red",
        "label": "주인공"
      },
      {
        "id": "K",
        "row": 2,
        "col": 3,
        "length": 2,
        "orientation": "V",
        "color": "purple",
        "label": "K"
      },
      {
        "id": "M",
        "row": 2,
        "col": 4,
        "length": 2,
        "orientation": "V",
        "color": "orange",
        "label": "M"
      },
      {
        "id": "N",
        "row": 2,
        "col": 5,
        "length": 2,
        "orientation": "V",
        "color": "cyan",
        "label": "N"
      },
      {
        "id": "I",
        "row": 3,
        "col": 0,
        "length": 2,
        "orientation": "V",
        "color": "pink",
        "label": "I"
      },
      {
        "id": "E",
        "row": 3,
        "col": 1,
        "length": 2,
        "orientation": "H",
        "color": "lime",
        "label": "E"
      },
      {
        "id": "L",
        "row": 4,
        "col": 3,
        "length": 2,
        "orientation": "V",
        "color": "amber",
        "label": "L"
      },
      {
        "id": "F",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "H",
        "color": "teal",
        "label": "F"
      },
      {
        "id": "H",
        "row": 5,
        "col": 1,
        "length": 2,
        "orientation": "H",
        "color": "police",
        "label": "H"
      }
    ]
  },
  {
    "id": "int-1",
    "stageNumber": 7,
    "title": "도심 속 정체 (Urban Jam)",
    "difficulty": "intermediate",
    "parMoves": 9,
    "description": "연쇄 이동과 공간 확보가 필요한 중급 퍼즐! 최소 9번의 이동으로 빨간 스포츠카를 탈출시키세요.",
    "vehicles": [
      {
        "id": "J",
        "row": 0,
        "col": 2,
        "length": 3,
        "orientation": "V",
        "color": "yellow",
        "label": "J"
      },
      {
        "id": "C",
        "row": 0,
        "col": 4,
        "length": 2,
        "orientation": "H",
        "color": "green",
        "label": "C"
      },
      {
        "id": "D",
        "row": 1,
        "col": 3,
        "length": 3,
        "orientation": "H",
        "color": "blue",
        "label": "D"
      },
      {
        "id": "red",
        "row": 2,
        "col": 0,
        "length": 2,
        "orientation": "H",
        "color": "red",
        "label": "주인공"
      },
      {
        "id": "K",
        "row": 2,
        "col": 3,
        "length": 2,
        "orientation": "V",
        "color": "purple",
        "label": "K"
      },
      {
        "id": "I",
        "row": 3,
        "col": 1,
        "length": 2,
        "orientation": "V",
        "color": "orange",
        "label": "I"
      },
      {
        "id": "F",
        "row": 3,
        "col": 4,
        "length": 2,
        "orientation": "H",
        "color": "cyan",
        "label": "F"
      },
      {
        "id": "G",
        "row": 4,
        "col": 2,
        "length": 2,
        "orientation": "H",
        "color": "pink",
        "label": "G"
      },
      {
        "id": "L",
        "row": 4,
        "col": 5,
        "length": 2,
        "orientation": "V",
        "color": "lime",
        "label": "L"
      },
      {
        "id": "H",
        "row": 5,
        "col": 0,
        "length": 3,
        "orientation": "H",
        "color": "amber",
        "label": "H"
      }
    ]
  },
  {
    "id": "int-2",
    "stageNumber": 8,
    "title": "연쇄 자리바꿈 (Chain Shuffle)",
    "difficulty": "intermediate",
    "parMoves": 9,
    "description": "연쇄 이동과 공간 확보가 필요한 중급 퍼즐! 최소 9번의 이동으로 빨간 스포츠카를 탈출시키세요.",
    "vehicles": [
      {
        "id": "J",
        "row": 0,
        "col": 2,
        "length": 2,
        "orientation": "V",
        "color": "yellow",
        "label": "J"
      },
      {
        "id": "B",
        "row": 0,
        "col": 3,
        "length": 3,
        "orientation": "H",
        "color": "green",
        "label": "B"
      },
      {
        "id": "H",
        "row": 1,
        "col": 0,
        "length": 2,
        "orientation": "V",
        "color": "blue",
        "label": "H"
      },
      {
        "id": "K",
        "row": 1,
        "col": 3,
        "length": 2,
        "orientation": "V",
        "color": "purple",
        "label": "K"
      },
      {
        "id": "L",
        "row": 1,
        "col": 5,
        "length": 3,
        "orientation": "V",
        "color": "orange",
        "label": "L"
      },
      {
        "id": "red",
        "row": 2,
        "col": 1,
        "length": 2,
        "orientation": "H",
        "color": "red",
        "label": "주인공"
      },
      {
        "id": "D",
        "row": 3,
        "col": 1,
        "length": 2,
        "orientation": "H",
        "color": "cyan",
        "label": "D"
      },
      {
        "id": "E",
        "row": 3,
        "col": 3,
        "length": 2,
        "orientation": "H",
        "color": "pink",
        "label": "E"
      },
      {
        "id": "I",
        "row": 4,
        "col": 1,
        "length": 2,
        "orientation": "V",
        "color": "lime",
        "label": "I"
      },
      {
        "id": "F",
        "row": 4,
        "col": 2,
        "length": 2,
        "orientation": "H",
        "color": "amber",
        "label": "F"
      },
      {
        "id": "G",
        "row": 5,
        "col": 2,
        "length": 2,
        "orientation": "H",
        "color": "teal",
        "label": "G"
      }
    ]
  },
  {
    "id": "int-3",
    "stageNumber": 9,
    "title": "대형 화물트럭 (Heavy Hauler)",
    "difficulty": "intermediate",
    "parMoves": 10,
    "description": "연쇄 이동과 공간 확보가 필요한 중급 퍼즐! 최소 10번의 이동으로 빨간 스포츠카를 탈출시키세요.",
    "vehicles": [
      {
        "id": "B",
        "row": 0,
        "col": 0,
        "length": 2,
        "orientation": "H",
        "color": "yellow",
        "label": "B"
      },
      {
        "id": "J",
        "row": 0,
        "col": 3,
        "length": 2,
        "orientation": "V",
        "color": "green",
        "label": "J"
      },
      {
        "id": "D",
        "row": 1,
        "col": 0,
        "length": 2,
        "orientation": "H",
        "color": "blue",
        "label": "D"
      },
      {
        "id": "L",
        "row": 1,
        "col": 5,
        "length": 2,
        "orientation": "V",
        "color": "purple",
        "label": "L"
      },
      {
        "id": "red",
        "row": 2,
        "col": 0,
        "length": 2,
        "orientation": "H",
        "color": "red",
        "label": "주인공"
      },
      {
        "id": "K",
        "row": 2,
        "col": 3,
        "length": 2,
        "orientation": "V",
        "color": "orange",
        "label": "K"
      },
      {
        "id": "H",
        "row": 3,
        "col": 0,
        "length": 2,
        "orientation": "V",
        "color": "cyan",
        "label": "H"
      },
      {
        "id": "E",
        "row": 3,
        "col": 1,
        "length": 2,
        "orientation": "H",
        "color": "pink",
        "label": "E"
      },
      {
        "id": "I",
        "row": 4,
        "col": 2,
        "length": 2,
        "orientation": "V",
        "color": "lime",
        "label": "I"
      },
      {
        "id": "F",
        "row": 4,
        "col": 3,
        "length": 3,
        "orientation": "H",
        "color": "amber",
        "label": "F"
      }
    ]
  },
  {
    "id": "int-4",
    "stageNumber": 10,
    "title": "틈새 공략 (Tight Squeeze)",
    "difficulty": "intermediate",
    "parMoves": 13,
    "description": "연쇄 이동과 공간 확보가 필요한 중급 퍼즐! 최소 13번의 이동으로 빨간 스포츠카를 탈출시키세요.",
    "vehicles": [
      {
        "id": "I",
        "row": 0,
        "col": 3,
        "length": 2,
        "orientation": "V",
        "color": "yellow",
        "label": "I"
      },
      {
        "id": "K",
        "row": 0,
        "col": 4,
        "length": 3,
        "orientation": "V",
        "color": "green",
        "label": "K"
      },
      {
        "id": "C",
        "row": 1,
        "col": 0,
        "length": 3,
        "orientation": "H",
        "color": "blue",
        "label": "C"
      },
      {
        "id": "L",
        "row": 1,
        "col": 5,
        "length": 3,
        "orientation": "V",
        "color": "purple",
        "label": "L"
      },
      {
        "id": "G",
        "row": 2,
        "col": 0,
        "length": 2,
        "orientation": "V",
        "color": "orange",
        "label": "G"
      },
      {
        "id": "red",
        "row": 2,
        "col": 2,
        "length": 2,
        "orientation": "H",
        "color": "red",
        "label": "주인공"
      },
      {
        "id": "D",
        "row": 3,
        "col": 1,
        "length": 2,
        "orientation": "H",
        "color": "cyan",
        "label": "D"
      },
      {
        "id": "J",
        "row": 3,
        "col": 3,
        "length": 2,
        "orientation": "V",
        "color": "pink",
        "label": "J"
      },
      {
        "id": "E",
        "row": 4,
        "col": 0,
        "length": 2,
        "orientation": "H",
        "color": "lime",
        "label": "E"
      },
      {
        "id": "H",
        "row": 4,
        "col": 2,
        "length": 2,
        "orientation": "V",
        "color": "amber",
        "label": "H"
      },
      {
        "id": "F",
        "row": 5,
        "col": 3,
        "length": 2,
        "orientation": "H",
        "color": "teal",
        "label": "F"
      }
    ]
  },
  {
    "id": "int-5",
    "stageNumber": 11,
    "title": "이중 봉쇄 해제 (Double Unlock)",
    "difficulty": "intermediate",
    "parMoves": 13,
    "description": "연쇄 이동과 공간 확보가 필요한 중급 퍼즐! 최소 13번의 이동으로 빨간 스포츠카를 탈출시키세요.",
    "vehicles": [
      {
        "id": "C",
        "row": 0,
        "col": 2,
        "length": 3,
        "orientation": "H",
        "color": "yellow",
        "label": "C"
      },
      {
        "id": "L",
        "row": 0,
        "col": 5,
        "length": 3,
        "orientation": "V",
        "color": "green",
        "label": "L"
      },
      {
        "id": "D",
        "row": 1,
        "col": 0,
        "length": 2,
        "orientation": "H",
        "color": "blue",
        "label": "D"
      },
      {
        "id": "J",
        "row": 1,
        "col": 2,
        "length": 3,
        "orientation": "V",
        "color": "purple",
        "label": "J"
      },
      {
        "id": "red",
        "row": 2,
        "col": 3,
        "length": 2,
        "orientation": "H",
        "color": "red",
        "label": "주인공"
      },
      {
        "id": "I",
        "row": 3,
        "col": 0,
        "length": 2,
        "orientation": "V",
        "color": "orange",
        "label": "I"
      },
      {
        "id": "K",
        "row": 3,
        "col": 3,
        "length": 2,
        "orientation": "V",
        "color": "cyan",
        "label": "K"
      },
      {
        "id": "E",
        "row": 3,
        "col": 4,
        "length": 2,
        "orientation": "H",
        "color": "pink",
        "label": "E"
      },
      {
        "id": "F",
        "row": 4,
        "col": 1,
        "length": 2,
        "orientation": "H",
        "color": "lime",
        "label": "F"
      },
      {
        "id": "G",
        "row": 5,
        "col": 0,
        "length": 2,
        "orientation": "H",
        "color": "amber",
        "label": "G"
      },
      {
        "id": "H",
        "row": 5,
        "col": 2,
        "length": 3,
        "orientation": "H",
        "color": "teal",
        "label": "H"
      }
    ]
  },
  {
    "id": "int-6",
    "stageNumber": 12,
    "title": "신호 대기선 (Signal Line)",
    "difficulty": "intermediate",
    "parMoves": 14,
    "description": "연쇄 이동과 공간 확보가 필요한 중급 퍼즐! 최소 14번의 이동으로 빨간 스포츠카를 탈출시키세요.",
    "vehicles": [
      {
        "id": "B",
        "row": 0,
        "col": 0,
        "length": 3,
        "orientation": "H",
        "color": "yellow",
        "label": "B"
      },
      {
        "id": "I",
        "row": 1,
        "col": 2,
        "length": 2,
        "orientation": "V",
        "color": "green",
        "label": "I"
      },
      {
        "id": "C",
        "row": 1,
        "col": 3,
        "length": 2,
        "orientation": "H",
        "color": "blue",
        "label": "C"
      },
      {
        "id": "red",
        "row": 2,
        "col": 0,
        "length": 2,
        "orientation": "H",
        "color": "red",
        "label": "주인공"
      },
      {
        "id": "J",
        "row": 2,
        "col": 3,
        "length": 2,
        "orientation": "V",
        "color": "purple",
        "label": "J"
      },
      {
        "id": "L",
        "row": 2,
        "col": 5,
        "length": 2,
        "orientation": "V",
        "color": "orange",
        "label": "L"
      },
      {
        "id": "H",
        "row": 3,
        "col": 0,
        "length": 2,
        "orientation": "V",
        "color": "cyan",
        "label": "H"
      },
      {
        "id": "E",
        "row": 3,
        "col": 1,
        "length": 2,
        "orientation": "H",
        "color": "pink",
        "label": "E"
      },
      {
        "id": "K",
        "row": 4,
        "col": 3,
        "length": 2,
        "orientation": "V",
        "color": "lime",
        "label": "K"
      },
      {
        "id": "F",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "H",
        "color": "amber",
        "label": "F"
      },
      {
        "id": "G",
        "row": 5,
        "col": 0,
        "length": 3,
        "orientation": "H",
        "color": "teal",
        "label": "G"
      }
    ]
  },
  {
    "id": "adv-1",
    "stageNumber": 13,
    "title": "지그재그 후진 (Zig-Zag Reverse)",
    "difficulty": "advanced",
    "parMoves": 19,
    "description": "깊이 있는 수읽기와 후진 전략이 필요한 고급 난이도! 최소 19번의 이동으로 빨간 스포츠카를 탈출시키세요.",
    "vehicles": [
      {
        "id": "B",
        "row": 0,
        "col": 0,
        "length": 3,
        "orientation": "H",
        "color": "yellow",
        "label": "B"
      },
      {
        "id": "C",
        "row": 0,
        "col": 3,
        "length": 2,
        "orientation": "H",
        "color": "green",
        "label": "C"
      },
      {
        "id": "L",
        "row": 0,
        "col": 5,
        "length": 2,
        "orientation": "V",
        "color": "blue",
        "label": "L"
      },
      {
        "id": "I",
        "row": 1,
        "col": 0,
        "length": 2,
        "orientation": "V",
        "color": "purple",
        "label": "I"
      },
      {
        "id": "J",
        "row": 1,
        "col": 2,
        "length": 2,
        "orientation": "V",
        "color": "orange",
        "label": "J"
      },
      {
        "id": "D",
        "row": 1,
        "col": 3,
        "length": 2,
        "orientation": "H",
        "color": "cyan",
        "label": "D"
      },
      {
        "id": "red",
        "row": 2,
        "col": 3,
        "length": 2,
        "orientation": "H",
        "color": "red",
        "label": "주인공"
      },
      {
        "id": "M",
        "row": 2,
        "col": 5,
        "length": 2,
        "orientation": "V",
        "color": "pink",
        "label": "M"
      },
      {
        "id": "F",
        "row": 3,
        "col": 1,
        "length": 2,
        "orientation": "H",
        "color": "lime",
        "label": "F"
      },
      {
        "id": "K",
        "row": 3,
        "col": 3,
        "length": 2,
        "orientation": "V",
        "color": "amber",
        "label": "K"
      },
      {
        "id": "G",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "H",
        "color": "teal",
        "label": "G"
      },
      {
        "id": "H",
        "row": 5,
        "col": 1,
        "length": 2,
        "orientation": "H",
        "color": "police",
        "label": "H"
      }
    ]
  },
  {
    "id": "adv-2",
    "stageNumber": 14,
    "title": "톱니바퀴 맞물림 (Gearlock)",
    "difficulty": "advanced",
    "parMoves": 24,
    "description": "깊이 있는 수읽기와 후진 전략이 필요한 고급 난이도! 최소 24번의 이동으로 빨간 스포츠카를 탈출시키세요.",
    "vehicles": [
      {
        "id": "B",
        "row": 0,
        "col": 0,
        "length": 3,
        "orientation": "H",
        "color": "yellow",
        "label": "B"
      },
      {
        "id": "J",
        "row": 0,
        "col": 3,
        "length": 2,
        "orientation": "V",
        "color": "green",
        "label": "J"
      },
      {
        "id": "I",
        "row": 1,
        "col": 2,
        "length": 3,
        "orientation": "V",
        "color": "blue",
        "label": "I"
      },
      {
        "id": "C",
        "row": 1,
        "col": 4,
        "length": 2,
        "orientation": "H",
        "color": "purple",
        "label": "C"
      },
      {
        "id": "red",
        "row": 2,
        "col": 0,
        "length": 2,
        "orientation": "H",
        "color": "red",
        "label": "주인공"
      },
      {
        "id": "L",
        "row": 2,
        "col": 5,
        "length": 2,
        "orientation": "V",
        "color": "orange",
        "label": "L"
      },
      {
        "id": "H",
        "row": 3,
        "col": 0,
        "length": 2,
        "orientation": "V",
        "color": "cyan",
        "label": "H"
      },
      {
        "id": "D",
        "row": 3,
        "col": 3,
        "length": 2,
        "orientation": "H",
        "color": "pink",
        "label": "D"
      },
      {
        "id": "E",
        "row": 4,
        "col": 1,
        "length": 3,
        "orientation": "H",
        "color": "lime",
        "label": "E"
      },
      {
        "id": "K",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "V",
        "color": "amber",
        "label": "K"
      },
      {
        "id": "M",
        "row": 4,
        "col": 5,
        "length": 2,
        "orientation": "V",
        "color": "teal",
        "label": "M"
      },
      {
        "id": "F",
        "row": 5,
        "col": 0,
        "length": 2,
        "orientation": "H",
        "color": "police",
        "label": "F"
      }
    ]
  },
  {
    "id": "adv-3",
    "stageNumber": 15,
    "title": "유령 터널 (Ghost Tunnel)",
    "difficulty": "advanced",
    "parMoves": 26,
    "description": "깊이 있는 수읽기와 후진 전략이 필요한 고급 난이도! 최소 26번의 이동으로 빨간 스포츠카를 탈출시키세요.",
    "vehicles": [
      {
        "id": "B",
        "row": 0,
        "col": 0,
        "length": 3,
        "orientation": "H",
        "color": "yellow",
        "label": "B"
      },
      {
        "id": "J",
        "row": 0,
        "col": 3,
        "length": 2,
        "orientation": "V",
        "color": "green",
        "label": "J"
      },
      {
        "id": "L",
        "row": 0,
        "col": 5,
        "length": 3,
        "orientation": "V",
        "color": "blue",
        "label": "L"
      },
      {
        "id": "I",
        "row": 1,
        "col": 2,
        "length": 2,
        "orientation": "V",
        "color": "purple",
        "label": "I"
      },
      {
        "id": "H",
        "row": 2,
        "col": 0,
        "length": 2,
        "orientation": "V",
        "color": "orange",
        "label": "H"
      },
      {
        "id": "red",
        "row": 2,
        "col": 3,
        "length": 2,
        "orientation": "H",
        "color": "red",
        "label": "주인공"
      },
      {
        "id": "C",
        "row": 3,
        "col": 1,
        "length": 2,
        "orientation": "H",
        "color": "cyan",
        "label": "C"
      },
      {
        "id": "K",
        "row": 3,
        "col": 3,
        "length": 2,
        "orientation": "V",
        "color": "pink",
        "label": "K"
      },
      {
        "id": "D",
        "row": 3,
        "col": 4,
        "length": 2,
        "orientation": "H",
        "color": "lime",
        "label": "D"
      },
      {
        "id": "E",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "H",
        "color": "amber",
        "label": "E"
      },
      {
        "id": "G",
        "row": 5,
        "col": 2,
        "length": 2,
        "orientation": "H",
        "color": "teal",
        "label": "G"
      }
    ]
  },
  {
    "id": "adv-4",
    "stageNumber": 16,
    "title": "회전문 퍼즐 (Revolving Trap)",
    "difficulty": "advanced",
    "parMoves": 27,
    "description": "깊이 있는 수읽기와 후진 전략이 필요한 고급 난이도! 최소 27번의 이동으로 빨간 스포츠카를 탈출시키세요.",
    "vehicles": [
      {
        "id": "B",
        "row": 0,
        "col": 0,
        "length": 3,
        "orientation": "H",
        "color": "yellow",
        "label": "B"
      },
      {
        "id": "I",
        "row": 0,
        "col": 3,
        "length": 2,
        "orientation": "V",
        "color": "green",
        "label": "I"
      },
      {
        "id": "K",
        "row": 0,
        "col": 4,
        "length": 2,
        "orientation": "V",
        "color": "blue",
        "label": "K"
      },
      {
        "id": "L",
        "row": 0,
        "col": 5,
        "length": 3,
        "orientation": "V",
        "color": "purple",
        "label": "L"
      },
      {
        "id": "H",
        "row": 1,
        "col": 2,
        "length": 2,
        "orientation": "V",
        "color": "orange",
        "label": "H"
      },
      {
        "id": "G",
        "row": 2,
        "col": 0,
        "length": 2,
        "orientation": "V",
        "color": "cyan",
        "label": "G"
      },
      {
        "id": "red",
        "row": 2,
        "col": 3,
        "length": 2,
        "orientation": "H",
        "color": "red",
        "label": "주인공"
      },
      {
        "id": "C",
        "row": 3,
        "col": 1,
        "length": 2,
        "orientation": "H",
        "color": "pink",
        "label": "C"
      },
      {
        "id": "J",
        "row": 3,
        "col": 3,
        "length": 2,
        "orientation": "V",
        "color": "lime",
        "label": "J"
      },
      {
        "id": "D",
        "row": 3,
        "col": 4,
        "length": 2,
        "orientation": "H",
        "color": "amber",
        "label": "D"
      },
      {
        "id": "E",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "H",
        "color": "teal",
        "label": "E"
      }
    ]
  },
  {
    "id": "adv-5",
    "stageNumber": 17,
    "title": "게이트 키퍼 (The Gatekeeper)",
    "difficulty": "advanced",
    "parMoves": 29,
    "description": "깊이 있는 수읽기와 후진 전략이 필요한 고급 난이도! 최소 29번의 이동으로 빨간 스포츠카를 탈출시키세요.",
    "vehicles": [
      {
        "id": "J",
        "row": 0,
        "col": 2,
        "length": 2,
        "orientation": "V",
        "color": "yellow",
        "label": "J"
      },
      {
        "id": "B",
        "row": 0,
        "col": 3,
        "length": 3,
        "orientation": "H",
        "color": "green",
        "label": "B"
      },
      {
        "id": "K",
        "row": 1,
        "col": 3,
        "length": 2,
        "orientation": "V",
        "color": "blue",
        "label": "K"
      },
      {
        "id": "L",
        "row": 1,
        "col": 5,
        "length": 3,
        "orientation": "V",
        "color": "purple",
        "label": "L"
      },
      {
        "id": "H",
        "row": 2,
        "col": 0,
        "length": 3,
        "orientation": "V",
        "color": "orange",
        "label": "H"
      },
      {
        "id": "red",
        "row": 2,
        "col": 1,
        "length": 2,
        "orientation": "H",
        "color": "red",
        "label": "주인공"
      },
      {
        "id": "D",
        "row": 3,
        "col": 1,
        "length": 2,
        "orientation": "H",
        "color": "cyan",
        "label": "D"
      },
      {
        "id": "E",
        "row": 3,
        "col": 3,
        "length": 2,
        "orientation": "H",
        "color": "pink",
        "label": "E"
      },
      {
        "id": "I",
        "row": 4,
        "col": 1,
        "length": 2,
        "orientation": "V",
        "color": "lime",
        "label": "I"
      },
      {
        "id": "F",
        "row": 4,
        "col": 2,
        "length": 2,
        "orientation": "H",
        "color": "amber",
        "label": "F"
      },
      {
        "id": "G",
        "row": 5,
        "col": 2,
        "length": 2,
        "orientation": "H",
        "color": "teal",
        "label": "G"
      }
    ]
  },
  {
    "id": "exp-1",
    "stageNumber": 18,
    "title": "철통 방어막 (Iron Wall)",
    "difficulty": "expert",
    "parMoves": 38,
    "description": "최고의 퍼즐 고수만이 클리어할 수 있는 전설의 마스터 레벨! 최소 38번의 이동으로 빨간 스포츠카를 탈출시키세요.",
    "vehicles": [
      {
        "id": "E",
        "row": 0,
        "col": 0,
        "length": 3,
        "orientation": "V",
        "color": "yellow",
        "label": "E"
      },
      {
        "id": "B",
        "row": 0,
        "col": 2,
        "length": 3,
        "orientation": "H",
        "color": "green",
        "label": "B"
      },
      {
        "id": "G",
        "row": 1,
        "col": 3,
        "length": 2,
        "orientation": "V",
        "color": "blue",
        "label": "G"
      },
      {
        "id": "I",
        "row": 1,
        "col": 4,
        "length": 3,
        "orientation": "V",
        "color": "purple",
        "label": "I"
      },
      {
        "id": "J",
        "row": 1,
        "col": 5,
        "length": 3,
        "orientation": "V",
        "color": "orange",
        "label": "J"
      },
      {
        "id": "red",
        "row": 2,
        "col": 1,
        "length": 2,
        "orientation": "H",
        "color": "red",
        "label": "주인공"
      },
      {
        "id": "C",
        "row": 3,
        "col": 0,
        "length": 3,
        "orientation": "H",
        "color": "cyan",
        "label": "C"
      },
      {
        "id": "H",
        "row": 3,
        "col": 3,
        "length": 2,
        "orientation": "V",
        "color": "pink",
        "label": "H"
      },
      {
        "id": "F",
        "row": 4,
        "col": 2,
        "length": 2,
        "orientation": "V",
        "color": "lime",
        "label": "F"
      },
      {
        "id": "D",
        "row": 5,
        "col": 3,
        "length": 2,
        "orientation": "H",
        "color": "amber",
        "label": "D"
      }
    ]
  },
  {
    "id": "exp-2",
    "stageNumber": 19,
    "title": "무한 루프 (Endless Loop)",
    "difficulty": "expert",
    "parMoves": 39,
    "description": "최고의 퍼즐 고수만이 클리어할 수 있는 전설의 마스터 레벨! 최소 39번의 이동으로 빨간 스포츠카를 탈출시키세요.",
    "vehicles": [
      {
        "id": "H",
        "row": 0,
        "col": 1,
        "length": 2,
        "orientation": "V",
        "color": "yellow",
        "label": "H"
      },
      {
        "id": "B",
        "row": 0,
        "col": 2,
        "length": 2,
        "orientation": "H",
        "color": "green",
        "label": "B"
      },
      {
        "id": "C",
        "row": 0,
        "col": 4,
        "length": 2,
        "orientation": "H",
        "color": "blue",
        "label": "C"
      },
      {
        "id": "J",
        "row": 1,
        "col": 3,
        "length": 2,
        "orientation": "V",
        "color": "purple",
        "label": "J"
      },
      {
        "id": "K",
        "row": 1,
        "col": 4,
        "length": 3,
        "orientation": "V",
        "color": "orange",
        "label": "K"
      },
      {
        "id": "red",
        "row": 2,
        "col": 0,
        "length": 2,
        "orientation": "H",
        "color": "red",
        "label": "주인공"
      },
      {
        "id": "G",
        "row": 3,
        "col": 0,
        "length": 3,
        "orientation": "V",
        "color": "cyan",
        "label": "G"
      },
      {
        "id": "E",
        "row": 3,
        "col": 1,
        "length": 3,
        "orientation": "H",
        "color": "pink",
        "label": "E"
      },
      {
        "id": "I",
        "row": 4,
        "col": 2,
        "length": 2,
        "orientation": "V",
        "color": "lime",
        "label": "I"
      },
      {
        "id": "L",
        "row": 4,
        "col": 5,
        "length": 2,
        "orientation": "V",
        "color": "amber",
        "label": "L"
      },
      {
        "id": "F",
        "row": 5,
        "col": 3,
        "length": 2,
        "orientation": "H",
        "color": "teal",
        "label": "F"
      }
    ]
  },
  {
    "id": "exp-3",
    "stageNumber": 20,
    "title": "블랙홀 파킹 (Black Hole Jam)",
    "difficulty": "expert",
    "parMoves": 41,
    "description": "최고의 퍼즐 고수만이 클리어할 수 있는 전설의 마스터 레벨! 최소 41번의 이동으로 빨간 스포츠카를 탈출시키세요.",
    "vehicles": [
      {
        "id": "B",
        "row": 0,
        "col": 1,
        "length": 3,
        "orientation": "H",
        "color": "yellow",
        "label": "B"
      },
      {
        "id": "C",
        "row": 0,
        "col": 4,
        "length": 2,
        "orientation": "H",
        "color": "green",
        "label": "C"
      },
      {
        "id": "D",
        "row": 1,
        "col": 0,
        "length": 2,
        "orientation": "H",
        "color": "blue",
        "label": "D"
      },
      {
        "id": "E",
        "row": 1,
        "col": 2,
        "length": 3,
        "orientation": "H",
        "color": "purple",
        "label": "E"
      },
      {
        "id": "M",
        "row": 1,
        "col": 5,
        "length": 3,
        "orientation": "V",
        "color": "orange",
        "label": "M"
      },
      {
        "id": "K",
        "row": 2,
        "col": 2,
        "length": 2,
        "orientation": "V",
        "color": "cyan",
        "label": "K"
      },
      {
        "id": "red",
        "row": 2,
        "col": 3,
        "length": 2,
        "orientation": "H",
        "color": "red",
        "label": "주인공"
      },
      {
        "id": "F",
        "row": 3,
        "col": 0,
        "length": 2,
        "orientation": "H",
        "color": "pink",
        "label": "F"
      },
      {
        "id": "L",
        "row": 3,
        "col": 3,
        "length": 2,
        "orientation": "V",
        "color": "lime",
        "label": "L"
      },
      {
        "id": "J",
        "row": 4,
        "col": 0,
        "length": 2,
        "orientation": "V",
        "color": "amber",
        "label": "J"
      },
      {
        "id": "G",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "H",
        "color": "teal",
        "label": "G"
      },
      {
        "id": "H",
        "row": 5,
        "col": 1,
        "length": 2,
        "orientation": "H",
        "color": "police",
        "label": "H"
      },
      {
        "id": "I",
        "row": 5,
        "col": 3,
        "length": 2,
        "orientation": "H",
        "color": "yellow",
        "label": "I"
      }
    ]
  },
  {
    "id": "exp-4",
    "stageNumber": 21,
    "title": "신경 쇠약 (Nerve Wracker)",
    "difficulty": "expert",
    "parMoves": 42,
    "description": "최고의 퍼즐 고수만이 클리어할 수 있는 전설의 마스터 레벨! 최소 42번의 이동으로 빨간 스포츠카를 탈출시키세요.",
    "vehicles": [
      {
        "id": "B",
        "row": 0,
        "col": 0,
        "length": 3,
        "orientation": "H",
        "color": "yellow",
        "label": "B"
      },
      {
        "id": "J",
        "row": 0,
        "col": 3,
        "length": 2,
        "orientation": "V",
        "color": "green",
        "label": "J"
      },
      {
        "id": "I",
        "row": 1,
        "col": 2,
        "length": 3,
        "orientation": "V",
        "color": "blue",
        "label": "I"
      },
      {
        "id": "C",
        "row": 1,
        "col": 4,
        "length": 2,
        "orientation": "H",
        "color": "purple",
        "label": "C"
      },
      {
        "id": "red",
        "row": 2,
        "col": 0,
        "length": 2,
        "orientation": "H",
        "color": "red",
        "label": "주인공"
      },
      {
        "id": "L",
        "row": 2,
        "col": 5,
        "length": 2,
        "orientation": "V",
        "color": "orange",
        "label": "L"
      },
      {
        "id": "H",
        "row": 3,
        "col": 0,
        "length": 2,
        "orientation": "V",
        "color": "cyan",
        "label": "H"
      },
      {
        "id": "D",
        "row": 3,
        "col": 3,
        "length": 2,
        "orientation": "H",
        "color": "pink",
        "label": "D"
      },
      {
        "id": "E",
        "row": 4,
        "col": 1,
        "length": 3,
        "orientation": "H",
        "color": "lime",
        "label": "E"
      },
      {
        "id": "K",
        "row": 4,
        "col": 4,
        "length": 2,
        "orientation": "V",
        "color": "amber",
        "label": "K"
      },
      {
        "id": "M",
        "row": 4,
        "col": 5,
        "length": 2,
        "orientation": "V",
        "color": "teal",
        "label": "M"
      },
      {
        "id": "F",
        "row": 5,
        "col": 0,
        "length": 2,
        "orientation": "H",
        "color": "police",
        "label": "F"
      },
      {
        "id": "G",
        "row": 5,
        "col": 2,
        "length": 2,
        "orientation": "H",
        "color": "yellow",
        "label": "G"
      }
    ]
  },
  {
    "id": "exp-5",
    "stageNumber": 22,
    "title": "마스터 마인드 (Mastermind)",
    "difficulty": "expert",
    "parMoves": 43,
    "description": "최고의 퍼즐 고수만이 클리어할 수 있는 전설의 마스터 레벨! 최소 43번의 이동으로 빨간 스포츠카를 탈출시키세요.",
    "vehicles": [
      {
        "id": "H",
        "row": 0,
        "col": 2,
        "length": 3,
        "orientation": "V",
        "color": "yellow",
        "label": "H"
      },
      {
        "id": "B",
        "row": 0,
        "col": 3,
        "length": 2,
        "orientation": "H",
        "color": "green",
        "label": "B"
      },
      {
        "id": "K",
        "row": 0,
        "col": 5,
        "length": 3,
        "orientation": "V",
        "color": "blue",
        "label": "K"
      },
      {
        "id": "I",
        "row": 1,
        "col": 3,
        "length": 2,
        "orientation": "V",
        "color": "purple",
        "label": "I"
      },
      {
        "id": "red",
        "row": 2,
        "col": 0,
        "length": 2,
        "orientation": "H",
        "color": "red",
        "label": "주인공"
      },
      {
        "id": "G",
        "row": 3,
        "col": 0,
        "length": 2,
        "orientation": "V",
        "color": "orange",
        "label": "G"
      },
      {
        "id": "C",
        "row": 3,
        "col": 1,
        "length": 3,
        "orientation": "H",
        "color": "cyan",
        "label": "C"
      },
      {
        "id": "D",
        "row": 4,
        "col": 1,
        "length": 2,
        "orientation": "H",
        "color": "pink",
        "label": "D"
      },
      {
        "id": "J",
        "row": 4,
        "col": 3,
        "length": 2,
        "orientation": "V",
        "color": "lime",
        "label": "J"
      },
      {
        "id": "E",
        "row": 5,
        "col": 0,
        "length": 2,
        "orientation": "H",
        "color": "amber",
        "label": "E"
      },
      {
        "id": "F",
        "row": 5,
        "col": 4,
        "length": 2,
        "orientation": "H",
        "color": "teal",
        "label": "F"
      }
    ]
  },
  {
    "id": "exp-6",
    "stageNumber": 23,
    "title": "궁극의 47수 (The Grand Finale)",
    "difficulty": "expert",
    "parMoves": 47,
    "description": "최고의 퍼즐 고수만이 클리어할 수 있는 전설의 마스터 레벨! 최소 47번의 이동으로 빨간 스포츠카를 탈출시키세요.",
    "vehicles": [
      {
        "id": "B",
        "row": 0,
        "col": 0,
        "length": 2,
        "orientation": "H",
        "color": "yellow",
        "label": "B"
      },
      {
        "id": "C",
        "row": 0,
        "col": 2,
        "length": 2,
        "orientation": "H",
        "color": "green",
        "label": "C"
      },
      {
        "id": "L",
        "row": 0,
        "col": 4,
        "length": 2,
        "orientation": "V",
        "color": "blue",
        "label": "L"
      },
      {
        "id": "J",
        "row": 1,
        "col": 2,
        "length": 2,
        "orientation": "V",
        "color": "purple",
        "label": "J"
      },
      {
        "id": "M",
        "row": 1,
        "col": 5,
        "length": 3,
        "orientation": "V",
        "color": "orange",
        "label": "M"
      },
      {
        "id": "I",
        "row": 2,
        "col": 0,
        "length": 2,
        "orientation": "V",
        "color": "cyan",
        "label": "I"
      },
      {
        "id": "red",
        "row": 2,
        "col": 3,
        "length": 2,
        "orientation": "H",
        "color": "red",
        "label": "주인공"
      },
      {
        "id": "D",
        "row": 3,
        "col": 1,
        "length": 2,
        "orientation": "H",
        "color": "pink",
        "label": "D"
      },
      {
        "id": "E",
        "row": 3,
        "col": 3,
        "length": 2,
        "orientation": "H",
        "color": "lime",
        "label": "E"
      },
      {
        "id": "F",
        "row": 4,
        "col": 1,
        "length": 2,
        "orientation": "H",
        "color": "amber",
        "label": "F"
      },
      {
        "id": "K",
        "row": 4,
        "col": 3,
        "length": 2,
        "orientation": "V",
        "color": "teal",
        "label": "K"
      },
      {
        "id": "G",
        "row": 5,
        "col": 0,
        "length": 3,
        "orientation": "H",
        "color": "police",
        "label": "G"
      },
      {
        "id": "H",
        "row": 5,
        "col": 4,
        "length": 2,
        "orientation": "H",
        "color": "yellow",
        "label": "H"
      }
    ]
  }
];
