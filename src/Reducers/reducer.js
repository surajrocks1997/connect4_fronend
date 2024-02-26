import { combineReducers } from "redux";
import userInfo from "./userInfo";
import gameData from "./gameData";
import loading from "./loading";

const reducer = combineReducers({
    userInfo,
    gameData,
    loading,
});

export default reducer;
