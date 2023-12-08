import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ChartComponent from '../Compenent/graph';

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

const Home = () => {
  const infoData = [
    { title: 'Info 1', content: 'Description 1' },
    { title: 'Info 2', content: 'Description 2' },
    { title: 'Info 43', content: 'Description 32' },
    { title: 'Info 1', content: 'Description 1' },
    { title: 'Info 2', content: 'Description 2' },
    { title: 'Info 43', content: 'Description 32' },
  ];

  return (
    <div>
      <br />
      <br />
      <InfoBoxContainer infoData={infoData} />
      <ChartComponent />
    </div>
  );
};

export default Home;
