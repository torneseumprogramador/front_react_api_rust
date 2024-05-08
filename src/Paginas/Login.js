import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Alert, CircularProgress } from '@mui/material';
import API from '../Api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);  // Estado para controlar o indicador de carregamento
  const navigate = useNavigate();;

  const handleLogin = async () => {
    setIsLoading(true);  // Inicia o carregamento
    try {
      const response = await API.post('/logar', {
        email: email,
        senha: password
      });
      const userData = response.data;
      storeUserData(userData);
      navigate('/');;
    } catch (error) {
      console.log(error)
      setError(error.response?.data.mensagem || 'Ocorreu um erro ao tentar fazer login.');
    } finally {
      setIsLoading(false);  // Termina o carregamento
    }
  };

  // Função para armazenar dados do usuário no sessionStorage
  function storeUserData(userData) {
    const now = new Date();
    const expires = now.getTime() + 24 * 60 * 60 * 1000;  // 24 horas em milissegundos
    const dataToStore = {
      ...userData,
      expires: expires
    };
    sessionStorage.setItem('userData', JSON.stringify(dataToStore));
  }

  return (
    <Container maxWidth="xs">
      <Typography variant="h6">Login</Typography>
      {error && <Alert severity="error" style={{ marginBottom: 20 }}>{error}</Alert>}
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button 
        onClick={handleLogin} 
        variant="contained" 
        fullWidth 
        style={{ marginTop: 20 }}
        disabled={isLoading}  // Desabilita o botão enquanto carrega
      >
        {isLoading ? <CircularProgress size={24} /> : "Entrar"}
      </Button>
    </Container>
  );
}

export default Login;
