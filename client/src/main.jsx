import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./component/Navbar.jsx";
import Footer from "./component/Footer.jsx";
import Cursor from "./component/Cursor.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Cursor/>
      <App />
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);
