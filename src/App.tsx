import React from 'react';
import { GameBoard } from './components/GameBoard';
import { GameControls } from './components/GameControls';
import { useGameOfLife } from './hooks/useGameOfLife';
import './App.css';

function App() {
  const { gameState, actions } = useGameOfLife();

  return (
    <div className="App">
      <header className="app-header">
        <h1>Conway's Game of Life</h1>
        <p>Click cells to toggle them, then press play to watch evolution</p>
      </header>
      <main className="app-main">
        <div className="container">
          <GameControls
            isPlaying={gameState.isPlaying}
            generation={gameState.generation}
            speed={gameState.speed}
            onPlay={actions.play}
            onPause={actions.pause}
            onNextGeneration={actions.nextGeneration}
            onAdvanceGenerations={actions.advanceGenerations}
            onReset={actions.reset}
            onRandomize={actions.randomize}
            onSpeedChange={actions.setSpeed}
          />
          
          <GameBoard
            board={gameState.board}
            onCellClick={actions.toggleCell}
            isPlaying={gameState.isPlaying}
          />
          
          <div className="instructions">
            <h3>Instructions:</h3>
            <ul>
              <li><strong>Click cells</strong> to turn them on/off (only when paused)</li>
              <li><strong>Play/Pause</strong> to start/stop the simulation</li>
              <li><strong>Next Step</strong> to advance one generation manually</li>
              <li><strong>Advance Steps</strong> to jump forward multiple generations</li>
              <li><strong>Speed slider</strong> to control simulation speed</li>
              <li><strong>Randomize</strong> to create a random starting pattern</li>
              <li><strong>Clear</strong> to reset the board</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
