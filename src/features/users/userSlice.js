import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = 'http://localhost:8000'

const initialState = {
  users: [],
  loading: false,
  error: "",
  editUserID: null
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const res = await axios.get(`${BASE_URL}/users`)
  return res.data
})

export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/users/${id}`)
    if (res?.status === 200) return id;
  } catch (error) {
    return error.message
  }
})

export const createUser = createAsyncThunk('users/createUser', async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/users`, { email: data.email })
    if (res?.status === 201) return res.data;
  } catch (error) {
    return error.message
  }
})

export const updateUser = createAsyncThunk('users/updateUser', async ({ id, data }) => {
  try {
    const res = await axios.put(`${BASE_URL}/users4654654/${id}`, { email: data.email })
    if (res?.status === 200) return { id, data: res.data };
  } catch (error) {
    console.log(error.message);
    return error.message
  }
})

const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    editUser: (state, action) => {
      state.editUserID = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false
        state.users = state.users.filter((user) => user.id !== action.payload)
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false
        state.users.push(action.payload)
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false
        const { id, data } = action.payload;
        const userIndex = state.users.findIndex((user) => user.id === id);
        if (userIndex !== -1) {
          state.users[userIndex] = { ...state.users[userIndex], ...data };
        }
        state.editUserID = null
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export const { editUser } = usersSlice.actions

export default usersSlice.reducer