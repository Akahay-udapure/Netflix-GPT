import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
    const movieList = useSelector((store) => store.movies);
    return (
        <div className="bg-black">
            <div className="-mt-52 pl-6 relative z-20">
                <MovieList
                    title={"Now Playing"}
                    movies={movieList.nowPlayingMovies}
                />

                <MovieList
                    title={"Top Rated"}
                    movies={movieList.topratedMovies}
                />

                <MovieList title={"Upcoming"} movies={movieList.upcomingMovies} />

                <MovieList title={"Popular"} movies={movieList.popularMovies} />
            </div>
        </div>
    );
};

export default SecondaryContainer;
