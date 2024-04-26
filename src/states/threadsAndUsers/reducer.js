const initState = {
    threads: [],
    users: [],
    createThread: false
}

const threadsAndUsersReducer = (state = initState, action) => {
    console.log(action.type)
    switch (action.type) {
        case "getThreadsAndUsers":
            return {
                ...state,
                threads: action.payload.threads,
                users: action.payload.users
            }
        case "createThread":
            return {
                ...state,
                createThread: action.payload
            }
        // Case Vote
        case "upVoteThread":
            return {
                ...state,
                threads: state.threads.map((thread) => {
                    if (thread.id === action.payload.threadId) {
                        return {
                            ...thread,
                            upVotesBy: [...thread.upVotesBy, action.payload.userId],
                            downVotesBy: thread.downVotesBy.filter((id) => id !== action.payload.userId)
                        }
                    } else {
                        return thread
                    }
                })
            }
        case "downVoteThread":
            return {
                ...state,
                threads: state.threads.map((thread) => {
                    if (thread.id === action.payload.threadId) {
                        return {
                            ...thread,
                            downVotesBy: [...thread.downVotesBy, action.payload.userId],
                            upVotesBy: thread.upVotesBy.filter((id) => id !== action.payload.userId)
                        }
                    } else {
                        return thread
                    }
                })
            }
        case "neutralizeThreadVote":
            return {
                ...state,
                threads: state.threads.map((thread) => {
                    if (thread.id === action.payload.threadId) {
                        return {
                            ...thread,
                            upVotesBy: thread.upVotesBy.filter((id) => id !== action.payload.userId),
                            downVotesBy: thread.downVotesBy.filter((id) => id !== action.payload.userId)
                        }
                    } else {
                        return thread
                    }
                })
            }
        // Case Vote Tutup
        default:
            return state
    }
}

export default threadsAndUsersReducer