import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Form } from "./components/Form";
export const AddParticipant: React.FC = () => {
  
  return (
    <main className="bg-[#F7F7F7] lg:w-[800px] w-full lg:px-[68px] px-[32px] lg:pt-[40px] pt-[20px] lg:pb-[40px] pb-[20px] self-center">
      <section className="flex flex-col gap-10">
          <header className="flex justify-between items-center">
            <h1 className="md:text-[40px] text-[30px] font-medium leading-[46.88px]">Add participant</h1>
            <NavLink to="/" className="absolute lg:top-10 md:top-9 top-5 lg:right-[unset] right-20">
              <button className="flex gap-2 py-3 justify-center items-center font-medium"><img src="/img/icons/back-arrow.svg"/>Back to list</button>
            </NavLink>
          </header>
          <Form newParticipant={true} />
      </section>
    </main>
  );
};
