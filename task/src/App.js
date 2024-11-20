import React from "react";
import NavBar from "./components/navbar/NavBar";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";
import Navigation from "./components/navigation/Navigation";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Navigation />

      <main style={{ padding: "20px" }}>
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;
