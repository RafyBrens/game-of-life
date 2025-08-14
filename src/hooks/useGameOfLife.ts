import { useState, useCallback, useEffect, useRef } from 'react';
import { GameState, Board } from '../types';
import { gameOfLifeService } from '../utils/gameOfLifeService';

const DEFAULT_BOARD_SIZE = { width: 40, height: 30 };
const DEFAULT_SPEED = 200;

export const useGameOfLife = () => {
  const [gameState, setGameState] = useState<GameState>(() => ({
    board: gameOfLifeService.createBoard(DEFAULT_BOARD_SIZE.width, DEFAULT_BOARD_SIZE.height),
    generation: 0,
    isPlaying: false,
    speed: DEFAULT_SPEED
  }));

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const toggleCell = useCallback((x: number, y: number) => {
    setGameState(prev => ({
      ...prev,
      board: gameOfLifeService.toggleCell(prev.board, x, y)
    }));
  }, []);

  const nextGeneration = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      board: gameOfLifeService.nextGeneration(prev.board),
      generation: prev.generation + 1
    }));
  }, []);

  const advanceGenerations = useCallback((steps: number) => {
    if (steps <= 0) return;
    
    setGameState(prev => ({
      ...prev,
      board: gameOfLifeService.advanceGenerations(prev.board, steps),
      generation: prev.generation + steps
    }));
  }, []);

  const play = useCallback(() => {
    if (gameState.isPlaying) return;
    
    setGameState(prev => ({ ...prev, isPlaying: true }));
  }, [gameState.isPlaying]);

  const pause = useCallback(() => {
    setGameState(prev => ({ ...prev, isPlaying: false }));
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    pause();
    setGameState(prev => ({
      ...prev,
      board: gameOfLifeService.clearBoard(prev.board),
      generation: 0
    }));
  }, [pause]);

  const randomize = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      board: gameOfLifeService.randomizeBoard(prev.board),
      generation: 0
    }));
  }, []);

  const setSpeed = useCallback((speed: number) => {
    setGameState(prev => ({ ...prev, speed }));
  }, []);

  const resizeBoard = useCallback((width: number, height: number) => {
    pause();
    setGameState(prev => ({
      ...prev,
      board: gameOfLifeService.createBoard(width, height),
      generation: 0
    }));
  }, [pause]);

  useEffect(() => {
    if (gameState.isPlaying) {
      intervalRef.current = setInterval(() => {
        nextGeneration();
      }, gameState.speed);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [gameState.isPlaying, gameState.speed, nextGeneration]);

  return {
    gameState,
    actions: {
      toggleCell,
      nextGeneration,
      advanceGenerations,
      play,
      pause,
      reset,
      randomize,
      setSpeed,
      resizeBoard
    }
  };
}; 