import axios from "axios";

import {
    SET_GAME_KEY,
    JOIN_ROOM,
    JOIN_ROOM_ERROR,
    CLEAR_JOIN_ERROR,
    IS_ADMIN,
    CLEAR_GAME_JOIN_STATUS,
    MOVE_IDENTIFIER,
} from "./types";

export const generateKey = () => async (dispatch) => {
    const url = "http://localhost:8080/generateRoomKey";
    const gameKey = await axios.get(url);

    dispatch({
        type: SET_GAME_KEY,
        payload: gameKey.data,
    });
    dispatch({
        type: IS_ADMIN,
        payload: true,
    });
    dispatch({
        type: MOVE_IDENTIFIER,
        payload: 1,
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
        }, 10000);
        return 500;
    }
};

export const setGameKeyInState = (roomKey) => (dispatch) => {
    dispatch({
        type: JOIN_ROOM,
        payload: roomKey,
    });
    dispatch({
        type: MOVE_IDENTIFIER,
        payload: 2,
    });
};

export const disconnect = () => (dispatch) => {
    dispatch({
        type: SET_GAME_KEY,
        payload: null,
    });
    dispatch({
        type: IS_ADMIN,
        payload: false,
    });
    dispatch({
        type: CLEAR_GAME_JOIN_STATUS,
        payload: null,
    });
};

export const getBoard = () => async (dispatch) => {
    console.log("INSIDE INIT BOARD");
    const url = "http://localhost:8080/boardState";
    const board = await axios.get(url);
    console.log(board.data);
};
