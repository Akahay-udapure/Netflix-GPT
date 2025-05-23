import MovieCard from "./MovieCard";
import { useDispatch } from "react-redux";
import { API_OPTIONS, IMG_CDN } from "../utils/constant";
import { addCurrentTrailer, addTrailerVideo } from "../utils/moviesSlice";

const MovieList = ({ title, movies }) => {
    const dispatch = useDispatch();
    const handleClick = async (movie) => {
        const data = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}/videos`,
            API_OPTIONS,
        );
        const json = await data.json();

        const filterData = json?.results?.filter(
            (video) => video.type === "Trailer",
        );
        const trailer = filterData.length ? filterData[0] : json.results[0];
        dispatch(addTrailerVideo(trailer));
        dispatch(addCurrentTrailer(movie));
    };
    return (
        <div className="px-6">
            <h1 className="text-lg md:text-2xl py-4 font-semibold text-brand-light-gray"> {/* text-white to text-brand-light-gray */}
                {title}
            </h1>
            <div className="flex cursor-pointer overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent">
                <div className="flex">
                    {movies?.map((movie) => (
                        <div key={movie.id} onClick={()=> handleClick(movie)}>
                            <MovieCard posterPath={movie.poster_path} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieList;
