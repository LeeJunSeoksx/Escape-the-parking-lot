import React, { useState } from 'react';
import { Level, Difficulty, LevelProgress } from '../types/game';
import { X, CheckCircle2, Lock, PlusCircle, Trash2 } from 'lucide-react';

interface StageSelectorModalProps {
  levels: Level[];
  currentLevelId: string;
  progress: Record<string, LevelProgress>;
  onSelectLevel: (level: Level) => void;
  onClose: () => void;
  onOpenLevelEditor: () => void;
  onDeleteCustomLevel?: (id: string) => void;
}

export const StageSelectorModal: React.FC<StageSelectorModalProps> = ({
  levels,
  currentLevelId,
  progress,
  onSelectLevel,
  onClose,
  onOpenLevelEditor,
  onDeleteCustomLevel,
}) => {
  const [selectedTab, setSelectedTab] = useState<Difficulty | 'all'>('all');

  const filteredLevels = levels.filter((lvl) => {
    if (selectedTab === 'all') return true;
    return lvl.difficulty === selectedTab;
  });

  const getDifficultyBadge = (diff: Difficulty) => {
    switch (diff) {
      case 'beginner':
        return { text: '초급', class: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/40' };
      case 'intermediate':
        return { text: '중급', class: 'text-amber-400 border-amber-500/30 bg-amber-950/40' };
      case 'advanced':
        return { text: '고급', class: 'text-orange-400 border-orange-500/30 bg-orange-950/40' };
      case 'expert':
        return { text: '마스터', class: 'text-rose-400 border-rose-500/30 bg-rose-950/40' };
      case 'custom':
        return { text: '커스텀', class: 'text-purple-400 border-purple-500/30 bg-purple-950/40' };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-slate-900 rounded-3xl border border-slate-700/80 shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">스테이지 선택</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              도전할 퍼즐을 선택하거나 직접 레벨을 제작하세요.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 px-6 py-3 border-b border-slate-800/80 overflow-x-auto no-scrollbar">
          {(
            [
              { key: 'all', label: '전체' },
              { key: 'beginner', label: '초급' },
              { key: 'intermediate', label: '중급' },
              { key: 'advanced', label: '고급' },
              { key: 'expert', label: '마스터' },
              { key: 'custom', label: '커스텀' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedTab(tab.key)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition-colors ${
                selectedTab === tab.key
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-950/50'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Level Grid Container */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredLevels.map((lvl) => {
            const isCurrent = lvl.id === currentLevelId;
            const lvlProgress = progress[lvl.id];
            const badge = getDifficultyBadge(lvl.difficulty);

            return (
              <div
                key={lvl.id}
                onClick={() => {
                  onSelectLevel(lvl);
                  onClose();
                }}
                className={`group relative p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                  isCurrent
                    ? 'bg-rose-950/30 border-rose-500/80 shadow-lg shadow-rose-950/40'
                    : 'bg-slate-850/60 hover:bg-slate-800 border-slate-700/60 hover:border-slate-600'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-rose-400">
                        #{lvl.stageNumber.toString().padStart(2, '0')}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${badge.class}`}
                      >
                        {badge.text}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-100 group-hover:text-white mt-1 truncate">
                      {lvl.title}
                    </h4>
                  </div>

                  {/* Stars / Completion Status */}
                  <div className="flex flex-col items-end">
                    {lvlProgress?.completed ? (
                      <div className="flex items-center text-amber-400 text-xs">
                        <span className={lvlProgress.stars >= 1 ? 'opacity-100' : 'opacity-25'}>★</span>
                        <span className={lvlProgress.stars >= 2 ? 'opacity-100' : 'opacity-25'}>★</span>
                        <span className={lvlProgress.stars >= 3 ? 'opacity-100' : 'opacity-25'}>★</span>
                      </div>
                    ) : (
                      <span className="text-[11px] text-slate-500 font-medium">미완료</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                  <span>목표: {lvl.parMoves}수</span>
                  {lvlProgress?.bestMoves ? (
                    <span className="text-emerald-400 font-bold">
                      최고: {lvlProgress.bestMoves}수
                    </span>
                  ) : (
                    <span className="text-slate-500">도전 전</span>
                  )}
                </div>

                {/* Delete button for custom levels */}
                {lvl.isCustom && onDeleteCustomLevel && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm('이 커스텀 레벨을 삭제하시겠습니까?')) {
                        onDeleteCustomLevel(lvl.id);
                      }
                    }}
                    className="absolute top-2.5 right-2.5 p-1 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors"
                    title="레벨 삭제"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })}

          {filteredLevels.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-500 text-xs">
              등록된 스테이지가 없습니다.
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-slate-900/50 rounded-b-3xl">
          <button
            onClick={() => {
              onClose();
              onOpenLevelEditor();
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-amber-300 bg-amber-950/60 hover:bg-amber-900/70 border border-amber-600/50 rounded-xl transition-colors shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>나만의 레벨 만들기</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
