import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coin from "./Routes/coin";
import Coins from "./Routes/coins";


function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Coins />} />
                <Route path="/:coinId" element={<Coin />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router