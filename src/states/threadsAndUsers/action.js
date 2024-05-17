import { hideLoading, showLoading } from "react-redux-loading-bar"
import api from "../../services/api"

const getThreadsAndUsersAction = (payload) => ({
    type: 'getThreadsAndUsers',
    payload
})

const createThreadAction = (payload) => ({
    type: 'createThread',
    payload
})

const upVoteThreadAction = (payload) => ({
    type: 'upVoteThread',
    payload
})

const downVoteThreadAction = (payload) => ({
    type: 'downVoteThread',
    payload
})

const neutralizeThreadVoteAction = (payload) => ({
    type: 'neutralizeThreadVote',
    payload
})

const getThreadsAndUsersAsyncAction = () => async(dispatch) => {
    dispatch(showLoading())
    try {
        const threads = await api.getAllThreads()
        const users = await api.getAllUsers()
        dispatch(getThreadsAndUsersAction({ threads, users }))
        dispatch(createThreadAction(false))
    } catch (error) {
        console.log(error)
        throw error
    } finally {
        dispatch(hideLoading())
    }
}

const createThreadAsyncAction = ({ title, body, category }) => async(dispatch) => {
    dispatch(showLoading())
    try {
        await api.createThread({ title, body, category })
        dispatch(createThreadAction(true))
    } catch (error) {
        console.log(error)
        throw error
    } finally {
        dispatch(hideLoading())
    }
}

const upVoteThreadAsyncAction = (param) => async(dispatch) => {
    dispatch(showLoading())
    try {
        await api.upVoteThread(param.threadId)
        dispatch(upVoteThreadAction(param))
    } catch (error) {
        console.log(error)
        throw error
    } finally {
        dispatch(hideLoading())
    }
}

const downVoteThreadAsyncAction = (param) => async(dispatch) => {
    dispatch(showLoading())
    try {
        await api.downVoteThread(param.threadId)
        dispatch(downVoteThreadAction(param))
    } catch (error) {
        console.log(error)
        throw error
    } finally {
        dispatch(hideLoading())
    }
}

const neutralizeThreadVoteAsyncAction = (param) => async(dispatch) => {
    dispatch(showLoading())
    try {
        await api.neutralizeThreadVote(param.threadId)
        dispatch(neutralizeThreadVoteAction(param))
    } catch (error) {
        console.log(error)
        throw error
    } finally {
        dispatch(hideLoading())
    }
}

export { getThreadsAndUsersAsyncAction, createThreadAsyncAction, upVoteThreadAsyncAction, downVoteThreadAsyncAction, neutralizeThreadVoteAsyncAction, getThreadsAndUsersAction, createThreadAction }