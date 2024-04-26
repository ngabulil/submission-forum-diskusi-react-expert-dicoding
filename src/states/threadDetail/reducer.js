const initState = {
    threadDetail: {},
    commentCreated: false
}

const detailThreadReducer = (state = initState, action) => {
    switch (action.type) {
        case "getThreadDetail":
            return {
                ...state,
                threadDetail: action.payload
            }
        case "createComment":
            return {
                ...state,
                commentCreated: action.payload
            }
        // case vote
        case "upVoteThreadDetail":
            return {
                ...state,
                threadDetail: {
                    ...state.threadDetail,
                    upVotesBy: [...state.threadDetail.upVotesBy, action.payload.userId],
                    downVotesBy: state.threadDetail.downVotesBy.filter((id) => id !== action.payload.userId)
                }
            }
        case "downVoteThreadDetail":
            return {
                ...state,
                threadDetail: {
                    ...state.threadDetail,
                    downVotesBy: [...state.threadDetail.downVotesBy, action.payload.userId],
                    upVotesBy: state.threadDetail.upVotesBy.filter((id) => id !== action.payload.userId)
                }
            }
        case "neutralizeThreadDetailVote":
            return {
                ...state,
                threadDetail: {
                    ...state.threadDetail,
                    upVotesBy: state.threadDetail.upVotesBy.filter((id) => id !== action.payload.userId),
                    downVotesBy: state.threadDetail.downVotesBy.filter((id) => id !== action.payload.userId)
                }
            }
        default:
            return state
    }
}

export default detailThreadReducer