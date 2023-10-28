import { Routes, Route } from "react-router-dom";
import "./App.css";
import Coins from "./components/Coins";
import CoinsDetails from "./components/CoinsDetails";
import Exchanges from "./components/Exchanges";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Exchanges />}></Route>
        <Route path="/coins" element={<Coins />}></Route>
        <Route path="/coins/:id" element={<CoinsDetails />} />
      </Routes>
    </>
  );
}

export default App;
