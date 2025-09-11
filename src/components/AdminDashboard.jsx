import Profile from "./Profile";
import { useEffect, useState } from "react";
import AdminCard from "./AdminCard";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [name, setName] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Fetch all tickets from localStorage
  useEffect(() => {
    const storedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    setTickets(storedTickets);

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setName(loggedInUser.username.toUpperCase());
    }
  }, []);

  const handleDelete = (ticketId) => {
    const updatedTickets = tickets.filter(
      (ticket) => ticket.ticketId !== ticketId
    );
    setTickets(updatedTickets);
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
    toast.success("Deleted successfully");
  };

  const handleUpdate = (ticketId, updatedTicket) => {
    const updatedTickets = tickets.map((t) =>
      t.ticketId === ticketId
        ? { ...t, ...updatedTicket, updatedAt: new Date().toLocaleString() }
        : t
    );

    setTickets(updatedTickets);
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
  };

  // Filter tickets based on priority and status
  const filteredTickets = tickets.filter((ticket) => {
    const priorityMatch =
      priorityFilter === "All" || ticket.priority === priorityFilter;
    const statusMatch =
      statusFilter === "All" || ticket.status === statusFilter;
    return priorityMatch && statusMatch;
  });

  return (
    <div className="flex h-screen">
      {/* Sidebar (fixed overlay on mobile, fixed left on desktop) */}
      <Profile />

      {/* Main Content (always full width) */}
      <div className="flex-1 p-4 overflow-auto bg-gray-50">
        {/* Navbar */}
        <nav className="border p-4 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0 rounded-lg bg-white shadow-sm mb-6 border-gray-300 merriweather">
          <p className="text-center font-bold text-2xl md:text-3xl merriweather">
            WELCOME {name}
          </p>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
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
          </div>
        </nav>

        {/* Tickets */}
        {filteredTickets.length === 0 ? (
          <p className="text-gray-500 text-center mt-10 flex justify-center align-middle flex-col">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-folder-x-icon lucide-folder-x"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" /><path d="m9.5 10.5 5 5" /><path d="m14.5 10.5-5 5" /></svg> 
           
           
          </p>
        ) : (
          <div
            className="grid gap-8 mt-5
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
      </div>
    </div>
  );
};

export default AdminDashboard;