import { combineReducers } from "redux";
import userInfo from "./userInfo";
import gameData from "./gameData";

const reducer = combineReducers({
    userInfo,
    gameData,
});

export default reducer;
