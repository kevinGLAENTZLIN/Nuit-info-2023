import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';

const environmentalImpactData = [
  { date: '2023-01-01', carbonFootprint: 150, waterUsage: 200, wasteProduction: 10 },
  { date: '2023-01-02', carbonFootprint: 120, waterUsage: 180, wasteProduction: 8 },
  { date: '2023-01-03', carbonFootprint: 90, waterUsage: 160, wasteProduction: 6 },
  { date: '2023-01-04', carbonFootprint: 100, waterUsage: 190, wasteProduction: 8 },
  { date: '2023-01-05', carbonFootprint: 80, waterUsage: 170, wasteProduction: 5 },
  { date: '2023-01-06', carbonFootprint: 110, waterUsage: 210, wasteProduction: 7 },
  { date: '2023-01-07', carbonFootprint: 130, waterUsage: 220, wasteProduction: 9 },
];

const ChartComponent = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredData = environmentalImpactData.filter((entry) => {
    if (startDate && endDate) {
      return entry.date >= startDate && entry.date <= endDate;
    }
    return true;
  });

  // Calculer la somme de chaque catégorie pour les données filtrées
  const totalCarbonFootprint = filteredData.reduce((acc, entry) => acc + entry.carbonFootprint, 0);
  const totalWaterUsage = filteredData.reduce((acc, entry) => acc + entry.waterUsage, 0);
  const totalWasteProduction = filteredData.reduce((acc, entry) => acc + entry.wasteProduction, 0);

  return (
    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Impact environnemental
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="carbonFootprint" stroke="#8884d8" name="Carbon Footprint" />
              <Line type="monotone" dataKey="waterUsage" stroke="#82ca9d" name="Water Usage" />
              <Line
                type="monotone"
                dataKey="wasteProduction"
                stroke="#ffc658"
                name="Waste Production"
              />
            </LineChart>
          </ResponsiveContainer>
        </Grid>

        <Grid item xs={12} md={3}>
          <FormControl style={{ marginBottom: '10px' }}>
            <InputLabel id="start-date-label">Date de début</InputLabel>
            <Select
              labelId="start-date-label"
              id="start-date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              fullWidth
            >
              {environmentalImpactData.map((entry) => (
                <MenuItem key={entry.date} value={entry.date}>
                  {entry.date}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl style={{ marginBottom: '20px' }}>
            <InputLabel id="end-date-label">Date de fin</InputLabel>
            <Select
              labelId="end-date-label"
              id="end-date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              fullWidth
            >
              {environmentalImpactData.map((entry) => (
                <MenuItem key={entry.date} value={entry.date}>
                  {entry.date}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Afficher les totaux des catégories */}
          <Typography variant="subtitle1" style={{ marginTop: '20px' }}>Totals:</Typography>
          <Typography variant="body1">Carbon Footprint: {totalCarbonFootprint}</Typography>
          <Typography variant="body1">Water Usage: {totalWaterUsage}</Typography>
          <Typography variant="body1">Waste Production: {totalWasteProduction}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ChartComponent;
