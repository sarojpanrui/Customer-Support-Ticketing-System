import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { useNavigate } from "react-router-dom";

const Report = () => {
    const [users, setUsers] = useState([]);
    const [tickets, setTickets] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        setUsers(storedUsers);

        const storedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
        setTickets(storedTickets);
    }, []);

    
    function countPriorities(tickets) {
        let lcnt = 0,
            mcnt = 0,
            hcnt = 0;

        tickets.forEach((t) => {
            const priority = t.priority?.toLowerCase().trim();
            if (priority === "low") lcnt++;
            if (priority === "medium") mcnt++;
            if (priority === "high") hcnt++;
        });

        return { lcnt, mcnt, hcnt };
    }

    function statusCounter(tickets) {
        let ocnt = 0,
            processcnt = 0,
            rescnt = 0;

        tickets.forEach((t) => {
            const status = t.status?.toLowerCase().trim().replace(/\s+/g, "");
            if (status === "open") ocnt++;
            if (status === "inprogress") processcnt++;
            if (status === "resolved") rescnt++;
        });

        return { ocnt, processcnt, rescnt };
    }

    const { lcnt, mcnt, hcnt } = countPriorities(tickets);
    const { ocnt, processcnt, rescnt } = statusCounter(tickets);

    function back() {
        navigate(-1)
    }

    return (




        <div className="px-6 py-10 max-w-7xl mx-auto lora">

            <button className="border p-2 border-gray-300 rounded flex gap-2 bg-gray-200 px-2 mb-2 cursor-pointer" onClick={back}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left-icon lucide-arrow-left"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
                Back
            </button>




            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-10">
                User & Ticket Report
            </h1>

            {/* Ticket summary section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {/* Priority stats */}
                <div className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-lg transition">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">
                        Ticket Priority
                    </h2>
                    <div className="flex justify-around text-sm font-medium">
                        <span className="text-green-600">Low: {lcnt}</span>
                        <span className="text-yellow-600">Medium: {mcnt}</span>
                        <span className="text-red-600">High: {hcnt}</span>
                    </div>
                </div>

                {/* Status stats */}
                <div className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-lg transition">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">
                        Ticket Status
                    </h2>
                    <div className="flex justify-around text-sm font-medium">
                        <span className="text-blue-600">Open: {ocnt}</span>
                        <span className="text-yellow-600">In Progress: {processcnt}</span>
                        <span className="text-green-600">Resolved: {rescnt}</span>
                    </div>
                </div>

                {/* Total tickets */}
                <div className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-lg transition">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">
                        Total Tickets
                    </h2>
                    <p className="text-2xl font-bold text-indigo-600">
                        {tickets.length}
                    </p>
                </div>
            </div>

            {/* User list */}
            <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
                Registered Users
            </h2>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.length > 0 ? (
                users
                    .filter((u) => u.role.toLowerCase() !== "admin") 
                    .map((u, index) => (
                        <UserCard key={u.id || index} user={u} />
                    ))
            ) : (
                <p className="text-gray-500 col-span-full text-center py-6 text-lg">
                    No users found
                </p>
            )}
        </div>


        </div >
    );


};



export default Report;
