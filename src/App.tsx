import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import GuestList from "./components/GuestList";
import Timer from "./components/Timer";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/guest" element={<GuestList />} />
      <Route path="/timer" element={<Timer />} />
    </Routes>
  );
}

export default App;
