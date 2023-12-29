import { useSelector } from "react-redux";
import lang from "../utils/langaugeConstant";

const GptSearchBar = () => {
    const langKey = useSelector((store) => store.config.lang);
    return (
        <div className="pt-[10%] flex justify-center">
            <form className="w-1/2 bg-black grid grid-cols-12 rounded-lg">
                <input
                    type="text"
                    className="p-4 m-4 col-span-9"
                    placeholder={lang[langKey].GPTSearchPlaceholder}
                />
                <button className="py-2 m-4 col-span-3 px-4 bg-red-700 text-white rounded-lg">
                    {lang[langKey].search}
                </button>
            </form>
        </div>
    );
};

export default GptSearchBar;
