/**
 * Rush Hour Puzzle - Pure Vanilla JavaScript Engine
 * Runs directly in browsers and GitHub Pages with zero build step.
 */

// ==========================================
// 1. Web Audio API Sound Synthesizer
// ==========================================
class SoundFX {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    try {
      const saved = localStorage.getItem('rush_hour_sound_muted');
      this.isMuted = saved === 'true';
    } catch (e) {}
  }

  initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  getMuted() {
    return this.isMuted;
  }

  setMuted(muted) {
    this.isMuted = muted;
    try {
      localStorage.setItem('rush_hour_sound_muted', muted ? 'true' : 'false');
    } catch (e) {}
  }

  toggleMute() {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  playMove() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.08);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch (e) {}
  }

  playBump() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.09);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } catch (e) {}
  }

  playSelect() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(660, now + 0.05);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
    } catch (e) {}
  }

  playUndo() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(310, now + 0.08);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } catch (e) {}
  }

  playHint() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      [587.33, 880].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + idx * 0.09;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.08, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.25);
      });
    } catch (e) {}
  }

  playWin() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const noteStart = now + i * 0.12;
        osc.type = i === notes.length - 1 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, noteStart);
        gain.gain.setValueAtTime(0.12, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + (i === notes.length - 1 ? 0.7 : 0.25));
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(noteStart);
        osc.stop(noteStart + (i === notes.length - 1 ? 0.75 : 0.3));
      });
    } catch (e) {}
  }
}

const sound = new SoundFX();

// ==========================================
// 2. BFS Solver & Collision Logic
// ==========================================
const BOARD_SIZE = 6;
const EXIT_ROW = 2;

function buildGrid(vehicles) {
  const grid = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(null));
  for (const v of vehicles) {
    if (v.orientation === 'H') {
      for (let c = 0; c < v.length; c++) {
        const col = v.col + c;
        if (v.row >= 0 && v.row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE) {
          grid[v.row][col] = v.id;
        }
      }
    } else {
      for (let r = 0; r < v.length; r++) {
        const row = v.row + r;
        if (row >= 0 && row < BOARD_SIZE && v.col >= 0 && v.col < BOARD_SIZE) {
          grid[row][v.col] = v.id;
        }
      }
    }
  }
  return grid;
}

function getValidRange(target, vehicles) {
  const grid = buildGrid(vehicles.filter((v) => v.id !== target.id));
  if (target.orientation === 'H') {
    const row = target.row;
    let minCol = target.col;
    let maxCol = target.col;
    while (minCol > 0 && grid[row][minCol - 1] === null) minCol--;
    while (maxCol + target.length < BOARD_SIZE && grid[row][maxCol + target.length] === null) maxCol++;
    return { min: minCol, max: maxCol };
  } else {
    const col = target.col;
    let minRow = target.row;
    let maxRow = target.row;
    while (minRow > 0 && grid[minRow - 1][col] === null) minRow--;
    while (maxRow + target.length < BOARD_SIZE && grid[maxRow + target.length][col] === null) maxRow++;
    return { min: minRow, max: maxRow };
  }
}

function isLevelSolved(vehicles) {
  const redCar = vehicles.find((v) => v.id === 'red');
  if (!redCar) return false;
  return redCar.row === EXIT_ROW && redCar.orientation === 'H' && redCar.col >= 4;
}

function serializeState(vehicles) {
  const sorted = [...vehicles].sort((a, b) => a.id.localeCompare(b.id));
  return sorted.map((v) => `${v.id}:${v.row}:${v.col}`).join('|');
}

function cloneWithMove(vehicles, vehicleId, newRow, newCol) {
  return vehicles.map((v) =>
    v.id === vehicleId ? { ...v, row: newRow, col: newCol } : v
  );
}

function solveRushHour(initialVehicles, maxVisited = 30000) {
  const redCar = initialVehicles.find((v) => v.id === 'red');
  if (!redCar) return { solvable: false, minMoves: 0, solutionSteps: [] };
  if (isLevelSolved(initialVehicles)) return { solvable: true, minMoves: 0, solutionSteps: [] };

  const queue = [{ vehicles: initialVehicles, path: [] }];
  const visited = new Set();
  visited.add(serializeState(initialVehicles));
  let count = 0;

  while (queue.length > 0) {
    const current = queue.shift();
    count++;
    if (count > maxVisited) break;

    const { vehicles, path } = current;

    for (const v of vehicles) {
      const range = getValidRange(v, vehicles);

      if (v.orientation === 'H') {
        // Left
        for (let newCol = v.col - 1; newCol >= range.min; newCol--) {
          const next = cloneWithMove(vehicles, v.id, v.row, newCol);
          const key = serializeState(next);
          if (!visited.has(key)) {
            visited.add(key);
            const step = {
              vehicleId: v.id,
              fromRow: v.row,
              fromCol: v.col,
              toRow: v.row,
              toCol: newCol,
              direction: 'LEFT',
              steps: v.col - newCol,
            };
            const nextPath = [...path, step];
            if (isLevelSolved(next)) {
              return { solvable: true, minMoves: nextPath.length, solutionSteps: nextPath };
            }
            queue.push({ vehicles: next, path: nextPath });
          }
        }
        // Right
        for (let newCol = v.col + 1; newCol <= range.max; newCol++) {
          const next = cloneWithMove(vehicles, v.id, v.row, newCol);
          const key = serializeState(next);
          if (!visited.has(key)) {
            visited.add(key);
            const step = {
              vehicleId: v.id,
              fromRow: v.row,
              fromCol: v.col,
              toRow: v.row,
              toCol: newCol,
              direction: 'RIGHT',
              steps: newCol - v.col,
            };
            const nextPath = [...path, step];
            if (isLevelSolved(next)) {
              return { solvable: true, minMoves: nextPath.length, solutionSteps: nextPath };
            }
            queue.push({ vehicles: next, path: nextPath });
          }
        }
      } else {
        // Up
        for (let newRow = v.row - 1; newRow >= range.min; newRow--) {
          const next = cloneWithMove(vehicles, v.id, newRow, v.col);
          const key = serializeState(next);
          if (!visited.has(key)) {
            visited.add(key);
            const step = {
              vehicleId: v.id,
              fromRow: v.row,
              fromCol: v.col,
              toRow: newRow,
              toCol: v.col,
              direction: 'UP',
              steps: v.row - newRow,
            };
            const nextPath = [...path, step];
            if (isLevelSolved(next)) {
              return { solvable: true, minMoves: nextPath.length, solutionSteps: nextPath };
            }
            queue.push({ vehicles: next, path: nextPath });
          }
        }
        // Down
        for (let newRow = v.row + 1; newRow <= range.max; newRow++) {
          const next = cloneWithMove(vehicles, v.id, newRow, v.col);
          const key = serializeState(next);
          if (!visited.has(key)) {
            visited.add(key);
            const step = {
              vehicleId: v.id,
              fromRow: v.row,
              fromCol: v.col,
              toRow: newRow,
              toCol: v.col,
              direction: 'DOWN',
              steps: newRow - v.row,
            };
            const nextPath = [...path, step];
            if (isLevelSolved(next)) {
              return { solvable: true, minMoves: nextPath.length, solutionSteps: nextPath };
            }
            queue.push({ vehicles: next, path: nextPath });
          }
        }
      }
    }
  }

  return { solvable: false, minMoves: 0, solutionSteps: [] };
}

