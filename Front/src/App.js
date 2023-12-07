// App.js

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { ColorModeContext, useMode } from "./Theme/theme";

import Login from "./Layouts/Login";
import MainPage from "./Layouts/mainPage"

function App() {
  const [theme] = useMode();
  return (
    <ColorModeContext.Provider value={useMode()}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
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
