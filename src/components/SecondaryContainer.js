import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
    const movieList = useSelector((store) => store.movies);
    return (
        <div className="bg-brand-dark"> {/* Changed bg-black to bg-brand-dark */}
            <div className="mt-0 md:-mt-52 md:pl-4 relative z-20"> {/* Reduced md:pl-6 to md:pl-4 for tighter alignment with MovieList titles appearing to start from edge */}
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