// ==========================================
// 3. Curated 24 Benchmark Rush Hour Levels
// ==========================================
const CURATED_LEVEL_STRINGS = [
  // Beginner (4..8 moves)
  { id: 'beg-1', title: '첫 번째 탈출 (First Escape)', diff: 'beginner', s: 'BBBCCoooHIooAAHIooGDDooxGooooooooxoo' },
  { id: 'beg-2', title: '골목길 비우기 (Clear the Alley)', diff: 'beginner', s: 'xCCDDNKEEMoNKAAMoOooLFFOGGLooooxIIJJ' },
  { id: 'beg-3', title: '교차로 양보 (Intersection Yield)', diff: 'beginner', s: 'ooKBBNCCKLoNJAALooJDDMEEFFFMoooxHHox' },
  { id: 'beg-4', title: '노란 택시 우회 (Yellow Taxi Bypass)', diff: 'beginner', s: 'BBCCoxooKxooAAKLooFFKLGGJoHHoMJIIIoM' },
  { id: 'beg-5', title: '출구 라인 확보 (Secure the Exit)', diff: 'beginner', s: 'BBCCCJooHooJooHAAJGoHIDDGEEIoooooxoo' },
  { id: 'beg-6', title: '주차장 워밍업 (Parking Warmup)', diff: 'beginner', s: 'ooJxCCooJDDDAAJKooxIoKFFoIGGoLHHHooL' },

  // Intermediate (9..15 moves)
  { id: 'mid-1', title: '도심 속 정체 (Urban Jam)', diff: 'intermediate', s: 'ooJBBBHoJKoLHAAKoLxDDEELoIFFoooIGGoo' },
  { id: 'mid-2', title: '연쇄 자리바꿈 (Chain Shuffle)', diff: 'intermediate', s: 'ooKxCCIJKDDDIJKAAMxFFLoMoooLGGoHHHoo' },
  { id: 'mid-3', title: '대형 화물트럭 (Heavy Hauler)', diff: 'intermediate', s: 'HBBBoMHoIJLMAAIJLNoCCKxNoooKEEFFGGGo' },
  { id: 'mid-4', title: '틈새 공략 (Tight Squeeze)', diff: 'intermediate', s: 'ooHBBLooHIoLAAHIKLGCCCKoGDDJoooxoJFF' },
  { id: 'mid-5', title: '이중 봉쇄 해제 (Double Unlock)', diff: 'intermediate', s: 'BBBJoLooIJoLHoIAALHCCKDDoooKEExoGGoo' },
  { id: 'mid-6', title: '신호 대기선 (Signal Line)', diff: 'intermediate', s: 'oHBBCCoHoJKxAAoJKoGEEEKoGoIooLGoIFFL' },

  // Advanced (19..30 moves)
  { id: 'adv-1', title: '지그재그 후진 (Zig-Zag Reverse)', diff: 'advanced', s: 'BBBJooooIJCCAAIooLHoIDDLHEEEKMFFoxKM' },
  { id: 'adv-2', title: '톱니바퀴 맞물림 (Gearlock)', diff: 'advanced', s: 'BBoxxoHJooMNHJAAMNEEKFFNIoKLooIGGLoo' },
  { id: 'adv-3', title: '유령 터널 (Ghost Tunnel)', diff: 'advanced', s: 'oooIKxCCCIKLGoAAKLGDDJoLEEHJooooHFFo' },
  { id: 'adv-4', title: '회전문 퍼즐 (Revolving Trap)', diff: 'advanced', s: 'xoKMCCDDKMoNIJLAANIJLEEoIFFooOxHHooO' },
  { id: 'adv-5', title: '게이트 키퍼 (The Gatekeeper)', diff: 'advanced', s: 'BBBCCLIDDKoLIAAKoMooJEEMFFJoooooxoox' },
  { id: 'adv-6', title: '도심 마비 탈출 (Gridlock Escape)', diff: 'advanced', s: 'BBoJoxDDoJoLAAoKoLHEEKooHoIFFFxoIooo' },

  // Expert (38..47+ moves)
  { id: 'exp-1', title: '철통 방어막 (Iron Wall)', diff: 'expert', s: 'EoBBBoEooGIJEAAGIJCCCHIJooFHooooFDDo' },
  { id: 'exp-2', title: '무한 루프 (Endless Loop)', diff: 'expert', s: 'ooHBBKooHIoKAAHIoKGCCCooGDDJooEEoJFF' },
  { id: 'exp-3', title: '블랙홀 파킹 (Black Hole Jam)', diff: 'expert', s: 'BBBIKLooHIKLGoHAALGCCJDDoooJEExooooo' },
  { id: 'exp-4', title: '신경 쇠약 (Nerve Wracker)', diff: 'expert', s: 'BBKCCoJoKDDoJAALoooxoLFFGGGLoMooxIIM' },
  { id: 'exp-5', title: '마스터 마인드 (Mastermind)', diff: 'expert', s: 'oBBBCCDDEEEMooKAAMFFKLoMJooLGGJHHIIo' },
  { id: 'exp-6', title: '궁극의 47수 (The Grand Finale)', diff: 'expert', s: 'BBBJooooIJCCAAIooLHoIDDLHEEEKMFFGGKM' }
];

function parseBoardString(str, idPrefix, stageNum, title, diff) {
  const clean = str.trim();
  const map = {};
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 6; c++) {
      const ch = clean[r * 6 + c];
      if (ch && ch !== 'o' && ch !== '.' && ch !== 'x') {
        if (!map[ch]) map[ch] = [];
        map[ch].push({ r, c });
      }
    }
  }

  const vehicles = [];
  const palette = ['yellow', 'green', 'blue', 'purple', 'orange', 'cyan', 'pink', 'lime', 'amber', 'teal', 'police'];
  let idx = 0;

  for (const [id, cells] of Object.entries(map)) {
    const isRed = id === 'A' || id === 'X';
    const first = cells[0];
    const isH = cells.length > 1 && cells[0].r === cells[1].r;
    vehicles.push({
      id: isRed ? 'red' : id,
      row: first.r,
      col: first.c,
      length: cells.length,
      orientation: isH ? 'H' : 'V',
      color: isRed ? 'red' : palette[idx++ % palette.length],
      label: isRed ? '주인공' : id,
    });
  }

  const sol = solveRushHour(vehicles, 20000);
  return {
    id: idPrefix,
    stageNumber: stageNum,
    title: title,
    difficulty: diff,
    parMoves: sol.minMoves || 10,
    vehicles: vehicles,
    description: `최소 ${sol.minMoves || 10}번의 이동으로 빨간 스포츠카를 탈출시키세요.`
  };
}

// Build initial levels
const INITIAL_LEVELS = CURATED_LEVEL_STRINGS.map((item, idx) => 
  parseBoardString(item.s, item.id, idx + 1, item.title, item.diff)
);

// ==========================================
// 4. Game State & Controllers
// ==========================================
let levels = [...INITIAL_LEVELS];
let currentLevelId = INITIAL_LEVELS[0].id;
let vehicles = [];
let history = [];
let selectedVehicleId = null;
let moves = 0;
let elapsedSeconds = 0;
let isWon = false;
let isNewRecord = false;
let hintStep = null;
let isAutoPlaying = false;
let autoPlayInterval = null;
let timerInterval = null;
let progress = {};

// Load saved data
try {
  const savedCustom = localStorage.getItem('rush_hour_custom_levels');
  if (savedCustom) {
    const parsed = JSON.parse(savedCustom);
    levels = [...INITIAL_LEVELS, ...parsed];
  }
} catch (e) {}

try {
  const savedProgress = localStorage.getItem('rush_hour_progress');
  if (savedProgress) progress = JSON.parse(savedProgress);
} catch (e) {}

try {
  const savedLevelId = localStorage.getItem('rush_hour_current_level_id');
  if (savedLevelId && levels.some((l) => l.id === savedLevelId)) {
    currentLevelId = savedLevelId;
  }
} catch (e) {}

