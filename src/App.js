import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Paginas/Login';
import Alunos from './Paginas/Alunos';
import Home from './Paginas/Home';
import { AuthGuard } from './Utils/AuthGuard'; // Importe o AuthGuard
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
            <Alunos />
          </AuthGuard>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
