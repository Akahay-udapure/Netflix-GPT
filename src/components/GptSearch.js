import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
// import { BG_IMG } from "../utils/constant"; // BG_IMG removed

const GptSearch = () => {
    return (
        <div className="bg-brand-dark min-h-screen"> {/* Applied bg-brand-dark and min-h-screen, removed outer <> and fixed div */}
            {/* BG image div removed */}
            <div> {/* This div can remain for content flow if needed, or GptSearchBar/GptMovieSuggestions can be direct children */}
                <GptSearchBar />
                <GptMovieSuggestions />
            </div>
        </div>
    );
};

export default GptSearch;
