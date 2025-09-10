import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import Card from "./Card";
import AdminCard from './AdminCard'
import { toast } from "react-toastify";

const CustomerDashboard = () => {
  const navigate = useNavigate();

  const [name, setName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [authTickets, setAuthTickets] = useState([]);
  const [Tickets, setTickets] = useState([]);


  // Filters
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Get logged-in user info
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setName(loggedInUser.username.toUpperCase());
      setUserId(loggedInUser.id);
    }
  }, []);

  // Get tickets for the logged-in user
  useEffect(() => {
    if (userId) {
      const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
      setTickets(tickets);
      const filteredTickets = tickets.filter((ticket) => ticket.id === userId);
      setAuthTickets(filteredTickets);
    }
  }, [userId]);

  const formRender = () => {
    navigate("/form");
  };

  // Apply filters
  const filteredTickets = authTickets.filter((ticket) => {
    const priorityMatch =
      priorityFilter === "All" || ticket.priority === priorityFilter;
    const statusMatch =
      statusFilter === "All" || ticket.status === statusFilter;
    return priorityMatch && statusMatch;
  });

  const handleDelete = (ticketId) => {
    const updatedTickets = authTickets.filter(
      (ticket) => ticket.ticketId !== ticketId
    );
    setAuthTickets(updatedTickets);
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
    toast.success('Deleted successfully')
  };

  const handleUpdate = (ticketId, updatedTicket) => {
    const now = new Date().toISOString(); // current timestamp

    const updatedTickets = authTickets.map((t) =>
      t.ticketId === ticketId
        ? { ...t, ...updatedTicket, updatedAt: new Date().toLocaleString(), } // merge new data + timestamp
        : t
    );

    setAuthTickets(updatedTickets);
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
  };


  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-1/4">
        <Profile />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-auto bg-gray-50">
        {/* Navbar */}
        <nav className="border p-4 flex flex-col md:flex-row justify-between items-center gap-3 rounded-lg bg-white shadow-sm mb-6 border-gray-300 merriweather">
          <p className="text-center font-bold text-2xl md:text-3xl merriweather">
            WELCOME,{name}
          </p>

          <div className="flex flex-wrap gap-3 items-center">
            {/* Priority Filter */}
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="border px-3 py-2 rounded-lg shadow-sm"
            >
              <option value="All">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border px-3 py-2 rounded-lg shadow-sm"
            >
              <option value="All">All Statuses</option>
              <option value="Open">open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>

            {/* Add Ticket Button */}
            <button
              className="p-3 border rounded-2xl bg-green-400 border-gray-300 text-white font-semibold"
              onClick={formRender}
            >
              Add Ticket
            </button>
          </div>
        </nav>

        {/* auth Tickets */}
        <h1 className="text-2xl font-semibold text-center underline merriweather">Your Tickets</h1>
        {filteredTickets.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">
            No tickets match the selected filters.
          </p>
        ) : (
          <div
            className="grid gap-5 mt-5 
            sm:grid-cols-1 
            md:grid-cols-2 
            lg:grid-cols-3 
            xl:grid-cols-4"
          >
            {filteredTickets.map((ticket, index) => (
             <AdminCard
                key={index}
                ticket={ticket}
                onDelete={handleDelete}
                onUpdate={handleUpdate}

              />
            ))}
          </div>
        )}

        {/* all tickets */}


        <h1 className="text-2xl font-semibold text-center underline mt-5 merriweather">All Tickets</h1>
        {Tickets.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">
            No tickets match the selected filters.
          </p>
        ) : (
          <div
            className="grid gap-5 mt-5 
            sm:grid-cols-1 
            md:grid-cols-2 
            lg:grid-cols-3 
            xl:grid-cols-4"
          >
            {Tickets.map((ticket, index) => (
             <Card
                key={index}
                ticket={ticket}
                

              />
            ))}
          </div>
        )}









      </div>
    </div>
  );
};

export default CustomerDashboard;
