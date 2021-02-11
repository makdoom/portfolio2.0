import Intro from "../intro/Intro";
import Navbar from "../navbar/Navbar";
import About from "../about/About";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <Navbar />

      <div className="main__content">
        <Intro />
        <About />
      </div>
    </div>
  );
};

export default App;
