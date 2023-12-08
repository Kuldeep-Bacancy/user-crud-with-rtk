import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000'}),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `users`
    })
  })
})

export const { useGetUsersQuery } = userApi;