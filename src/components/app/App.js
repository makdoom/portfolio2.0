import Intro from "../intro/Intro";
import Navbar from "../navbar/Navbar";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="main__content">
        <Intro />
      </div>
    </div>
  );
};

export default App;
