import { useRef, useState } from "react";
import Header from "./Header";
import { ValidateData } from "../utils/validate";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);
    const handleClick = () => {
        setIsSignInForm(!isSignInForm);
    };
    const onsubmit = () => {
        const message = ValidateData(
            email.current.value,
            password.current.value,
        );
        setErrorMessage(message);
        if (message) return;

        if (!isSignInForm) {
            createUserWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value,
            )
                .then((userCredential) => {
                    // Signed up
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value,
                    })
                        .then(() => {
                            const { email, displayName, uid } =
                                auth.currentUser;
                            dispatch(
                                addUser({
                                    uid: uid,
                                    email: email,
                                    displayName: displayName,
                                }),
                            );
                            navigate("/browse");
                        })
                        .catch((error) => {
                            setErrorMessage(error);
                        });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + errorMessage);
                });
        } else {
            signInWithEmailAndPassword(
                auth,
                email.current.value,
                password.current.value,
            )
                .then((userCredential) => {
                    const user = userCredential.user;
                    navigate("/browse")
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + errorMessage);
                });
        }
    };
    return (
        <div>
            <Header />
            <div>
                <img
                    className="absolute"
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/ca6a7616-0acb-4bc5-be25-c4deef0419a7/c5af601a-6657-4531-8f82-22e629a3795e/IN-en-20231211-popsignuptwoweeks-perspective_alpha_website_large.jpg"
                    alt=""
                />
            </div>
            <div>
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="absolute bg-black p-12 w-4/12 mt-24 mx-auto right-0 left-0 text-white bg-opacity-80">
                    <h1 className="font-bold text-3xl py-4">
                        {isSignInForm ? "Sign In" : "Sign Up"}
                    </h1>
                    {!isSignInForm && (
                        <input
                            type="text"
                            ref={name}
                            placeholder="Full Name"
                            className="p-3 my-3 border-2 bg-gray-700 border-black w-full rounded-md"
                        />
                    )}
                    <input
                        type="text"
                        placeholder="Email Address"
                        className="p-3 my-3 border-2 bg-gray-700 border-black w-full rounded-md"
                        ref={email}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="p-3 my-3 border-2 bg-gray-700 border-black w-full rounded-md"
                        ref={password}
                    />
                    <p className=" text-red-500 text-sm">{errorMessage}</p>
                    <button
                        className="p-3 my-6 bg-red-700 w-full rounded-md text-center"
                        onClick={() => onsubmit()}>
                        {isSignInForm ? "Sign In" : "Sign Up"}
                    </button>
                    <p
                        className="text-xs py-3 cursor-pointer"
                        onClick={() => handleClick()}>
                        {isSignInForm ? (
                            <>
                                <span className=" text-gray-400 font-bold">
                                    New To Netflix?
                                </span>
                                <span className="font-bold">Sign Up Here</span>
                            </>
                        ) : (
                            <>
                                <span className=" text-gray-400 font-bold">
                                    Already registred?
                                </span>
                                <span className="font-bold">Sign In Here</span>
                            </>
                        )}
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
