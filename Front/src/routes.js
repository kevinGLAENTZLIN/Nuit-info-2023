/**
 * @file routes.js
 * @description 
 * @author GLAENTZLIN Kevin
 * @copyright Copyright 2023 - GLAENTZLIN Kevin and BIEBER Marc - All rights reserverd
 */

import Quiz from "./Layouts/quiz";

export const siteRoutes = [
  {
    isVisible: true,
    path: "/",
    name: "Accueil",
    component: Quiz
  },
  {
    isVisible: true,
    path: "/home",
    name: "Accueil",
    component: Quiz
  },
];