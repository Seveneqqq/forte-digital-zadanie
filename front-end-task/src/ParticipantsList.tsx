import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

interface Participant {
  id: number;
  name: string;
  email: string;
}

export const ParticipantsList: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      const response = await fetch("http://localhost:3001/participants");
      const participants: Participant[] = await response.json();
      setParticipants(participants);
    };
    fetchParticipants();
  }, []);

  return (
    <main className="bg-[#F7F7F7] xl:w-[800px] w-full xl:h-[528px] h-fit xl:px-[68px] px-[32px] xl:pt-[40px] pt-[20px] xl:pb-[80px] pb-[40px] self-center">
      <section className="flex flex-col gap-10">
        <header className="flex justify-between items-center">
          <h1 className="md:text-[40px] text-[30px] font-medium leading-[46.88px]">Participants</h1>
          <NavLink to="/participants/new">
            <button className="md:px-10 px-5 py-3 bg-[#222222] text-white">Add participant</button>
          </NavLink>
        </header>
        <ul className="w-full">
          {participants.map((participant) => (
            <li key={participant.id} className="flex flex-row items-center justify-between py-2 px-6 h-16 bg-[#EDEDED] even:bg-[#F2F2F2]">
              <div className="flex gap-4">
                <span className="font-normal">{participant.name}</span>
                <span className="font-medium">({participant.email})</span>
              </div>
              <NavLink to={`/participants/${participant.id}`} className="flex gap-2 font-bold justify-center items-center"><img src="/img/icons/edit.svg" />Edit</NavLink>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};
