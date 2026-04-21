import React from 'react';
import { Board } from '../types';
import './GameBoard.css';

interface GameBoardProps {
  board: Board;
  onCellClick: (x: number, y: number) => void;
  isPlaying: boolean;
}

export const GameBoard: React.FC<GameBoardProps> = ({ board, onCellClick, isPlaying }) => {
  return (
    <div className="game-board-container">
      <div 
        className="game-board"
        style={{
          gridTemplateColumns: `repeat(${board.width}, 1fr)`,
          gridTemplateRows: `repeat(${board.height}, 1fr)`
        }}
      >
        {board.cells.flat().map((cell) => (
          <div
            key={`${cell.x}-${cell.y}`}
            className={`cell ${cell.alive ? 'alive' : 'dead'} ${isPlaying ? 'playing' : ''}`}
            onClick={() => !isPlaying && onCellClick(cell.x, cell.y)}
            style={{
              cursor: isPlaying ? 'default' : 'pointer'
            }}
          />
        ))}
      </div>
    </div>
  );
}; 