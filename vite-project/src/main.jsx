import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { ProvideMain } from "../Componenets/Context/Gettask.jsx";
import { Getusefunction } from "../Componenets/Context/Getusefunction.jsx";
import { GetMonthlyData } from "../Componenets/Context/GetMonthlyById.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProvideMain>
      <Getusefunction>
        <GetMonthlyData>
          <App />
        </GetMonthlyData>
      </Getusefunction>
    </ProvideMain>
  </StrictMode>
);
