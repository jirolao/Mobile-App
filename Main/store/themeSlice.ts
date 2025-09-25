import { createSlice } from "@reduxjs/toolkit";

export type ThemeType = "light" | "dark" | "custom";

interface ThemeState {
  theme: ThemeType;
  accent: string;
}

const initialState: ThemeState = {
  theme: "light",
  accent: "#E91E63",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setAccent: (state, action) => {
      state.accent = action.payload;
      state.theme = "custom";
    },
    hydrateTheme: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { toggleTheme, setTheme, setAccent, hydrateTheme } = themeSlice.actions;
export default themeSlice.reducer;
