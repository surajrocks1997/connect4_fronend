import axios from "axios";

import {
    GENERATE_KEY,
    JOIN_ROOM,
    JOIN_ROOM_ERROR,
    CLEAR_JOIN_ERROR,
} from "./types";

export const generateKey = () => async (dispatch) => {
    const url = "http://localhost:8080/generateRoomKey";
    const gameKey = await axios.get(url);

    dispatch({
        type: GENERATE_KEY,
        payload: gameKey.data,
    });
    return gameKey.data;
};

export const joinRoomValidation = (roomkey) => async (dispatch) => {
    const url = `http://localhost:8080/isJoinRoomAvailable/${roomkey}`;
    try {
        const res = await axios.get(url);
        return res;
    } catch (error) {
        console.log(error.response.data);
        dispatch({
            type: JOIN_ROOM_ERROR,
            payload: error.response.data,
        });

        setTimeout(() => {
            dispatch({
                type: CLEAR_JOIN_ERROR,
                payload: "",
            });
        }, 5000);
        return 500;
    }
};

export const setGameKeyInState = (roomKey) => (dispatch) => {
    dispatch({
        type: JOIN_ROOM,
        payload: roomKey,
    });
};
