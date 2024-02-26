import { IS_LOADING } from "./types";

export const setLoadingState = (isLoading) => (dispatch) => {
    dispatch({
        type: IS_LOADING,
        payload: isLoading,
    });
};
