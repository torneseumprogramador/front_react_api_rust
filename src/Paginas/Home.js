import React from 'react';
import { Container, Typography } from '@mui/material';
import NavBar from '../Componentes/NavBar'

function Home() {
  return (
    <>
      <NavBar/>
      <Container maxWidth="sm">
        <Typography variant="h4">Bem-vindo ao front-end da API Rust!</Typography>
      </Container>
    </>
  );
}

export default Home;
