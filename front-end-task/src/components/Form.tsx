import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

interface UserData {
  name?: string;
  email?: string;
  workStart?: Date;
  workEnd?: Date;
  newParticipant?: boolean;
}

interface FormState {
  name: string;
  email: string;
  workStart: string;
  workEnd: string;
}

interface FormErrors {
  name: string;
  email: string;
  workStart: string;
  workEnd: string;
}

export const Form: React.FC<UserData> = ({
  name = "",
  email = "",
  workStart = undefined,
  workEnd = undefined,
  newParticipant = false,
}) => {

    const { id } = useParams();
    const workStartRef = useRef<HTMLInputElement>(null);
    const workEndRef = useRef<HTMLInputElement>(null);

  const [formState, setFormState] = useState<FormState>({
    name: name,
    email: email,
    workStart: formatDate(workStart),
    workEnd: formatDate(workEnd),
  });

  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    email: "",
    workStart: "",
    workEnd: "",
  });

  useEffect(() => {
    setFormState({
      name: name,
      email: email,
      workStart: formatDate(workStart),
      workEnd: formatDate(workEnd),
    });
  }, [name, email, workStart, workEnd]);

  function formatDate(date?: Date) {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateRequiredFields = () => {
    return (
      formState.name.trim() !== "" &&
      formState.email.trim() !== "" &&
      formState.workStart.trim() !== "" &&
      formState.workEnd.trim() !== ""
    );
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(formState.email);
  };

  const validateDates = () => {
    const start = new Date(formState.workStart);
    const end = new Date(formState.workEnd);
    return start <= end;
  };

  const ErrorIcon = () => {
    return (
      <img
        src="/img/icons/error.svg"
        alt="error"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-[20px] h-[20px]"
      />
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({
      name: "",
      email: "",
      workStart: "",
      workEnd: "",
    });

    let newErrors: FormErrors = {
      name: "",
      email: "",
      workStart: "",
      workEnd: "",
    };

    if (formState.name.trim() === "") {
      newErrors.name = "This field is required";
    }

    if (formState.email.trim() === "") {
      newErrors.email = "This field is required";
    } else if (!validateEmail()) {
      newErrors.email = "Invalid email address";
    }

    if (formState.workStart.trim() === "") {
      newErrors.workStart = "This date is not correct";
    }

    if (formState.workEnd.trim() === "") {
      newErrors.workEnd = "This date is not correct";
    }

    if (formState.workStart && formState.workEnd && !validateDates()) {
      newErrors.workEnd = "This date is not correct";
    }

    if (Object.values(newErrors).some((error) => error !== "")) {
      setErrors(newErrors);
      return;
    }

    console.log(formState);

    try {
      if (!newParticipant) {
        const response = await fetch(
          `http://localhost:3001/participants/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formState),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log("Participant updated successfully");
        alert("Participant updated successfully");
      } else {
        const response = await fetch(`http://localhost:3001/participants`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formState),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log("Participant created successfully");
        alert("Participant created successfully");
      }
    } catch (error) {
      alert("Error updating participant");
      console.log("Something goes wrong:" + error);
    }
  };

  return (
    <form className="w-full flex flex-col gap-10" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 items-start">
            <label className="block text-sm font-bold text-gray-700">
                Full name *
            </label>
            <div className="w-full relative">
                <input
                    type="text"
                    name="name"
                    className={`w-full px-3 py-2 border-2 bg-transparent focus:outline-none focus:ring-blue-500 ${
                        errors.name ? "border-[#A3270C] shadow-[0_0_0_2px_#A3270C]" : "border-gray-900"
                    }`}
                    value={formState.name}
                    onChange={handleChange}
                />
                {errors.name && <ErrorIcon />}
            </div>
            {errors.name && (
                <span className="text-[#A3270C] text-sm">{errors.name}</span>
            )}
        </div>

        <div className="flex flex-col gap-2 items-start">
            <label className="block text-sm font-bold text-gray-700">
                Email address *
            </label>
            <div className="w-full relative">
                <input
                    type="email"
                    name="email"
                    className={`w-full px-3 py-2 border bg-transparent focus:outline-none focus:ring-blue-500 ${
                        errors.email ? "border-[#A3270C] shadow-[0_0_0_2px_#A3270C]" : "border-gray-900"
                    }`}
                    value={formState.email}
                    onChange={handleChange}
                />
                {errors.email && <ErrorIcon />}
            </div>
            {errors.email && (
                <span className="text-[#A3270C] text-sm">{errors.email}</span>
            )}
        </div>

        <div className="flex flex-col md:flex-row md:gap-4 gap-10 w-full">
           <div className="flex flex-col items-start w-full gap-2">
               <label className="block text-sm font-bold text-gray-700">Work start *</label>
               <div className="w-full flex">
                   <input
                       ref={workStartRef}
                       type="date"
                       name="workStart"
                       placeholder="DD.MM.RRRR"
                       className={`w-full px-3 py-2 border border-r-0 [&::-webkit-calendar-picker-indicator]:hidden bg-transparent focus:outline-none focus:ring-blue-500 font-normal ${
                           errors.workStart ? 'border-[#A3270C] shadow-[0_0_0_2px_#A3270C]' : 'border-gray-900'
                       }`}
                       value={formState.workStart}
                       onChange={handleChange}
                   />
                   <div 
                       onClick={() => workStartRef.current?.showPicker()}
                       className={`px-3 flex items-center justify-center border border-l ${
                           errors.workStart ? 'border-[#A3270C] shadow-[0_0_0_2px_#A3270C]' : 'border-gray-900'
                       }`}
                   >
                       <img 
                           src="/img/icons/calendar.svg" 
                           alt="calendar" 
                           className="w-5 h-5"
                       />
                   </div>
               </div>
               {errors.workStart && (
                   <span className="text-[#A3270C] text-sm">{errors.workStart}</span>
               )}
           </div>
           <div className="flex flex-col items-start w-full gap-2">
               <label className="block text-sm font-bold text-gray-700">Work end *</label>
               <div className="w-full flex">
                   <input
                       ref={workEndRef}
                       type="date"
                       name="workEnd"
                       placeholder="DD.MM.RRRR"
                       className={`w-full px-3 py-2 border border-r-0 [&::-webkit-calendar-picker-indicator]:hidden bg-transparent focus:outline-none focus:ring-blue-500 font-normal ${
                           errors.workEnd ? 'border-[#A3270C] shadow-[0_0_0_2px_#A3270C]' : 'border-gray-900'
                       }`}
                       value={formState.workEnd}
                       onChange={handleChange}
                   />
                   <div 
                       onClick={() => workEndRef.current?.showPicker()}
                       className={`px-3 flex items-center justify-center border border-l ${
                           errors.workEnd ? 'border-[#A3270C] shadow-[0_0_0_2px_#A3270C]' : 'border-gray-900'
                       }`}
                   >
                       <img 
                           src="/img/icons/calendar.svg" 
                           alt="calendar" 
                           className="w-5 h-5"
                       />
                   </div>
               </div>
               {errors.workEnd && (
                   <span className="text-[#A3270C] text-sm">{errors.workEnd}</span>
               )}
           </div>
       </div>

       <button
           type="submit"
           className="px-10 py-3 w-56 bg-gray-900 text-white hover:bg-gray-800 transition-colors"
       >
           Submit
       </button>
   </form>
);
};
