import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import Card from "./Card";
import AdminCard from "./AdminCard";
import { toast } from "react-toastify";
import CustomerCard from "./CustomerCard";
import Swal from 'sweetalert2';


const CustomerDashboard = () => {
  const navigate = useNavigate();

  const [name, setName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [authTickets, setAuthTickets] = useState([]);
  const [Tickets, setTickets] = useState([]);
  const [search, SetSearch] = useState('')

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

    const matchSearch = ticket.title.toLowerCase().includes(search.toLowerCase());
    return priorityMatch && statusMatch && matchSearch;

    // return priorityMatch && statusMatch ;
  });

  const handleDelete = (ticketId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {


        const allTickets = JSON.parse(localStorage.getItem("tickets")) || [];

        const updatedAllTickets = allTickets.filter(
          (ticket) => ticket.ticketId !== ticketId
        );

        localStorage.setItem("tickets", JSON.stringify(updatedAllTickets));

        const updatedAuthTickets = updatedAllTickets.filter(
          (ticket) => ticket.id === userId
        );
        setAuthTickets(updatedAuthTickets);

        const updatedOtherTickets = updatedAllTickets.filter(
          (ticket) => ticket.id !== userId
        );
        setTickets(updatedOtherTickets);

        Swal.fire("Deleted!", "Your ticket has been deleted.", "success");
        // toast.success("Deleted successfully");
      }
    });
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

    Swal.fire({
      position: "top-middle",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500
    });


  };






  return (
    <div className="flex h-screen">
      {/* Sidebar (fixed overlay / slide) */}
      <Profile />

      {/* Main Content - full width */}
      <div className="flex-1 p-4 overflow-auto bg-gray-50">





        {/* Navbar */}
        <nav className="border p-4 flex flex-col lg:flex-row justify-between items-center gap-4 rounded-lg bg-white shadow-sm mb-6 border-gray-300 merriweather">

          {/* Search Bar */}
          <div className="w-full lg:w-1/2">
            <input
              className="w-full border p-2 rounded-lg border-gray-300 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter title for search..."
              value={search}
              onChange={(e) => SetSearch(e.target.value)}
            />
          </div>

          {/* Filters + Add Ticket */}
          <div className="flex flex-wrap gap-3 items-center justify-center lg:justify-end w-full lg:w-1/2">

            {/* Priority Filter */}
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="border px-3 py-2 rounded-lg shadow-sm border-gray-300 cursor-pointer"
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
              className="border px-3 py-2 rounded-lg shadow-sm border-gray-300 cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>

            {/* Add Ticket Button */}
            <button
              onClick={formRender}
              className="relative group flex items-center gap-2 py-2 px-3 border rounded-xl bg-green-400 border-gray-300 text-white font-semibold hover:bg-green-500 transition duration-300 cursor-pointer"
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

              {/* Text on hover */}
              <p className="absolute top-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-top-6 transition-all duration-300 text-lg font-medium text-gray-700">
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
        {/* <h1 className="text-2xl font-semibold text-center underline mt-5 open-sans">
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
        )} */}




      </div>
    </div>
  );
};

export default CustomerDashboard;