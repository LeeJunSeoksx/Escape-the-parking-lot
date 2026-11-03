import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Vehicle, MoveStep } from '../types/game';
import { BOARD_SIZE, EXIT_ROW, getValidRange, isLevelSolved } from '../utils/solver';
import { VehiclePiece } from './VehiclePiece';
import { sound } from '../utils/audio';

interface GameBoardProps {
  vehicles: Vehicle[];
  onVehiclesChange: (newVehicles: Vehicle[], wasMove: boolean) => void;
  selectedVehicleId: string | null;
  onSelectVehicle: (id: string | null) => void;
  hintStep: MoveStep | null;
  isWon: boolean;
  onEscapeComplete?: () => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  vehicles,
  onVehiclesChange,
  selectedVehicleId,
  onSelectVehicle,
  hintStep,
  isWon,
  onEscapeComplete,
}) => {
  const boardRef = useRef<HTMLDivElement>(null);
  const [boardWidth, setBoardWidth] = useState<number>(360);

  // Drag state
  const [dragState, setDragState] = useState<{
    vehicleId: string;
    startX: number;
    startY: number;
    initialCoord: number; // initial col (for H) or initial row (for V)
    minCoord: number;
    maxCoord: number;
    currentOffsetPx: number;
    orientation: 'H' | 'V';
  } | null>(null);

  // Resize observer to keep the board responsive
  useEffect(() => {
    const updateSize = () => {
      if (boardRef.current) {
        // Leave room for padding & borders; fit 6 cells
        const width = boardRef.current.clientWidth;
        setBoardWidth(width);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const cellSize = boardWidth / BOARD_SIZE;

  // Handle pointer down on a vehicle
  const handlePointerDown = useCallback(
    (e: React.PointerEvent, vehicle: Vehicle) => {
      if (isWon) return;
      e.preventDefault();
      e.stopPropagation();

      sound.playSelect();
      onSelectVehicle(vehicle.id);

      const range = getValidRange(vehicle, vehicles);
      const isH = vehicle.orientation === 'H';

      setDragState({
        vehicleId: vehicle.id,
        startX: e.clientX,
        startY: e.clientY,
        initialCoord: isH ? vehicle.col : vehicle.row,
        minCoord: range.min,
        maxCoord: range.max,
        currentOffsetPx: 0,
        orientation: vehicle.orientation,
      });
    },
    [vehicles, isWon, onSelectVehicle]
  );

  // Global pointer move for buttery smooth dragging
  useEffect(() => {
    if (!dragState) return;

    const handlePointerMove = (e: PointerEvent) => {
      const isH = dragState.orientation === 'H';
      const deltaPx = isH ? e.clientX - dragState.startX : e.clientY - dragState.startY;

      // Allowable pixel bounds
      const minOffsetPx = (dragState.minCoord - dragState.initialCoord) * cellSize;
      const maxOffsetPx = (dragState.maxCoord - dragState.initialCoord) * cellSize;

      // Elastic clamping
      const clampedOffset = Math.max(minOffsetPx, Math.min(maxOffsetPx, deltaPx));

      // Play soft bump sound if hitting bound
      if ((deltaPx <= minOffsetPx - 6 || deltaPx >= maxOffsetPx + 6) && Math.abs(clampedOffset) > 0) {
        sound.playBump();
      }

      setDragState((prev) => (prev ? { ...prev, currentOffsetPx: clampedOffset } : null));
    };

    const handlePointerUp = () => {
      if (!dragState) return;

      const isH = dragState.orientation === 'H';
      const movedCells = Math.round(dragState.currentOffsetPx / cellSize);
      const targetCoord = dragState.initialCoord + movedCells;
      const clampedCoord = Math.max(dragState.minCoord, Math.min(dragState.maxCoord, targetCoord));

      const hasMoved = clampedCoord !== dragState.initialCoord;

      if (hasMoved) {
        const updated = vehicles.map((v) => {
          if (v.id === dragState.vehicleId) {
            return isH ? { ...v, col: clampedCoord } : { ...v, row: clampedCoord };
          }
          return v;
        });

        sound.playMove();
        onVehiclesChange(updated, true);
      }

      setDragState(null);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [dragState, cellSize, vehicles, onVehiclesChange]);

  // Selected vehicle move via arrow buttons
  const moveSelected = useCallback(
    (delta: number) => {
      if (!selectedVehicleId || isWon) return;
      const vehicle = vehicles.find((v) => v.id === selectedVehicleId);
      if (!vehicle) return;

      const range = getValidRange(vehicle, vehicles);
      const isH = vehicle.orientation === 'H';
      const currentCoord = isH ? vehicle.col : vehicle.row;
      const nextCoord = currentCoord + delta;

      if (nextCoord >= range.min && nextCoord <= range.max) {
        const updated = vehicles.map((v) => {
          if (v.id === vehicle.id) {
            return isH ? { ...v, col: nextCoord } : { ...v, row: nextCoord };
          }
          return v;
        });
        sound.playMove();
        onVehiclesChange(updated, true);
      } else {
        sound.playBump();
      }
    },
    [selectedVehicleId, isWon, vehicles, onVehiclesChange]
  );

  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId);

  return (
    <div className="flex flex-col items-center select-none w-full max-w-[460px] mx-auto">
      {/* Outer Parking Lot Frame */}
      <div className="relative p-3.5 sm:p-4 bg-gradient-to-b from-slate-800 via-slate-850 to-slate-900 rounded-3xl shadow-2xl border-2 border-slate-700/80 w-full">
        {/* Top Lot Sign & Hazard Bar */}
        <div className="flex items-center justify-between pb-2.5 px-2 border-b border-slate-700/60 mb-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-extrabold tracking-wider text-slate-300">PARKING LOT 6×6</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-400 font-mono text-[11px]">ZONE-A</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>출구: 3번 라인 우측</span>
          </div>
        </div>

        {/* Board Container */}
        <div className="relative flex items-center">
          {/* 6x6 Parking Lot Grid */}
          <div
            ref={boardRef}
            onClick={() => onSelectVehicle(null)}
            className="relative w-full aspect-square bg-slate-950 rounded-2xl border border-slate-800 overflow-visible shadow-inner"
            style={{ touchAction: 'none' }}
          >
            {/* Asphalt Texture & Parking Bays */}
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 pointer-events-none p-1">
              {Array.from({ length: 36 }).map((_, idx) => {
                const r = Math.floor(idx / 6);
                const c = idx % 6;
                const isExitRow = r === EXIT_ROW;
                return (
                  <div
                    key={idx}
                    className={`relative border border-slate-800/60 flex items-center justify-center ${
                      isExitRow ? 'bg-slate-900/30' : 'bg-transparent'
                    }`}
                  >
                    {/* Parking slot marker dot or corner marks */}
                    <div className="w-1 h-1 rounded-full bg-slate-800/80" />
                    {/* Road markings on exit row */}
                    {isExitRow && c < 5 && (
                      <span className="absolute text-[10px] text-slate-700 font-bold tracking-widest select-none pointer-events-none opacity-40">
                        ➔
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Vehicles on Board */}
            {vehicles.map((v) => {
              const isSelected = v.id === selectedVehicleId;
              const isHint = hintStep?.vehicleId === v.id;
              const currentOffset = dragState?.vehicleId === v.id ? dragState.currentOffsetPx : 0;

              return (
                <VehiclePiece
                  key={v.id}
                  vehicle={v}
                  cellSize={cellSize}
                  isSelected={isSelected}
                  isHintTarget={isHint}
                  hintDirection={isHint ? hintStep.direction : null}
                  dragOffset={currentOffset}
                  onPointerDown={handlePointerDown}
                  onClick={(clicked) => onSelectVehicle(clicked.id)}
                />
              );
            })}
          </div>

          {/* Exit Gate on the right of Row 2 */}
          <div
            className="absolute -right-4.5 sm:-right-5 z-20 flex flex-col items-center justify-center"
            style={{
              top: `${EXIT_ROW * cellSize + 3}px`,
              height: `${cellSize - 6}px`,
              width: '24px',
            }}
          >
            {/* Animated Hazard Stripes Exit Gate */}
            <div className="w-full h-full rounded-r-xl border-y-2 border-r-2 border-emerald-400 hazard-stripes-exit shadow-[0_0_15px_rgba(52,211,153,0.5)] flex flex-col items-center justify-center">
              <span className="text-[10px] font-black text-white leading-none rotate-90 select-none">
                EXIT
              </span>
            </div>
            <div className="text-[12px] text-emerald-400 font-black animate-pulse leading-none mt-1">
              ➔
            </div>
          </div>
        </div>

        {/* Selected Vehicle Quick Move Affordance (Arrow Buttons) */}
        <div className="mt-3.5 pt-3 border-t border-slate-700/60 flex items-center justify-between min-h-[44px]">
          {selectedVehicle ? (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-300">
                  선택:{' '}
                  <span className="text-amber-400 font-bold">
                    {selectedVehicle.id === 'red' ? '주인공 스포츠카' : `${selectedVehicle.label || selectedVehicle.id}번 차량`}
                  </span>
                </span>
                <span className="text-[11px] text-slate-500">
                  ({selectedVehicle.orientation === 'H' ? '좌우 슬라이드' : '상하 슬라이드'})
                </span>
              </div>

              {/* Directional Action Buttons */}
              <div className="flex items-center gap-1.5">
                {selectedVehicle.orientation === 'H' ? (
                  <>
                    <button
                      onClick={() => moveSelected(-1)}
                      className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 active:bg-slate-800 text-xs font-bold text-slate-100 rounded-lg border border-slate-600 transition-colors shadow-sm flex items-center gap-1"
                    >
                      ◀ 왼쪽
                    </button>
                    <button
                      onClick={() => moveSelected(1)}
                      className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 active:bg-slate-800 text-xs font-bold text-slate-100 rounded-lg border border-slate-600 transition-colors shadow-sm flex items-center gap-1"
                    >
                      오른쪽 ▶
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => moveSelected(-1)}
                      className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 active:bg-slate-800 text-xs font-bold text-slate-100 rounded-lg border border-slate-600 transition-colors shadow-sm flex items-center gap-1"
                    >
                      ▲ 위로
                    </button>
                    <button
                      onClick={() => moveSelected(1)}
                      className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 active:bg-slate-800 text-xs font-bold text-slate-100 rounded-lg border border-slate-600 transition-colors shadow-sm flex items-center gap-1"
                    >
                      아래로 ▼
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="w-full text-center text-xs text-slate-500 py-1">
              차량을 클릭하거나 드래그하여 출구로 탈출시키세요! (키보드 방향키 이동 지원)
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
