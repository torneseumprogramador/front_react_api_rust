import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/');
  };

  const handleUsers = () => {
    navigate('/alunos');
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          API Rust Front-end
        </Typography>
        <Button color="inherit" onClick={handleHome}>Home</Button>
        <Button color="inherit" onClick={handleUsers}>Alunos</Button>
        <Button color="inherit" onClick={handleLogout}>Sair</Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;