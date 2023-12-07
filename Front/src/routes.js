/**
 * @file routes.js
 * @description 
 * @author GLAENTZLIN Kevin
 * @copyright Copyright 2023 - GLAENTZLIN Kevin and BIEBER Marc - All rights reserverd
 */

import DataThresholdingIcon from '@mui/icons-material/DataThresholding';

import Home from "./Layouts/Home";

export const siteRoutes = [
  {
    isVisible: true,
    path: "/",
    name: "Accueil",
    icon: <DataThresholdingIcon fontSize="large"/>,
    component: Home
  },
  {
    isVisible: true,
    path: "/home",
    name: "Accueil",
    icon: <DataThresholdingIcon fontSize="large"/>,
    component: Home
  },
];