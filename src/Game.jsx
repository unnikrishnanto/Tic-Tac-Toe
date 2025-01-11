import React, { useState } from 'react'
import './Game.css'

function Square({value, onSquareClick}) {
    return(
        <div
        className='square'
        onClick={()=>onSquareClick(value)}
        >{value}</div>
    )
}

function Board({squares, isXNext, onplay}) {

    const handleClick = (i) => {
        const nextSquare = squares.slice();

        if(calculateWinner(squares) || squares[i]){
            return;
        }
        if(isXNext){
            nextSquare[i] = 'X';
        } else {
            nextSquare[i] = 'O';                
        }

        onplay(nextSquare);
    } 
    
    const winner = calculateWinner(squares);
    let status;
    if(winner){
        status = "Winner is " + winner;
    } else {
        status = "Next move: " +( isXNext ? "X": "O");
    }

    return(
        <>
            <div className='status'>{status}</div>
            <div className='game-box'>
                <div className='box-row' >
                    <Square  value={squares[0]} onSquareClick= {()=>handleClick(0)}  />
                    <Square  value={squares[1]} onSquareClick= {()=>handleClick(1)}  />
                    <Square  value={squares[2]} onSquareClick= {()=>handleClick(2)}  />    
                </div>
                <div className='box-row' >
                    <Square  value={squares[3]} onSquareClick= {()=>handleClick(3)}  />
                    <Square  value={squares[4]} onSquareClick= {()=>handleClick(4)}  />
                    <Square  value={squares[5]} onSquareClick= {()=>handleClick(5)}  />    
                </div>
                <div className='box-row' >
                    <Square  value={squares[6]} onSquareClick= {()=>handleClick(6)}  />
                    <Square  value={squares[7]} onSquareClick= {()=>handleClick(7)}  />
                    <Square  value={squares[8]} onSquareClick= {()=>handleClick(8)}  />    
                </div>
            </div>
        </>
            )
}




export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const isXNext = currentMove %2 === 0;
    const currentState = history[currentMove];

    const handlePlay = (newSquares) => {
        const newHistory = [...history.slice(0, currentMove+1), newSquares]
        setHistory(newHistory);
        setCurrentMove(newHistory.length-1);
    }

    function goto(move){
        setCurrentMove(move);
    }

    const moves = history.map((sq, move) => { 
        let description;
        if(move > 0) {
            description = "Go to move #" + move;
        } else {
            description = "Go to game start";
        }

        return (
        <li key={move} >
            <button onClick={()=> goto(move)}>{description}</button> 
        </li>
        )
    })

    return (
        <>
            <div>
                <Board squares={currentState} isXNext={isXNext}  onplay={handlePlay} />
            </div>
            
            <div className='history'>
                <ol start={0}>
                    {moves}
                </ol>
            </div>
        </>
    )

}
    function calculateWinner(squares){
        const line =[
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 3, 6]
        ]
        for(let i = 0; i < line.length; i++){
            const [a, b, c] = line[i];
            if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

