import axios from "axios";
import { BrowserRouter, Routes, Route, useSearchParams } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { ColorModeContext, useMode } from "./Theme/theme";

import Login from "./Layouts/Login";
import MainPage from "./Layouts/mainPage"
import React, { useState, useEffect } from 'react';

function Activate() {
  const [activated, setActivated] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const params = {
      code: searchParams.get('code'),
      signature: searchParams.get('signature'),
      email: searchParams.get('email')
    };
    const query = Object.keys(params).map((key) => `${key}=${encodeURIComponent(params[key])}`).join('&');
    axios.post(`http://127.0.0.1:3009/auth/activate?${query}`).then((response) => {
      console.log(response);
      setActivated(true);
    }).catch((error) => {
      console.error('Erreur lors de l\'activation du compte:', error);
    });
  }, [searchParams]);

  return (activated ?
    <div>
      <h1>Your account has been activated!</h1>
    </div>
    :
    <div>
      <h1>Activating your account...</h1>
    </div>
  );
}

function App() {
  const [theme] = useMode();
  return (
    <ColorModeContext.Provider value={useMode()}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/activate" element={<Activate />} />
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<MainPage />} />
            <Route path="*" element={<MainPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
