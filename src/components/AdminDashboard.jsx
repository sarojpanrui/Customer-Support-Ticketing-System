
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
    toast.success('Deleted successfully')
  };

 const handleUpdate = (ticketId, updatedTicket) => {
  const now = new Date().toISOString(); // current timestamp

  const updatedTickets = tickets.map((t) =>
    t.ticketId === ticketId 
      ? { ...t, ...updatedTicket, updatedAt: new Date().toLocaleString(), } // merge new data + timestamp
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
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-1/4">
        <Profile />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-auto bg-gray-50">
        {/* Navbar */}
        <nav className="border p-4 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0 rounded-lg bg-white shadow-sm mb-6 border-gray-300">
          <p className="text-center font-bold text-2xl md:text-3xl">
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
              <option value="Open">open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </nav>

        {/* Tickets */}
        {filteredTickets.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">
            No tickets match the selected filters.
          </p>
        ) : (
          <div className="grid gap-5 mt-5 flex-wrap sm:grid-cols-2 lg:grid-cols-3">
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
