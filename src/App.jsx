import "./App.css";
import Navbar from "./components/Navbar";
import { useState } from "react";
import LoadingBar from "react-top-loading-bar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ConfigRoutes from "./routes.config";
import Alert from "./utils/Alert";
import { AppThemeEnum } from "./enums/AppThemeEnum";
import ModeContext from "./contexts/ModeContext";
function App() {
  const [progress, setProgress] = useState(0);
  const [alert, setAlert] = useState(null);
  const [mode, setMode] = useState(AppThemeEnum.LIGHT);
  const setLoaderBarState = (progress) => {
    setProgress(progress);
  };
  const showAlert = (message, messageType) => {
    setAlert({
      messageType: messageType,
      message: message,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };
  const handleModeChange = () => {
    if (mode === AppThemeEnum.LIGHT) {
      setMode(AppThemeEnum.DARK);
      document.title = "Forecastly - Dark Mode | No. 1 Weather Forecast App";
      document.body.style.backgroundColor = "black";
    } else {
      setMode(AppThemeEnum.LIGHT);
      document.title = "Forecastly | No. 1 Weather Forecast App";
      document.body.style.backgroundColor = "white";
    }
  };
  return (
    <div>
      <Router>
        <Navbar mode={mode} handleModeChange={handleModeChange} />
        <div style={{ height: "50px" }}></div>
        <Alert alert={alert}></Alert>
        <LoadingBar color="#f11946" height={3} progress={progress} />
        <ModeContext.Provider value={mode}>
          <Routes>
            {ConfigRoutes.length > 0 &&
              ConfigRoutes.map((route, index) => {
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <div className="container my-3">
                        <route.Component
                          showAlert={showAlert}
                          setLoaderBarState={setLoaderBarState}
                        ></route.Component>
                      </div>
                    }
                  ></Route>
                );
              })}
          </Routes>
        </ModeContext.Provider>
      </Router>
    </div>
  );
}

export default App;
