import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export const AddParticipant: React.FC = () => {
  
  return (
    <section className="flex flex-col gap-10">
        <header className="flex justify-between items-center">
          <h1 className="md:text-[40px] text-[30px] font-medium leading-[46.88px]">Add participant</h1>
          <NavLink to="/" className="absolute top-10">
            <button className="flex gap-2 py-3 justify-center items-center font-medium"><img src="/img/icons/back-arrow.svg"/>Back to list</button>
          </NavLink>
        </header>
        <ul className="w-full">
            
        </ul>
    </section>
  );
};
