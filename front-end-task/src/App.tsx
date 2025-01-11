import React from "react";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ParticipantsList } from "./ParticipantsList";
import { EditParticipant } from "./EditParticipant";
import { AddParticipant } from "./AddParticipant";

function App() {
  return (
    <BrowserRouter>
      <div className="App md:p-10 p-5 flex flex-col md:gap-10 gap-5">
        <header>
          <img src="/img/logo.svg" className="w-20 h-20" alt="Logo Forte Digital" />
        </header>
          <Routes>
            <Route path="/" element={<ParticipantsList />} />
            <Route path="/participants/:id" element={<EditParticipant />} />
            <Route path="/participants/new" element={<AddParticipant />} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
