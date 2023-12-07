/**
 * @file app.js
 * @description 
 * @author GLAENTZLIN Kevin
 * @copyright Copyright 2023 - GLAENTZLIN Kevin and BIEBER Marc - All rights reserverd
 */

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ColorModeContext, useMode } from "./Theme/theme";
import { ThemeProvider, CssBaseline } from "@mui/material";

import Home from "./Layouts/Home"

function App() {
    const [theme] = useMode();
    return (
        <ColorModeContext.Provider value={useMode()}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <Routes>
                        <Route path="/*" element={<Home />} />
                        <Route path="*" element={<Home />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;