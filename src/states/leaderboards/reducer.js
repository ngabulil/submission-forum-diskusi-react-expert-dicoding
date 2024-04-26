const initState = {
    leaderboards: []
}

const leaderboardsReducer = (state = initState, action) => {
    switch (action.type) {
        case "getLeaderboards":
            return {
                ...state,
                leaderboards: action.payload
            }
        default:
            return state
    }
}

export default leaderboardsReducer