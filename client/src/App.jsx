import './App.css';
import {
  SignupForm,
  LoginForm
} from "./components";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

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
    link: httpLink,
    cache: new InMemoryCache(),
  });

function App() {

  return (
    <ApolloProvider client={client}>
    <div className="App">
      <h1>Mern Blog</h1>
      <SignupForm/>
      <LoginForm/>
    </div>
    </ApolloProvider>
  );
}

export default App;
