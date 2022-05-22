import {
    MOVE_DIRECTIONS,
    SIZE,
    NUM_TILES,
    EMPTY_INDEX,
    SHUFFLE_MOVES_RANGE,
} from '../config/consts'
import { rand } from '../Helpers/rand'

/**
 * Singleton class of the Game
 * @return getState() => board, moves, solved
 */
export class GameState {
    static getNewBoard() {
        return Array(NUM_TILES)
            .fill(0)
            .map((x, index) => [Math.floor(index / SIZE), index % SIZE])
    }

    static solvedBoard = GameState.getNewBoard()
    static instance = null

    static getInstance() {
        if (!GameState.instance) GameState.instance = new GameState()
        return GameState.instance
    }

    constructor() {
        this.startNewGame()
    }

    isSolved() {
        for (let i = 0; i < NUM_TILES; i++) {
            if (
                this.board[i][0] !== GameState.solvedBoard[i][0] ||
                this.board[i][1] !== GameState.solvedBoard[i][1]
            )
                return false
        }
        return true
    }

    startNewGame() {
        this.moves = 0
        this.board = GameState.getNewBoard()
        this.stack = []
        this.shuffle()
    }

    shuffle() {
        this.shuffling = true
        let shuffleMoves = rand(...SHUFFLE_MOVES_RANGE)
        while (shuffleMoves-- > 0) {
            this.moveInDirection(MOVE_DIRECTIONS[rand(0, 3)])
        }
        this.shuffling = false
    }

    canMoveTile(index) {
        if (index < 0 || index >= NUM_TILES) return false

        const tilePos = this.board[index]
        const emptyPos = this.board[EMPTY_INDEX]
        if (tilePos[0] === emptyPos[0]) return Math.abs(tilePos[1] - emptyPos[1]) === 1
        else if (tilePos[1] === emptyPos[1]) return Math.abs(tilePos[0] - emptyPos[0]) === 1
        else return false
    }

    moveTile(index) {
        if (!this.shuffling && this.isSolved()) return false
        if (!this.canMoveTile(index)) return false

        const emptyPosition = [...this.board[EMPTY_INDEX]]
        const tilePosition = [...this.board[index]]

        let boardAfterMove = [...this.board]
        boardAfterMove[EMPTY_INDEX] = tilePosition
        boardAfterMove[index] = emptyPosition

        if (!this.shuffling) this.stack.push(this.board)
        this.board = boardAfterMove
        if (!this.shuffling) this.moves += 1

        return true
    }

    undo() {
        if (this.stack.length === 0) return false
        this.board = this.stack.pop()
        this.moves -= 1
    }

    moveInDirection(dir) {
        const epos = this.board[EMPTY_INDEX]
        const posToMove =
            dir === 'up'
                ? [epos[0] + 1, epos[1]]
                : dir === 'down'
                ? [epos[0] - 1, epos[1]]
                : dir === 'left'
                ? [epos[0], epos[1] + 1]
                : dir === 'right'
                ? [epos[0], epos[1] - 1]
                : epos
        let tileToMove = EMPTY_INDEX
        for (let i = 0; i < NUM_TILES; i++) {
            if (this.board[i][0] === posToMove[0] && this.board[i][1] === posToMove[1]) {
                tileToMove = i
                break
            }
        }
        this.moveTile(tileToMove)
    }

    checkTileRight(i) {
        return this.board[i][0] === GameState.solvedBoard[i][0] &&
            this.board[i][1] === GameState.solvedBoard[i][1]
            ? true
            : false
    }

    getState() {
        const self = this
        return {
            board: self.board,
            moves: self.moves,
            solved: self.isSolved(),
        }
    }
}
