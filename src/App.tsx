import "./App.css";
import LoginPage from "./components/LoginPage";
import MainPage from "./components/mainPage/MainPage";
import RegisterPage from "./components/RegisterPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import "/node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
