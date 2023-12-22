import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";

const Header = () => {
    const user = useSelector((store) => store.user);
    const navigate = useNavigate();
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
        <div className="absolute w-screen px-8 py-4 bg-gradient-to-b from-black z-10 flex justify-between">
            <img
                className="w-44"
                src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
                alt=""
            />
            {user && (
                <ul className="flex">
                    <li>
                        <p className="font-bold mt-6 mx-4">
                            {user.displayName}
                        </p>
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
