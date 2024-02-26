import { IS_LOADING } from "../Actions/types";

const initState = {
    loading: false,
};

const loading = (state = initState, action) => {
    const { type, payload } = action;
    switch (type) {
        case IS_LOADING:
            return {
                ...state,
                loading: payload,
            };

        default:
            return state;
    }
};

export default loading;
