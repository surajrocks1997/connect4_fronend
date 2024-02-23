import { USER_INFO, IS_ADMIN } from "../Actions/types";

const initState = {
    username: null,
    isAdmin: false,
};

const userInfo = (state = initState, action) => {
    const { type, payload } = action;
    switch (type) {
        case USER_INFO:
            return {
                ...state,
                username: payload,
            };
        case IS_ADMIN:
            return {
                ...state,
                isAdmin: payload,
            };

        default:
            return state;
    }
};

export default userInfo;
