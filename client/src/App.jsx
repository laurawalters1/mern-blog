import './App.css';
import {
  SignupForm,
  LoginForm
} from "./components";

function App() {
  return (
    <div className="App">
      <h1>Mern Blog</h1>
      <SignupForm/>
      <LoginForm/>
    </div>
  );
}

export default App;
