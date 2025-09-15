import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import Card from "./Card";
import AdminCard from "./AdminCard";
import { toast } from "react-toastify";
import CustomerCard from "./CustomerCard";

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
      const allTickets = tickets.filter((ticket) => ticket.id !== userId);
      setTickets(allTickets);

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
    // Get all tickets from localStorage
    const allTickets = JSON.parse(localStorage.getItem("tickets")) || [];

    // Remove the ticket from all tickets
    const updatedAllTickets = allTickets.filter(
      (ticket) => ticket.ticketId !== ticketId
    );

    // Update localStorage
    localStorage.setItem("tickets", JSON.stringify(updatedAllTickets));

    // Update user’s tickets
    const updatedAuthTickets = updatedAllTickets.filter(
      (ticket) => ticket.id === userId
    );
    setAuthTickets(updatedAuthTickets);

    // Update "All Tickets" list
    const updatedOtherTickets = updatedAllTickets.filter(
      (ticket) => ticket.id !== userId
    );
    setTickets(updatedOtherTickets);

    toast.success("Deleted successfully");
  };


 const handleUpdate = (ticketId, updatedTicket) => {
  // Get all tickets
  const allTickets = JSON.parse(localStorage.getItem("tickets")) || [];

  // Update the specific ticket across all tickets
  const updatedAllTickets = allTickets.map((t) =>
    t.ticketId === ticketId
      ? { ...t, ...updatedTicket, updatedAt: new Date().toLocaleString() }
      : t
  );

  // Save back to localStorage
  localStorage.setItem("tickets", JSON.stringify(updatedAllTickets));

  // Update state for user’s tickets
  const updatedAuthTickets = updatedAllTickets.filter((t) => t.id === userId);
  setAuthTickets(updatedAuthTickets);

  // Update state for "All Tickets" section
  const updatedOtherTickets = updatedAllTickets.filter((t) => t.id !== userId);
  setTickets(updatedOtherTickets);
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

            {/* kanaban board */}


            <div
              className="relative group border px-3 py-2 rounded-lg border-gray-300 shadow-md cursor-pointer hover:shadow-lg transition flex justify-center"
              onClick={() => { navigate('/drag') }}
            >
              {/* Hover text (outside border, slides up) */}
              <p
                className="absolute top-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-top-6 transition-all duration-300 text-lg font-medium text-gray-700"
              >
                Kanaban
              </p>

              {/* Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play-icon lucide-play"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" /></svg>


            </div>

            {/* Priority Filter */}
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="border px-3 py-2 rounded-lg shadow-sm border-gray-300"
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
              className="border px-3 py-2 rounded-lg shadow-sm border-gray-300"
            >
              <option value="All">All Statuses</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>




            {/* Add Ticket Button */}

            <button
              onClick={formRender}
              className="relative group flex items-center gap-2 py-2 px-3 border rounded-xl bg-green-400 border-gray-300 text-white font-semibold hover:bg-green-500 transition cursor-pointer delay-700 duration-700"
            >
              {/* Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-file-symlink-icon"
              >
                <path d="m10 18 3-3-3-3" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                <path d="M4 11V4a2 2 0 0 1 2-2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h7" />
              </svg>

              {/* Text appears only on hover */}
              <p
                className="absolute top-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-top-6 transition-all duration-300 text-lg font-medium text-gray-700"
              >
                AddTickets
              </p>
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
              <CustomerCard
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