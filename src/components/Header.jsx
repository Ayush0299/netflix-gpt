import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user); // Access user state from Redux store
  // console.log("Redux User:", user);
  // console.log("Profile photo:", user?.photoURL);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/"); // Navigate to the login page after successful sign-out
      })
      .catch((error) => {
        // An error happened.
        console.error("Sign Out Error:", error); // Navigate to the login page even if sign-out fails
      });
  };
  return (
    <div className="absolute top-0 left-0 z-50 flex w-full items-center justify-between bg-gradient-to-b from-black/90 via-black/40 to-transparent px-4 py-4 sm:px-8 md:px-12">
      <img
        className="w-28 cursor-pointer object-contain sm:w-36 md:w-44"
        src="https://occ.a.nflxso.net/dnmt/api/v6/iL4oJVDYZ8KLSrJ6eG2OwtghbfQ/AAAAAVIENVPMEM3Kn4hVzJseX4N8xPjtBDIpwuFDucWksdxQZ8Ss6Xf8U_vt7ThYYfRmzq0x1CS3nOwTGyVrgADvwfB_tPiK_liS2RjvI40RJSzbKRk-o8b3nCxHfCCnBsyB2XBB9_vRoSmN.svg"
        alt="Netflix Logo"
      />

      {user && (    
        <div className="flex items-center gap-3 sm:gap-5">
          <img
            className="h-9 w-9 cursor-pointer rounded-md border border-white/20 object-cover transition duration-200 hover:scale-110 sm:h-11 sm:w-11"
            alt="User Profile"
            src={user?.photoURL } 
          />
          <button
            onClick={handleSignOut}
            className="rounded bg-red-600 px-3 py-2 text-xs font-semibold text-white shadow-md transition duration-200 hover:bg-red-700 active:scale-95 sm:px-5 sm:text-sm"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
