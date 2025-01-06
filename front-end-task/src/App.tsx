import React from "react";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ParticipantsList } from "./ParticipantsList";
import { EditParticipant } from "./EditParticipant";


function App() {
  return (
    <BrowserRouter>
      <div className="App p-10 flex flex-col gap-10">
        <img src="/img/logo.svg" className="w-20 h-20" alt="Logo Forte Digital"></img>
        <div className="bg-[#F7F7F7] px-[68px] pt-[40px] pb-[80px] w-fit self-center">
          <Routes>
            <Route path="/" element={<ParticipantsList />} />
            <Route path="/participants/:id" element={<EditParticipant />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
