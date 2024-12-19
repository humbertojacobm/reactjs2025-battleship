import React from "react";
import { createRoot } from "react-dom/client"; // Updated import for React 18
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Get the root element from the DOM
const rootElement = document.getElementById("root");

// Create the root using React 18's createRoot API
const root = createRoot(rootElement);

// Render the application
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();