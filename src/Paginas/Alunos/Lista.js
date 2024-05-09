import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, DialogActions, DialogTitle, DialogContent, DialogContentText, Button, Dialog, IconButton, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import NavBar from '../../Componentes/NavBar'
import API from '../../Api';
import '../../App.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

function Lista() {
  const [alunos, setAlunos] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = JSON.parse(sessionStorage.getItem('userData'))?.token;
        const response = await API.get('/alunos', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAlunos(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        alert('Erro ao buscar dados dos usuários.');
      }
    };

    fetchData();
  }, []);


  const handleDelete = async (id) => {
    const token = JSON.parse(sessionStorage.getItem('userData'))?.token;
    await API.delete(`/alunos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setAlunos(alunos.filter(user => user.id !== id));
    setOpen(false);
  };

  const handleClickOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <NavBar />
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>
          Alunos
        </Typography>
        <Button
          variant="contained"
          color="primary"
          style={{ marginBottom: 20 }}
          onClick={() => navigate('/alunos/novo') }
        >
          Criar Novo Usuário
        </Button>
        <TableContainer component={Paper}>
          <Table aria-label="tabela de alunos">
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell align="right">Matrícula</TableCell>
                <TableCell align="right">Notas</TableCell>
                <TableCell align="right">Média</TableCell>
                <TableCell align="right">Situação</TableCell>
                <TableCell align="right">#</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alunos.map((aluno) => (
                <TableRow key={aluno.id}>
                  <TableCell component="th" scope="aluno">
                    {aluno.nome}
                  </TableCell>
                  <TableCell align="right">{aluno.matricula}</TableCell>
                  <TableCell align="right">{aluno.notas.join(', ')}</TableCell>
                  <TableCell align="right">{parseFloat(aluno.media).toFixed(2)}</TableCell>
                  <TableCell align="right">{aluno.situacao}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => navigate(`/alunos/${aluno.id}/editar`) }>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleClickOpen(aluno.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmar exclusão"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza que deseja excluir este aluno?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={() => handleDelete(selectedId)} color="primary" autoFocus>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Lista;
