import React, { useState } from 'react';
import './GameControls.css';

interface GameControlsProps {
  isPlaying: boolean;
  generation: number;
  speed: number;
  onPlay: () => void;
  onPause: () => void;
  onNextGeneration: () => void;
  onAdvanceGenerations: (steps: number) => void;
  onReset: () => void;
  onRandomize: () => void;
  onSpeedChange: (speed: number) => void;
}

export const GameControls: React.FC<GameControlsProps> = ({
  isPlaying,
  generation,
  speed,
  onPlay,
  onPause,
  onNextGeneration,
  onAdvanceGenerations,
  onReset,
  onRandomize,
  onSpeedChange
}) => {
  const [stepsInput, setStepsInput] = useState('10');

  const handleAdvanceSteps = () => {
    const steps = parseInt(stepsInput, 10);
    if (steps > 0 && steps <= 1000) {
      onAdvanceGenerations(steps);
    }
  };

  const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSpeed = parseInt(event.target.value, 10);
    onSpeedChange(newSpeed);
  };

  return (
    <div className="game-controls">
      <div className="controls-section">
        <h3>Generation: {generation}</h3>
        <div className="control-group">
          <button
            className={`btn ${isPlaying ? 'btn-secondary' : 'btn-primary'}`}
            onClick={isPlaying ? onPause : onPlay}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          
          <button
            className="btn btn-secondary"
            onClick={onNextGeneration}
            disabled={isPlaying}
          >
            Next Step
          </button>
        </div>
      </div>

      <div className="controls-section">
        <div className="control-group">
          <label htmlFor="steps-input">Advance Steps:</label>
          <div className="input-group">
            <input
              id="steps-input"
              type="number"
              min="1"
              max="1000"
              value={stepsInput}
              onChange={(e) => setStepsInput(e.target.value)}
              className="form-control steps-input"
              disabled={isPlaying}
            />
            <button
              className="btn btn-secondary"
              onClick={handleAdvanceSteps}
              disabled={isPlaying || !stepsInput || parseInt(stepsInput, 10) <= 0}
            >
              Advance
            </button>
          </div>
        </div>
      </div>

      <div className="controls-section">
        <div className="control-group">
          <label htmlFor="speed-slider">Speed: {speed}ms</label>
          <input
            id="speed-slider"
            type="range"
            min="50"
            max="1000"
            step="50"
            value={speed}
            onChange={handleSpeedChange}
            className="speed-slider"
          />
        </div>
      </div>

      <div className="controls-section">
        <div className="control-group">
          <button
            className="btn btn-warning"
            onClick={onRandomize}
            disabled={isPlaying}
          >
            Randomize
          </button>
          
          <button
            className="btn btn-danger"
            onClick={onReset}
            disabled={isPlaying}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}; 