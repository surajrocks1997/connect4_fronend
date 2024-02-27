import { IS_LOADING } from "../Actions/types";

const initState = {
    globalLoading: true,
};

const loading = (state = initState, action) => {
    const { type, payload } = action;
    switch (type) {
        case IS_LOADING:
            return {
                ...state,
                globalLoading: payload,
            };

        default:
            return state;
    }
};

export default loading;
