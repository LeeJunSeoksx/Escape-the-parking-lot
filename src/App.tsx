import React, { useState, useEffect, useCallback, useRef } from 'react';
import { INITIAL_LEVELS } from './data/levels';
import { Level, Vehicle, LevelProgress, MoveStep } from './types/game';
import { GameBoard } from './components/GameBoard';
import { GameHUD } from './components/GameHUD';
import { VictoryModal } from './components/VictoryModal';
import { StageSelectorModal } from './components/StageSelectorModal';
import { LevelEditorModal } from './components/LevelEditorModal';
import { solveRushHour, isLevelSolved } from './utils/solver';
import { sound } from './utils/audio';
import { Car, HelpCircle, Sparkles, RotateCcw, Volume2, VolumeX } from 'lucide-react';

export default function App() {
  // All levels (initial curated + custom created)
  const [levels, setLevels] = useState<Level[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedCustom = localStorage.getItem('rush_hour_custom_levels');
        if (savedCustom) {
          const parsed: Level[] = JSON.parse(savedCustom);
          return [...INITIAL_LEVELS, ...parsed];
        }
      } catch {
        // safe fallback
      }
    }
    return INITIAL_LEVELS;
  });

  // Current Level ID
  const [currentLevelId, setCurrentLevelId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('rush_hour_current_level_id');
      if (saved && INITIAL_LEVELS.some((l) => l.id === saved)) {
        return saved;
      }
    }
    return INITIAL_LEVELS[0].id;
  });

  const currentLevel = levels.find((l) => l.id === currentLevelId) || levels[0];

  // Vehicles state on current board
  const [vehicles, setVehicles] = useState<Vehicle[]>(() =>
    JSON.parse(JSON.stringify(currentLevel.vehicles))
  );

  // Undo history
  const [history, setHistory] = useState<Vehicle[][]>([]);

  // Selected vehicle for keyboard / button navigation
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);

  // Moves count
  const [moves, setMoves] = useState<number>(0);

  // Elapsed seconds timer
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  // Win state
  const [isWon, setIsWon] = useState<boolean>(false);
  const [isNewRecord, setIsNewRecord] = useState<boolean>(false);

  // Hint step
  const [hintStep, setHintStep] = useState<MoveStep | null>(null);

  // Autoplay solving state
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Audio mute state
  const [isMuted, setIsMuted] = useState<boolean>(() => sound.getMuted());

  // Modals
  const [showStageSelector, setShowStageSelector] = useState<boolean>(false);
  const [showLevelEditor, setShowLevelEditor] = useState<boolean>(false);
  const [showHowToPlay, setShowHowToPlay] = useState<boolean>(false);

  // Level progress records (completed, best moves, stars)
  const [progress, setProgress] = useState<Record<string, LevelProgress>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('rush_hour_progress');
        if (saved) return JSON.parse(saved);
      } catch {
        // safe fallback
      }
    }
    return {};
  });

  // Save progress when updated
  const saveProgress = useCallback(
    (levelId: string, movesTaken: number, parMoves: number) => {
      const stars = movesTaken <= parMoves ? 3 : movesTaken <= Math.ceil(parMoves * 1.5) ? 2 : 1;
      const prev = progress[levelId];
      const isRecord = !prev || movesTaken < prev.bestMoves;

      const updatedRecord: LevelProgress = {
        completed: true,
        bestMoves: prev ? Math.min(prev.bestMoves, movesTaken) : movesTaken,
        stars: prev ? Math.max(prev.stars, stars) : stars,
      };

      const newProgress = { ...progress, [levelId]: updatedRecord };
      setProgress(newProgress);
      setIsNewRecord(isRecord);

      try {
        localStorage.setItem('rush_hour_progress', JSON.stringify(newProgress));
      } catch {
        // safe fallback
      }
    },
    [progress]
  );

  // Load a stage
  const loadStage = useCallback(
    (targetLevel: Level) => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;
      }
      setIsAutoPlaying(false);
      setHintStep(null);
      setSelectedVehicleId(null);
      setCurrentLevelId(targetLevel.id);
      setVehicles(JSON.parse(JSON.stringify(targetLevel.vehicles)));
      setHistory([]);
      setMoves(0);
      setElapsedSeconds(0);
      setIsWon(false);
      setIsNewRecord(false);

      try {
        localStorage.setItem('rush_hour_current_level_id', targetLevel.id);
      } catch {
        // safe fallback
      }
    },
    []
  );

  // Timer interval
  useEffect(() => {
    if (isWon || isAutoPlaying) return;
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isWon, isAutoPlaying]);

  // Handle vehicle position change
  const handleVehiclesChange = useCallback(
    (newVehicles: Vehicle[], wasMove: boolean) => {
      if (isWon) return;

      if (wasMove) {
        setHistory((prev) => [...prev, vehicles]);
        setMoves((prev) => prev + 1);
        setHintStep(null); // Clear active hint on move
      }

      setVehicles(newVehicles);

      // Check win condition
      if (isLevelSolved(newVehicles)) {
        setIsWon(true);
        if (autoPlayTimerRef.current) {
          clearInterval(autoPlayTimerRef.current);
          autoPlayTimerRef.current = null;
          setIsAutoPlaying(false);
        }
        const finalMoves = wasMove ? moves + 1 : moves;
        saveProgress(currentLevel.id, finalMoves, currentLevel.parMoves);
      }
    },
    [vehicles, isWon, moves, currentLevel, saveProgress]
  );

  // Undo move
  const handleUndo = useCallback(() => {
    if (history.length === 0 || isWon || isAutoPlaying) return;

    sound.playUndo();
    const previous = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setVehicles(previous);
    setMoves((prev) => Math.max(0, prev - 1));
    setHintStep(null);
  }, [history, isWon, isAutoPlaying]);

  // Reset stage
  const handleReset = useCallback(() => {
    if (isAutoPlaying && autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
      setIsAutoPlaying(false);
    }
    sound.playUndo();
    loadStage(currentLevel);
  }, [currentLevel, loadStage, isAutoPlaying]);

  // Hint calculation using BFS Solver
  const handleHint = useCallback(() => {
    if (isWon || isAutoPlaying) return;

    sound.playHint();
    const sol = solveRushHour(vehicles, 25000);
    if (sol.solvable && sol.solutionSteps.length > 0) {
      const nextStep = sol.solutionSteps[0];
      setHintStep(nextStep);
      setSelectedVehicleId(nextStep.vehicleId);
    } else {
      sound.playBump();
      alert('현재 위치에서는 탈출 경로가 막혀 있습니다. 실행 취소로 되돌려보세요!');
    }
  }, [vehicles, isWon, isAutoPlaying]);

  // Autoplay solution step-by-step
  const handleToggleAutoPlay = useCallback(() => {
    if (isAutoPlaying) {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;
      }
      setIsAutoPlaying(false);
      return;
    }

    if (isWon) return;

    // Calculate full solution from current state
    const sol = solveRushHour(vehicles, 30000);
    if (!sol.solvable || sol.solutionSteps.length === 0) {
      sound.playBump();
      alert('해결 경로를 찾을 수 없습니다.');
      return;
    }

    setIsAutoPlaying(true);
    let stepIndex = 0;
    const steps = sol.solutionSteps;

    autoPlayTimerRef.current = setInterval(() => {
      if (stepIndex >= steps.length) {
        if (autoPlayTimerRef.current) {
          clearInterval(autoPlayTimerRef.current);
          autoPlayTimerRef.current = null;
        }
        setIsAutoPlaying(false);
        return;
      }

      const step = steps[stepIndex];
      sound.playMove();

      setVehicles((curr) => {
        const next = curr.map((v) => {
          if (v.id === step.vehicleId) {
            return { ...v, row: step.toRow, col: step.toCol };
          }
          return v;
        });

        if (isLevelSolved(next)) {
          setIsWon(true);
          if (autoPlayTimerRef.current) {
            clearInterval(autoPlayTimerRef.current);
            autoPlayTimerRef.current = null;
          }
          setIsAutoPlaying(false);
          saveProgress(currentLevel.id, moves + stepIndex + 1, currentLevel.parMoves);
        }

        return next;
      });

      setMoves((prev) => prev + 1);
      stepIndex++;
    }, 450);
  }, [isAutoPlaying, isWon, vehicles, currentLevel, moves, saveProgress]);

  // Clean up autoplay timer
  useEffect(() => {
    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, []);

  // Keyboard navigation & controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in text input
      if ((e.target as HTMLElement).tagName === 'INPUT') return;

      if (e.key === 'Escape') {
        setSelectedVehicleId(null);
        setHintStep(null);
      } else if (e.key === 'u' || e.key === 'U') {
        handleUndo();
      } else if (e.key === 'r' || e.key === 'R') {
        handleReset();
      } else if (e.key === 'h' || e.key === 'H') {
        handleHint();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleReset, handleHint]);

  // Next / Prev stage navigation
  const currentIndex = levels.findIndex((l) => l.id === currentLevel.id);
  const hasPrevStage = currentIndex > 0;
  const hasNextStage = currentIndex < levels.length - 1;

  const handlePrevStage = () => {
    if (hasPrevStage) loadStage(levels[currentIndex - 1]);
  };

  const handleNextStage = () => {
    if (hasNextStage) loadStage(levels[currentIndex + 1]);
  };

  // Custom level save
  const handleSaveCustomLevel = (newLevel: Level) => {
    const updated = [...levels, newLevel];
    setLevels(updated);

    // Filter only custom levels to persist
    const customList = updated.filter((l) => l.isCustom);
    try {
      localStorage.setItem('rush_hour_custom_levels', JSON.stringify(customList));
    } catch {
      // safe fallback
    }

    loadStage(newLevel);
  };

  // Custom level delete
  const handleDeleteCustomLevel = (id: string) => {
    const updated = levels.filter((l) => l.id !== id);
    setLevels(updated);

    const customList = updated.filter((l) => l.isCustom);
    try {
      localStorage.setItem('rush_hour_custom_levels', JSON.stringify(customList));
    } catch {
      // safe fallback
    }

    if (currentLevelId === id) {
      loadStage(updated[0] || INITIAL_LEVELS[0]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Bar Contract (Wordmark - Navigation - Primary CTA) */}
      <header className="flex items-center justify-between gap-8 px-6 py-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-30">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-600 to-red-500 flex items-center justify-center text-white shadow-md shadow-rose-950/40">
            <Car className="w-4 h-4" />
          </div>
          <span className="text-base font-black tracking-tight text-white">
            러시아워 탈출 퍼즐
          </span>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-400">
          <button
            onClick={() => setShowStageSelector(true)}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            스테이지 (24단계)
          </button>
          <button
            onClick={() => setShowLevelEditor(true)}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            나만의 레벨 만들기
          </button>
          <button
            onClick={() => setShowHowToPlay(true)}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            게임 규칙
          </button>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => sound.toggleMute() && setIsMuted(sound.getMuted())}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700"
            title="사운드 켜기/끄기"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 active:bg-rose-700 rounded-xl transition-all shadow-md shadow-rose-950/40 whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>새로 시작</span>
          </button>
        </div>
      </header>

      {/* Main Game Arena */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-6 max-w-5xl mx-auto w-full gap-5">
        {/* Game HUD (Stage info, moves, timer, action buttons) */}
        <GameHUD
          currentLevel={currentLevel}
          moves={moves}
          elapsedSeconds={elapsedSeconds}
          canUndo={history.length > 0}
          isAutoPlaying={isAutoPlaying}
          isMuted={isMuted}
          onUndo={handleUndo}
          onReset={handleReset}
          onHint={handleHint}
          onToggleAutoPlay={handleToggleAutoPlay}
          onOpenStageSelector={() => setShowStageSelector(true)}
          onOpenLevelEditor={() => setShowLevelEditor(true)}
          onToggleSound={() => {
            sound.toggleMute();
            setIsMuted(sound.getMuted());
          }}
          onPrevStage={handlePrevStage}
          onNextStage={handleNextStage}
          hasPrevStage={hasPrevStage}
          hasNextStage={hasNextStage}
        />

        {/* 6x6 Rush Hour Board */}
        <GameBoard
          vehicles={vehicles}
          onVehiclesChange={handleVehiclesChange}
          selectedVehicleId={selectedVehicleId}
          onSelectVehicle={(id) => {
            setSelectedVehicleId(id);
            setHintStep(null);
          }}
          hintStep={hintStep}
          isWon={isWon}
        />

        {/* Quiet footer guide */}
        <footer className="text-center text-xs text-slate-500 pt-2 pb-4">
          <span>차량을 클릭하고 드래그하거나 방향키로 조작하세요</span>
          <span className="mx-2">·</span>
          <span>주인공 빨간 스포츠카를 우측 출구로 탈출시키면 승리!</span>
        </footer>
      </main>

      {/* Victory Celebration Modal */}
      {isWon && (
        <VictoryModal
          level={currentLevel}
          moves={moves}
          elapsedSeconds={elapsedSeconds}
          isNewRecord={isNewRecord}
          onNextStage={handleNextStage}
          onReplay={() => loadStage(currentLevel)}
          onOpenStageList={() => {
            setIsWon(false);
            setShowStageSelector(true);
          }}
          hasNextStage={hasNextStage}
        />
      )}

      {/* Stage Selector Modal */}
      {showStageSelector && (
        <StageSelectorModal
          levels={levels}
          currentLevelId={currentLevel.id}
          progress={progress}
          onSelectLevel={loadStage}
          onClose={() => setShowStageSelector(false)}
          onOpenLevelEditor={() => {
            setShowStageSelector(false);
            setShowLevelEditor(true);
          }}
          onDeleteCustomLevel={handleDeleteCustomLevel}
        />
      )}

      {/* Level Editor Modal */}
      {showLevelEditor && (
        <LevelEditorModal
          onSaveAndPlay={handleSaveCustomLevel}
          onClose={() => setShowLevelEditor(false)}
        />
      )}

      {/* Game Rules / How to play Modal */}
      {showHowToPlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-slate-900 rounded-3xl border border-slate-700/80 p-6 text-slate-200 shadow-2xl">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>러시아워 게임 규칙</span>
            </h3>

            <div className="space-y-3 mt-4 text-xs leading-relaxed text-slate-300">
              <p>
                <strong>1. 게임의 목표:</strong> 복잡하게 얽혀 있는 주차장에서 장애물 차량들을 밀고 당겨{' '}
                <span className="text-rose-400 font-bold">빨간색 주인공 스포츠카</span>를 우측{' '}
                <span className="text-emerald-400 font-bold">EXIT(출구)</span>로 탈출시키세요!
              </p>
              <p>
                <strong>2. 차량 이동 규칙:</strong>
                <br />• <strong>가로 차량:</strong> 좌우로만 미끄러지듯 이동할 수 있습니다.
                <br />• <strong>세로 차량:</strong> 상하로만 이동할 수 있습니다.
                <br />• 차를 돌리거나 다른 차량을 뛰어넘을 수 없습니다.
              </p>
              <p>
                <strong>3. 조작 방법:</strong>
                <br />• 마우스 또는 터치로 차량을 원하는 방향으로 드래그합니다.
                <br />• 차량을 클릭한 후 하단 방향 버튼이나 키보드 방향키를 눌러도 이동합니다.
              </p>
              <p>
                <strong>4. 두뇌 도우미 기능:</strong>
                <br />• <strong>힌트:</strong> 막혔을 때 최적의 다음 이동을 안내합니다.
                <br />• <strong>자동 해결:</strong> 인공지능 탐색 알고리즘이 자동으로 최단 경로 탈출을 시연합니다.
                <br />• <strong>나만의 레벨:</strong> 직접 차량을 배치하고 해결 가능성을 검증할 수 있습니다.
              </p>
            </div>

            <button
              onClick={() => setShowHowToPlay(false)}
              className="w-full mt-5 py-2.5 bg-rose-600 hover:bg-rose-500 font-bold text-xs text-white rounded-xl transition-colors"
            >
              확인하고 게임 시작
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
