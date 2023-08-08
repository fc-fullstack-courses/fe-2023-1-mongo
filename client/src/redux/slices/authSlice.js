import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from '../../api';
import CONSTANTS from '../../constants';

const SLICE_NAME = 'auth';

const login = createAsyncThunk(
  `${SLICE_NAME}/login`,
  async (userData, thunkAPI) => {
    try {
      const { data: { data: { user } } } = await API.login(userData);

      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const refresh = createAsyncThunk(
  `${SLICE_NAME}/refresh`,
  async (token, thunkAPI) => {
    try {
      const { data: { data: { user } } } = await API.refresh(token);

      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const registration = createAsyncThunk(
  `${SLICE_NAME}/registration`,
  async (userData, thunkAPI) => {
    try {
      const { data: { data: { user } } } = await API.registration(userData);

      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


const initialState = {
  user: null,
  isLoading: false,
  error: null
}

const authSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem(CONSTANTS.TOKEN_STRING);
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(refresh.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(refresh.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });

    builder.addCase(refresh.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(registration.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(registration.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });

    builder.addCase(registration.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  }
});

const { reducer: authReducer, actions } = authSlice;
export { login, refresh, registration };
export const { logout } = actions;
export default authReducer;