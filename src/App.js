import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Paginas/Login';
import ListaAlunos from './Paginas/Alunos/Lista';
import NovoAluno from './Paginas/Alunos/Novo';
import EditarAluno from './Paginas/Alunos/Editar';
import Home from './Paginas/Home';
import { AuthGuard } from './Utils/AuthGuard';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <AuthGuard>
            <Home />
          </AuthGuard>
        } />
        <Route path="/alunos" element={
          <AuthGuard>
            <ListaAlunos />
          </AuthGuard>
        } />
        <Route path="/alunos/novo" element={
          <AuthGuard>
            <NovoAluno />
          </AuthGuard>
        } />
        <Route path="/alunos/:id/editar" element={
          <AuthGuard>
            <EditarAluno />
          </AuthGuard>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
