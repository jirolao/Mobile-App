import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import userReducer from "./userSlice";
import musicReducer from "./musicSlice"; //

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
    music: musicReducer, //
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
