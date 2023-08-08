import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from '../../api';

const SLICE_NAME = 'auth';

const login = createAsyncThunk(
  `${SLICE_NAME}/login`,
  async (userData, thunkAPI) => {
    try {
      const { data: { data: { user } } } = await API.login(userData);

      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
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
  }
});

const { reducer: authReducer, actions } = authSlice;
export { login };
export const { logout } = actions;
export default authReducer;