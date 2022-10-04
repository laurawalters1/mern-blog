import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useQuery,
} from "react";
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
    const { data, loading } = await getUserData();
    if (!loading) {
      setLoggedInUser(data.me);
    }
    console.log("get user data func running");
    // setLoggedInUser("hello");
  };

  useEffect(() => {
    getUserDataFunc();
    console.log("use effect test");
  }, []);
  // console.log("provider", loggedInUser);
  return (
    // return chat provider
    <UserContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        test: "test",
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
