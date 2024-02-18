import { USER_INFO } from "./types";

export const setUserName = (name) => (dispatch) => {
    dispatch({
        type: USER_INFO,
        payload: name,
    });
};
