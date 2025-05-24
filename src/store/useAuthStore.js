import axios from 'axios';
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    isAuthenticated: false,
    user: null,
    allUsers: [],
    isLoggingOut: false,
    isFetchingUser: false,
    appLoading: false,

    fetchUser: async () => {
        try {
            set({ appLoading: true })
            const token = localStorage.getItem('token') || ''
            if (token) {
                const response = await axios.get(`${process.env.React_APP_API_URL}/users/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                if (response.status === 200) {
                    set({ isAuthenticated: true, user: response.data.data })
                } else {
                    set({ isAuthenticated: false })
                }
            } else {
                set({ isAuthenticated: false })
            }
        } catch (error) {
            console.log("error", error)
            set({ isAuthenticated: false })
        } finally {
            set({ appLoading: false })
        }
    },

    register: async (formdata) => {
        try {
            const response = await axios.post(`${process.env.React_APP_API_URL}/users/register`, formdata)

            if (response.status === 201) {
                set({ isAuthenticated: true, user: response.data.data.user })
                localStorage.setItem('token', response.data.data.token)

                window.toastify(response.data.message, 'success')
            } else {
                set({ isAuthenticated: false })
                window.toastify(response.data.message, 'error')
            }
            return response.data.error;

        } catch (error) {
            console.log("error", error)
            window.toastify(error.response.data.message, 'error')
        }
    },

    login: async (formData) => {
        try {
            const response = await axios.post(`${process.env.React_APP_API_URL}/users/login`, formData)

            console.log("response data", response.data)
            if (response.status === 200) {
                set({ isAuthenticated: true, user: response.data.data.user })
                localStorage.setItem('token', response.data.data.token)

                window.toastify(response.data.message, 'success')

            } else {
                set({ isAuthenticated: false })
                window.toastify(response.data.message, 'error')
            }
            return response.data.error;

        } catch (error) {
            console.log("error", error)
            window.toastify(error.response.data.message, 'error')
            return error.response.data.message;

        }
    },

    logout: () => {
        set({ isAuthenticated: false, user: null })
        localStorage.removeItem('token')
        window.toastify('Logout successfully', 'success')
    },

    fetchAllUsers: async () => {
        try {
            set({ isFetchingUser: true })
            const response = await axios.get(`${process.env.React_APP_API_URL}users/`)

            console.log("response data", response.data)
            if (response.status === 200) {
                set({ allUsers: response.data.data })
            } else {
                set({ allUsers: [] })
            }

        } catch (error) {
            console.log("error", error)
            window.toastify(error.response.data.message, 'error')
            set({ users: [] })
        } finally {
            set({ isFetchingUser: false })
        }
    },

    // update user
    updateUser: async (id, role) => {
        try {
            const data = { id, role }
            console.log("data", data)
            const response = await axios.put(`${process.env.React_APP_API_URL}/users/update-profile`, data )

            console.log("response data", response.data)
            if (response.status === 200) {
                // set({ allUsers: response.data.data })
                window.toastify(response.data.message, 'success')
            } else {
                // set({ allUsers: [] })
                window.toastify(response.data.message, 'error')
            }

        } catch (error) {
            console.log("error", error)
            window.toastify(error.response.data.message, 'error')
        }
    },
}))