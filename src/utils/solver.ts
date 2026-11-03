/**
 * Rush Hour Exact BFS Solver & Collision Logic
 * Uses Breadth-First Search to find the mathematically optimal solution.
 */

import { Vehicle, MoveStep, SolverResult } from '../types/game';

export const BOARD_SIZE = 6;
export const EXIT_ROW = 2;
export const EXIT_COL = 5; // Exit gate is at row 2, col 5

/**
 * Builds a 6x6 occupancy matrix with vehicle IDs
 */
export function buildGrid(vehicles: Vehicle[]): (string | null)[][] {
  const grid: (string | null)[][] = Array.from({ length: BOARD_SIZE }, () =>
    Array(BOARD_SIZE).fill(null)
  );

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

/**
 * Calculates the legal minimum and maximum coordinate (col or row)
 * that a vehicle can slide to from its current position without colliding.
 */
export function getValidRange(
  target: Vehicle,
  vehicles: Vehicle[]
): { min: number; max: number } {
  const grid = buildGrid(vehicles.filter((v) => v.id !== target.id));

  if (target.orientation === 'H') {
    const row = target.row;
    let minCol = target.col;
    let maxCol = target.col;

    // Scan left
    while (minCol > 0 && grid[row][minCol - 1] === null) {
      minCol--;
    }

    // Scan right
    while (
      maxCol + target.length < BOARD_SIZE &&
      grid[row][maxCol + target.length] === null
    ) {
      maxCol++;
    }

    return { min: minCol, max: maxCol };
  } else {
    const col = target.col;
    let minRow = target.row;
    let maxRow = target.row;

    // Scan up
    while (minRow > 0 && grid[minRow - 1][col] === null) {
      minRow--;
    }

    // Scan down
    while (
      maxRow + target.length < BOARD_SIZE &&
      grid[maxRow + target.length][col] === null
    ) {
      maxRow++;
    }

    return { min: minRow, max: maxRow };
  }
}

/**
 * Checks if the target red car has reached the exit or has a completely clear path to the exit.
 */
export function isLevelSolved(vehicles: Vehicle[]): boolean {
  const redCar = vehicles.find((v) => v.id === 'red');
  if (!redCar) return false;

  // Red car must be on EXIT_ROW and horizontal
  if (redCar.row !== EXIT_ROW || redCar.orientation !== 'H') return false;

  // When red car reaches col 4, it occupies columns 4 and 5 (right edge)
  if (redCar.col >= 4) return true;

  return false;
}

/**
 * Fast string serialization for a state in BFS
 */
function serializeState(vehicles: Vehicle[]): string {
  // Sort vehicle IDs deterministically so identical configurations hash identically
  const sorted = [...vehicles].sort((a, b) => a.id.localeCompare(b.id));
  return sorted.map((v) => `${v.id}:${v.row}:${v.col}`).join('|');
}

/**
 * Clones a vehicles array with one vehicle updated
 */
function cloneWithMove(
  vehicles: Vehicle[],
  vehicleId: string,
  newRow: number,
  newCol: number
): Vehicle[] {
  return vehicles.map((v) =>
    v.id === vehicleId ? { ...v, row: newRow, col: newCol } : v
  );
}

interface BFSNode {
  vehicles: Vehicle[];
  path: MoveStep[];
}

/**
 * Solves the Rush Hour puzzle using Breadth-First Search (BFS).
 * Guaranteed to find the minimal number of moves.
 */
export function solveRushHour(
  initialVehicles: Vehicle[],
  maxVisited = 40000
): SolverResult {
  const redCar = initialVehicles.find((v) => v.id === 'red');
  if (!redCar) {
    return {
      solvable: false,
      minMoves: 0,
      solutionSteps: [],
      visitedNodesCount: 0,
    };
  }

  // Already solved?
  if (isLevelSolved(initialVehicles)) {
    return {
      solvable: true,
      minMoves: 0,
      solutionSteps: [],
      visitedNodesCount: 1,
    };
  }

  const queue: BFSNode[] = [{ vehicles: initialVehicles, path: [] }];
  const visited = new Set<string>();
  visited.add(serializeState(initialVehicles));

  let visitedCount = 0;

  while (queue.length > 0) {
    const current = queue.shift()!;
    visitedCount++;

    if (visitedCount > maxVisited) {
      break;
    }

    const { vehicles, path } = current;

    // Explore moves for each vehicle
    for (const v of vehicles) {
      const range = getValidRange(v, vehicles);

      if (v.orientation === 'H') {
        // Move left
        for (let newCol = v.col - 1; newCol >= range.min; newCol--) {
          const nextVehicles = cloneWithMove(vehicles, v.id, v.row, newCol);
          const stateKey = serializeState(nextVehicles);
          if (!visited.has(stateKey)) {
            visited.add(stateKey);
            const step: MoveStep = {
              vehicleId: v.id,
              fromRow: v.row,
              fromCol: v.col,
              toRow: v.row,
              toCol: newCol,
              direction: 'LEFT',
              steps: v.col - newCol,
            };
            const nextPath = [...path, step];

            if (isLevelSolved(nextVehicles)) {
              return {
                solvable: true,
                minMoves: nextPath.length,
                solutionSteps: nextPath,
                visitedNodesCount: visitedCount,
              };
            }

            queue.push({ vehicles: nextVehicles, path: nextPath });
          }
        }

        // Move right
        for (let newCol = v.col + 1; newCol <= range.max; newCol++) {
          const nextVehicles = cloneWithMove(vehicles, v.id, v.row, newCol);
          const stateKey = serializeState(nextVehicles);
          if (!visited.has(stateKey)) {
            visited.add(stateKey);
            const step: MoveStep = {
              vehicleId: v.id,
              fromRow: v.row,
              fromCol: v.col,
              toRow: v.row,
              toCol: newCol,
              direction: 'RIGHT',
              steps: newCol - v.col,
            };
            const nextPath = [...path, step];

            if (isLevelSolved(nextVehicles)) {
              return {
                solvable: true,
                minMoves: nextPath.length,
                solutionSteps: nextPath,
                visitedNodesCount: visitedCount,
              };
            }

            queue.push({ vehicles: nextVehicles, path: nextPath });
          }
        }
      } else {
        // Vertical moves: Up
        for (let newRow = v.row - 1; newRow >= range.min; newRow--) {
          const nextVehicles = cloneWithMove(vehicles, v.id, newRow, v.col);
          const stateKey = serializeState(nextVehicles);
          if (!visited.has(stateKey)) {
            visited.add(stateKey);
            const step: MoveStep = {
              vehicleId: v.id,
              fromRow: v.row,
              fromCol: v.col,
              toRow: newRow,
              toCol: v.col,
              direction: 'UP',
              steps: v.row - newRow,
            };
            const nextPath = [...path, step];

            if (isLevelSolved(nextVehicles)) {
              return {
                solvable: true,
                minMoves: nextPath.length,
                solutionSteps: nextPath,
                visitedNodesCount: visitedCount,
              };
            }

            queue.push({ vehicles: nextVehicles, path: nextPath });
          }
        }

        // Vertical moves: Down
        for (let newRow = v.row + 1; newRow <= range.max; newRow++) {
          const nextVehicles = cloneWithMove(vehicles, v.id, newRow, v.col);
          const stateKey = serializeState(nextVehicles);
          if (!visited.has(stateKey)) {
            visited.add(stateKey);
            const step: MoveStep = {
              vehicleId: v.id,
              fromRow: v.row,
              fromCol: v.col,
              toRow: newRow,
              toCol: v.col,
              direction: 'DOWN',
              steps: newRow - v.row,
            };
            const nextPath = [...path, step];

            if (isLevelSolved(nextVehicles)) {
              return {
                solvable: true,
                minMoves: nextPath.length,
                solutionSteps: nextPath,
                visitedNodesCount: visitedCount,
              };
            }

            queue.push({ vehicles: nextVehicles, path: nextPath });
          }
        }
      }
    }
  }

  return {
    solvable: false,
    minMoves: 0,
    solutionSteps: [],
    visitedNodesCount: visitedCount,
  };
}
