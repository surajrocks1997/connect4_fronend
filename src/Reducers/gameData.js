import { GENERATE_KEY } from "../Actions/types";

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
                gameKey: payload.data,
                loading: false,
            };

        default:
            return state;
    }
};

export default gameData;
