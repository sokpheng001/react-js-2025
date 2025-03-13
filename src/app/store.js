// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "../api/apiSlice.js";
import { userApi } from "../verify/userApi.js";
import themeReducer from "../redux/features/button/themeSlice";
import sidebarReducer from "../redux/features/user/sidebarSlice";
import visibilitySlice from "../redux/features/user/visibilitySlice.js";
import { exerciseApi } from "../redux/features/exercises/exercisesSlice.js";
import { lessonsApi } from "../redux/features/lesson/lessonSlice.js";
import videoReducer from "../redux/features/video/videoSlice";
import authReducer from "../redux/features/user/authSlice.js";
import { api } from "../redux/features/user/userSlice.js";
import { searchApi } from "../redux/features/search/search.js";
export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    theme: themeReducer,
    visibility: visibilitySlice,
    auth: authReducer,
    videos: videoReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [exerciseApi.reducerPath]: exerciseApi.reducer,
    [lessonsApi.reducerPath]: lessonsApi.reducer,
    [api.reducerPath]: api.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
      userApi.middleware,
      lessonsApi.middleware,
      exerciseApi.middleware,
      api.middleware,
      searchApi.middleware
    ),
});

setupListeners(store.dispatch);