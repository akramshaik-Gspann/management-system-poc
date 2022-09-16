import { auth } from "../firebase";
import * as types from "./actionTypes";

const registerStart = () => ({
    type: types.REGISTER_START,
});

const registerSuccess = (user) => ({
    type: types.REGISTER_SUCCESS,
    payload: user,
});

const registerFail = (error) => ({
    type: types.REGISTER_FAIL,
    payload: error,
});

const loginStart = () => ({
    type: types.LOGIN_START,
});

const loginSuccess = (user) => ({
    type: types.LOGIN_SUCCESS,
    payload: user,
});

const authenticatedUser = (user) => ({
    type: types.AUTHENTICATED_USER,
    payload: user,
});

const loginFail = (error) => ({
    type: types.LOGIN_FAIL,
    payload: error,
});

const logoutStart = () => ({
    type: types.LOGOUT_START,
});

const logoutSuccess = () => ({
    type: types.LOGOUT_SUCCESS,
});

const logoutFail = (error) => ({
    type: types.LOGOUT_FAIL,
    payload: error,
});

export const setUser = (user) => ({
    type: types.SET_USER,
    payload: user,
});

export const registerInitiate = (email, password, displayName) => {
    return function (dispatch) {
        dispatch(registerStart());
        auth.createUserWithEmailAndPassword(email, password).then(({ user }) => {
            user.updateProfile({
                displayName,
            });
            dispatch(registerSuccess(user));
        })
            .catch((error) => dispatch(registerFail(error.message)));
    };
};

export const loginInitiate = (email, password) => {
    return function (dispatch) {
        dispatch(loginStart());
        auth
            .signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                dispatch(loginSuccess(user));
                dispatch(authenticatedUser(user));
            })
            .catch((error) => dispatch(loginFail(error.message)));
    };
};

export const logoutInitiate = () => {
    return function (dispatch) {
        dispatch(logoutStart());
        auth
            .signOut()
            .then((resp) =>
                dispatch(logoutSuccess()))
            .catch((error) => dispatch(logoutFail(error.message)));
    };
};