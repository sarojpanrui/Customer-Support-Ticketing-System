import Profile from "./Profile";
import { useEffect, useState } from "react";
import AdminCard from "./AdminCard";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


const AdminDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [name, setName] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [user, setUser] = useState('');
  const [search, setSearch] = useState('');


  const navigate = useNavigate();

  // Fetch all tickets from localStorage
  useEffect(() => {
    const storedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    setTickets(storedTickets);

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setName(loggedInUser.username.toUpperCase());
    }

    const user = JSON.parse(localStorage.getItem('users')) || [];
    setUser(user);
  }, []);




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
        const updatedTickets = tickets.filter(
          (ticket) => ticket.ticketId !== ticketId
        );
        setTickets(updatedTickets);
        localStorage.setItem("tickets", JSON.stringify(updatedTickets));
        // toast.success("Deleted successfully");



        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });

  };









  const handleUpdate = (ticketId, updatedTicket) => {
    const updatedTickets = tickets.map((t) =>
      t.ticketId === ticketId
        ? { ...t, ...updatedTicket, updatedAt: new Date().toLocaleString() }
        : t
    );

    setTickets(updatedTickets);
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));

    Swal.fire({
      position: "top-middle",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500
    });


  };





  // Filter tickets based on priority and status
  const filteredTickets = tickets.filter((ticket) => {
    const priorityMatch =
      priorityFilter === "All" || ticket.priority === priorityFilter;
    const statusMatch =
      statusFilter === "All" || ticket.status === statusFilter;

    const matchSearch = ticket.title.toLowerCase().includes(search.toLowerCase());


    return priorityMatch && statusMatch && matchSearch;
  });





  // report status

  const report = () => {
    // console.log(user);
    navigate('/report')
  }

  



  return (
    <div className="flex h-screen">
      {/* Sidebar (fixed overlay on mobile, fixed left on desktop) */}
      <Profile />

      {/* Main Content (always full width) */}
      <div className="flex-1 p-4 overflow-auto bg-gray-50">



        {/* Navbar */}
        <nav className="border p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-lg bg-white shadow-sm mb-6 border-gray-300 merriweather">

          {/* Search Bar */}
          <div className="w-full md:w-1/2">
            <input
              className="w-full border p-2 rounded-lg border-gray-300 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter title for search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Filters + Actions */}
          <div className="flex flex-wrap justify-center md:justify-end gap-3 w-full md:w-1/2">

            {/* Kanban board */}
            <div
              className="relative group border p-3 rounded-lg border-gray-300 shadow-md cursor-pointer hover:shadow-lg transition flex justify-center"
              onClick={() => navigate('/drag')}
            >
              <p className="absolute top-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-top-6 transition-all duration-300 text-sm font-medium text-gray-700">
                Kanban
              </p>
              <svg xmlns="http://www.w3.org/2000/svg"
                width="20" height="20"
                viewBox="0 0 24 24"
                fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="text-indigo-600 group-hover:text-indigo-800 transition"
              >
                <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
              </svg>
            </div>

            {/* Report */}
            <div
              className="relative group border p-3 rounded-lg border-gray-300 shadow-md cursor-pointer hover:shadow-lg transition"
              onClick={report}
            >
              <p className="absolute top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:-top-6 transition-all duration-300 text-sm font-medium text-gray-700">
                Stats
              </p>
              <svg xmlns="http://www.w3.org/2000/svg"
                width="20" height="20"
                viewBox="0 0 24 24"
                fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="mx-auto text-indigo-600 group-hover:text-indigo-800 transition"
              >
                <path d="M5 21v-6" />
                <path d="M12 21V3" />
                <path d="M19 21V9" />
              </svg>
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
          </div>
        </nav>







        {/* Tickets */}
        {filteredTickets.length === 0 ? (
          <p className="text-gray-500 text-center mt-10 flex justify-center align-middle ">
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