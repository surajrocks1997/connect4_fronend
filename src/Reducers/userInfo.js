import {
    USER_INFO,
    IS_ADMIN,
    MOVE_IDENTIFIER,
    CLEAR_USER_METADATA,
} from "../Actions/types";

const initState = {
    username: null,
    isAdmin: false,
    moveIdentifier: 0,
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
        case MOVE_IDENTIFIER:
            return {
                ...state,
                moveIdentifier: payload,
            };
        case CLEAR_USER_METADATA:
            return {
                ...state,
                isAdmin: false,
                moveIdentifier: 0,
            };

        default:
            return state;
    }
};

export default userInfo;
