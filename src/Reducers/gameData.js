import {
    GENERATE_KEY,
    JOIN_ROOM,
    JOIN_ROOM_ERROR,
    CLEAR_JOIN_ERROR,
} from "../Actions/types";

const initState = {
    gameKey: null,
    loading: true,
    error: "",
    joinStatus: [],
    leaveStatus: [],
};

const gameData = (state = initState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GENERATE_KEY:
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
        case "JOIN":
            return {
                ...state,
                joinStatus: [...state.joinStatus, payload],
            };
        case "LEAVE":
            return {
                ...state,
                joinStatus: state.joinStatus.filter((item) => item !== payload),
                leaveStatus: [...state.leaveStatus, payload],
            };

        default:
            return state;
    }
};

export default gameData;
