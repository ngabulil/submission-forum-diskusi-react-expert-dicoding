import api from "../../services/api";

const initState = {
    isLogin: false ||  (api.getAccessToken() && true),
    registered: false,
    profile: {}
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case "login":
            return {
                ...state,
                isLogin: true
            }
        case "logout":
            return {
                ...state,
                isLogin: false,
                profile: {},
                registered: false
            }
        case "register":
            return {
                ...state,
                registered: true
            }
        case "setProfile":
            return {
                ...state,
                profile: action.payload
            }
        default:
            return state
    }
}

export default authReducer