import React from "react";
import {Route, Routes} from "react-router-dom";
import { useNavigate } from "react-router-dom";

// @mui -----------------------------------------------------------------
import {CssBaseline, ThemeProvider} from "@mui/material";

// Local Context --------------------------------------------------------
import {siteRoutes} from "../routes";
import {checkLoginStatus} from "../Request/Auth";

// Components -----------------------------------------------------------
import {ColorModeContext, useMode} from "../Theme/theme";

// ----------------------------------------------------------------------

function MainPage() {
  const [theme, colorMode] = useMode();
  const navigate = useNavigate();

  React.useEffect(() => {
    checkLoginStatus()
      .then((isAuthenticated) => { 
        if (!isAuthenticated) {
          navigate('/login');
        }
      });
  }, [navigate]);

   const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      return (
        <Route
          exact
          path={prop.path}
          element={
            <prop.component category={prop.type}/>
          }
          key={key}
        />
      );
    });
  };


  return (
    <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div style={{display: 'flex', height: '100%', minHeight: '100vh', backgroundColor: '#ECE3CE'}}>
              <div style={{height: "100%", width: "100%"}}>
                <main>
                  <Routes>
                    {getRoutes(siteRoutes)}
                  </Routes>
                </main>
              </div>
            </div>
          </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default MainPage;