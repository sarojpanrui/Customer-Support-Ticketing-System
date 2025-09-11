import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const AdminCard = ({ ticket, onDelete, onUpdate }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedTicket, setEditedTicket] = useState({ ...ticket });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "bg-red-500 text-white";
      case "Medium": return "bg-yellow-400 text-black";
      case "Low": return "bg-green-400 text-white";
      default: return "bg-gray-300 text-black";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Open": return "bg-gray-200 text-gray-800";
      case "In Progress": return "bg-blue-400 text-white";
      case "Resolved": return "bg-green-500 text-white";
      default: return "bg-gray-300 text-black";
    }
  };

  // Save edited ticket
  const handleSave = () => {
    onUpdate(ticket.ticketId, editedTicket);
    setIsModalOpen(false);
  };

  return (
    <div className="border rounded-2xl p-5 shadow-lg hover:shadow-2xl transition duration-300 bg-white flex flex-col gap-3 w-full lora h-full min-h-[300px] max-h-[400px] overflow-hidden"
    >
      <h3 className="lg:text-2xl font-bold text-gray-800  truncate md:text-xl text-lg">{ticket.title}</h3>
      <p className="text-gray-900 line-clamp-3 md:text-sm truncate">{ticket.description}</p>

      <div className="flex justify-between flex-wrap gap-2 mt-2 ">
        <span className={`px-3 py-1 rounded-full font-semibold ${getPriorityColor(ticket.priority)} md:text-[15px]`}>
          {ticket.priority}
        </span>
        <span className={`px-3 py-1 rounded-full font-semibold ${getStatusColor(ticket.status)} md:text-[15px]`}>
          {ticket.status}
        </span>
      </div>

      <div className="flex flex-col md:text-[15px] text-xs">
        <span className="">USER ID: {ticket.id}</span>
        <span className="">USERNAME: {ticket.user}</span>
        <span className="">TICKET ID: {ticket.ticketId}</span>
      </div>





      <div className="flex lg:gap-10 md:gap-6 gap-4 mx-auto  mt-3 justify-center border p-2 rounded-2xl border-gray-300 bg-gray-300 w-full">
        <button
          className="cursor-pointer"
          onClick={() => onDelete(ticket.ticketId)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
        </button>

        <button
          className="cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen-icon lucide-square-pen"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" /></svg>
        </button>

        <button className="cursor-pointer" onClick={() => navigate(`/ticket/${ticket.ticketId}`)}> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-icon lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /><circle cx="12" cy="12" r="3" /></svg> </button>


      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Ticket</h2>

            <input
              type="text"
              value={editedTicket.title}
              onChange={(e) => setEditedTicket({ ...editedTicket, title: e.target.value })}
              className="w-full mb-3 p-2 border rounded-lg"
              placeholder="Title"
            />

            <textarea
              value={editedTicket.description}
              onChange={(e) => setEditedTicket({ ...editedTicket, description: e.target.value })}
              className="w-full mb-3 p-2 border rounded-lg"
              placeholder="Description"
            />

            <select
              value={editedTicket.priority}
              onChange={(e) => setEditedTicket({ ...editedTicket, priority: e.target.value })}
              className="w-full mb-3 p-2 border rounded-lg"
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

            <select
              value={editedTicket.status}
              onChange={(e) => setEditedTicket({ ...editedTicket, status: e.target.value })}
              className="w-full mb-3 p-2 border rounded-lg"
            >
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                onClick={handleSave}
              >
                Save
              </button>



            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCard;
