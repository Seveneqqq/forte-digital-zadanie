import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";

export const EditParticipant: React.FC = () => {
  const { id } = useParams();

  useEffect(() => {
    //TODO: get participant from REST api http://localhost:3001/participants/:id
    console.log(`I want to get participant with id: ${id}!`);
  }, [id]);

  return (
    <section className="flex flex-col gap-10">
            <header className="flex justify-between items-center">
              <h1 className="md:text-[40px] text-[30px] font-medium leading-[46.88px]">Edit participant</h1>
              <NavLink to="/" className="absolute top-10">
                <button className="flex gap-2 py-3 justify-center items-center font-medium"><img src="/img/icons/back-arrow.svg"/>Back to list</button>
              </NavLink>
            </header>
            <form className="w-full flex flex-col gap-10">
              <div className="flex flex-col gap-2 items-start">
                <label className="block text-sm font-medium text-gray-700">Full name *</label>
                <input type="text" className="w-full px-3 py-2 border-gray-300 border-2 focus:outline-none focus:ring-blue-500" placeholder="John Doe" />
              </div>
              <div className="flex flex-col gap-2 items-start">
                <label className="block text-sm font-medium text-gray-700">Email address *</label>
                <input type="text" className="w-full px-3 py-2 border-gray-300 border-2 focus:outline-none focus:ring-blue-500" placeholder="John Doe" />
              </div>
              <div className="flex gap-4 w-full">
                <div className="flex flex-col items-start w-full">
                  <label className="block text-sm font-medium text-gray-700">Company name</label>
                  <input type="date" className="w-full px-3 py-2 border-gray-300 border-2 focus:outline-none focus:ring-blue-500" placeholder="Acme Inc." />
                </div>
                <div className="flex flex-col items-start w-full">
                  <label className="block text-sm font-medium text-gray-700">Position</label>
                  <input type="date" className="w-full px-3 py-2 border-gray-300 border-2 focus:outline-none focus:ring-blue-500" placeholder="Software Engineer" />
                </div>
              </div>
              <button className="px-10 py-3 w-[224px] bg-[#222222] text-white">Submit</button>
            </form>
        </section>
  );
};
