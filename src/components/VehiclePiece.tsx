import React, { useMemo } from 'react';
import { Vehicle } from '../types/game';

interface VehiclePieceProps {
  vehicle: Vehicle;
  cellSize: number;
  isSelected: boolean;
  isHintTarget: boolean;
  hintDirection?: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | null;
  dragOffset: number; // in pixels along valid axis
  onPointerDown: (e: React.PointerEvent, vehicle: Vehicle) => void;
  onClick: (vehicle: Vehicle) => void;
}

export const VehiclePiece: React.FC<VehiclePieceProps> = ({
  vehicle,
  cellSize,
  isSelected,
  isHintTarget,
  hintDirection,
  dragOffset,
  onPointerDown,
  onClick,
}) => {
  const isRed = vehicle.id === 'red';
  const isHorizontal = vehicle.orientation === 'H';

  // Calculate width and height in pixels (leaving 4px gap for parking stalls)
  const width = isHorizontal ? vehicle.length * cellSize - 6 : cellSize - 6;
  const height = isHorizontal ? cellSize - 6 : vehicle.length * cellSize - 6;

  // Base position
  const baseLeft = vehicle.col * cellSize + 3;
  const baseTop = vehicle.row * cellSize + 3;

  // Position with drag offset
  const left = isHorizontal ? baseLeft + dragOffset : baseLeft;
  const top = !isHorizontal ? baseTop + dragOffset : baseTop;

  // Vehicle styling themes
  const styleConfig = useMemo(() => {
    if (isRed) {
      return {
        bg: 'from-rose-600 via-red-600 to-rose-700',
        border: 'border-red-400/80',
        roof: 'bg-red-800/80',
        glass: 'bg-sky-200/90',
        stripe: 'bg-white/90',
        accent: 'text-rose-200',
        shadow: 'shadow-lg shadow-rose-950/60',
        name: '주인공',
      };
    }

    switch (vehicle.color) {
      case 'yellow':
        return {
          bg: 'from-amber-400 via-yellow-400 to-amber-500',
          border: 'border-amber-200',
          roof: 'bg-amber-600',
          glass: 'bg-slate-900/60',
          stripe: 'bg-slate-900',
          accent: 'text-amber-950',
          shadow: 'shadow-md shadow-amber-950/40',
          name: '택시',
        };
      case 'police':
        return {
          bg: 'from-slate-900 via-slate-800 to-zinc-900',
          border: 'border-slate-400',
          roof: 'bg-slate-950',
          glass: 'bg-sky-300/80',
          stripe: 'bg-white',
          accent: 'text-white',
          shadow: 'shadow-md shadow-black/60',
          name: '경찰차',
        };
      case 'blue':
        return {
          bg: 'from-blue-600 via-indigo-600 to-blue-700',
          border: 'border-blue-300',
          roof: 'bg-blue-900',
          glass: 'bg-sky-100/90',
          stripe: 'bg-blue-300/40',
          accent: 'text-blue-100',
          shadow: 'shadow-md shadow-blue-950/40',
          name: vehicle.length === 3 ? '블루 트럭' : '세단',
        };
      case 'green':
      case 'lime':
        return {
          bg: 'from-emerald-500 via-green-600 to-emerald-700',
          border: 'border-emerald-300',
          roof: 'bg-emerald-900',
          glass: 'bg-emerald-100/90',
          stripe: 'bg-white/30',
          accent: 'text-emerald-100',
          shadow: 'shadow-md shadow-emerald-950/40',
          name: '에코 카',
        };
      case 'purple':
        return {
          bg: 'from-purple-600 via-fuchsia-600 to-purple-800',
          border: 'border-purple-300',
          roof: 'bg-purple-950',
          glass: 'bg-fuchsia-100/90',
          stripe: 'bg-fuchsia-300/40',
          accent: 'text-purple-100',
          shadow: 'shadow-md shadow-purple-950/40',
          name: vehicle.length === 3 ? '퍼플 트럭' : 'SUV',
        };
      case 'orange':
      case 'amber':
        return {
          bg: 'from-orange-500 via-amber-500 to-orange-600',
          border: 'border-orange-300',
          roof: 'bg-orange-800',
          glass: 'bg-amber-100/90',
          stripe: 'bg-orange-950/40',
          accent: 'text-orange-950',
          shadow: 'shadow-md shadow-orange-950/40',
          name: vehicle.length === 3 ? '화물 트럭' : '쿠페',
        };
      case 'cyan':
      case 'teal':
        return {
          bg: 'from-cyan-500 via-teal-500 to-cyan-700',
          border: 'border-cyan-200',
          roof: 'bg-cyan-900',
          glass: 'bg-white/80',
          stripe: 'bg-cyan-100/40',
          accent: 'text-cyan-950',
          shadow: 'shadow-md shadow-cyan-950/40',
          name: '밴',
        };
      case 'pink':
        return {
          bg: 'from-pink-500 via-rose-400 to-pink-600',
          border: 'border-pink-200',
          roof: 'bg-pink-900',
          glass: 'bg-white/90',
          stripe: 'bg-white/40',
          accent: 'text-pink-100',
          shadow: 'shadow-md shadow-pink-950/40',
          name: '핑크 카',
        };
      default:
        return {
          bg: 'from-slate-600 via-zinc-600 to-slate-700',
          border: 'border-slate-300',
          roof: 'bg-slate-800',
          glass: 'bg-slate-200/90',
          stripe: 'bg-slate-400/40',
          accent: 'text-slate-100',
          shadow: 'shadow-md shadow-slate-950/40',
          name: '승용차',
        };
    }
  }, [isRed, vehicle.color, vehicle.length]);

  return (
    <div
      data-vehicle-id={vehicle.id}
      onPointerDown={(e) => onPointerDown(e, vehicle)}
      onClick={() => onClick(vehicle)}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        transform: `translate3d(${left}px, ${top}px, 0)`,
        transition: dragOffset === 0 ? 'transform 0.18s cubic-bezier(0.2, 0.9, 0.3, 1)' : 'none',
      }}
      className={`absolute z-10 cursor-grab active:cursor-grabbing select-none touch-none rounded-xl border-2 bg-gradient-to-br ${styleConfig.bg} ${styleConfig.border} ${styleConfig.shadow} ${
        isSelected ? 'ring-4 ring-amber-400 ring-offset-2 ring-offset-slate-900' : ''
      } ${
        isHintTarget ? 'animate-bounce ring-4 ring-emerald-400 ring-offset-2 ring-offset-slate-900' : ''
      }`}
    >
      {/* Red sports car special racing stripes & detailing */}
      {isRed && (
        <>
          {/* Double racing stripes down the center */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2.5 flex flex-col justify-between px-1 pointer-events-none">
            <div className="h-0.5 bg-white/90 rounded-full shadow-sm" />
            <div className="h-0.5 bg-white/90 rounded-full shadow-sm" />
          </div>

          {/* Golden badge */}
          <div className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-amber-400 border border-amber-200 flex items-center justify-center text-[9px] font-black text-amber-950 shadow-sm pointer-events-none">
            ★
          </div>

          {/* Front headlights on the right side */}
          <div className="absolute right-1 top-2 w-1.5 h-2 rounded-r-md bg-amber-200 shadow-[0_0_8px_rgba(253,230,138,0.9)] pointer-events-none" />
          <div className="absolute right-1 bottom-2 w-1.5 h-2 rounded-r-md bg-amber-200 shadow-[0_0_8px_rgba(253,230,138,0.9)] pointer-events-none" />
        </>
      )}

      {/* Police car flashing lights bar */}
      {vehicle.color === 'police' && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 bg-slate-950/80 px-2 py-0.5 rounded-full border border-slate-700 pointer-events-none">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <div className="w-1.5 h-1.5 rounded-full bg-white" />
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
        </div>
      )}

      {/* Taxi roof sign */}
      {vehicle.color === 'yellow' && vehicle.length === 2 && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-1.5 py-0.2 bg-amber-950/80 border border-amber-300 rounded text-[9px] font-black text-amber-300 tracking-wider pointer-events-none">
          TAXI
        </div>
      )}

      {/* Truck 3-cell corrugated cargo container texture */}
      {vehicle.length === 3 && (
        <div className="absolute inset-2 rounded-lg bg-black/20 border border-white/20 p-1 flex items-center justify-around pointer-events-none">
          {isHorizontal ? (
            <>
              <div className="w-1/3 h-full border-r border-white/20" />
              <div className="w-1/3 h-full border-r border-white/20" />
              <div className="w-1/3 h-full" />
            </>
          ) : (
            <div className="flex flex-col w-full h-full justify-around">
              <div className="h-1/3 w-full border-b border-white/20" />
              <div className="h-1/3 w-full border-b border-white/20" />
              <div className="h-1/3 w-full" />
            </div>
          )}
        </div>
      )}

      {/* Cabin Windshield Glass */}
      <div
        className={`absolute rounded-md ${styleConfig.glass} shadow-inner pointer-events-none ${
          isHorizontal
            ? 'top-1.5 bottom-1.5 ' + (isRed ? 'right-4 w-5' : 'left-3 w-5')
            : 'left-1.5 right-1.5 top-3 h-5'
        }`}
      />

      {/* Vehicle wheels (top/bottom or left/right depending on orientation) */}
      {isHorizontal ? (
        <>
          <div className="absolute -top-1 left-2.5 w-4 h-1.5 rounded-t bg-zinc-900 border border-zinc-700 pointer-events-none" />
          <div className="absolute -top-1 right-3 w-4 h-1.5 rounded-t bg-zinc-900 border border-zinc-700 pointer-events-none" />
          <div className="absolute -bottom-1 left-2.5 w-4 h-1.5 rounded-b bg-zinc-900 border border-zinc-700 pointer-events-none" />
          <div className="absolute -bottom-1 right-3 w-4 h-1.5 rounded-b bg-zinc-900 border border-zinc-700 pointer-events-none" />
        </>
      ) : (
        <>
          <div className="absolute -left-1 top-2.5 w-1.5 h-4 rounded-l bg-zinc-900 border border-zinc-700 pointer-events-none" />
          <div className="absolute -left-1 bottom-3 w-1.5 h-4 rounded-l bg-zinc-900 border border-zinc-700 pointer-events-none" />
          <div className="absolute -right-1 top-2.5 w-1.5 h-4 rounded-r bg-zinc-900 border border-zinc-700 pointer-events-none" />
          <div className="absolute -right-1 bottom-3 w-1.5 h-4 rounded-r bg-zinc-900 border border-zinc-700 pointer-events-none" />
        </>
      )}

      {/* Subtle Direction Sliding Grips / Arrow indicators */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 hover:opacity-80 transition-opacity">
        {isHorizontal ? (
          <div className="flex items-center gap-1 text-[11px] font-bold text-white/80">
            <span>‹</span>
            <span className="text-[10px] tracking-widest">··</span>
            <span>›</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-0.5 text-[11px] font-bold text-white/80">
            <span>ˆ</span>
            <span className="text-[9px] -my-1">·</span>
            <span>ˇ</span>
          </div>
        )}
      </div>

      {/* Hint Direction Arrow Overlay */}
      {isHintTarget && hintDirection && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 font-black text-xs px-2 py-0.5 rounded shadow-lg animate-pulse flex items-center gap-1 z-30 pointer-events-none">
          {hintDirection === 'LEFT' && '◀ 왼쪽'}
          {hintDirection === 'RIGHT' && '오른쪽 ▶'}
          {hintDirection === 'UP' && '▲ 위쪽'}
          {hintDirection === 'DOWN' && '▼ 아래쪽'}
        </div>
      )}
    </div>
  );
};
