import { IS_LOADING } from "./types";

export const setGlobalLoadingState = (isLoading) => (dispatch) => {
    dispatch({
        type: IS_LOADING,
        payload: isLoading,
    });
};
