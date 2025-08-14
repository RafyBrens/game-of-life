export interface Cell {
  alive: boolean;
  x: number;
  y: number;
}

export interface Board {
  cells: Cell[][];
  width: number;
  height: number;
}

export interface GameState {
  board: Board;
  generation: number;
  isPlaying: boolean;
  speed: number;
}

export interface GameOfLifeService {
  createBoard(width: number, height: number): Board;
  toggleCell(board: Board, x: number, y: number): Board;
  nextGeneration(board: Board): Board;
  clearBoard(board: Board): Board;
  randomizeBoard(board: Board): Board;
} 