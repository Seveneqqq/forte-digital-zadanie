import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export const AddParticipant: React.FC = () => {
  
  return (
    <section>
      <header>
        <h1>Participants Add</h1>
        <NavLink to="/participants/new">Add new participant</NavLink>
      </header>
    </section>
  );
};
