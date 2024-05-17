import { describe, expect, it } from "vitest";
import threadsAndUsersReducer from "./reducer";

describe("threadsAndUsersReducer", () => {
    const state = {
        threads: [],
        users: [],
        createThread: false
    }
    it("getThreadsAndUsers", () => {
        const action = {
            type: "getThreadsAndUsers",
            payload: {
                threads: [{}],
                users: [{}],
                createThread: false
            }
        }
        const result = threadsAndUsersReducer(state, action)
        expect(result).toEqual({...state, ...action.payload})
    })
    it("createThread", () => {
        const action = {
            type: "createThread",
            payload: true
        }
        const result = threadsAndUsersReducer(state, action)
        expect(result).toEqual({ ...state, createThread: true })
    })
    it("upVoteThread", () => {
        const action = {
            type: "upVoteThread",
            payload: {
                userId: 1,
                threadId: 1
            }
        }
        const result = threadsAndUsersReducer(state, action)
        expect(result).toEqual({ ...state, threads: [] })
    })
    it("downVoteThread", () => {
        const action = {
            type: "downVoteThread",
            payload: {
                userId: 1,
                threadId: 1
            }
        }
        const result = threadsAndUsersReducer(state, action)
        expect(result).toEqual({ ...state, threads: [] })
    })
    it("neutralizeThreadVote", () => {
        const action = {
            type: "neutralizeThreadVote",
            payload: {
                userId: 1,
                threadId: 1
            }
        }
        const result = threadsAndUsersReducer(state, action)
        expect(result).toEqual({ ...state, threads: [] })
    })
})