import { Tile } from '../Tile/Tile'
import { RestartBtn } from '../RestartBtn'
import { useGameState } from '../../Hooks/useGameState'

import './App.css'

const App = () => {
    const [board, moves, solved, isTileRight, newGame, move] = useGameState()

    return (
        <div className='game-container'>
            <div className='game-header'>
                <h1>15 puzzle game</h1>
                <div className='point-container'>
                    <div className='moves'>
                        <div>Сделано ходов:</div>
                        {moves}
                    </div>
                    <div className='moves'>
                        <div>Ваш счёт:</div>
                        {500 - moves}
                    </div>
                </div>
            </div>
            <div
                className='board'
                style={{
                    width: `${Math.sqrt(board.length) * 90}px`,
                    height: `${Math.sqrt(board.length) * 90}px`,
                }}>
                {board.slice(0, -1).map((pos, index) => (
                    <Tile
                        index={index}
                        key={pos}
                        pos={pos}
                        onClick={move(index)}
                        isRight={isTileRight(index)}
                        gap={Math.sqrt(board.length) + 10}
                    />
                ))}
                {solved && (
                    <div
                        className='overlay'
                        style={{
                            width: `${Math.sqrt(board.length) * 90}px`,
                            height: `${Math.sqrt(board.length) * 90}px`,
                        }}>
                        <RestartBtn onClick={newGame} />    
                    </div>
                )}
            </div>
            <RestartBtn onClick={newGame} />
        </div>
    )
}

export default App
