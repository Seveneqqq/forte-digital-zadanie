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
    <main className="bg-[#F7F7F7] lg:w-[800px] w-full lg:px-[68px] sm:px-[32px] px-[16px] lg:pt-[40px] pt-[20px] lg:pb-[80px] pb-[40px] self-center">
      <section className="flex flex-col gap-10">
        <header className="flex sm:flex-row flex-col sm:gap-[unset] gap-4 justify-between sm:items-center items-start">
          <h1 className="md:text-[40px] text-[30px] font-medium leading-[46.88px]">Participants</h1>
          <NavLink to="/participants/new" className='sm:w-[unset] w-full'>
            <button className="md:px-10 px-5 py-3 bg-[#222222] text-white sm:w-[unset] w-full">Add participant</button>
          </NavLink>
        </header>
        <ul className="w-full">
          {participants.map((participant) => (
            <li key={participant.id} className="flex sm:flex-row flex-col sm:gap-[unset] gap-4 sm:items-center items-start justify-between py-2 sm:px-6 px-4 sm:h-16 h-[unset] bg-[#EDEDED] even:bg-[#F2F2F2] border-2 border-transparent hover:border-2 hover:border-[#222222] box-border">
              <div className="flex sm:flex-row flex-col sm:gap-4 gap-4 items-start">
                <span className="font-normal">{participant.name}</span>
                <span className="font-medium">({participant.email})</span>
              </div>
              <NavLink to={`/participants/${participant.id}`} className="flex gap-2 font-bold sm:justify-center justify-end items-center sm:w-[unset] w-full sm:text-[unset] text-right"><img src="/img/icons/edit.svg" />Edit</NavLink>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};
