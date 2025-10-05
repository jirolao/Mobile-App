import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Playlist = string; // Simplified to just names for now

interface MusicState {
  playlist: Playlist[];
  currentTrack: string | null;
  isPlaying: boolean;
}

const initialState: MusicState = {
  playlist: [],
  currentTrack: null,
  isPlaying: false,
};

const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    addPlaylist(state, action: PayloadAction<string>) {
      if (!state.playlist.includes(action.payload)) {
        state.playlist.push(action.payload);
      }
    },
    removePlaylist(state, action: PayloadAction<string>) {
      state.playlist = state.playlist.filter(p => p !== action.payload);
    },
    play(state, action: PayloadAction<string>) {
      state.currentTrack = action.payload;
      state.isPlaying = true;
    },
    pause(state) {
      state.isPlaying = false;
    },
  },
});

export const {
  addPlaylist,
  removePlaylist,
  play,
  pause,
} = musicSlice.actions;

export default musicSlice.reducer;