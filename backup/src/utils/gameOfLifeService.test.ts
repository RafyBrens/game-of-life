import { GameOfLifeServiceImpl } from './gameOfLifeService';

describe('GameOfLifeService', () => {
  let service: GameOfLifeServiceImpl;

  beforeEach(() => {
    service = new GameOfLifeServiceImpl();
  });

  describe('createBoard', () => {
    it('should create a board with correct dimensions', () => {
      const board = service.createBoard(5, 3);
      
      expect(board.width).toBe(5);
      expect(board.height).toBe(3);
      expect(board.cells).toHaveLength(3);
      expect(board.cells[0]).toHaveLength(5);
    });

    it('should create all cells as dead initially', () => {
      const board = service.createBoard(3, 3);
      
      board.cells.forEach(row => {
        row.forEach(cell => {
          expect(cell.alive).toBe(false);
        });
      });
    });
  });

  describe('toggleCell', () => {
    it('should toggle a cell from dead to alive', () => {
      const board = service.createBoard(3, 3);
      const newBoard = service.toggleCell(board, 1, 1);
      
      expect(newBoard.cells[1][1].alive).toBe(true);
    });

    it('should toggle a cell from alive to dead', () => {
      const board = service.createBoard(3, 3);
      const aliveBoard = service.toggleCell(board, 1, 1);
      const deadBoard = service.toggleCell(aliveBoard, 1, 1);
      
      expect(deadBoard.cells[1][1].alive).toBe(false);
    });

    it('should handle out of bounds coordinates', () => {
      const board = service.createBoard(3, 3);
      const newBoard = service.toggleCell(board, -1, -1);
      
      expect(newBoard).toBe(board);
    });
  });

  describe('nextGeneration', () => {
    it('should kill a live cell with no neighbors', () => {
      const board = service.createBoard(3, 3);
      const boardWithCell = service.toggleCell(board, 1, 1);
      const nextGen = service.nextGeneration(boardWithCell);
      
      expect(nextGen.cells[1][1].alive).toBe(false);
    });

    it('should keep a live cell with 2 neighbors alive', () => {
      let board = service.createBoard(3, 3);
      board = service.toggleCell(board, 0, 1);
      board = service.toggleCell(board, 1, 1);
      board = service.toggleCell(board, 2, 1);
      
      const nextGen = service.nextGeneration(board);
      
      expect(nextGen.cells[1][1].alive).toBe(true);
    });

    it('should bring a dead cell to life with exactly 3 neighbors', () => {
      let board = service.createBoard(3, 3);
      board = service.toggleCell(board, 0, 0);
      board = service.toggleCell(board, 0, 1);
      board = service.toggleCell(board, 1, 0);
      
      const nextGen = service.nextGeneration(board);
      
      expect(nextGen.cells[1][1].alive).toBe(true);
    });
  });

  describe('clearBoard', () => {
    it('should make all cells dead', () => {
      let board = service.createBoard(3, 3);
      board = service.toggleCell(board, 0, 0);
      board = service.toggleCell(board, 1, 1);
      board = service.toggleCell(board, 2, 2);
      
      const clearedBoard = service.clearBoard(board);
      
      clearedBoard.cells.forEach(row => {
        row.forEach(cell => {
          expect(cell.alive).toBe(false);
        });
      });
    });
  });

  describe('advanceGenerations', () => {
    it('should advance multiple generations correctly', () => {
      let board = service.createBoard(5, 5);
      board = service.toggleCell(board, 1, 2);
      board = service.toggleCell(board, 2, 2);
      board = service.toggleCell(board, 3, 2);
      
      const advanced = service.advanceGenerations(board, 2);
      const manual = service.nextGeneration(service.nextGeneration(board));
      
      expect(advanced.cells).toEqual(manual.cells);
    });
  });
}); 