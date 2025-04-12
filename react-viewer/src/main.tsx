import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // We'll create this next
import "./index.css"; // Optional: for basic styling

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
