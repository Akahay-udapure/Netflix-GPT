// src/utils/moviesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlayingMovies: null,
        trailerVideo: null,
        popularMovies: null,
        topratedMovies: null,
        upcomingMovies: null,
        currenTrailer: null, // This seems to be the one to update
    },
    reducers: {
        addNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        addTrailerVideo: (state, action) => {
            state.trailerVideo = action.payload;
        },
        addPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        },
        addTopRatedMovies: (state, action) => {
            state.topratedMovies = action.payload;
        },
        addUpcomingMovies: (state, action) => {
            state.upcomingMovies = action.payload;
        },
        setCurrentTrailer: (state, action) => { // New reducer added
            state.currenTrailer = action.payload;
        },
    },
});

export const {
    addNowPlayingMovies,
    addTrailerVideo,
    addPopularMovies,
    addTopRatedMovies,
    addUpcomingMovies,
    setCurrentTrailer, // New action exported
} = moviesSlice.actions;
export default moviesSlice.reducer;
