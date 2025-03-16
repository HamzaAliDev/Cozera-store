import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action to fetch user data using stored token
export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (_, { rejectWithValue }) => {
    try {

      const token = localStorage.getItem("token");
      // console.log("Token from localStorage:", token); // Debug token

      if (!token) throw new Error("No token found");

      const response = await axios.get('http://localhost:8000/users/me', {
        headers: { Authorization: `Bearer ${token}` }
      });

      // console.log("response", response);
      return response.data;  // Return user data
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch user");
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/users/login', user);

      if (response.status === 200) {
        window.toastify(response.data.message, 'success');
        return response.data;  // Successful login
      }

    } catch (error) {
      console.log("error", error);

      // Handle errors properly using rejectWithValue
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        window.toastify("Something went wrong!", 'error');
        return rejectWithValue({ message: "Something went wrong!" });
      }
    }
  }
)

export const register = createAsyncThunk(
  'auth/register',
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8000/users/register', user);

      if (response.status === 201) {
        window.toastify(response.data.message, 'success');
        return response.data;  // Successful registration
      }

    } catch (error) {
      console.log("error", error);

      // Handle errors properly using rejectWithValue
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        window.toastify("Something went wrong!", 'error');
        return rejectWithValue({ message: "Something went wrong!" });
      }
    }
  }
);


const initialState = {
  user: null,
  token: localStorage.getItem("token") || null, // Load token from localStorage
  isAppLoading: true
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {  // Logout action to clear user/token
      state.user = null;
      state.token = null;
      localStorage.removeItem("token"); // Clear token from storage
    }
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.data.user;
      state.token = action.payload.data.token;

      // Store token in localStorage
      localStorage.setItem("token", action.payload.data.token);
    });

    // Handle failed login attempts properly
    builder.addCase(login.rejected, (state, action) => {
      // console.log("login.rejected", action);
      window.toastify(action.payload?.message || "Login failed", 'error');
    });

    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload.data.user;
      state.token = action.payload.data.token; // Store token in state

      // Store token in localStorage
      localStorage.setItem("token", action.payload.data.token);
    });

    // Handle failed register attempts properly
    builder.addCase(register.rejected, (state, action) => {
      window.toastify(action.payload?.message || "Registration failed", 'error');

    });

    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload.data;
      state.isAppLoading = false;
      // console.log("state.user", state.user);
    });

    // Handle failed fetchUser attempts properly
    builder.addCase(fetchUser.rejected, (state) => {
      state.user = null;
      state.isAppLoading = false;
      localStorage.removeItem("token"); // Remove token if user fetch fails
    });

  }
});

export const { setUser, setToken, logout, isAppLoading } = authSlice.actions;
export default authSlice.reducer;