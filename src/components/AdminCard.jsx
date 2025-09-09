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
    <div className="border rounded-2xl p-5 shadow-lg hover:shadow-2xl transition duration-300 bg-white flex flex-col gap-3 w-full "
    >
      <h3 className="text-xl font-bold text-gray-800">{ticket.title}</h3>
      <p className="text-gray-600">{ticket.description}</p>

      <div className="flex justify-between flex-wrap gap-2 mt-2">
        <span className={`px-3 py-1 rounded-full font-semibold ${getPriorityColor(ticket.priority)}`}>
          {ticket.priority}
        </span>
        <span className={`px-3 py-1 rounded-full font-semibold ${getStatusColor(ticket.status)}`}>
          {ticket.status}
        </span>
        <span className="text-gray-500">userId: {ticket.id}</span>
        <span className="text-gray-500">TicketId: {ticket.ticketId}</span>
      </div>

      <div className="flex gap-2 flex-wrap mt-3">
        <button
          className="flex-1 p-2 bg-red-500 text-white font-semibold rounded-2xl hover:bg-red-600 transition"
          onClick={() => onDelete(ticket.ticketId)}
        >
          Delete
        </button>

        <button
          className="flex-1 p-2 bg-blue-500 text-white font-semibold rounded-2xl hover:bg-blue-600 transition"
          onClick={() => setIsModalOpen(true)}
        >
          Edit
        </button>

        <button className="border p-1 rounded-xl bg-green-500 text-white font-semibold" onClick={() => navigate(`/ticket/${ticket.ticketId}`)}> view </button>

        
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
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
