import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlayingMovies: null,
        trailerVideo: null,
        popularMovies: null,
        topratedMovies: null,
        upcomingMovies: null,
        currenTrailer: null,
    },
    reducers: {
        addNowPlayingMovies: (state, actions) => {
            state.nowPlayingMovies = actions.payload;
        },
        addTrailerVideo: (state, actions) => {
            state.trailerVideo = actions.payload;
        },
        addPopularMovies: (state, actions) => {
            state.popularMovies = actions.payload;
        },
        addTopRatedMovies: (state, actions) => {
            state.topratedMovies = actions.payload;
        },
        addUpcomingMovies: (state, actions) => {
            state.upcomingMovies = actions.payload;
        },
        addCurrentTrailer: (state, action) => {
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
    addCurrentTrailer,
} = moviesSlice.actions;
export default moviesSlice.reducer;
