import React, { useEffect, useState } from "react";
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

export const Form: React.FC<UserData> = ({
    name = "",
    email = "",
    workStart = undefined,
    workEnd = undefined,
    newParticipant = false
}) => {

    const { id } = useParams();

    const [formState, setFormState] = useState<FormState>({
        name: name,
        email: email,
        workStart: formatDate(workStart),
        workEnd: formatDate(workEnd)
    });

    useEffect(() => {
        setFormState({
            name: name,
            email: email,
            workStart: formatDate(workStart),
            workEnd: formatDate(workEnd)
        });
    }, [name, email, workStart, workEnd]);

    function formatDate(date?: Date) {
        if (!date) return "";
        return new Date(date).toISOString().split('T')[0];
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateRequiredFields = () => {
        return (
            formState.name.trim() !== '' && 
            formState.email.trim() !== '' && 
            formState.workStart.trim() !== '' && 
            formState.workEnd.trim() !== ''
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

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        if(!validateRequiredFields()){
            alert('Please fill in all required fields');
            return;
        }
        if(!validateEmail()){
            alert('Invalid email address');
            return;
        }
        if(!validateDates()){
            alert('Start date must be before end date');
            return;
        }

        
        console.log(formState);
        
        
        try {
            if(!newParticipant){

                const response = await fetch(`http://localhost:3001/participants/${id}`,{
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formState)
                })
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                console.log('Participant updated successfully');
                alert('Participant updated successfully');
            }
            else{
                const response = await fetch(`http://localhost:3001/participants`,{
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formState)
                })
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                console.log('Participant created successfully');
                alert('Participant created successfully');

            }
        } catch (error) {
            alert('Error updating participant');
            console.log('Something goes wrong:' +error);
        }
    };

    return (
        <form className="w-full flex flex-col gap-10" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 items-start">
                <label className="block text-sm font-medium text-gray-700">Full name *</label>
                <input
                    type="text"
                    name="name"
                    className="w-full px-3 py-2 border-2 border-gray-900 bg-transparent focus:outline-none focus:ring-blue-500"
                    value={formState.name}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2 items-start">
                <label className="block text-sm font-medium text-gray-700">Email address *</label>
                <input
                    type="email"
                    name="email"
                    className="w-full px-3 py-2 border border-gray-900 bg-transparent focus:outline-none focus:ring-blue-500"
                    value={formState.email}
                    onChange={handleChange}
                />
            </div>

            <div className="flex gap-4 w-full">
                <div className="flex flex-col items-start w-full">
                    <label className="block text-sm font-medium text-gray-700">Work start</label>
                    <input
                        type="date"
                        name="workStart"
                        className="w-full px-3 py-2 border border-gray-900 bg-transparent focus:outline-none focus:ring-blue-500"
                        value={formState.workStart}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col items-start w-full">
                    <label className="block text-sm font-medium text-gray-700">Work end</label>
                    <input
                        type="date"
                        name="workEnd"
                        className="w-full px-3 py-2 border border-gray-900 bg-transparent focus:outline-none focus:ring-blue-500"
                        value={formState.workEnd}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <button type="submit" className="px-10 py-3 w-56 bg-gray-900 text-white hover:bg-gray-800 transition-colors">
                Submit
            </button>
        </form>
    );
};