import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../interfaces/IUser';

const URL = import.meta.env['BE'] || 'http://localhost:8080/api/users';

interface UserState {
  loading: boolean;
  loadingDetail?: boolean;
  loadingUpdate?: boolean;
  users: User[];
  user?: User;
  error: string;
}

const initialState: UserState = {
  loading: false,
  loadingDetail: false,
  loadingUpdate: false,
  users: [],
  user: undefined,
  error: '',
};

export const getUsers = createAsyncThunk('user/getUsers', async () => {
  const response = await axios.get<User[]>(URL);
  return response.data;
});

export const showUser = createAsyncThunk(
  'user/showUser',
  async (id: string) => {
    const response = await axios.get<User>(`${URL}/${id}`);
    return response.data;
  },
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: User) => {
    const response = await axios.put<User>(`${URL}/${data.id}`, data);
    return response.data;
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.user = action.payload[0];
        state.error = '';
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.users = [];
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(showUser.pending, (state) => {
        state.loadingDetail = true;
      })
      .addCase(showUser.fulfilled, (state, action) => {
        state.loadingDetail = false;
        state.user = action.payload;
        state.error = '';
      })
      .addCase(showUser.rejected, (state, action) => {
        state.loadingDetail = false;
        state.user = undefined;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(updateUser.pending, (state) => {
        state.loadingUpdate = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loadingUpdate = false;
        state.users = state.users.map((element) =>
          element.id === action.payload.id ? action.payload : element,
        );
        state.user = action.payload;
        state.error = '';
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loadingUpdate = false;
        state.user = undefined;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default userSlice.reducer;
