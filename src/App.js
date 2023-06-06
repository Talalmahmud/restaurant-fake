import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Menu from "./components/Menu";
import DishDetails from "./components/DishDetails";
import Navbar from "./components/Navbar";
import Menu2 from "./components/Menu2";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Menu />} />
                <Route path="/menu2" element={<Menu2 />} />
                <Route path="/dish/:id" element={<DishDetails />} />
            </Routes>
        </Router>
    );
}

export default App;
