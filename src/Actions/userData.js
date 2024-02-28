import { CLEAR_USER_METADATA, USER_INFO } from "./types";

export const setUserName = (name) => (dispatch) => {
    dispatch({
        type: USER_INFO,
        payload: name,
    });
};

export const clearUserMetadata = () => (dispatch) => {
    dispatch({
        type: CLEAR_USER_METADATA,
        payload: null
    })
}
