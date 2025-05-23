// src/components/GptSearchBar.js
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/langaugeConstant"; // Corrected: Assuming 'langaugeConstant.js'
import { useRef } from "react";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constant";
import { addGptMovieResult } from "../utils/gptSlice"; // Corrected import name

const GptSearchBar = () => {
    const langKey = useSelector((store) => store.config.lang); // Changed currentLang to langKey to match provided file
    const searchText = useRef(null);
    const dispatch = useDispatch();

    const searchMovieTMDB = async (movie) => {
        const data = await fetch(
            "https://api.themoviedb.org/3/search/movie?query=" +
            movie +
            "&include_adult=false&language=en-US&page=1",
            API_OPTIONS,
        );
        const json = await data.json();
        return json.results;
    };

    const handleGptSearchClick = async () => { // Renamed from handleGPTSearchClick to match provided file
        const gptQuery =
            "Act as a Movie Recommendation system and suggest some movies for the query : " +
            searchText.current.value +
            ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

        const gptResults = await openai.chat.completions.create({ // Renamed from gptResult to gptResults
            messages: [{ role: "user", content: gptQuery }],
            model: "gpt-3.5-turbo",
        });

        if (!gptResults.choices) {
            // TODO: Write Error Handling
        }

        const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");
        const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
        const tmdbResults = await Promise.all(promiseArray);
        dispatch(
            addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults }), // Corrected action name
        );
    };

    return (
        <div className="pt-[10%] md:pt-[8%] flex justify-center px-4"> {/* Adjusted top padding, added px-4 */}
            <form
                className="w-full md:w-1/2 bg-brand-dark grid grid-cols-12 rounded-lg shadow-md p-2" // Theming: bg, rounded, shadow, form padding
                onSubmit={(e) => e.preventDefault()}>
                <input
                    ref={searchText}
                    type="text"
                    className="p-3 m-2 col-span-9 font-sans bg-brand-gray text-brand-light-gray placeholder-brand-light-gray/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red" // Theming: padding, margin, font, colors, placeholder, focus
                    placeholder={lang[langKey].GPTSearchPlaceholder} // Used langKey
                />
                <button
                    className="py-3 px-4 m-2 col-span-3 font-sans bg-brand-red text-brand-light-gray rounded-lg hover:bg-brand-red/90 transition-colors duration-200" // Theming: padding, margin, font, colors, hover
                    onClick={handleGptSearchClick}> {/* Used langKey */}
                    {lang[langKey].search}
                </button>
            </form>
        </div>
    );
};
export default GptSearchBar;
