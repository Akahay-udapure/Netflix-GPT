import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
    const { movieResults, movieNames } = useSelector((store) => store.gpt);
    if (!movieNames) return null;
    return (
        <div className="p-4 mt-4 w-full bg-slate-800 text-white bg-opacity-70">
            <div>
                {movieNames.map((movieName, index) => (
                    <MovieList
                        key={movieName}
                        title={movieName}
                        movies={movieResults[index]}
                    />
                ))}
            </div>
        </div>
    );
};

export default GptMovieSuggestions;
