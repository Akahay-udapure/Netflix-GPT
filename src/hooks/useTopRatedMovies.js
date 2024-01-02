import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constant";
import { useDispatch, useSelector} from "react-redux";
import { addTopRatedMovies } from "../utils/moviesSlice";

const useTopRatedMovies = (movieId) => {
    const dispatch = useDispatch();
    const topratedMovies = useSelector((store) => store.movies.topratedMovies);

    const getTopRatedMovies = async () => {
        const data = await fetch(
            "https://api.themoviedb.org/3/movie/top_rated?page=1",
            API_OPTIONS,
        );
        const json = await data.json();
        dispatch(addTopRatedMovies(json.results));
    };

    useEffect(() => {
        !topratedMovies && getTopRatedMovies();
    }, []);
};

export default useTopRatedMovies;
