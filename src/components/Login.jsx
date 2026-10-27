import React from "react";
import { useState, useRef } from "react";
import netflixBackground from "../assets/netflixBackground.jpg";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate(); // Hook to navigate programmatically
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    // Validate the form data
    console.log("Sign Up button clicked");
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    // Sign In Sign Up logic can be implemented here based on the form type (Sign In or Sign Up)
    if (!isSignInForm) {
      // Sign Up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://avatars.githubusercontent.com/u/171166398?v=4",
          })
          .then(() => {
              const {uid, email, displayName, photoURL} = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid, 
                  email: email, 
                  displayName: displayName, 
                  photoURL: photoURL
                })
              );
              navigate("/browse");
            })
            .catch((error) => {
              setErrorMessage("Profile update failed: " + error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // Sign In logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("User signed in:", user);
          // console.log("Updated displayName:", user.displayName);
          // console.log("Updated photoURL:", user.photoURL);
          navigate("/browse"); // Navigate to the browse page after successful sign-in
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  // *Sign In/Sign Up form toggle logic

  const toggleSignInForm = () => {
    // Logic to toggle the sign-in form visibility
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute insert-0 -z-10">
        <img
          src={netflixBackground}
          alt="background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-[90%] sm:w-[450px] absolute p-8 sm:p-12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-black/80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-3 w-full bg-[#333] rounded-md outline-none focus:ring-2 focus:ring-gray-400 placeholder:text-gray-400"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-3 w-full bg-[#333] rounded-md outline-none focus:ring-2 focus:ring-gray-400 placeholder:text-gray-400"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-3 w-full bg-[#333] rounded-md outline-none focus:ring-2 focus:ring-gray-400 placeholder:text-gray-400"
        />
        <p className="text-red-500 text-sm py-2">{errorMessage}</p>

        <button
          type="submit"
          className="p-3 my-4 bg-red-600 hover:bg-red-700 transition-colors duration-200 w-full rounded-md font-semibold"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p
          className="py-4 cursor-pointer text-gray-300 hover:text-white transition-colors"
          onClick={toggleSignInForm}
        >
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already have an account? Sign In"}
        </p>
      </form>
    </div>
  );
};

export default Login;
