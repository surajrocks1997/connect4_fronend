import axios from "axios";

import { GENERATE_KEY } from "./types";

export const generateKey = () => async (dispatch) => {
    const url = "http://localhost:8080/generateRoomKey";
    const gameKey = await axios.get(url);

    dispatch({
        type: GENERATE_KEY,
        payload: gameKey.data,
    });
    return gameKey.data;
};
