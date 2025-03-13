import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "videos",
  initialState: {
    videoIds: [
      "aMWT9aEShWs",
      "OW0uuGfpvUE",
      "B6kryr_WIaY",
      "cWmGqByYEus",
      "henIVlCPVIY",
      "tLULIzOj-Ew",
      "axYAW7PuSIM",
      "2cpd1fsUQ1I",
      "Y3FDMiKZ7zo",
      "cSe5mwiXPT0",
    ], // Initial video IDs
  },
  reducers: {
    setVideoIds: (state, action) => {
      state.videoIds = action.payload;
    },
  },
});

export const { setVideoIds } = videoSlice.actions;
export default videoSlice.reducer;
