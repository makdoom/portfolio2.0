import { useEffect, useState } from "react";
import AOS from "aos";
import Main from "../main/Main";
import "aos/dist/aos.css";
import "./App.css";
import Loader from "../loader/Loader";

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="app">
      {/* <Loader /> */}
      {loading ? <Loader loading={setLoading} /> : <Main />}
    </div>
  );
};

export default App;
