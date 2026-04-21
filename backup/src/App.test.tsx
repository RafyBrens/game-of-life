import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders Conway\'s Game of Life title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Conway's Game of Life/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders game controls', () => {
  render(<App />);
  const playButton = screen.getByRole('button', { name: /^Play$/i });
  const nextStepButton = screen.getByRole('button', { name: /^Next Step$/i });
  const clearButton = screen.getByRole('button', { name: /^Clear$/i });
  
  expect(playButton).toBeInTheDocument();
  expect(nextStepButton).toBeInTheDocument();
  expect(clearButton).toBeInTheDocument();
});

test('renders generation counter', () => {
  render(<App />);
  const generationText = screen.getByText(/Generation: 0/i);
  expect(generationText).toBeInTheDocument();
});

test('can advance to next generation', () => {
  render(<App />);
  const nextStepButton = screen.getByRole('button', { name: /^Next Step$/i });
  
  fireEvent.click(nextStepButton);
  
  const generationText = screen.getByText(/Generation: 1/i);
  expect(generationText).toBeInTheDocument();
});
