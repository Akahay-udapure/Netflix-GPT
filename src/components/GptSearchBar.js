import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/langaugeConstant";
import { useRef } from "react";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constant";
import { addGPTMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
    const langKey = useSelector((store) => store.config.lang);
    const searchText = useRef(null);
    const dispatch = useDispatch();

    const searchMovieTMDB = async (movie) => {
        const data = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&page=1`,
            API_OPTIONS,
        );
        const json = await data.json();

        return json.results;
    };
    const handleGPTSearchClick = async () => {
        const gptQuery =
            "Act as a Movie Recommendation system and suggest some movie for the query : " +
            searchText.current.value +
            ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholey, Don, 3 Idiots, Koyi Mil Gaya";
        const gptResult = await openai.chat.completions.create({
            messages: [{ role: "user", content: gptQuery }],
            model: "gpt-3.5-turbo",
        });
        if (!gptResult.choices) {
            // will write error handling
        }
        const gptMovies = gptResult.choices?.[0]?.message?.content.split(",");
        const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
        const tmdbResults = await Promise.all(promiseArray);
        dispatch(
            addGPTMovieResult({
                movieNames: gptMovies,
                movieResults: tmdbResults,
            }),
        );
    };
    return (
        <div className="pt-[20%] md:pt-[10%] flex justify-center">
            <form
                className="w-full md:w-1/2 bg-black grid grid-cols-12 rounded-lg"
                onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    ref={searchText}
                    className="p-4 m-4 col-span-9"
                    placeholder={lang[langKey].GPTSearchPlaceholder}
                />
                <button
                    className="py-2 m-4 col-span-3 px-4 bg-red-700 text-white rounded-lg"
                    onClick={handleGPTSearchClick}>
                    {lang[langKey].search}
                </button>
            </form>
        </div>
    );
};

export default GptSearchBar;
