import {
    SET_GAME_KEY,
    JOIN_ROOM,
    JOIN_ROOM_ERROR,
    CLEAR_JOIN_ERROR,
    JOIN,
    LEAVE,
    CLEAR_GAME_JOIN_STATUS,
    START,
    INIT_BOARD,
    MOVE,
    WON,
    CHANGE_TURN,
    RESET_WON,
} from "../Actions/types";

const initState = {
    gameKey: null,
    loading: true,
    error: "",
    gameStatus: {
        joinStatus: [],
        players: 0,
        gameStarted: false,
        turn: 1,
    },
    wonStatus: {
        won: false,
        player: 0,
    },
    gameSettings: {
        rows: 6,
        cols: 7,
    },
    board: [],
};

const gameData = (state = initState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_GAME_KEY:
            return {
                ...state,
                gameKey: payload,
                loading: false,
            };
        case JOIN_ROOM:
            return {
                ...state,
                gameKey: payload,
                loading: false,
            };
        case JOIN_ROOM_ERROR:
            return {
                ...state,
                error: payload.errorMessage,
                loading: false,
            };

        case CLEAR_JOIN_ERROR:
            return {
                ...state,
                error: "",
                loading: true,
            };
        case JOIN:
            return {
                ...state,
                gameStatus: {
                    ...state.gameStatus,
                    players: state.gameStatus.players + 1,
                    joinStatus: [...state.gameStatus.joinStatus, payload],
                },
            };
        case LEAVE:
            return {
                ...state,
                gameStatus: {
                    ...state.gameStatus,
                    players: state.gameStatus.players - 1,
                    joinStatus: [...state.gameStatus.joinStatus, payload],
                },
            };
        case START:
            return {
                ...state,
                gameStatus: {
                    ...state.gameStatus,
                    gameStarted: true,
                },
            };
        case INIT_BOARD:
            return {
                ...state,
                board: payload,
            };
        case MOVE:
            return {
                ...state,
                board: payload,
            };
        case WON:
            return {
                ...state,
                wonStatus: {
                    won: true,
                    player: payload,
                },
            };
        case RESET_WON:
            return {
                ...state,
                wonStatus: {
                    won: payload,
                    player: 0,
                },
            };
        case CHANGE_TURN: {
            return {
                ...state,
                gameStatus: {
                    ...state.gameStatus,
                    turn: payload,
                },
            };
        }
        case CLEAR_GAME_JOIN_STATUS:
            return {
                ...state,
                gameStatus: {
                    ...state.gameStatus,
                    players: state.gameStatus.players - 1,
                    joinStatus: [],
                },
            };
        default:
            return state;
    }
};

export default gameData;
