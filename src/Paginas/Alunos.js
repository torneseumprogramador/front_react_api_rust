import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import NavBar from '../Componentes/NavBar'

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = JSON.parse(sessionStorage.getItem('userData'))?.token;
        const response = await axios.get('http://localhost:8000/alunos', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsuarios(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        alert('Erro ao buscar dados dos usuários.');
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <NavBar/>
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>Alunos</Typography>
        <List>
          {usuarios.map((user) => (
            <ListItem key={user.id}>
              <ListItemText
                primary={user.nome}
                secondary={`Matrícula: ${user.matricula} - Média: ${user.media} - Situação: ${user.situacao}`}
              />
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
}

export default Usuarios;
