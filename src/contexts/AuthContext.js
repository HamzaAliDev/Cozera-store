import React, { useState, useEffect, useCallback, useContext, createContext, useReducer } from 'react'
import axios from 'axios';

const Auth = createContext();
const initialState = { isAuthenticated: false, user: {} }

const reducer = (state, { type, payload }) => {
    switch (type) {
        case 'SET_LOGGED_IN':
            return { isAuthenticated: true, user: payload.user }
        case 'SET_PROFILE':
            return { ...state, user: payload.user }
        case 'SET_LOGGED_OUT':
            return initialState;
        default:
            return state
    }
}
export default function AuthContext({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [isAppLoading, setIsAppLoading] = useState(true)

    const readProfile = useCallback(async () => {
        try {
            const token = localStorage.getItem('token') || ''
            if (token) {
                const response = await axios.get(`${process.env.React_APP_API_URL}/users/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                if (response.status === 200) {
                    dispatch({ type: 'SET_LOGGED_IN', payload: { user: response.data.data } })
                } else {
                    dispatch({ type: 'SET_LOGGED_OUT' })
                }
            } else {
                dispatch({ type: 'SET_LOGGED_OUT' })
            }
        } catch (error) {
            console.log("error", error)
            dispatch({ type: 'SET_LOGGED_OUT' })
        } finally {
            setIsAppLoading(false)
        }
    }, [])

    useEffect(() => { readProfile() }, [readProfile])

    const login = async (formData) => {
        try {
            const response = await axios.post(`${process.env.React_APP_API_URL}/users/login`, formData);
            if (response.status === 200) {
                localStorage.setItem('token', response.data.data.token);
                dispatch({ type: 'SET_LOGGED_IN', payload: { user: response.data.data.user } });
                window.toastify(response.data.message, 'success');
                return null;
            }
        } catch (error) {
            window.toastify(error.response?.data?.message || "Login failed", 'error');
            return error.response?.data?.message;
        }
    }

    const register = async (formData) => {
        try {
            const response = await axios.post(`${process.env.React_APP_API_URL}/users/register`, formData);
            if (response.status === 201) {
                localStorage.setItem('token', response.data.data.token);
                dispatch({ type: 'SET_LOGGED_IN', payload: { user: response.data.data.user } });
                window.toastify(response.data.message, 'success');
                return null;
            }
        } catch (error) {
            window.toastify(error.response?.data?.message || "Register failed", 'error');
            return error.response?.data?.message;
        }
    }

    const handleLogout = async () => {

        localStorage.removeItem('token')
        dispatch({ type: 'SET_LOGGED_OUT' })
        window.toastify("Logout successfully", 'success')
    }
    console.log(state)


    return (
        <Auth.Provider value={{ ...state, dispatch, isAppLoading, setIsAppLoading, login, register,  handleLogout }}>
            {children}
        </Auth.Provider>
    )
}

export const useAuthContext = () => useContext(Auth)
