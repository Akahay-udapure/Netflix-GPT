import { signOut, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect } from "react";
import { NETFLIX_LOGO } from "../utils/constant";

const Header = () => {
    const user = useSelector((store) => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
    return (
        <div className="w-screen absolute px-8 bg-gradient-to-b from-black z-10 flex justify-between">
            <img className="w-44" src={NETFLIX_LOGO} alt="" />
            {user && (
                <ul className="flex">
                    <li>
                        <img
                            className="hidden md:block w-12 h-12 mt-2 mx-1"
                            alt="usericon"
                            src={user?.photoURL}
                        />
                    </li>
                    <li className="mt-5">
                        <button
                            className="font-bold bg-pink-600 rounded-lg p-1"
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
