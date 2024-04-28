import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { accountTypes } from "../contants/accaunt-types";
import { classNames } from "../helpers/classNames";

const Login = () => {
  const { signUpWithGmail } = useContext(AuthContext);
  const [ signInType, setSignInType ] = useState(accountTypes[0].value)
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  // login with google
  const handleSignIn = async (type) => {
    try {
      await signUpWithGmail(type)
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="h-screen mx-auto container flex items-center justify-center">
      <div className="w-full max-w-xs mx-auto">
        <h3 className="text-xl font-semibold mb-4 text-center">Please Login!</h3>
        <div className="mt-4 text-center w-full mx-auto">
          <ul className="flex text-sm font-medium text-center mb-4 text-gray-500 dark:text-gray-400">
            {accountTypes.map((accountType, index) => (
              <li className="me-2 w-3/6" key={index}>
                <a 
                  className={classNames(
                    "block w-full py-3 text-blue-600 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-blue-500",
                     {active: signInType === accountType.value}
                  )}
                  role="button"
                  onClick={() => setSignInType(accountType.value)}
                >{accountType.key}</a>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-center gap-4 w-full mx-auto">
            <button onClick={() => handleSignIn(signInType)} type="button" className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"><svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>Sign up with Google<div></div></button>
          </div>
        </div>
        <p className="text-center text-gray-500 text-xs">
          &copy; 2024 TechJobs.uz. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
