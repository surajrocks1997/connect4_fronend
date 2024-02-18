import axios from "axios";
import { GENERATE_KEY } from "./types";

export const generateKey = () => async (dispatch) => {
    const headers = {
        "Content-Type": "application/json",
    };
    const url = "http://localhost:8080/generateRoomKey";
    const gameKey = await axios.get(url, { headers });

    dispatch({
        type: GENERATE_KEY,
        payload: gameKey,
    });
};
