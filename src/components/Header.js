import { signOut, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect } from "react";
import { NETFLIX_LOGO, SUPPORTED_LANGAUGE } from "../utils/constant";
import { toggleGPTSearchView } from "../utils/gptSlice";
import { changeLangauge } from "../utils/configSlice";
import { setCurrentTrailer } from "../utils/moviesSlice"; // Import setCurrentTrailer

const Header = () => {
    const user = useSelector((store) => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const showGPTSearch = useSelector((store) => store.gpt.showGPTSearch);
    const nowPlayingMovies = useSelector((store) => store.movies?.nowPlayingMovies); // Selector for nowPlayingMovies

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { email, displayName, uid, photoURL } = user;
                dispatch(
                    addUser({
                        uid: uid,
                        email: email,
                        displayName: displayName,
                        photoURL: photoURL,
                    }),
                );
                // ...
                navigate("/browse");
            } else {
                dispatch(removeUser());
                navigate("/");
            }
        });
        return () => unSubscribe();
    }, []);

    const onSignOut = () => {
        signOut(auth)
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                navigate("/error");
            });
    };

    const handleGPTSearchClick = () => {
        dispatch(toggleGPTSearchView());
    };
    const handleOnLangaugeChange = (e) => {
        dispatch(changeLangauge(e.target.value));
    };

    const handleSurpriseMeClick = () => {
        if (nowPlayingMovies && nowPlayingMovies.length > 0) {
            const randomIndex = Math.floor(Math.random() * nowPlayingMovies.length);
            const randomMovie = nowPlayingMovies[randomIndex];
            dispatch(setCurrentTrailer(randomMovie));

            if (showGPTSearch) {
                dispatch(toggleGPTSearchView()); // Switch back to browse view
            }
        }
    };

    return (
        <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-brand-black z-10 flex justify-between items-center">
            <ul className="flex items-center">
                <li>
                    <img className="w-20 md:w-44" src={NETFLIX_LOGO} alt="Netflix Logo" />
                </li>
                <li className="text-brand-light-gray font-semibold cursor-pointer mx-3 my-1 hover:text-gray-300 transition-colors">
                    Home
                </li>
                <li className="text-brand-light-gray font-semibold cursor-pointer mx-3 my-1 hover:text-gray-300 transition-colors">
                    TV Shows
                </li>
                <li className="text-brand-light-gray font-semibold cursor-pointer mx-3 my-1 hover:text-gray-300 transition-colors">
                    Movies
                </li>
            </ul>
            {user && (
                <ul className="flex items-center p-2">
                    {showGPTSearch && (
                        <li className="mx-2">
                            <select
                                className="py-2 px-2 rounded-lg bg-brand-gray text-brand-light-gray font-bold hover:bg-opacity-80 transition-colors"
                                onChange={handleOnLangaugeChange}>
                                {SUPPORTED_LANGAUGE.map((lang) => (
                                    <option
                                        className="font-bold"
                                        key={lang.identifier}
                                        value={lang.identifier}>
                                        {lang.name}
                                    </option>
                                ))}
                            </select>
                        </li>
                    )}
                    {/* Surprise Me Button Added Here */}
                    <li className="mx-2">
                        <button
                            className="py-2 px-3 md:px-4 bg-teal-600 text-brand-light-gray rounded-lg hover:bg-teal-700 transition-colors" // New "Surprise Me!" button
                            onClick={handleSurpriseMeClick}>
                            Surprise Me!
                        </button>
                    </li>
                    <li className="mx-2">
                        <button
                            className="py-2 px-3 md:px-4 bg-purple-800 text-brand-light-gray rounded-lg hover:bg-purple-700 transition-colors"
                            onClick={handleGPTSearchClick}>
                            {showGPTSearch ? "Homepage" : "GPT Search"}
                        </button>
                    </li>
                    {user && user.photoURL && (
                        <li className="mx-2">
                            <img
                                className="w-8 h-8 md:w-10 md:h-10 rounded-md"
                                alt="User Icon"
                                src={user.photoURL}
                            />
                        </li>
                    )}
                    <li className="mx-2">
                        <button
                            className="py-2 px-3 md:px-2 bg-blue-600 text-brand-light-gray rounded-lg hover:bg-blue-500 transition-colors"
                            onClick={() => onSignOut()}>
                            Sign Out
                        </button>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default Header;
