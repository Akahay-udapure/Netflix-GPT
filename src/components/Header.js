import { signOut, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect } from "react";
import { NETFLIX_LOGO, SUPPORTED_LANGAUGE } from "../utils/constant";
import { toggleGPTSearchView } from "../utils/gptSlice";
import { changeLangauge } from "../utils/configSlice";

const Header = () => {
    const user = useSelector((store) => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const showGPTSearch = useSelector((store) => store.gpt.showGPTSearch);

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
    return (
        <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
            <ul className="flex">
                <li>
                    <img className="w-20 mt-2 md:w-44" src={NETFLIX_LOGO} alt="" />
                </li>
                {/* <li className="mt-6 mx-2 text-white font-semibold cursor-pointer">
                    Home
                </li>
                <li className="mt-6 mx-2 text-white font-semibold cursor-pointer">
                    TV Shows
                </li>
                <li className="mt-6 mx-2 text-white font-semibold cursor-pointer">
                    Movies
                </li> */}
            </ul>
            {user && (
                <ul className="flex p-2 md:mt-4">
                    {showGPTSearch && (
                        <li>
                            <select
                                className="py-2 rounded-lg bg-gray-700 text-white font-bold"
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
                    <li>
                        <button
                            className="p-1 mx-1 py-2 md:px-4 md:mx-4 bg-purple-800 text-white rounded-lg"
                            onClick={handleGPTSearchClick}>
                            {showGPTSearch ? "Homepage" : "GPT Search"}
                        </button>
                    </li>
                    {/* <li className="visible ">
                        <img
                            className="hidden md:block w-10 h-10 mx-1"
                            alt="usericon"
                            src={user?.photoURL}
                        />
                    </li> */}
                    <li className="">
                        <button
                            className="p-1 py-2 md:px-2 md:mx-2 bg-blue-600 text-white rounded-lg"
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
