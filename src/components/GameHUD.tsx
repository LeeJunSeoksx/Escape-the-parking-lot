import React from 'react';
import { Level } from '../types/game';
import { 
  Lightbulb, 
  RotateCcw, 
  RefreshCw, 
  Play, 
  Pause, 
  Grid, 
  Volume2, 
  VolumeX, 
  PlusCircle, 
  Clock, 
  Award,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface GameHUDProps {
  currentLevel: Level;
  moves: number;
  elapsedSeconds: number;
  canUndo: boolean;
  isAutoPlaying: boolean;
  isMuted: boolean;
  onUndo: () => void;
  onReset: () => void;
  onHint: () => void;
  onToggleAutoPlay: () => void;
  onOpenStageSelector: () => void;
  onOpenLevelEditor: () => void;
  onToggleSound: () => void;
  onPrevStage: () => void;
  onNextStage: () => void;
  hasPrevStage: boolean;
  hasNextStage: boolean;
}

export const GameHUD: React.FC<GameHUDProps> = ({
  currentLevel,
  moves,
  elapsedSeconds,
  canUndo,
  isAutoPlaying,
  isMuted,
  onUndo,
  onReset,
  onHint,
  onToggleAutoPlay,
  onOpenStageSelector,
  onOpenLevelEditor,
  onToggleSound,
  onPrevStage,
  onNextStage,
  hasPrevStage,
  hasNextStage,
}) => {
  // Format elapsed seconds as mm:ss
  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Dynamic star rating calculation
  const currentStars = moves <= currentLevel.parMoves
    ? 3
    : moves <= Math.ceil(currentLevel.parMoves * 1.5)
    ? 2
    : 1;

  const difficultyMeta = {
    beginner: { label: '초급', color: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40' },
    intermediate: { label: '중급', color: 'text-amber-400 bg-amber-950/60 border-amber-500/40' },
    advanced: { label: '고급', color: 'text-orange-400 bg-orange-950/60 border-orange-500/40' },
    expert: { label: '마스터', color: 'text-rose-400 bg-rose-950/60 border-rose-500/40' },
    custom: { label: '커스텀', color: 'text-purple-400 bg-purple-950/60 border-purple-500/40' },
  }[currentLevel.difficulty];

  return (
    <div className="w-full max-w-[500px] flex flex-col gap-3">
      {/* Top Bar Status Cards */}
      <div className="bg-slate-800/90 backdrop-blur-md rounded-2xl p-3 border border-slate-700/80 shadow-lg">
        {/* Stage Header with Navigation */}
        <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-700/60">
          <div className="flex items-center gap-1.5 min-w-0">
            <button
              onClick={onPrevStage}
              disabled={!hasPrevStage || isAutoPlaying}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/60 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="이전 스테이지"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black tracking-wide text-rose-400 uppercase">
                  STAGE {currentLevel.stageNumber.toString().padStart(2, '0')}
                </span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${difficultyMeta.color}`}>
                  {difficultyMeta.label}
                </span>
              </div>
              <h2 className="text-sm font-bold text-slate-100 truncate mt-0.5">
                {currentLevel.title}
              </h2>
            </div>

            <button
              onClick={onNextStage}
              disabled={!hasNextStage || isAutoPlaying}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/60 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="다음 스테이지"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Audio & Quick Controls */}
          <div className="flex items-center gap-1">
            <button
              onClick={onToggleSound}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700/70 transition-colors border border-slate-700/50"
              title={isMuted ? '음소거 해제' : '음소거'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>

            <button
              onClick={onOpenStageSelector}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-200 bg-slate-700/70 hover:bg-slate-600/80 border border-slate-600 transition-colors"
              title="스테이지 선택"
            >
              <Grid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">목록</span>
            </button>

            <button
              onClick={onOpenLevelEditor}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-amber-300 bg-amber-950/50 hover:bg-amber-900/60 border border-amber-600/50 transition-colors"
              title="나만의 레벨 만들기"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">제작</span>
            </button>
          </div>
        </div>

        {/* Live Performance Stats (Moves, Par, Time, Stars) */}
        <div className="grid grid-cols-3 gap-2 pt-2.5 text-center">
          {/* Moves / Par */}
          <div className="bg-slate-900/60 rounded-xl p-2 border border-slate-800">
            <div className="text-[11px] font-medium text-slate-400">현재 이동</div>
            <div className="flex items-baseline justify-center gap-1 mt-0.5">
              <span className="text-lg font-black text-white tabular-nums">{moves}</span>
              <span className="text-xs text-slate-500 font-bold tabular-nums">/ {currentLevel.parMoves}수</span>
            </div>
          </div>

          {/* Time Elapsed */}
          <div className="bg-slate-900/60 rounded-xl p-2 border border-slate-800">
            <div className="text-[11px] font-medium text-slate-400 flex items-center justify-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>진행 시간</span>
            </div>
            <div className="text-lg font-black text-sky-400 tabular-nums mt-0.5">
              {formatTime(elapsedSeconds)}
            </div>
          </div>

          {/* Current Star Grade */}
          <div className="bg-slate-900/60 rounded-xl p-2 border border-slate-800">
            <div className="text-[11px] font-medium text-slate-400 flex items-center justify-center gap-1">
              <Award className="w-3 h-3 text-amber-400" />
              <span>예상 등급</span>
            </div>
            <div className="flex items-center justify-center gap-0.5 text-amber-400 mt-0.5 text-base">
              <span className={currentStars >= 1 ? 'opacity-100' : 'opacity-20'}>★</span>
              <span className={currentStars >= 2 ? 'opacity-100' : 'opacity-20'}>★</span>
              <span className={currentStars >= 3 ? 'opacity-100' : 'opacity-20'}>★</span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Buttons (Hint, Undo, Reset, Autoplay) */}
      <div className="grid grid-cols-4 gap-2">
        {/* Hint Button */}
        <button
          onClick={onHint}
          disabled={isAutoPlaying}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 active:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition-colors shadow-sm disabled:opacity-40"
        >
          <Lightbulb className="w-4 h-4 mb-0.5 text-amber-400" />
          <span className="text-[11px] font-bold">힌트 보기</span>
        </button>

        {/* Undo Button */}
        <button
          onClick={onUndo}
          disabled={!canUndo || isAutoPlaying}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-850 text-slate-200 border border-slate-700 transition-colors shadow-sm disabled:opacity-40"
        >
          <RotateCcw className="w-4 h-4 mb-0.5 text-slate-300" />
          <span className="text-[11px] font-bold">실행 취소</span>
        </button>

        {/* Reset Button */}
        <button
          onClick={onReset}
          disabled={isAutoPlaying}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-850 text-slate-200 border border-slate-700 transition-colors shadow-sm disabled:opacity-40"
        >
          <RefreshCw className="w-4 h-4 mb-0.5 text-slate-300" />
          <span className="text-[11px] font-bold">다시 시작</span>
        </button>

        {/* Autoplay / Solution Button */}
        <button
          onClick={onToggleAutoPlay}
          className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-colors shadow-sm border ${
            isAutoPlaying
              ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
              : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
          }`}
        >
          {isAutoPlaying ? (
            <>
              <Pause className="w-4 h-4 mb-0.5 text-rose-400" />
              <span className="text-[11px] font-bold">정지</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mb-0.5 text-emerald-400" />
              <span className="text-[11px] font-bold">자동 해결</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
