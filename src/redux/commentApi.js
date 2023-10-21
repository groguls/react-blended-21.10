import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_ENDPOINT = "comments";
const BASE_URL = "https://64e87afc99cf45b15fdfa20d.mockapi.io/api/v1/";

export const commentApi = createApi({
  reducerPath: "comments",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Comments"],
  endpoints: (builder) => ({
    getComments: builder.query({
      query: () => API_ENDPOINT,
      providesTags: ["Comments"],
    }),
    addComment: builder.mutation({
      query(data) {
        return {
          url: API_ENDPOINT,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Comments"],
    }),
    updateCommentCount: builder.mutation({
      query({ id, ...data }) {
        return {
          url: `${API_ENDPOINT}/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useAddCommentMutation,
  useUpdateCommentCountMutation,
} = commentApi;
