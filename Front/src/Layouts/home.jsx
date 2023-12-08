import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ChartComponent from '../Compenent/graph';
import { setLocalStorage, getLocalStorage } from '../Request/Auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const InfoBox = ({ data }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Paper elevation={3} style={{ padding: 16, marginBottom: 16 }}>
        <h3>{data.title}</h3>
        <p>{data.content}</p>
      </Paper>
    </Grid>
  );
};

const InfoBoxContainer = ({ infoData }) => {
  return (
    <Grid container spacing={3}>
      {infoData.map((info, index) => (
        <InfoBox key={index} data={info} />
      ))}
    </Grid>
  );
};

const getEmail = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:3009/user/${getLocalStorage("user")}`, {
      headers: {
        "Authorization": `Bearer ${getLocalStorage("bearerToken")}`,
      },
    });
    const data = response.data;
    return data.email
  } catch (err) {
    console.error(err);
  }
}

// ... (imports inchangés)

const Home = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [email, setEmail] = useState(null);
  const navigate = useNavigate();

  const fetchEmail = async () => {
    try {
      const userEmail = await getEmail();
      setEmail(userEmail);
    } catch (error) {
      console.error(error);
    }
  };
  if (email === null) {
    fetchEmail()
  }

  const signOut = () => {
    setLocalStorage("bearerToken", null);
    setLocalStorage("user", null);
    navigate("/login");
  }

  const handleOpenProfile = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseProfile = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const infoData = [
    { title: 'Info 1', content: 'Description 1' },
    { title: 'Info 2', content: 'Description 2' },
    { title: 'Info 43', content: 'Description 32' },
    { title: 'Info 1', content: 'Description 1' },
    { title: 'Info 2', content: 'Description 2' },
    { title: 'Info 43', content: 'Description 32' },
  ];

  return (
    <div style={{ position: 'relative', paddingTop: 16, paddingRight: 16, textAlign: 'right' }}>
      <IconButton
        color="inherit"
        aria-label="user-profile"
        onClick={handleOpenProfile}
      >
        <Avatar>
          <AccountCircleIcon />
        </Avatar>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseProfile}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Paper style={{ padding: 16 }}>
          <Typography variant="h6" gutterBottom>
            { email }
          </Typography>
          <Button onClick={signOut}>Déconnexion</Button>
        </Paper>
      </Popover>
      <div style={{ marginTop: 40 /* ajustez la valeur selon vos besoins */ }}>
        <InfoBoxContainer infoData={infoData} />
      </div>
      <ChartComponent />
    </div>
  );
};

export default Home;