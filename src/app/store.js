import { configureStore } from '@reduxjs/toolkit'
import usersReducer from '../features/users/userSlice'
import { userApi } from '../services/userApi'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    users: usersReducer,
    [userApi.reducerPath] : userApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
})

setupListeners(store.dispatch);