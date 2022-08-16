import React, { createContext, useContext, useState, useEffect } from "react";
// get user information
import { CONTEXT, GET_ME } from "../utils/queries";
import { useLazyQuery } from "@apollo/react-hooks";
import Auth from "../utils/auth";

// create chat context
const UserContext = createContext();

// create chat provider
const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState();
  const [getUserData] = useLazyQuery(GET_ME);
  // get information regarding the logged in user
  const getUserDataFunc = async () => {
    const { data } = await getUserData();
    setLoggedInUser(data.me);
  };

  useEffect(() => {
    getUserDataFunc();
  }, []);

  return (
    // return chat provider
    <UserContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
// export chat context
export const UserState = () => {
  return useContext(UserContext);
};
export default UserProvider;
