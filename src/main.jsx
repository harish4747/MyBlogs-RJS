import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import MyRoutes from "./routes/MyRoutes.jsx";
import { Provider } from "react-redux";
import myStore from "./store/Store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={myStore}>
      <RouterProvider router={MyRoutes}>
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>,
);
