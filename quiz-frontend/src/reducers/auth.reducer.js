import { ACTION_AUTH } from '../constants/action.constant';
import Cookies from 'js-cookie';
const accessToken = Cookies.get('accessToken');
const user = JSON.parse(localStorage.getItem('user'));
const initialState = user && accessToken
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };

const authReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case ACTION_AUTH.LOGOUT: {
            return {
                ...state,
                isLoggedIn: false,
                user: null
            };
        }
        case ACTION_AUTH.LOGIN_SUCCESS: {
            return {
                ...state,
                isLoggedIn: true,
                user: payload
            };
        }
        case ACTION_AUTH.UPDATE_USER: {
            return {
                ...state,
                user: payload
            };
        }
        case ACTION_AUTH.LOGIN_FAILED: {
            return {
                ...state,
                isLoggedIn: false,
                user: null
            };
        }
        default:
            return state;
    }
};

export default authReducer;
