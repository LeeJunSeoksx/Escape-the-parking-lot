import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Level } from '../types/game';
import { sound } from '../utils/audio';
import { Trophy, ArrowRight, RotateCcw, Grid, Award, Clock } from 'lucide-react';

interface VictoryModalProps {
  level: Level;
  moves: number;
  elapsedSeconds: number;
  isNewRecord: boolean;
  onNextStage: () => void;
  onReplay: () => void;
  onOpenStageList: () => void;
  hasNextStage: boolean;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  level,
  moves,
  elapsedSeconds,
  isNewRecord,
  onNextStage,
  onReplay,
  onOpenStageList,
  hasNextStage,
}) => {
  // Compute stars
  const stars = moves <= level.parMoves ? 3 : moves <= Math.ceil(level.parMoves * 1.5) ? 2 : 1;

  useEffect(() => {
    sound.playWin();

    // Multi-stage celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });

      const timer1 = setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 55,
          origin: { x: 0.2, y: 0.65 },
        });
      }, 250);

      const timer2 = setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 0.8, y: 0.65 },
        });
      }, 450);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } catch {
      // safe fallback
    }
  }, []);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}분 ${secs}초`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-sm bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl p-6 border-2 border-emerald-500/50 shadow-2xl shadow-emerald-950/60 text-center">
        {/* Glow Badge */}
        <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-tr from-amber-500 to-emerald-400 p-0.5 shadow-lg shadow-emerald-500/30 flex items-center justify-center">
          <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-amber-400">
            <Trophy className="w-8 h-8 animate-bounce" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-black text-white tracking-tight">탈출 성공!</h3>
        <p className="text-xs text-slate-400 mt-1">
          {level.title} 완료
        </p>

        {/* Stars Display */}
        <div className="flex items-center justify-center gap-2 my-4 text-3xl text-amber-400">
          <span className={`transform transition-transform duration-300 ${stars >= 1 ? 'scale-110 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]' : 'opacity-25'}`}>
            ★
          </span>
          <span className={`transform transition-transform duration-300 ${stars >= 2 ? 'scale-125 drop-shadow-[0_0_12px_rgba(251,191,36,0.9)]' : 'opacity-25'}`}>
            ★
          </span>
          <span className={`transform transition-transform duration-300 ${stars >= 3 ? 'scale-110 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]' : 'opacity-25'}`}>
            ★
          </span>
        </div>

        {/* Evaluation text */}
        <div className="text-xs font-bold text-emerald-400 mb-4">
          {stars === 3 && '최적의 최단 경로 달성! 완벽한 두뇌 플레이!'}
          {stars === 2 && '훌륭합니다! 조금만 더 줄이면 3스타 달성 가능!'}
          {stars === 1 && '주차장 탈출 완료! 다음엔 더 적은 이동에 도전해보세요!'}
        </div>

        {/* Performance Breakdown */}
        <div className="bg-slate-950/60 rounded-2xl p-3.5 border border-slate-800 text-left mb-5 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>이동 횟수</span>
            </span>
            <span className="font-extrabold text-white">
              {moves}회{' '}
              <span className="text-slate-500 font-normal">
                (목표 {level.parMoves}회)
              </span>
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              <span>소요 시간</span>
            </span>
            <span className="font-extrabold text-sky-300">
              {formatTime(elapsedSeconds)}
            </span>
          </div>

          {isNewRecord && (
            <div className="pt-2 border-t border-slate-800 text-center">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[11px] font-black border border-rose-500/30">
                🎉 신기록 달성!
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          {hasNextStage && (
            <button
              onClick={onNextStage}
              className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 active:from-emerald-600 active:to-teal-600 text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-emerald-500/30 transition-all flex items-center justify-center gap-2"
            >
              <span>다음 스테이지</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onReplay}
              className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 active:bg-slate-850 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-300" />
              <span>다시 플레이</span>
            </button>

            <button
              onClick={onOpenStageList}
              className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 active:bg-slate-850 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
            >
              <Grid className="w-3.5 h-3.5 text-slate-300" />
              <span>스테이지 목록</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
