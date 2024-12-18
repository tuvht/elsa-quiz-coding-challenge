import { ACTION_AUTH } from '../constants/action.constant';
import Cookies from 'js-cookie';

export const logout = () => (dispatch) => {
    localStorage.removeItem('user');
    Cookies.remove('accessToken');

    dispatch({
        type: ACTION_AUTH.LOGOUT
    });
};

export const loginUser = (payload) => ({
    type: ACTION_AUTH.LOGIN_SUCCESS,
    payload
});

export const updateUser = (payload) => ({
    type: ACTION_AUTH.UPDATE_USER,
    payload
});

export const loginFailed = (error) => ({
    type: ACTION_AUTH.LOGIN_FAILED,
    payload: {
        error
    }
});
