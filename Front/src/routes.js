/**
 * @file routes.js
 * @description 
 * @author GLAENTZLIN Kevin
 * @copyright Copyright 2023 - GLAENTZLIN Kevin and BIEBER Marc - All rights reserverd
 */

import Quiz from "./Views/quiz";
import Home from "./Layouts/home"

export const siteRoutes = [
  {
    isVisible: true,
    path: "/",
    name: "Quiz",
    component: Quiz
  },
  {
    isVisible: true,
    path: "/quiz",
    name: "Quiz",
    component: Quiz
  },
  {
    isVisible: true,
    path: "/home",
    name: "Home",
    component: Home
  },
];