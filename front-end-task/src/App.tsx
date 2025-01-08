import React from "react";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ParticipantsList } from "./ParticipantsList";
import { EditParticipant } from "./EditParticipant";
import { AddParticipant } from "./AddParticipant";

function App() {
  return (
    <BrowserRouter>
      <div className="App p-10 flex flex-col gap-10">
        <header>
          <img src="/img/logo.svg" className="w-20 h-20" alt="Logo Forte Digital" />
        </header>
        <main className="bg-[#F7F7F7] xl:w-[800px] w-full xl:h-[528px] h-fit xl:px-[68px] px-[32px] xl:pt-[40px] pt-[20px] xl:pb-[80px] pb-[40px] self-center">
          <Routes>
            <Route path="/" element={<ParticipantsList />} />
            <Route path="/participants/:id" element={<EditParticipant />} />
            <Route path="/participants/new" element={<AddParticipant />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
