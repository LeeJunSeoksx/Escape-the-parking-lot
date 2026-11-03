/**
 * Rush Hour Game Types
 */

export type Orientation = 'H' | 'V';

export type VehicleColor = 
  | 'red'
  | 'yellow'
  | 'blue'
  | 'green'
  | 'purple'
  | 'orange'
  | 'cyan'
  | 'pink'
  | 'lime'
  | 'indigo'
  | 'amber'
  | 'teal'
  | 'police'
  | 'silver';

export interface Vehicle {
  id: string; // 'red' is the target exit vehicle
  row: number; // 0 to 5
  col: number; // 0 to 5
  length: 2 | 3; // 2 = car, 3 = truck
  orientation: Orientation; // 'H' = horizontal, 'V' = vertical
  color: VehicleColor;
  label?: string; // Optional Korean name or mark
}

export type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'custom';

export interface Level {
  id: string;
  stageNumber: number;
  title: string;
  difficulty: Difficulty;
  parMoves: number; // Minimum optimal moves to escape
  vehicles: Vehicle[];
  description?: string;
  isCustom?: boolean;
}

export interface MoveStep {
  vehicleId: string;
  fromRow: number;
  fromCol: number;
  toRow: number;
  toCol: number;
  direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
  steps: number;
}

export interface SolverResult {
  solvable: boolean;
  minMoves: number;
  solutionSteps: MoveStep[];
  visitedNodesCount: number;
}

export interface LevelProgress {
  completed: boolean;
  bestMoves: number;
  stars: number; // 1, 2, or 3 stars
}
