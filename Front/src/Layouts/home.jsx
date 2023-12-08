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
import Snowfall from 'react-snowfall';
import backgroundImage from '../Assets/test.jpeg';

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

const callApi = async (endpoint) => {
  try {
    const response = await axios.get(`http://127.0.0.1:3009/${endpoint}`, {
      headers: {
        "Authorization": `Bearer ${getLocalStorage("bearerToken")}`,
      },
    });
    const data = response.data;
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

const Home = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [email, setEmail] = useState(null);
  const [infoData, setInfoData] = useState([]);
  const navigate = useNavigate();

  const fetchEmail = async () => {
    try {
      const userEmail = await getEmail();
      setEmail(userEmail);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAccountLastData = async () => {
    try {
      const currentYear = new Date().getFullYear();
      const currentWeek = getWeekNumber(new Date());
      const rsp = await callApi(`user/data/process/${currentYear}/${currentWeek}`);
      if (rsp === null) return;
      const infoDataDynamic = Object.keys(rsp).map(key => ({
        title: key.charAt(0).toUpperCase() + key.slice(1),
        content: rsp[key].toString(),
      }));
      console.log("infoDatainfoDatainfoData", infoDataDynamic);

      setInfoData(infoDataDynamic);
    } catch (error) {
      console.error(error);
    }
  };

  const getWeekNumber = (date) => {
    const onejan = new Date(date.getFullYear(), 0, 1);
    const millisecsInDay = 86400000;
    return Math.ceil(((date - onejan) / millisecsInDay + onejan.getDay() + 1) / 7);
  };

  useEffect(() => {
    fetchEmail();
    fetchAccountLastData();
  }, []);

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

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        textAlign: 'right',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Snowfall snowflakeCount={100} style={{ zIndex: 1000 }} />
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
            {email}
          </Typography>
          <Button onClick={signOut}>Déconnexion</Button>
        </Paper>
      </Popover>
      <div style={{ marginTop: 40 }}>
        {infoData && (infoData.length > 0) && <InfoBoxContainer infoData={infoData} />}
      </div>
      <ChartComponent />
    </div>
  );
};

export default Home;