// DOM Elements
const boardContainer = document.getElementById('board-container');
const gridBg = document.getElementById('grid-background');
const vehiclesLayer = document.getElementById('vehicles-layer');
const selectedControls = document.getElementById('selected-controls');

const hudStageNum = document.getElementById('hud-stage-num');
const hudStageTitle = document.getElementById('hud-stage-title');
const hudDifficultyBadge = document.getElementById('hud-difficulty-badge');
const hudMoves = document.getElementById('hud-moves');
const hudPar = document.getElementById('hud-par');
const hudTimer = document.getElementById('hud-timer');
const hudStars = document.getElementById('hud-stars');

const btnPrevStage = document.getElementById('btn-prev-stage');
const btnNextStage = document.getElementById('btn-next-stage');
const btnSoundToggle = document.getElementById('btn-sound-toggle');
const iconSound = document.getElementById('icon-sound');
const btnResetHeader = document.getElementById('btn-reset-header');

const btnHint = document.getElementById('btn-hint');
const btnUndo = document.getElementById('btn-undo');
const btnReset = document.getElementById('btn-reset');
const btnAutoplay = document.getElementById('btn-autoplay');
const iconAutoplay = document.getElementById('icon-autoplay');
const labelAutoplay = document.getElementById('label-autoplay');

const btnOpenStages = document.getElementById('btn-open-stages');
const btnOpenEditor = document.getElementById('btn-open-editor');
const navBtnStages = document.getElementById('nav-btn-stages');
const navBtnEditor = document.getElementById('nav-btn-editor');
const navBtnRules = document.getElementById('nav-btn-rules');

// Modals
const modalVictory = document.getElementById('modal-victory');
const victoryStageTitle = document.getElementById('victory-stage-title');
const victoryStars = document.getElementById('victory-stars');
const victoryEvalText = document.getElementById('victory-eval-text');
const victoryMovesText = document.getElementById('victory-moves-text');
const victoryTimeText = document.getElementById('victory-time-text');
const victoryNewRecord = document.getElementById('victory-new-record');
const victoryBtnNext = document.getElementById('victory-btn-next');
const victoryBtnReplay = document.getElementById('victory-btn-replay');
const victoryBtnStages = document.getElementById('victory-btn-stages');

const modalStages = document.getElementById('modal-stages');
const stagesFilterTabs = document.getElementById('stages-filter-tabs');
const stagesListContainer = document.getElementById('stages-list-container');
const stagesBtnClose = document.getElementById('stages-btn-close');
const stagesBtnCloseFooter = document.getElementById('stages-btn-close-footer');
const stagesBtnCreate = document.getElementById('stages-btn-create');

const modalEditor = document.getElementById('modal-editor');
const editorGrid = document.getElementById('editor-grid');
const editorTitleInput = document.getElementById('editor-title-input');
const editorBtnClose = document.getElementById('editor-btn-close');
const editorBtnValidate = document.getElementById('editor-btn-validate');
const editorBtnSave = document.getElementById('editor-btn-save');
const editorValidationBanner = document.getElementById('editor-validation-banner');
const toolModePlace = document.getElementById('tool-mode-place');
const toolModeErase = document.getElementById('tool-mode-erase');
const editorToolItems = document.getElementById('editor-tool-items');

const modalRules = document.getElementById('modal-rules');
const rulesBtnClose = document.getElementById('rules-btn-close');

// ==========================================
// 5. Game Initialization & Loop
// ==========================================
function getCurrentLevel() {
  return levels.find((l) => l.id === currentLevelId) || levels[0];
}

