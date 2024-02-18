import { USER_INFO } from "../Actions/types";

const initState = {
    username: null,
};

const userInfo = (state = initState, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER_INFO:
            return {
                ...state,
                username: payload,
            };

        default:
            return state;
    }
};

export default userInfo;
