import React, { useState } from 'react'
import UserContext from './Contexts/UserContext';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './Pages/HomePage';
import ConnectNetworksPage from './Pages/ConnectNetworksPage';
import FinancesPage from './Pages/FinancesPage';
import LoansPage from './Pages/LoansPage';
import ScorePage from './Pages/ScorePage';
import SignUpPage from './Pages/SignUpPage';

export default function App() {
    const [user, setUser] = useState(null);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/connect" element={<ConnectNetworksPage />} />
                    <Route path="/finances" element={<FinancesPage />} />
                    <Route path="/loans" element={<LoansPage />} />
                    <Route path="/score" element={<ScorePage />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    )
}
