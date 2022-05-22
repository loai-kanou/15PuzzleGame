import { useState, useEffect } from 'react'

import { GameState } from '../GameLogic/GameState'

const useGameState = () => {
    const gameState = GameState.getInstance()

    const [state, setState] = useState(gameState.getState())

    const newGame = () => {
        gameState.startNewGame()
        setState(gameState.getState())
    }

    const move = (i) => {
        return function () {
            gameState.moveTile(i)
            setState(gameState.getState())
        }
    }

    const isTileRight = (i) => gameState.checkTileRight(i)

    useEffect(() => {
        function listeners(e) {
            if (e.key === 'ArrowLeft') gameState.moveInDirection('left')
            else if (e.key === 'ArrowUp') gameState.moveInDirection('up')
            else if (e.key === 'ArrowRight') gameState.moveInDirection('right')
            else if (e.key === 'ArrowDown') gameState.moveInDirection('down')

            setState(gameState.getState())
        }
        document.addEventListener('keyup', listeners)

        return () => document.removeEventListener('keyup', listeners)
    }, [gameState])

    return [state.board, state.moves, state.solved, isTileRight, newGame, move]
}

export { useGameState }
