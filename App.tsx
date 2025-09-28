import React, { useState, useCallback, useEffect } from 'react';
import Game from './components/Game';
import StartScreen from './components/StartScreen';
import GameOverScreen from './components/GameOverScreen';
import type { GameStatus } from './types';
import { GAME_WIDTH, GAME_HEIGHT } from './constants';

const App: React.FC = () => {
  const [gameStatus, setGameStatus] = useState<GameStatus>('start');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('highScore') || '0', 10);
  });

  const startGame = useCallback(() => {
    setScore(0);
    setGameStatus('playing');
  }, []);

  const gameOver = useCallback((finalScore: number) => {
    setScore(finalScore);
    if (finalScore > highScore) {
      setHighScore(finalScore);
      localStorage.setItem('highScore', finalScore.toString());
    }
    setGameStatus('gameOver');
  }, [highScore]);

  const renderContent = () => {
    switch (gameStatus) {
      case 'start':
        return <StartScreen onStart={startGame} highScore={highScore} />;
      case 'playing':
        return <Game onGameOver={gameOver} />;
      case 'gameOver':
        return <GameOverScreen score={score} highScore={highScore} onRestart={startGame} />;
      default:
        return <StartScreen onStart={startGame} highScore={highScore} />;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-stone-900 text-white select-none">
      <div
        className="relative bg-stone-800 overflow-hidden border-4 border-stone-600 shadow-2xl shadow-cyan-500/20"
        style={{ width: `${GAME_WIDTH}px`, height: `${GAME_HEIGHT}px` }}
      >
        <div 
          className="absolute inset-0 bg-repeat bg-center opacity-10"
          style={{ backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MiIgaGVpZ2h0PSIyNiIgdmlld0JveD0iMCAwIDUyIDI2Ij48ZyBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGlkPSJkcmF3aW5nXzEtMSIgZmlsbD0iI2ZmZmZmZiI+PHBhdGggaWQ9IlBhdGgtMSIgZD0iTTMwIDEzTDMyIDEzTDMyIDExTDMyIDEwTDMyIDlMMzAgOUwzMCAxMkwyOSA4TDI4IDhMMjcgOUwyNiAxMEwyNiAxMUwyNiAxMkwyNyAxMkwyOCAxNEwyOCAxNUwyOSAxNkwzMCAxNUwzMCAxNEwzMSAxM1pNMzIgMjVMMzEgMjVMMzAgMjZMMjkgMjZMMjggMjVMMjcgMjZMMjYgMjZMMjQgMjZMMjQgMjRMMjYgMjRMMjYgMjJMMjYgMjFMMjYgMjBMMjggMjBMMjggMjJMMjkgMjNMMzAgMjNMMzEgMjJMMzIgMjFMMzIgMjBMMzQgMjBMMzQgMjFMMzQgMjJMMzQgMjNMMzUgMjRMMzYgMjRMMzcgMjRMMzggMjRMMzkgMjRMMzkgMjVMMzggMjZMMzcgMjZMMzYgMjVMMzQgMjVMMzIgMjVaTTQxIDIwTDM5IDIwTDM5IDIxTDM5IDIyTDM5IDIzTDM5IDI0TDQxIDI0TDQxIDIyTDQyIDIxTDQzIDIxTDQ0IDIyTDQ1IDIyTDQ2IDIzTDQ3IDI0TDQ4IDI0TDQ4IDIwTDQ2IDIwTDQ2IDIxTDQ1IDIxTDQ0IDIwTDQzIDIwTDQyIDIwTDQxIDIwWk00OSA4TDQ4IDhMNDcgOUw0NiAxMEw0NiAxMUw0NiAxMkw0NyAxMkw0OCAxNEw0OCAxNUw0OSAxNkw1MCAxNUw1MCAxNEw1MSAxM0w1MiAxM0w1MiAxMUw1MiAxMEw1MiA5TDUwIDlMNTAgMTJMMzkgMTJMMzkgOEwzNyA4TDM3IDlMMzcgMTBMMzcgMTFMMzcgMTJMMzYgMTNMMzYgMTRMMzYgMTVMNTIgMTVMNTIgMTRMNTIgMTNaTTIzIDlMMjEgOUwyMSAxMkwyMCA4TDE5IDhMMTggOUwxNyAxMEwxNyAxMUwxNyAxMkwxOCAxMkwxOSAxNEwxOSAxNUwyMCAxNkwyMSAxNUwyMSAxNEwyMiAxM0wyMyAxM0wyMyAxMUwyMyAxMFoyMyA5Wk0yMyAyMEwyMSAyMEwyMSAyMkwyMCAyM0wyMCAyNEwyMSAyNUwyMiAyNkwyMyAyNkwyMyAyNFoyMyAyM1oyMyAyMVpNMTEgOEw5IDhMOSAxMkw4IDhMNyA4TDYgOUw1IDEwTDUgMTFMNSAxMkw2IDEyTDcgMTRMNyAxNUw4IDE2TDkgMTVMOSAxNEwxMCAxM0wxMSAxM0wxMSAxMUwxMSAxMFptLTkgMTdMMCAyNWwwLTMgMiAwbDAgMiAzIDAtMSAxLTIgMC0xLTJ6bTM0LTNMMzYgMjJMMzUgMjJMMzMgMjJMMzMgMjBMMzIgMjBMMzAgMjBMMzAgMjFMMzAgMjJMMzEgMjNMMzIgMjNMMzMgMjRMMzQgMjRMMzUgMjRMMzYgMjRMMzcgMjRMMzggMjRMMzggMjJMMzYgMjJaTTkgMjBMMTEgMjBMMTEgMjJMMTAgMjNMMTAgMjRMMTEgMjVMMTEgMjZMMTAgMjZMOSAyNkw4IDI1TDcgMjRMNyAyM0w4IDIyTDkgMjJaTTIgMjBMMCwyMEwwIDI0IDEgMjQgMSAyNSAyIDI1IDIgMjQgMyAyMyAzIDIyIDMgMjEgMyAyMCAyIDIwWk0yMCAyTDYgMFix')` }}
        />
        {renderContent()}
      </div>
    </div>
  );
};

export default App;