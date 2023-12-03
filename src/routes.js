import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from './pages/Login'
import CadastroUsuario from "./pages/CadastroUsuario";
import EditarUsuario from "./pages/EditarUsuario";
import Home from "./pages/Home";
import Usuario from "./pages/Usuario"; 
import CadastroEvento from "./pages/CadastroEvento"; 
import Ingressos from "./pages/Ingressos";
import MeusEventos from "./pages/MeusEventos";
import Evento from "./pages/Evento";
import VerificacaoPagamento from "./pages/VerificacaoPagamento";
import EditarEvento from "./pages/EditarEvento";
export default function AppRoutes(){
    return(
        <BrowserRouter >
            <Routes >
                <Route path="/" element={ <Login/> } />
                <Route path="/login" element={ <Login/> } />
                <Route path="cadastro-usuario" element={ <CadastroUsuario /> } />
                <Route path="editar-conta" element={ <EditarUsuario /> } />
                <Route path="inicio" element={ <Home /> } />
                <Route path="minha-conta" element={ <Usuario /> } />
                <Route path="criar-evento" element={ <CadastroEvento /> } />
                <Route path="meus-ingressos" element={ <Ingressos /> } />
                <Route path="meus-eventos" element={ <MeusEventos /> } />
                <Route path="evento/:id" element={ <Evento /> } />
                <Route path="evento/:id/verificacao-pagamento" element={ <VerificacaoPagamento /> } />
                <Route path="editar-evento/:id" element={ <EditarEvento /> } />
                
            </Routes>
        </BrowserRouter>
    )
}