function updateHUD() {
  const lvl = getCurrentLevel();
  hudStageNum.textContent = `STAGE ${lvl.stageNumber.toString().padStart(2, '0')}`;
  hudStageTitle.textContent = lvl.title;

  const diffBadges = {
    beginner: { text: '초급', cls: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40' },
    intermediate: { text: '중급', cls: 'text-amber-400 bg-amber-950/60 border-amber-500/40' },
    advanced: { text: '고급', cls: 'text-orange-400 bg-orange-950/60 border-orange-500/40' },
    expert: { text: '마스터', cls: 'text-rose-400 bg-rose-950/60 border-rose-500/40' },
    custom: { text: '커스텀', cls: 'text-purple-400 bg-purple-950/60 border-purple-500/40' },
  };
  const b = diffBadges[lvl.difficulty] || diffBadges.beginner;
  hudDifficultyBadge.textContent = b.text;
  hudDifficultyBadge.className = `text-[10px] font-bold px-1.5 py-0.5 rounded border ${b.cls}`;

  hudMoves.textContent = moves;
  hudPar.textContent = `/ ${lvl.parMoves}수`;

  const mins = Math.floor(elapsedSeconds / 60);
  const secs = elapsedSeconds % 60;
  hudTimer.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  const currentStars = moves <= lvl.parMoves ? 3 : moves <= Math.ceil(lvl.parMoves * 1.5) ? 2 : 1;
  document.getElementById('star-1').className = currentStars >= 1 ? 'opacity-100' : 'opacity-25';
  document.getElementById('star-2').className = currentStars >= 2 ? 'opacity-100' : 'opacity-25';
  document.getElementById('star-3').className = currentStars >= 3 ? 'opacity-100' : 'opacity-25';

  const cIdx = levels.findIndex((l) => l.id === lvl.id);
  btnPrevStage.disabled = cIdx <= 0 || isAutoPlaying;
  btnNextStage.disabled = cIdx >= levels.length - 1 || isAutoPlaying;
  btnUndo.disabled = history.length === 0 || isWon || isAutoPlaying;

  // Sound Icon state
  if (sound.getMuted()) {
    iconSound.setAttribute('data-lucide', 'volume-x');
    iconSound.className = 'w-4 h-4 text-rose-400';
  } else {
    iconSound.setAttribute('data-lucide', 'volume-2');
    iconSound.className = 'w-4 h-4 text-emerald-400';
  }

  // Autoplay label state
  if (isAutoPlaying) {
    iconAutoplay.setAttribute('data-lucide', 'pause');
    iconAutoplay.className = 'w-4 h-4 mb-0.5 text-rose-400';
    labelAutoplay.textContent = '정지';
    btnAutoplay.className = 'flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-colors shadow-sm border bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse';
  } else {
    iconAutoplay.setAttribute('data-lucide', 'play');
    iconAutoplay.className = 'w-4 h-4 mb-0.5 text-emerald-400';
    labelAutoplay.textContent = '자동 해결';
    btnAutoplay.className = 'flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-colors shadow-sm border bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
  }

  if (window.lucide) window.lucide.createIcons();
}

function renderBackgroundGrid() {
  gridBg.innerHTML = '';
  for (let idx = 0; idx < 36; idx++) {
    const r = Math.floor(idx / 6);
    const c = idx % 6;
    const isExitRow = r === EXIT_ROW;

    const cell = document.createElement('div');
    cell.className = `relative border border-slate-800/60 flex items-center justify-center ${
      isExitRow ? 'bg-slate-900/30' : 'bg-transparent'
    }`;

    const dot = document.createElement('div');
    dot.className = 'w-1 h-1 rounded-full bg-slate-800/80';
    cell.appendChild(dot);

    if (isExitRow && c < 5) {
      const arr = document.createElement('span');
      arr.className = 'absolute text-[10px] text-slate-700 font-bold tracking-widest pointer-events-none opacity-40';
      arr.textContent = '➔';
      cell.appendChild(arr);
    }

    gridBg.appendChild(cell);
  }
}

function getVehicleStyle(v) {
  if (v.id === 'red') {
    return {
      bg: 'from-rose-600 via-red-600 to-rose-700',
      border: 'border-red-400/80',
      glass: 'bg-sky-200/90',
      shadow: 'shadow-lg shadow-rose-950/60'
    };
  }
  switch (v.color) {
    case 'yellow':
      return { bg: 'from-amber-400 via-yellow-400 to-amber-500', border: 'border-amber-200', glass: 'bg-slate-900/60', shadow: 'shadow-md shadow-amber-950/40' };
    case 'police':
      return { bg: 'from-slate-900 via-slate-800 to-zinc-900', border: 'border-slate-400', glass: 'bg-sky-300/80', shadow: 'shadow-md shadow-black/60' };
    case 'blue':
      return { bg: 'from-blue-600 via-indigo-600 to-blue-700', border: 'border-blue-300', glass: 'bg-sky-100/90', shadow: 'shadow-md shadow-blue-950/40' };
    case 'green':
    case 'lime':
      return { bg: 'from-emerald-500 via-green-600 to-emerald-700', border: 'border-emerald-300', glass: 'bg-emerald-100/90', shadow: 'shadow-md shadow-emerald-950/40' };
    case 'purple':
      return { bg: 'from-purple-600 via-fuchsia-600 to-purple-800', border: 'border-purple-300', glass: 'bg-fuchsia-100/90', shadow: 'shadow-md shadow-purple-950/40' };
    case 'orange':
    case 'amber':
      return { bg: 'from-orange-500 via-amber-500 to-orange-600', border: 'border-orange-300', glass: 'bg-amber-100/90', shadow: 'shadow-md shadow-orange-950/40' };
    case 'cyan':
    case 'teal':
      return { bg: 'from-cyan-500 via-teal-500 to-cyan-700', border: 'border-cyan-200', glass: 'bg-white/80', shadow: 'shadow-md shadow-cyan-950/40' };
    case 'pink':
      return { bg: 'from-pink-500 via-rose-400 to-pink-600', border: 'border-pink-200', glass: 'bg-white/90', shadow: 'shadow-md shadow-pink-950/40' };
    default:
      return { bg: 'from-slate-600 via-zinc-600 to-slate-700', border: 'border-slate-300', glass: 'bg-slate-200/90', shadow: 'shadow-md shadow-slate-950/40' };
  }
}

function renderVehicles() {
  vehiclesLayer.innerHTML = '';
  const boardWidth = boardContainer.clientWidth;
  const cellSize = boardWidth / BOARD_SIZE;

  vehicles.forEach((v) => {
    const isRed = v.id === 'red';
    const isHorizontal = v.orientation === 'H';
    const isSelected = v.id === selectedVehicleId;
    const isHint = hintStep && hintStep.vehicleId === v.id;

    const width = isHorizontal ? v.length * cellSize - 6 : cellSize - 6;
    const height = isHorizontal ? cellSize - 6 : v.length * cellSize - 6;
    const left = v.col * cellSize + 3;
    const top = v.row * cellSize + 3;

    const style = getVehicleStyle(v);

    const el = document.createElement('div');
    el.setAttribute('data-id', v.id);
    el.style.width = `${width}px`;
    el.style.height = `${height}px`;
    el.style.transform = `translate3d(${left}px, ${top}px, 0)`;
    el.style.transition = 'transform 0.18s cubic-bezier(0.2, 0.9, 0.3, 1)';

    el.className = `absolute z-10 cursor-grab active:cursor-grabbing select-none touch-none rounded-xl border-2 bg-gradient-to-br ${style.bg} ${style.border} ${style.shadow} ${
      isSelected ? 'ring-4 ring-amber-400 ring-offset-2 ring-offset-slate-900' : ''
    } ${isHint ? 'animate-bounce ring-4 ring-emerald-400 ring-offset-2 ring-offset-slate-900' : ''}`;

    // Detailing
    if (isRed) {
      el.innerHTML = `
        <div class="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2.5 flex flex-col justify-between px-1 pointer-events-none">
          <div class="h-0.5 bg-white/90 rounded-full shadow-sm"></div>
          <div class="h-0.5 bg-white/90 rounded-full shadow-sm"></div>
        </div>
        <div class="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-amber-400 border border-amber-200 flex items-center justify-center text-[9px] font-black text-amber-950 shadow-sm pointer-events-none">★</div>
        <div class="absolute right-1 top-2 w-1.5 h-2 rounded-r-md bg-amber-200 shadow-[0_0_8px_rgba(253,230,138,0.9)] pointer-events-none"></div>
        <div class="absolute right-1 bottom-2 w-1.5 h-2 rounded-r-md bg-amber-200 shadow-[0_0_8px_rgba(253,230,138,0.9)] pointer-events-none"></div>
        <div class="absolute rounded-md ${style.glass} shadow-inner pointer-events-none top-1.5 bottom-1.5 right-4 w-5"></div>
        <div class="absolute -top-1 left-2.5 w-4 h-1.5 rounded-t bg-zinc-900 border border-zinc-700 pointer-events-none"></div>
        <div class="absolute -top-1 right-3 w-4 h-1.5 rounded-t bg-zinc-900 border border-zinc-700 pointer-events-none"></div>
        <div class="absolute -bottom-1 left-2.5 w-4 h-1.5 rounded-b bg-zinc-900 border border-zinc-700 pointer-events-none"></div>
        <div class="absolute -bottom-1 right-3 w-4 h-1.5 rounded-b bg-zinc-900 border border-zinc-700 pointer-events-none"></div>
      `;
    } else {
      let extraHtml = '';
      if (v.color === 'police') {
        extraHtml += `
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 bg-slate-950/80 px-2 py-0.5 rounded-full border border-slate-700 pointer-events-none">
            <div class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            <div class="w-1.5 h-1.5 rounded-full bg-white"></div>
            <div class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
          </div>
        `;
      }
      if (v.color === 'yellow' && v.length === 2) {
        extraHtml += `
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-1.5 py-0.2 bg-amber-950/80 border border-amber-300 rounded text-[9px] font-black text-amber-300 tracking-wider pointer-events-none">TAXI</div>
        `;
      }
      if (v.length === 3) {
        extraHtml += `
          <div class="absolute inset-2 rounded-lg bg-black/20 border border-white/20 p-1 flex items-center justify-around pointer-events-none">
            ${isHorizontal ? '<div class="w-1/3 h-full border-r border-white/20"></div><div class="w-1/3 h-full border-r border-white/20"></div><div class="w-1/3 h-full"></div>' : '<div class="flex flex-col w-full h-full justify-around"><div class="h-1/3 w-full border-b border-white/20"></div><div class="h-1/3 w-full border-b border-white/20"></div><div class="h-1/3 w-full"></div></div>'}
          </div>
        `;
      }

      const glassClass = isHorizontal
        ? 'top-1.5 bottom-1.5 left-3 w-5'
        : 'left-1.5 right-1.5 top-3 h-5';

      el.innerHTML = `
        ${extraHtml}
        <div class="absolute rounded-md ${style.glass} shadow-inner pointer-events-none ${glassClass}"></div>
      `;
    }

    if (isHint && hintStep) {
      const hintLabel = hintStep.direction === 'LEFT' ? '◀ 왼쪽' : hintStep.direction === 'RIGHT' ? '오른쪽 ▶' : hintStep.direction === 'UP' ? '▲ 위쪽' : '▼ 아래쪽';
      el.innerHTML += `
        <div class="absolute -top-7 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 font-black text-xs px-2 py-0.5 rounded shadow-lg animate-pulse whitespace-nowrap pointer-events-none z-30">
          ${hintLabel}
        </div>
      `;
    }

    // Attach drag listener (handles selection and real-time sliding)
    attachDrag(el, v, cellSize);

    vehiclesLayer.appendChild(el);
  });

  renderSelectedControls();
}

function selectVehicle(id, skipDomRebuild = false) {
  if (selectedVehicleId === id) return;
  selectedVehicleId = id;
  sound.playSelect();
  if (skipDomRebuild) {
    document.querySelectorAll('#vehicles-layer > div').forEach((node) => {
      if (node.getAttribute('data-id') === id) {
        node.classList.add('ring-4', 'ring-amber-400', 'ring-offset-2', 'ring-offset-slate-900');
      } else {
        node.classList.remove('ring-4', 'ring-amber-400', 'ring-offset-2', 'ring-offset-slate-900');
      }
    });
    renderSelectedControls();
  } else {
    renderVehicles();
  }
}

function renderSelectedControls() {
  const v = vehicles.find((x) => x.id === selectedVehicleId);
  if (!v) {
    selectedControls.innerHTML = `
      <div class="w-full text-center text-xs text-slate-500 py-1">
        차량을 마우스로 누른 채 원하는 방향으로 드래그하세요! (키보드 방향키 이동도 지원)
      </div>
    `;
    return;
  }

  const name = v.id === 'red' ? '주인공 스포츠카' : `${v.label || v.id}번 차량`;
  const isH = v.orientation === 'H';

  selectedControls.innerHTML = `
    <div class="flex items-center justify-between w-full">
      <div class="flex items-center gap-2">
        <span class="text-xs font-semibold text-slate-300">
          선택: <span class="text-amber-400 font-bold">${name}</span>
        </span>
        <span class="text-[11px] text-slate-500">
          (${isH ? '좌우 슬라이드' : '상하 슬라이드'})
        </span>
      </div>

      <div class="flex items-center gap-1.5">
        ${isH ? `
          <button id="ctrl-move-neg" class="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-xs font-bold text-slate-100 rounded-lg border border-slate-600 transition-colors shadow-sm">
            ◀ 왼쪽
          </button>
          <button id="ctrl-move-pos" class="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-xs font-bold text-slate-100 rounded-lg border border-slate-600 transition-colors shadow-sm">
            오른쪽 ▶
          </button>
        ` : `
          <button id="ctrl-move-neg" class="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-xs font-bold text-slate-100 rounded-lg border border-slate-600 transition-colors shadow-sm">
            ▲ 위로
          </button>
          <button id="ctrl-move-pos" class="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-xs font-bold text-slate-100 rounded-lg border border-slate-600 transition-colors shadow-sm">
            아래로 ▼
          </button>
        `}
      </div>
    </div>
  `;

  document.getElementById('ctrl-move-neg')?.addEventListener('click', () => moveSelected(-1));
  document.getElementById('ctrl-move-pos')?.addEventListener('click', () => moveSelected(1));
}

function moveSelected(delta) {
  if (!selectedVehicleId || isWon || isAutoPlaying) return;
  const v = vehicles.find((x) => x.id === selectedVehicleId);
  if (!v) return;

  const range = getValidRange(v, vehicles);
  const isH = v.orientation === 'H';
  const curr = isH ? v.col : v.row;
  const next = curr + delta;

  if (next >= range.min && next <= range.max) {
    history.push(JSON.parse(JSON.stringify(vehicles)));
    moves++;
    hintStep = null;

    vehicles = vehicles.map((item) => {
      if (item.id === v.id) {
        return isH ? { ...item, col: next } : { ...item, row: next };
      }
      return item;
    });

    sound.playMove();
    renderVehicles();
    updateHUD();
    checkWinCondition();
  } else {
    sound.playBump();
  }
}

// Drag & Drop Handler (Continuous mouse-hold drag)
function attachDrag(el, vehicle, cellSize) {
  let startX = 0;
  let startY = 0;
  let isDragging = false;
  let range = { min: 0, max: 0 };
  let initialCoord = 0;
  let currentOffsetPx = 0;
  let pointerId = null;

  const onPointerDown = (e) => {
    if (isWon || isAutoPlaying) return;
    if (e.button !== undefined && e.button !== 0) return;

    e.preventDefault();
    e.stopPropagation();

    pointerId = e.pointerId;
    try {
      el.setPointerCapture(pointerId);
    } catch (err) {}

    selectVehicle(vehicle.id, true);

    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    currentOffsetPx = 0;
    range = getValidRange(vehicle, vehicles);
    initialCoord = vehicle.orientation === 'H' ? vehicle.col : vehicle.row;
    el.style.transition = 'none';
    el.classList.add('z-20', 'cursor-grabbing');

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
  };

  const onPointerMove = (e) => {
    if (!isDragging) return;
    const isH = vehicle.orientation === 'H';
    const deltaPx = isH ? e.clientX - startX : e.clientY - startY;

    const minOffsetPx = (range.min - initialCoord) * cellSize;
    const maxOffsetPx = (range.max - initialCoord) * cellSize;
    const clampedOffset = Math.max(minOffsetPx, Math.min(maxOffsetPx, deltaPx));

    if ((deltaPx <= minOffsetPx - 6 || deltaPx >= maxOffsetPx + 6) && Math.abs(clampedOffset) > 0) {
      sound.playBump();
    }

    currentOffsetPx = clampedOffset;

    const baseLeft = vehicle.col * cellSize + 3;
    const baseTop = vehicle.row * cellSize + 3;

    const curLeft = isH ? baseLeft + clampedOffset : baseLeft;
    const curTop = !isH ? baseTop + clampedOffset : baseTop;

    el.style.transform = `translate3d(${curLeft}px, ${curTop}px, 0)`;
  };

  const onPointerUp = () => {
    if (!isDragging) return;
    isDragging = false;

    if (pointerId !== null) {
      try {
        el.releasePointerCapture(pointerId);
      } catch (err) {}
      pointerId = null;
    }

    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
    window.removeEventListener('pointercancel', onPointerUp);

    el.classList.remove('z-20', 'cursor-grabbing');

    const isH = vehicle.orientation === 'H';
    const movedCells = Math.round(currentOffsetPx / cellSize);
    const targetCoord = initialCoord + movedCells;
    const clampedCoord = Math.max(range.min, Math.min(range.max, targetCoord));

    el.style.transition = 'transform 0.18s cubic-bezier(0.2, 0.9, 0.3, 1)';

    if (clampedCoord !== initialCoord) {
      history.push(JSON.parse(JSON.stringify(vehicles)));
      moves++;
      hintStep = null;

      vehicles = vehicles.map((v) => {
        if (v.id === vehicle.id) {
          return isH ? { ...v, col: clampedCoord } : { ...v, row: clampedCoord };
        }
        return v;
      });

      sound.playMove();
      renderVehicles();
      updateHUD();
      checkWinCondition();
    } else {
      const baseLeft = vehicle.col * cellSize + 3;
      const baseTop = vehicle.row * cellSize + 3;
      el.style.transform = `translate3d(${baseLeft}px, ${baseTop}px, 0)`;
    }
  };

  el.addEventListener('pointerdown', onPointerDown);
}

function checkWinCondition() {
  if (isLevelSolved(vehicles) && !isWon) {
    isWon = true;
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
      isAutoPlaying = false;
    }

    const lvl = getCurrentLevel();
    const stars = moves <= lvl.parMoves ? 3 : moves <= Math.ceil(lvl.parMoves * 1.5) ? 2 : 1;
    const prev = progress[lvl.id];
    isNewRecord = !prev || moves < prev.bestMoves;

    progress[lvl.id] = {
      completed: true,
      bestMoves: prev ? Math.min(prev.bestMoves, moves) : moves,
      stars: prev ? Math.max(prev.stars, stars) : stars,
    };

    try {
      localStorage.setItem('rush_hour_progress', JSON.stringify(progress));
    } catch (e) {}

    showVictoryModal();
  }
}

