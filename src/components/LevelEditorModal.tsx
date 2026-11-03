import React, { useState, useMemo } from 'react';
import { Vehicle, Level, Orientation, VehicleColor } from '../types/game';
import { BOARD_SIZE, EXIT_ROW, solveRushHour, buildGrid } from '../utils/solver';
import { sound } from '../utils/audio';
import { X, Check, AlertCircle, Play, Trash2, RotateCcw } from 'lucide-react';

interface LevelEditorModalProps {
  onSaveAndPlay: (level: Level) => void;
  onClose: () => void;
}

export const LevelEditorModal: React.FC<LevelEditorModalProps> = ({
  onSaveAndPlay,
  onClose,
}) => {
  const [title, setTitle] = useState('나만의 커스텀 퍼즐');
  const [selectedTool, setSelectedTool] = useState<{
    length: 2 | 3;
    orientation: Orientation;
    color: VehicleColor;
  }>({
    length: 2,
    orientation: 'H',
    color: 'yellow',
  });

  // Always initialize with the target Red Car on row 2
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: 'red',
      row: EXIT_ROW,
      col: 1,
      length: 2,
      orientation: 'H',
      color: 'red',
      label: '주인공',
    },
  ]);

  const [activeTab, setActiveTab] = useState<'place' | 'erase'>('place');
  const [validationResult, setValidationResult] = useState<{
    tested: boolean;
    solvable: boolean;
    minMoves: number;
    errorMsg?: string;
  }>({ tested: false, solvable: false, minMoves: 0 });

  // Grid occupation map
  const grid = useMemo(() => buildGrid(vehicles), [vehicles]);

  // Handle cell click on editor grid
  const handleCellClick = (r: number, c: number) => {
    // If erasing
    if (activeTab === 'erase') {
      const targetVehicle = vehicles.find((v) => {
        if (v.orientation === 'H') {
          return v.row === r && c >= v.col && c < v.col + v.length;
        } else {
          return v.col === c && r >= v.row && r < v.row + v.length;
        }
      });

      if (targetVehicle) {
        if (targetVehicle.id === 'red') {
          alert('주인공 빨간 스포츠카는 삭제할 수 없습니다!');
          return;
        }
        setVehicles((prev) => prev.filter((v) => v.id !== targetVehicle.id));
        setValidationResult({ tested: false, solvable: false, minMoves: 0 });
        sound.playUndo();
      }
      return;
    }

    // If placing Red car reposition
    if (r === EXIT_ROW && selectedTool.color === 'red') {
      if (c + 2 <= BOARD_SIZE) {
        // Check if overlaps with other vehicles
        const nonRedGrid = buildGrid(vehicles.filter((v) => v.id !== 'red'));
        if (nonRedGrid[r][c] === null && nonRedGrid[r][c + 1] === null) {
          setVehicles((prev) =>
            prev.map((v) => (v.id === 'red' ? { ...v, col: c } : v))
          );
          setValidationResult({ tested: false, solvable: false, minMoves: 0 });
          sound.playMove();
          return;
        }
      }
    }

    // Placing a new vehicle
    const len = selectedTool.length;
    const isH = selectedTool.orientation === 'H';

    // Bounds check
    if (isH && c + len > BOARD_SIZE) return;
    if (!isH && r + len > BOARD_SIZE) return;

    // Check collision with existing vehicles
    for (let i = 0; i < len; i++) {
      const checkR = isH ? r : r + i;
      const checkC = isH ? c + i : c;
      if (grid[checkR][checkC] !== null) {
        sound.playBump();
        return; // Collides
      }
    }

    // Generate unique ID
    const newId = `C_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 4)}`;
    const newVehicle: Vehicle = {
      id: newId,
      row: r,
      col: c,
      length: len,
      orientation: selectedTool.orientation,
      color: selectedTool.color,
      label: vehicles.length.toString(),
    };

    setVehicles((prev) => [...prev, newVehicle]);
    setValidationResult({ tested: false, solvable: false, minMoves: 0 });
    sound.playMove();
  };

  // Run Solver Validation
  const handleValidate = () => {
    const redCar = vehicles.find((v) => v.id === 'red');
    if (!redCar) {
      setValidationResult({
        tested: true,
        solvable: false,
        minMoves: 0,
        errorMsg: '주인공 빨간 자동차가 없습니다.',
      });
      return;
    }

    const sol = solveRushHour(vehicles, 20000);
    if (sol.solvable) {
      sound.playWin();
      setValidationResult({
        tested: true,
        solvable: true,
        minMoves: sol.minMoves,
      });
    } else {
      sound.playBump();
      setValidationResult({
        tested: true,
        solvable: false,
        minMoves: 0,
        errorMsg: '출구로 나갈 수 있는 경로가 없습니다. 차량 배치를 조정해 보세요.',
      });
    }
  };

  // Save & Play
  const handleSave = () => {
    if (!validationResult.solvable) {
      handleValidate();
      return;
    }

    const newLevel: Level = {
      id: `custom-${Date.now()}`,
      stageNumber: 99,
      title: title.trim() || '나만의 커스텀 퍼즐',
      difficulty: 'custom',
      parMoves: validationResult.minMoves,
      vehicles: vehicles,
      description: '직접 제작한 커스텀 퍼즐입니다!',
      isCustom: true,
    };

    onSaveAndPlay(newLevel);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-slate-900 rounded-3xl border border-slate-700/80 shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              나만의 레벨 만들기 (Level Editor)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              그리드를 클릭하여 차량을 배치하고, 해결 가능 여부를 검증하세요.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 flex flex-col items-center gap-5">
          {/* Title Input */}
          <div className="w-full">
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              스테이지 제목
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-rose-500 transition-colors"
              placeholder="퍼즐 이름을 입력하세요"
            />
          </div>

          {/* 6x6 Editor Grid */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 bg-slate-950 rounded-2xl border-2 border-slate-800 shadow-inner grid grid-cols-6 grid-rows-6 p-1 select-none">
            {/* Base Cells */}
            {Array.from({ length: 36 }).map((_, idx) => {
              const r = Math.floor(idx / 6);
              const c = idx % 6;
              const isExitRow = r === EXIT_ROW;
              const occupiedId = grid[r][c];
              const isRed = occupiedId === 'red';

              return (
                <div
                  key={idx}
                  onClick={() => handleCellClick(r, c)}
                  className={`relative border border-slate-800/80 flex items-center justify-center cursor-pointer transition-colors ${
                    isExitRow ? 'bg-slate-900/40' : 'bg-transparent'
                  } ${occupiedId ? 'bg-slate-800/40' : 'hover:bg-slate-800/60'}`}
                >
                  {isExitRow && c === 5 && (
                    <span className="text-[10px] text-emerald-500 font-black absolute right-1">
                      EXIT
                    </span>
                  )}
                </div>
              );
            })}

            {/* Render Placed Vehicles */}
            {vehicles.map((v) => {
              const isH = v.orientation === 'H';
              const cellPx = 100 / 6;
              const width = isH ? v.length * cellPx : cellPx;
              const height = isH ? cellPx : v.length * cellPx;
              const left = v.col * cellPx;
              const top = v.row * cellPx;

              return (
                <div
                  key={v.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (activeTab === 'erase') {
                      if (v.id === 'red') {
                        alert('주인공 빨간 스포츠카는 삭제할 수 없습니다!');
                        return;
                      }
                      setVehicles((prev) => prev.filter((item) => item.id !== v.id));
                      setValidationResult({ tested: false, solvable: false, minMoves: 0 });
                      sound.playUndo();
                    }
                  }}
                  style={{
                    width: `calc(${width}% - 4px)`,
                    height: `calc(${height}% - 4px)`,
                    left: `calc(${left}% + 2px)`,
                    top: `calc(${top}% + 2px)`,
                  }}
                  className={`absolute z-10 rounded-lg border flex items-center justify-center font-black text-[11px] shadow-md transition-all ${
                    v.id === 'red'
                      ? 'bg-gradient-to-r from-red-600 to-rose-600 border-red-300 text-white'
                      : 'bg-slate-700 border-slate-500 text-slate-200'
                  } ${activeTab === 'erase' && v.id !== 'red' ? 'hover:opacity-50 hover:border-rose-500 cursor-pointer' : ''}`}
                >
                  {v.id === 'red' ? '★ 주인공' : v.length === 3 ? '트럭' : '승용차'}
                </div>
              );
            })}
          </div>

          {/* Tool Palette */}
          <div className="w-full bg-slate-800/70 p-3.5 rounded-2xl border border-slate-700 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">도구 선택</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setActiveTab('place')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                    activeTab === 'place'
                      ? 'bg-rose-500 text-white'
                      : 'text-slate-400 hover:text-white bg-slate-700/60'
                  }`}
                >
                  배치 모드
                </button>
                <button
                  onClick={() => setActiveTab('erase')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 ${
                    activeTab === 'erase'
                      ? 'bg-rose-500 text-white'
                      : 'text-slate-400 hover:text-white bg-slate-700/60'
                  }`}
                >
                  <Trash2 className="w-3 h-3" />
                  <span>삭제</span>
                </button>
              </div>
            </div>

            {activeTab === 'place' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {/* 2-Car Horizontal */}
                <button
                  onClick={() =>
                    setSelectedTool({ length: 2, orientation: 'H', color: 'yellow' })
                  }
                  className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-colors ${
                    selectedTool.length === 2 && selectedTool.orientation === 'H'
                      ? 'border-amber-400 bg-amber-950/40 text-amber-200'
                      : 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-750'
                  }`}
                >
                  <div className="w-8 h-4 rounded bg-amber-500 border border-amber-300" />
                  <span className="font-semibold text-[11px]">가로 승용차 (2칸)</span>
                </button>

                {/* 2-Car Vertical */}
                <button
                  onClick={() =>
                    setSelectedTool({ length: 2, orientation: 'V', color: 'blue' })
                  }
                  className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-colors ${
                    selectedTool.length === 2 && selectedTool.orientation === 'V'
                      ? 'border-blue-400 bg-blue-950/40 text-blue-200'
                      : 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-750'
                  }`}
                >
                  <div className="w-4 h-8 rounded bg-blue-500 border border-blue-300" />
                  <span className="font-semibold text-[11px]">세로 승용차 (2칸)</span>
                </button>

                {/* 3-Truck Horizontal */}
                <button
                  onClick={() =>
                    setSelectedTool({ length: 3, orientation: 'H', color: 'orange' })
                  }
                  className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-colors ${
                    selectedTool.length === 3 && selectedTool.orientation === 'H'
                      ? 'border-orange-400 bg-orange-950/40 text-orange-200'
                      : 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-750'
                  }`}
                >
                  <div className="w-12 h-4 rounded bg-orange-500 border border-orange-300" />
                  <span className="font-semibold text-[11px]">가로 트럭 (3칸)</span>
                </button>

                {/* 3-Truck Vertical */}
                <button
                  onClick={() =>
                    setSelectedTool({ length: 3, orientation: 'V', color: 'purple' })
                  }
                  className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-colors ${
                    selectedTool.length === 3 && selectedTool.orientation === 'V'
                      ? 'border-purple-400 bg-purple-950/40 text-purple-200'
                      : 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-750'
                  }`}
                >
                  <div className="w-4 h-12 rounded bg-purple-500 border border-purple-300" />
                  <span className="font-semibold text-[11px]">세로 트럭 (3칸)</span>
                </button>
              </div>
            )}
          </div>

          {/* Validation Feedback Banner */}
          {validationResult.tested && (
            <div
              className={`w-full p-3 rounded-xl border flex items-center gap-2 text-xs font-semibold ${
                validationResult.solvable
                  ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300'
                  : 'bg-rose-950/50 border-rose-500/40 text-rose-300'
              }`}
            >
              {validationResult.solvable ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    탈출 검증 완료! 최소{' '}
                    <strong className="underline">{validationResult.minMoves}수</strong>만에
                    해결 가능한 완벽한 퍼즐입니다.
                  </span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{validationResult.errorMsg}</span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-900/50 rounded-b-3xl">
          <button
            onClick={handleValidate}
            className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>해결 가능 여부 검사</span>
          </button>

          <button
            onClick={handleSave}
            disabled={!validationResult.solvable}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-black text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 disabled:opacity-40 disabled:pointer-events-none rounded-xl shadow-lg shadow-emerald-500/30 transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>저장하고 바로 플레이</span>
          </button>
        </div>
      </div>
    </div>
  );
};
