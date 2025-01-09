import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Form } from "./components/Form";
export const AddParticipant: React.FC = () => {
  
  return (
    <main className="bg-[#F7F7F7] xl:w-[800px] w-full xl:px-[68px] px-[32px] xl:pt-[40px] pt-[20px] xl:pb-[40px] pb-[20px] self-center">
      <section className="flex flex-col gap-10">
          <header className="flex justify-between items-center">
            <h1 className="md:text-[40px] text-[30px] font-medium leading-[46.88px]">Add participant</h1>
            <NavLink to="/" className="absolute top-10">
              <button className="flex gap-2 py-3 justify-center items-center font-medium"><img src="/img/icons/back-arrow.svg"/>Back to list</button>
            </NavLink>
          </header>
          <Form />
      </section>
    </main>
  );
};
