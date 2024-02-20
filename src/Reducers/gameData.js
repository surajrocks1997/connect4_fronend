import { GENERATE_KEY, JOIN_ROOM } from "../Actions/types";

const initState = {
    gameKey: null,
    loading: true,
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

        default:
            return state;
    }
};

export default gameData;
