import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import firebaseConfig from "./dataBase/firebaseConfig.js";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./features/store/store.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
