import React, { useState,useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Form } from "./components/Form";

interface participant{
  id: number;
  name: string;
  email: string;
  workStart: Date;
  workEnd: Date;
}

export const EditParticipant: React.FC = () => {

  const [participant, setParticipant] = useState<participant | null>(null);
  const { id } = useParams();

  const getParticipant = async() => {
    const response = await fetch(`http://localhost:3001/participants/${id}`);
    const participant = await response.json();
    setParticipant(participant); 
  }

  useEffect(() => {
    getParticipant();
    console.log(`I want to get participant with id: ${id}!`);
  }, [id]);

  return (
    <main className="bg-[#F7F7F7] xl:w-[800px] w-full xl:px-[68px] px-[32px] xl:pt-[40px] pt-[20px] xl:pb-[40px] pb-[20px] self-center">
      <section className="flex flex-col gap-10">
            <header className="flex justify-between items-center">
              <h1 className="md:text-[40px] text-[30px] font-medium leading-[46.88px]">Edit participant</h1>
              <NavLink to="/" className="absolute top-10">
                <button className="flex gap-2 py-3 justify-center items-center font-medium"><img src="/img/icons/back-arrow.svg"/>Back to list</button>
              </NavLink>
            </header>
            <Form fullName = {participant?.name} emailAddress = {participant?.email} workStart={participant?.workStart} workEnd={participant?.workEnd}/>
        </section>
      </main>
  );
};
