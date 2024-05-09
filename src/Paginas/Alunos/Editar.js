import React, { useState, useEffect } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';
import API from '../../Api';
import { useParams, useNavigate } from 'react-router-dom';

function Editar() {
  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [notas, setNotas] = useState('');
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAluno = async () => {
      try {
        const token = JSON.parse(sessionStorage.getItem('userData'))?.token;
        const response = await API.get(`/alunos/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const aluno = response.data;
        setNome(aluno.nome);
        setMatricula(aluno.matricula);
        setNotas(aluno.notas.join(', '));
      } catch (error) {
        setError('Falha ao buscar dados do aluno');
      }
    };
    fetchAluno();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const token = JSON.parse(sessionStorage.getItem('userData'))?.token;
      await API.put(`/alunos/${id}`, {
        nome,
        matricula,
        notas: notas
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate("/alunos");
    } catch (error) {
      setError(error.response?.data.mensagem || 'Erro ao editar aluno');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Alterando informações do aluno {nome}
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
          Alterar
        </Button>
      </form>
    </Container>
  );
}

export default Editar;