function showVictoryModal() {
  sound.playWin();
  const lvl = getCurrentLevel();
  const stars = moves <= lvl.parMoves ? 3 : moves <= Math.ceil(lvl.parMoves * 1.5) ? 2 : 1;

  victoryStageTitle.textContent = `${lvl.title} 완료`;
  victoryStars.innerHTML = `
    <span class="${stars >= 1 ? 'scale-110 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]' : 'opacity-25'}">★</span>
    <span class="${stars >= 2 ? 'scale-125 drop-shadow-[0_0_12px_rgba(251,191,36,0.9)]' : 'opacity-25'}">★</span>
    <span class="${stars >= 3 ? 'scale-110 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]' : 'opacity-25'}">★</span>
  `;

  victoryEvalText.textContent =
    stars === 3
      ? '최적의 최단 경로 달성! 완벽한 두뇌 플레이!'
      : stars === 2
      ? '훌륭합니다! 조금만 더 줄이면 3스타 달성 가능!'
      : '주차장 탈출 완료! 다음엔 더 적은 이동에 도전해보세요!';

  victoryMovesText.textContent = `${moves}회 (목표 ${lvl.parMoves}회)`;
  const mins = Math.floor(elapsedSeconds / 60);
  const secs = elapsedSeconds % 60;
  victoryTimeText.textContent = `${mins}분 ${secs}초`;

  if (isNewRecord) {
    victoryNewRecord.classList.remove('hidden');
  } else {
    victoryNewRecord.classList.add('hidden');
  }

  // Next button visibility
  const cIdx = levels.findIndex((l) => l.id === lvl.id);
  if (cIdx < levels.length - 1) {
    victoryBtnNext.classList.remove('hidden');
  } else {
    victoryBtnNext.classList.add('hidden');
  }

  modalVictory.classList.remove('hidden');
  modalVictory.classList.add('flex');

  // Confetti
  if (window.confetti) {
    try {
      window.confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      setTimeout(() => {
        window.confetti({ particleCount: 60, angle: 60, spread: 55, origin: { x: 0.2, y: 0.65 } });
      }, 250);
      setTimeout(() => {
        window.confetti({ particleCount: 60, angle: 120, spread: 55, origin: { x: 0.8, y: 0.65 } });
      }, 450);
    } catch (e) {}
  }
}

