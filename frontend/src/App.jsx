import React from 'react'
import { LoginProvider } from './Contexts/LoginContext';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './Pages/HomePage';
import ConnectNetworksPage from './Pages/ConnectNetworksPage';
import FinancesPage from './Pages/FinancesPage';
import LoansPage from './Pages/LoansPage';
import ScorePage from './Pages/ScorePage';
import SignUpPage from './Pages/SignUpPage';
import LoginPage from './Pages/LoginPage';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function App() {

    return (
        <BrowserRouter>
         <ToastContainer/>
            <LoginProvider>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/connect" element={<ConnectNetworksPage />} />
                    <Route path="/finances" element={<FinancesPage />} />
                    <Route path="/loans" element={<LoansPage />} />
                    <Route path="/score" element={<ScorePage />} />
                </Routes>
            </LoginProvider>
        </BrowserRouter>
    )
}
