import { createSlice } from "@reduxjs/toolkit";

export type ThemeType = "light" | "dark";

interface ThemeState {
  theme: ThemeType;       // global theme
  customColor: string | null; // optional color for global theme
}

const initialState: ThemeState = {
  theme: "light",
  customColor: null,
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
    setCustomColor: (state, action) => {
      state.customColor = action.payload;
    },
  },
});

export const { toggleTheme, setTheme, setCustomColor } = themeSlice.actions;
export default themeSlice.reducer;
