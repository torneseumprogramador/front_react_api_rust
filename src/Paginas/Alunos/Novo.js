import React, { useState } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';
import API from '../../Api';
import { useNavigate } from 'react-router-dom';

function Novo() {
  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [notas, setNotas] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const token = JSON.parse(sessionStorage.getItem('userData'))?.token;
      await API.post('/alunos', {
        nome,
        matricula,
        notas
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setNome('');
      setMatricula('');
      setNotas('');

      navigate("/alunos");
    } catch (error) {
      setError(error.response?.data.mensagem || 'Erro ao adicionar aluno');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Adicionar Novo Aluno
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nome"
          variant="outlined"
          fullWidth
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          label="Matrícula"
          variant="outlined"
          fullWidth
          value={matricula}
          onChange={e => setMatricula(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          label="Notas (separadas por vírgula)"
          variant="outlined"
          fullWidth
          value={notas}
          onChange={e => setNotas(e.target.value)}
          helperText="Exemplo: 7.5, 8.0, 9.3"
          required
          margin="normal"
        />
        {error && (
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
        )}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Adicionar Aluno
        </Button>
      </form>
    </Container>
  );
}

export default Novo;
