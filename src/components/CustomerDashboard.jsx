import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import Card from "./Card";
import AdminCard from "./AdminCard";
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
    toast.success("Deleted successfully");
  };

  const handleUpdate = (ticketId, updatedTicket) => {
    const updatedTickets = authTickets.map((t) =>
      t.ticketId === ticketId
        ? { ...t, ...updatedTicket, updatedAt: new Date().toLocaleString() }
        : t
    );

    setAuthTickets(updatedTickets);
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar (fixed overlay / slide) */}
      <Profile />

      {/* Main Content - full width */}
      <div className="flex-1 p-4 overflow-auto bg-gray-50">
        {/* Navbar */}
        <nav className="border p-4 flex flex-col md:flex-col lg:flex-row justify-between items-center gap-3 rounded-lg bg-white shadow-sm mb-6 border-gray-300 merriweather">
          <p className="text-center font-bold text-2xl md:text-2xl merriweather">
            WELCOME, {name}
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
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>

            {/* Add Ticket Button */}
            <button
              className="p-2 border rounded-xl bg-green-400 border-gray-300 text-white font-semibold hover:bg-green-500 transition"
              onClick={formRender}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-symlink-icon lucide-file-symlink"><path d="m10 18 3-3-3-3" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M4 11V4a2 2 0 0 1 2-2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h7" /></svg>

            </button>
          </div>
        </nav>

        {/* User Tickets */}
        <h1 className="text-2xl font-semibold text-center underline open-sans">
          Your Tickets
        </h1>
        {filteredTickets.length === 0 ? (
          <p className="text-gray-500 text-center mt-10 flex justify-center align-middle">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-folder-x-icon lucide-folder-x"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" /><path d="m9.5 10.5 5 5" /><path d="m14.5 10.5-5 5" className=" " /></svg>
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

        {/* All Tickets */}
        <h1 className="text-2xl font-semibold text-center underline mt-5 open-sans">
          All Tickets
        </h1>
        {Tickets.length === 0 ? (
          <p className="text-gray-500 text-center mt-10 flex justify-center align-middle">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-folder-x-icon lucide-folder-x"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" /><path d="m9.5 10.5 5 5" /><path d="m14.5 10.5-5 5" /></svg> 

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
              <Card key={index} ticket={ticket} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;