import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import GuestList from "./components/GuestList";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/guest" element={<GuestList />} />
    </Routes>
  );
}

export default App;
