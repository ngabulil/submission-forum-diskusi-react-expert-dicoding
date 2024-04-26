import { configureStore } from "@reduxjs/toolkit";
import { loadingBarReducer } from "react-redux-loading-bar";
import authReducer from "../states/authProfile/reducer";
import leaderboardsReducer from "../states/leaderboards/reducer";
import detailThreadReducer from "../states/threadDetail/reducer";
import threadsAndUsersReducer from "../states/threadsAndUsers/reducer";

const store = configureStore({
    reducer: {
        loadingBar: loadingBarReducer,
        auth: authReducer,
        leaderboards: leaderboardsReducer,
        threadDetail: detailThreadReducer,
        threadsAndUsers: threadsAndUsersReducer
    }
})

export default store