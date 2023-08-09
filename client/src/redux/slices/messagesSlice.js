import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from '../../api';

const SLICE_NAME = 'messages';

const getAllMessages = createAsyncThunk(
  `${SLICE_NAME}/getAllMessages`,
  async (options, thunkAPI) => {
    try {
      const { data: { data: messages } } = await API.getAllMessages(options);

      return messages;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)

const initialState = {
  messages: [],
  isLoading: false,
  error: null
}

const messageSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllMessages.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(getAllMessages.fulfilled, (state, action) => {
      state.isLoading = false;
      state.messages = action.payload;
    });

    builder.addCase(getAllMessages.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

  }
});

const { reducer: messageReducer, actions } = messageSlice;

export { getAllMessages }
export const { addMessage } = actions;

export default messageReducer;