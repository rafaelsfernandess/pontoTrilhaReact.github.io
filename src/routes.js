import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from './pages/Login'
import CadastroUsuario from "./pages/CadastroUsuario";
import EditarUsuario from "./pages/EditarUsuario";
import Home from "./pages/Home";
import Usuario from "./pages/Usuario"; 

export default function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Login/> } />
                <Route path="/login" element={ <Login/> } />
                <Route path="cadastro-usuario" element={ <CadastroUsuario /> } />
                <Route path="editar-conta" element={ <EditarUsuario /> } />
                <Route path="inicio" element={ <Home /> } />
                <Route path="minha-conta" element={ <Usuario /> } />
            </Routes>
        </BrowserRouter>
    )
}