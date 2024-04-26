import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../services/api";

const loginAction = () => ({
    type: 'login',
});

const logoutAction = () => ({
    type: 'logout',
})

const registerAction = () => ({
    type: 'register',
})

const setProfileAction = (payload) => ({
    type: 'setProfile',
    payload
})

const loginAsyncAction = ({ email, password }) => {
    return async(dispatch) => {
        dispatch(showLoading())
        try {
            await api.login({ email, password })
            dispatch(loginAction())
        } catch (error) {
            console.log(error)
            throw error
        } finally {
            dispatch(hideLoading())
        }
    }
}

const registerAsyncAction = ({ name, email, password }) => {
    return async(dispatch) => {
        dispatch(showLoading())
        try {
            await api.register({ name, email, password })
            dispatch(registerAction())
        } catch (error) {
            console.log(error)
            throw error
        } finally {
            dispatch(hideLoading())
        } 
    }
}

const getProfileAsyncAction = () => {
    return async(dispatch) => {
        dispatch(showLoading())
        try {
            const user = await api.getOwnProfile()
            dispatch(setProfileAction(user))
        } catch (error) {
            console.log(error)
            throw error
        } finally {
            dispatch(hideLoading())
        } 
    }
}

export { logoutAction, loginAsyncAction, registerAsyncAction, getProfileAsyncAction }