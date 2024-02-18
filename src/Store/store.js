import { configureStore } from "@reduxjs/toolkit";
import reducer from "../Reducers/reducer";

const initState = {};

const store = configureStore({
    reducer,
    initState,
});

export default store;
