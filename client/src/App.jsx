import './App.css';
import {
  SignupForm,
  LoginForm,
  Navbar
} from "./components";
import {
  Dashboard,
} from "./pages";
import Auth from "./utils/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
// provider
import UserProvider from "./context/UserProvider";
// router
import {
  BrowserRouter as Router,
  Routes,
  Route,
  HashRouter,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'

// http link
const httpLink = createHttpLink({
 uri: "http://localhost:3001/graphql" ,
});

// auth link
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      // we are setting the header on every network request that we make to have the auth token that is available
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});


  // new apollo client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});



function App() {

  return (
    <ApolloProvider client={client}>
      <UserProvider>
    <div className="App">
      <Navbar />
      <Router>
      <Routes>
        <Route
           path="/"
           element={Auth.loggedIn() ? <Dashboard /> : <LoginForm />}
              ></Route>
      <Route
                path="/login"
                element={Auth.loggedIn() ? <Dashboard /> : <LoginForm />}
              />
        <Route
                path="/signup"
                element={Auth.loggedIn() ? <Dashboard /> : <SignupForm />}
              />
      </Routes>
      </Router>
    </div>
    </UserProvider>
    </ApolloProvider>
  );
}

export default App;