function loadStage(lvl) {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
    isAutoPlaying = false;
  }
  currentLevelId = lvl.id;
  vehicles = JSON.parse(JSON.stringify(lvl.vehicles));
  history = [];
  selectedVehicleId = null;
  moves = 0;
  elapsedSeconds = 0;
  isWon = false;
  isNewRecord = false;
  hintStep = null;

  try {
    localStorage.setItem('rush_hour_current_level_id', lvl.id);
  } catch (e) {}

  modalVictory.classList.add('hidden');
  modalVictory.classList.remove('flex');

  renderVehicles();
  updateHUD();
}

// ==========================================
// 6. Action Handlers (Undo, Reset, Hint, Autoplay)
// ==========================================
btnUndo.addEventListener('click', () => {
  if (history.length === 0 || isWon || isAutoPlaying) return;
  sound.playUndo();
  vehicles = history.pop();
  moves = Math.max(0, moves - 1);
  hintStep = null;
  renderVehicles();
  updateHUD();
});

btnReset.addEventListener('click', () => {
  sound.playUndo();
  loadStage(getCurrentLevel());
});

btnResetHeader.addEventListener('click', () => {
  sound.playUndo();
  loadStage(getCurrentLevel());
});

btnHint.addEventListener('click', () => {
  if (isWon || isAutoPlaying) return;
  sound.playHint();
  const sol = solveRushHour(vehicles, 25000);
  if (sol.solvable && sol.solutionSteps.length > 0) {
    hintStep = sol.solutionSteps[0];
    selectedVehicleId = hintStep.vehicleId;
    renderVehicles();
  } else {
    sound.playBump();
    alert('현재 위치에서는 탈출 경로가 막혀 있습니다. 실행 취소로 되돌려보세요!');
  }
});

btnAutoplay.addEventListener('click', () => {
  if (isAutoPlaying) {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
    }
    isAutoPlaying = false;
    updateHUD();
    return;
  }

  if (isWon) return;

  const sol = solveRushHour(vehicles, 30000);
  if (!sol.solvable || sol.solutionSteps.length === 0) {
    sound.playBump();
    alert('해결 경로를 찾을 수 없습니다.');
    return;
  }

  isAutoPlaying = true;
  updateHUD();

  let stepIdx = 0;
  const steps = sol.solutionSteps;

  autoPlayInterval = setInterval(() => {
    if (stepIdx >= steps.length) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
      isAutoPlaying = false;
      updateHUD();
      return;
    }

    const step = steps[stepIdx];
    sound.playMove();

    history.push(JSON.parse(JSON.stringify(vehicles)));
    vehicles = vehicles.map((v) => {
      if (v.id === step.vehicleId) {
        return { ...v, row: step.toRow, col: step.toCol };
      }
      return v;
    });

    moves++;
    renderVehicles();
    updateHUD();

    if (isLevelSolved(vehicles)) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
      isAutoPlaying = false;
      checkWinCondition();
    }

    stepIdx++;
  }, 450);
});

// Sound Toggle
btnSoundToggle.addEventListener('click', () => {
  sound.toggleMute();
  updateHUD();
});

// Stage Nav
btnPrevStage.addEventListener('click', () => {
  const cIdx = levels.findIndex((l) => l.id === currentLevelId);
  if (cIdx > 0) loadStage(levels[cIdx - 1]);
});

btnNextStage.addEventListener('click', () => {
  const cIdx = levels.findIndex((l) => l.id === currentLevelId);
  if (cIdx < levels.length - 1) loadStage(levels[cIdx + 1]);
});

// Victory Modal Handlers
victoryBtnNext.addEventListener('click', () => {
  const cIdx = levels.findIndex((l) => l.id === currentLevelId);
  if (cIdx < levels.length - 1) loadStage(levels[cIdx + 1]);
});

victoryBtnReplay.addEventListener('click', () => {
  loadStage(getCurrentLevel());
});

victoryBtnStages.addEventListener('click', () => {
  modalVictory.classList.add('hidden');
  modalVictory.classList.remove('flex');
  openStageSelector();
});

