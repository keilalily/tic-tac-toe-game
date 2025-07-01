"use client";
import Square from './Square';
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from './ui/button';
import { calculateWinner } from '../utils/gameLogic';

export default function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [score, setScore] = useState({ X: 0, O: 0, Draw: 0 });
    const [gameEnded, setGameEnded] = useState(false);

    const winner = calculateWinner(squares);
    const isDraw = !winner && squares.every(Boolean);

    useEffect(() => {
        if (winner && !gameEnded) {
            setScore(prev => ({ ...prev, [winner]: prev[winner] + 1 }));
            setGameEnded(true);
        } else if (isDraw && !gameEnded) {
            setScore(prev => ({ ...prev, Draw: prev.Draw + 1 }));
            setGameEnded(true);
        }
    }, [winner, isDraw, gameEnded]);

    function handleClick(i) {
        if (squares[i] || winner || isDraw) return;

        const nextSquares = squares.slice();
        nextSquares[i] = isXNext ? 'X' : 'O';
        setSquares(nextSquares);
        setIsXNext(!isXNext);
    }

    function resetBoard() {
        setSquares(Array(9).fill(null));
        setIsXNext(Math.random() < 0.5); // Random first player
        setGameEnded(false);
    }

    function resetAll() {
        resetBoard();
        setScore({ X: 0, O: 0, Draw: 0 });
    }

    function renderSquare(i) {
        return <Square value={squares[i]} onClick={() => handleClick(i)} />;
    }

    const status = winner
        ? `🏆 Winner: ${winner}`
        : isDraw
        ? "🤝 It's a draw!"
        : `Next Player: ${isXNext ? "X" : "O"}`;

    const textColor = winner
        ? winner === "X"
            ? "text-red-500"
            : "text-blue-500"
        : isDraw
        ? "text-gray-500"
        : isXNext
        ? "text-red-500"
        : "text-blue-500";

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="flex flex-col items-center justify-center w-full mx-auto p-4 md:p-6">
                {/* Game status in mobile - hidden in tablet and desktop */}
                <h2 className={`flex md:hidden text-xl text-center font-bold ${textColor}`}>{status}</h2>
                {/* Game board */}
                <CardContent className="grid grid-cols-3 gap-2 p-0">
                    {squares.map((_, i) => (
                        <div key={i}>{renderSquare(i)}</div>
                    ))}
                </CardContent>
            </Card>
            <div className='grid grid-cols-1 gap-4'>
                <Card className="hidden md:flex w-full mx-auto p-4">
                    {/* Game status */}
                    <h2 className={`text-xl text-center font-bold ${textColor}`}>{status}</h2>
                </Card>
                <Card className="w-full mx-auto p-6 space-y-2">
                    {/* Scoreboard */}
                    <div className="text-center space-y-4">
                        <h2 className="text-xl font-bold">Scoreboard</h2>
                        <div className="flex justify-center gap-2 text-sm md:text-base">
                            <div className='flex flex-col w-1/3 border border-gray-300 p-2 rounded-lg text-red-500'>
                                X
                                <span className='text-lg md:text-2xl font-bold'>{score.X}</span>
                            </div>
                            <div className='flex flex-col w-1/3 border border-gray-300 p-2 rounded-lg'>
                                Draw
                                <span className='text-lg md:text-2xl font-bold'>{score.Draw}</span>
                            </div>
                            <div className='flex flex-col w-1/3 border border-gray-300 p-2 rounded-lg text-blue-500'>
                                O
                                <span className='text-lg md:text-2xl font-bold'>{score.O}</span>
                            </div>
                        </div>
                    </div>
                    {/* Reset button */}
                    <div className="text-center space-x-2">
                        <Button onClick={resetBoard} className='bg-gray-400 hover:bg-gray-400/80 hover:cursor-pointer'>
                            Reset Board
                        </Button>
                        <Button onClick={resetAll} variant="destructive" className='hover:cursor-pointer'>
                            Reset All
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
