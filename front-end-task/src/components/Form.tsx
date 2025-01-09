import React, { useEffect } from "react";

interface UserData {
    fullName?: string;
    emailAddress?: string;
    workStart?: Date;
    workEnd?: Date;
}

export const Form: React.FC<UserData> = ({
    fullName = "",
    emailAddress = "",
    workStart,
    workEnd,
}) => {
    
    const formatDate = (date?: Date) => {
        if (!date) return "";
        return new Date(date).toISOString().split('T')[0];
    };

    return (
        <form className="w-full flex flex-col gap-10">
            <div className="flex flex-col gap-2 items-start">
                <label className="block text-sm font-medium text-gray-700">Full name *</label>
                <input 
                    type="text" 
                    className="w-full px-3 py-2 border-[#222222] bg-transparent border-2 focus:outline-none focus:ring-blue-500" 
                    value={fullName}
                />
            </div>
            <div className="flex flex-col gap-2 items-start">
                <label className="block text-sm font-medium text-gray-700">Email address *</label>
                <input 
                    type="text" 
                    className="w-full px-3 py-2 border-[#222222] bg-transparent border-[1px] focus:outline-none focus:ring-blue-500" 
                    value={emailAddress} 
                />
            </div>
            <div className="flex gap-4 w-full">
                <div className="flex flex-col items-start w-full">
                    <label className="block text-sm font-medium text-gray-700">Work start</label>
                    <input 
                        type="date" 
                        className="w-full px-3 py-2 border-[#222222] bg-transparent border-[1px] focus:outline-none focus:ring-blue-500" 
                        value={formatDate(workStart)}
                    />
                </div>
                <div className="flex flex-col items-start w-full">
                    <label className="block text-sm font-medium text-gray-700">Work end</label>
                    <input 
                        type="date" 
                        className="w-full px-3 py-2 border-[#222222] bg-transparent border-[1px] focus:outline-none focus:ring-blue-500" 
                        value={formatDate(workEnd)}
                    />
                </div>
            </div>
            <button className="px-10 py-3 w-[224px] bg-[#222222] text-white">Submit</button>
        </form>
    );
};