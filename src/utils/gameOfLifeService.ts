import { Board, Cell, GameOfLifeService } from '../types';

export class GameOfLifeServiceImpl implements GameOfLifeService {
  createBoard(width: number, height: number): Board {
    const cells: Cell[][] = [];
    
    for (let y = 0; y < height; y++) {
      cells[y] = [];
      for (let x = 0; x < width; x++) {
        cells[y][x] = {
          alive: false,
          x,
          y
        };
      }
    }
    
    return {
      cells,
      width,
      height
    };
  }

  toggleCell(board: Board, x: number, y: number): Board {
    if (x < 0 || x >= board.width || y < 0 || y >= board.height) {
      return board;
    }

    const newCells = board.cells.map(row => 
      row.map(cell => ({ ...cell }))
    );
    
    newCells[y][x].alive = !newCells[y][x].alive;
    
    return {
      ...board,
      cells: newCells
    };
  }

  nextGeneration(board: Board): Board {
    const newCells = board.cells.map(row => 
      row.map(cell => ({ ...cell }))
    );

    for (let y = 0; y < board.height; y++) {
      for (let x = 0; x < board.width; x++) {
        const neighbors = this.countNeighbors(board, x, y);
        const currentCell = board.cells[y][x];
        
        if (currentCell.alive) {
          newCells[y][x].alive = neighbors === 2 || neighbors === 3;
        } else {
          newCells[y][x].alive = neighbors === 3;
        }
      }
    }

    return {
      ...board,
      cells: newCells
    };
  }

  clearBoard(board: Board): Board {
    const newCells = board.cells.map(row =>
      row.map(cell => ({
        ...cell,
        alive: false
      }))
    );

    return {
      ...board,
      cells: newCells
    };
  }

  randomizeBoard(board: Board): Board {
    const newCells = board.cells.map(row =>
      row.map(cell => ({
        ...cell,
        alive: Math.random() > 0.7
      }))
    );

    return {
      ...board,
      cells: newCells
    };
  }

  private countNeighbors(board: Board, x: number, y: number): number {
    let count = 0;
    
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        
        const newX = x + dx;
        const newY = y + dy;
        
        if (newX >= 0 && newX < board.width && 
            newY >= 0 && newY < board.height &&
            board.cells[newY][newX].alive) {
          count++;
        }
      }
    }
    
    return count;
  }

  advanceGenerations(board: Board, steps: number): Board {
    let currentBoard = board;
    
    for (let i = 0; i < steps; i++) {
      currentBoard = this.nextGeneration(currentBoard);
    }
    
    return currentBoard;
  }
}

export const gameOfLifeService = new GameOfLifeServiceImpl(); 