// Timer tick
timerInterval = setInterval(() => {
  if (!isWon && !isAutoPlaying) {
    elapsedSeconds++;
    const mins = Math.floor(elapsedSeconds / 60);
    const secs = elapsedSeconds % 60;
    hudTimer.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
}, 1000);

// ==========================================
// 7. Stage Selector Modal
// ==========================================
let currentTabFilter = 'all';

function openStageSelector() {
  renderStageFilterTabs();
  renderStageCards();
  modalStages.classList.remove('hidden');
  modalStages.classList.add('flex');
  if (window.lucide) window.lucide.createIcons();
}

function renderStageFilterTabs() {
  const tabs = [
    { key: 'all', label: '전체' },
    { key: 'beginner', label: '초급' },
    { key: 'intermediate', label: '중급' },
    { key: 'advanced', label: '고급' },
    { key: 'expert', label: '마스터' },
    { key: 'custom', label: '커스텀' },
  ];

  stagesFilterTabs.innerHTML = '';
  tabs.forEach((tab) => {
    const btn = document.createElement('button');
    btn.textContent = tab.label;
    btn.className = `px-3 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition-colors ${
      currentTabFilter === tab.key
        ? 'bg-rose-500 text-white shadow-md shadow-rose-950/50'
        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
    }`;
    btn.addEventListener('click', () => {
      currentTabFilter = tab.key;
      renderStageFilterTabs();
      renderStageCards();
    });
    stagesFilterTabs.appendChild(btn);
  });
}

function renderStageCards() {
  stagesListContainer.innerHTML = '';
  const filtered = levels.filter((l) => (currentTabFilter === 'all' ? true : l.difficulty === currentTabFilter));

  filtered.forEach((lvl) => {
    const isCurrent = lvl.id === currentLevelId;
    const p = progress[lvl.id];

    const card = document.createElement('div');
    card.className = `group relative p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
      isCurrent
        ? 'bg-rose-950/30 border-rose-500/80 shadow-lg shadow-rose-950/40'
        : 'bg-slate-850/60 hover:bg-slate-800 border-slate-700/60 hover:border-slate-600'
    }`;

    const diffMeta = {
      beginner: { text: '초급', cls: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/40' },
      intermediate: { text: '중급', cls: 'text-amber-400 border-amber-500/30 bg-amber-950/40' },
      advanced: { text: '고급', cls: 'text-orange-400 border-orange-500/30 bg-orange-950/40' },
      expert: { text: '마스터', cls: 'text-rose-400 border-rose-500/30 bg-rose-950/40' },
      custom: { text: '커스텀', cls: 'text-purple-400 border-purple-500/30 bg-purple-950/40' },
    }[lvl.difficulty] || { text: '초급', cls: 'text-emerald-400' };

    card.innerHTML = `
      <div class="flex items-start justify-between gap-2">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-black text-rose-400">#${lvl.stageNumber.toString().padStart(2, '0')}</span>
            <span class="text-[10px] font-bold px-1.5 py-0.2 rounded border ${diffMeta.cls}">${diffMeta.text}</span>
          </div>
          <h4 class="text-sm font-bold text-slate-100 group-hover:text-white mt-1 truncate">${lvl.title}</h4>
        </div>
        <div class="flex flex-col items-end">
          ${p?.completed ? `
            <div class="flex items-center text-amber-400 text-xs">
              <span class="${p.stars >= 1 ? 'opacity-100' : 'opacity-25'}">★</span>
              <span class="${p.stars >= 2 ? 'opacity-100' : 'opacity-25'}">★</span>
              <span class="${p.stars >= 3 ? 'opacity-100' : 'opacity-25'}">★</span>
            </div>
          ` : '<span class="text-[11px] text-slate-500 font-medium">미완료</span>'}
        </div>
      </div>
      <div class="flex items-center justify-between mt-3 pt-2 border-t border-slate-800 text-[11px] text-slate-400">
        <span>목표: ${lvl.parMoves}수</span>
        ${p?.bestMoves ? `<span class="text-emerald-400 font-bold">최고: ${p.bestMoves}수</span>` : '<span class="text-slate-500">도전 전</span>'}
      </div>
    `;

    card.addEventListener('click', () => {
      loadStage(lvl);
      modalStages.classList.add('hidden');
      modalStages.classList.remove('flex');
    });

    stagesListContainer.appendChild(card);
  });
}

btnOpenStages.addEventListener('click', openStageSelector);
navBtnStages.addEventListener('click', openStageSelector);
stagesBtnClose.addEventListener('click', () => {
  modalStages.classList.add('hidden');
  modalStages.classList.remove('flex');
});
stagesBtnCloseFooter.addEventListener('click', () => {
  modalStages.classList.add('hidden');
  modalStages.classList.remove('flex');
});
stagesBtnCreate.addEventListener('click', () => {
  modalStages.classList.add('hidden');
  modalStages.classList.remove('flex');
  openLevelEditor();
});

// ==========================================
// 8. Level Editor Modal
// ==========================================
let editorVehicles = [
  { id: 'red', row: EXIT_ROW, col: 1, length: 2, orientation: 'H', color: 'red', label: '주인공' }
];
let editorMode = 'place';
let editorTool = { length: 2, orientation: 'H', color: 'yellow' };
let editorSolResult = { tested: false, solvable: false, minMoves: 0 };

function openLevelEditor() {
  editorVehicles = [
    { id: 'red', row: EXIT_ROW, col: 1, length: 2, orientation: 'H', color: 'red', label: '주인공' }
  ];
  editorSolResult = { tested: false, solvable: false, minMoves: 0 };
  editorValidationBanner.classList.add('hidden');
  editorBtnSave.disabled = true;

  renderEditorGrid();
  renderEditorTools();

  modalEditor.classList.remove('hidden');
  modalEditor.classList.add('flex');
  if (window.lucide) window.lucide.createIcons();
}

function renderEditorGrid() {
  editorGrid.innerHTML = '';
  const grid = buildGrid(editorVehicles);

  for (let idx = 0; idx < 36; idx++) {
    const r = Math.floor(idx / 6);
    const c = idx % 6;
    const isExitRow = r === EXIT_ROW;
    const occupied = grid[r][c];

    const cell = document.createElement('div');
    cell.className = `relative border border-slate-800/80 flex items-center justify-center cursor-pointer transition-colors ${
      isExitRow ? 'bg-slate-900/40' : 'bg-transparent'
    } ${occupied ? 'bg-slate-800/40' : 'hover:bg-slate-800/60'}`;

    if (isExitRow && c === 5) {
      const exitBadge = document.createElement('span');
      exitBadge.className = 'text-[10px] text-emerald-500 font-black absolute right-1';
      exitBadge.textContent = 'EXIT';
      cell.appendChild(exitBadge);
    }

    cell.addEventListener('click', () => handleEditorCellClick(r, c));
    editorGrid.appendChild(cell);
  }

  // Placed vehicles
  editorVehicles.forEach((v) => {
    const isH = v.orientation === 'H';
    const cellPct = 100 / 6;
    const w = isH ? v.length * cellPct : cellPct;
    const h = isH ? cellPct : v.length * cellPct;
    const left = v.col * cellPct;
    const top = v.row * cellPct;

    const el = document.createElement('div');
    el.style.width = `calc(${w}% - 4px)`;
    el.style.height = `calc(${h}% - 4px)`;
    el.style.left = `calc(${left}% + 2px)`;
    el.style.top = `calc(${top}% + 2px)`;

    el.className = `absolute z-10 rounded-lg border flex items-center justify-center font-black text-[11px] shadow-md transition-all ${
      v.id === 'red'
        ? 'bg-gradient-to-r from-red-600 to-rose-600 border-red-300 text-white'
        : 'bg-slate-700 border-slate-500 text-slate-200'
    } ${editorMode === 'erase' && v.id !== 'red' ? 'hover:opacity-50 hover:border-rose-500 cursor-pointer' : ''}`;

    el.textContent = v.id === 'red' ? '★ 주인공' : v.length === 3 ? '트럭' : '승용차';

    el.addEventListener('click', (e) => {
      e.stopPropagation();
      if (editorMode === 'erase') {
        if (v.id === 'red') {
          alert('주인공 빨간 스포츠카는 삭제할 수 없습니다!');
          return;
        }
        editorVehicles = editorVehicles.filter((item) => item.id !== v.id);
        editorSolResult.tested = false;
        editorValidationBanner.classList.add('hidden');
        editorBtnSave.disabled = true;
        sound.playUndo();
        renderEditorGrid();
      }
    });

    editorGrid.appendChild(el);
  });
}

function handleEditorCellClick(r, c) {
  if (editorMode === 'erase') return;

  const len = editorTool.length;
  const isH = editorTool.orientation === 'H';

  if (isH && c + len > BOARD_SIZE) return;
  if (!isH && r + len > BOARD_SIZE) return;

  const grid = buildGrid(editorVehicles);
  for (let i = 0; i < len; i++) {
    const checkR = isH ? r : r + i;
    const checkC = isH ? c + i : c;
    if (grid[checkR][checkC] !== null) {
      sound.playBump();
      return;
    }
  }

  const newId = `C_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 4)}`;
  editorVehicles.push({
    id: newId,
    row: r,
    col: c,
    length: len,
    orientation: editorTool.orientation,
    color: editorTool.color,
    label: editorVehicles.length.toString(),
  });

  editorSolResult.tested = false;
  editorValidationBanner.classList.add('hidden');
  editorBtnSave.disabled = true;
  sound.playMove();
  renderEditorGrid();
}

function renderEditorTools() {
  const tools = [
    { len: 2, ori: 'H', col: 'yellow', label: '가로 승용차 (2칸)', icon: '<div class="w-8 h-4 rounded bg-amber-500 border border-amber-300"></div>' },
    { len: 2, ori: 'V', col: 'blue', label: '세로 승용차 (2칸)', icon: '<div class="w-4 h-8 rounded bg-blue-500 border border-blue-300"></div>' },
    { len: 3, ori: 'H', col: 'orange', label: '가로 트럭 (3칸)', icon: '<div class="w-12 h-4 rounded bg-orange-500 border border-orange-300"></div>' },
    { len: 3, ori: 'V', col: 'purple', label: '세로 트럭 (3칸)', icon: '<div class="w-4 h-12 rounded bg-purple-500 border border-purple-300"></div>' },
  ];

  editorToolItems.innerHTML = '';
  tools.forEach((t) => {
    const isAct = editorTool.length === t.len && editorTool.orientation === t.ori;
    const btn = document.createElement('button');
    btn.className = `p-2 rounded-xl border flex flex-col items-center gap-1 transition-colors ${
      isAct ? 'border-amber-400 bg-amber-950/40 text-amber-200' : 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-750'
    }`;
    btn.innerHTML = `${t.icon}<span class="font-semibold text-[11px]">${t.label}</span>`;
    btn.addEventListener('click', () => {
      editorTool = { length: t.len, orientation: t.ori, color: t.col };
      editorMode = 'place';
      toolModePlace.className = 'px-3 py-1 text-xs font-bold rounded-lg bg-rose-500 text-white transition-colors';
      toolModeErase.className = 'px-3 py-1 text-xs font-bold rounded-lg text-slate-400 hover:text-white bg-slate-700/60 transition-colors flex items-center gap-1';
      renderEditorTools();
    });
    editorToolItems.appendChild(btn);
  });
}

toolModePlace.addEventListener('click', () => {
  editorMode = 'place';
  toolModePlace.className = 'px-3 py-1 text-xs font-bold rounded-lg bg-rose-500 text-white transition-colors';
  toolModeErase.className = 'px-3 py-1 text-xs font-bold rounded-lg text-slate-400 hover:text-white bg-slate-700/60 transition-colors flex items-center gap-1';
});

toolModeErase.addEventListener('click', () => {
  editorMode = 'erase';
  toolModeErase.className = 'px-3 py-1 text-xs font-bold rounded-lg bg-rose-500 text-white transition-colors flex items-center gap-1';
  toolModePlace.className = 'px-3 py-1 text-xs font-bold rounded-lg text-slate-400 hover:text-white bg-slate-700/60 transition-colors';
});

editorBtnValidate.addEventListener('click', () => {
  const sol = solveRushHour(editorVehicles, 25000);
  editorSolResult = { tested: true, solvable: sol.solvable, minMoves: sol.minMoves };
  editorValidationBanner.classList.remove('hidden');

  if (sol.solvable) {
    sound.playWin();
    editorValidationBanner.className = 'w-full p-3 rounded-xl border flex items-center gap-2 text-xs font-semibold bg-emerald-950/50 border-emerald-500/40 text-emerald-300';
    editorValidationBanner.innerHTML = `
      <i data-lucide="check" class="w-4 h-4 text-emerald-400 shrink-0"></i>
      <span>탈출 검증 완료! 최소 <strong class="underline">${sol.minMoves}수</strong>만에 해결 가능한 완벽한 퍼즐입니다.</span>
    `;
    editorBtnSave.disabled = false;
  } else {
    sound.playBump();
    editorValidationBanner.className = 'w-full p-3 rounded-xl border flex items-center gap-2 text-xs font-semibold bg-rose-950/50 border-rose-500/40 text-rose-300';
    editorValidationBanner.innerHTML = `
      <i data-lucide="alert-circle" class="w-4 h-4 text-rose-400 shrink-0"></i>
      <span>출구로 나갈 수 있는 경로가 없습니다. 차량 배치를 조정해 보세요.</span>
    `;
    editorBtnSave.disabled = true;
  }
  if (window.lucide) window.lucide.createIcons();
});

editorBtnSave.addEventListener('click', () => {
  if (!editorSolResult.solvable) return;
  const newLvl = {
    id: `custom-${Date.now()}`,
    stageNumber: 99,
    title: editorTitleInput.value.trim() || '나만의 커스텀 퍼즐',
    difficulty: 'custom',
    parMoves: editorSolResult.minMoves,
    vehicles: editorVehicles,
    description: '직접 제작한 커스텀 퍼즐입니다!',
    isCustom: true,
  };

  levels.push(newLvl);
  try {
    const customList = levels.filter((l) => l.isCustom);
    localStorage.setItem('rush_hour_custom_levels', JSON.stringify(customList));
  } catch (e) {}

  modalEditor.classList.add('hidden');
  modalEditor.classList.remove('flex');
  loadStage(newLvl);
});

editorBtnClose.addEventListener('click', () => {
  modalEditor.classList.add('hidden');
  modalEditor.classList.remove('flex');
});
btnOpenEditor.addEventListener('click', openLevelEditor);
navBtnEditor.addEventListener('click', openLevelEditor);

// ==========================================
// 9. Rules Modal
// ==========================================
navBtnRules.addEventListener('click', () => {
  modalRules.classList.remove('hidden');
  modalRules.classList.add('flex');
  if (window.lucide) window.lucide.createIcons();
});

rulesBtnClose.addEventListener('click', () => {
  modalRules.classList.add('hidden');
  modalRules.classList.remove('flex');
});

// ==========================================
// 10. Keyboard Shortcuts
// ==========================================
window.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT') return;

  if (e.key === 'Escape') {
    selectedVehicleId = null;
    hintStep = null;
    modalVictory.classList.add('hidden');
    modalVictory.classList.remove('flex');
    modalStages.classList.add('hidden');
    modalStages.classList.remove('flex');
    modalEditor.classList.add('hidden');
    modalEditor.classList.remove('flex');
    modalRules.classList.add('hidden');
    modalRules.classList.remove('flex');
    renderVehicles();
  } else if (e.key === 'u' || e.key === 'U') {
    btnUndo.click();
  } else if (e.key === 'r' || e.key === 'R') {
    btnReset.click();
  } else if (e.key === 'h' || e.key === 'H') {
    btnHint.click();
  } else if (e.key === 'ArrowLeft') {
    if (selectedVehicleId) moveSelected(-1);
  } else if (e.key === 'ArrowRight') {
    if (selectedVehicleId) moveSelected(1);
  } else if (e.key === 'ArrowUp') {
    if (selectedVehicleId) moveSelected(-1);
  } else if (e.key === 'ArrowDown') {
    if (selectedVehicleId) moveSelected(1);
  }
});

// Resize listener for responsive board
window.addEventListener('resize', () => {
  renderVehicles();
});

// Click outside board deselects vehicle
boardContainer.addEventListener('click', () => {
  selectedVehicleId = null;
  hintStep = null;
  renderVehicles();
});

// Boot Initial Stage
window.addEventListener('DOMContentLoaded', () => {
  renderBackgroundGrid();
  loadStage(getCurrentLevel());
  if (window.lucide) window.lucide.createIcons();
});

// Also trigger immediately in case DOM is already loaded
renderBackgroundGrid();
loadStage(getCurrentLevel());
if (window.lucide) window.lucide.createIcons();
