import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import SongSubmit from "./components/SongSubmit";

export interface TournametSubmitions {
  songUrl: string;
  songTitle: string;
}

function App() {

  return (
    <div className="App">
      <SongSubmit/>
    </div>
  );
}

export default App;
