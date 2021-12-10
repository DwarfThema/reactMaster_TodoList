import { HashRouter, Route, Routes } from "react-router-dom";
import Coin from "./Routes/coin";
import Coins from "./Routes/coins";

function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Coins />} />
        <Route path="/:coinId/*" element={<Coin />} />
      </Routes>
    </HashRouter>
  );
}

export default Router;
