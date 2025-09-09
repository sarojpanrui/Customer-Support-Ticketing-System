import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TicketDetail = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTickets = localStorage.getItem("tickets");
    if (storedTickets) {
      const tickets = JSON.parse(storedTickets);
      const foundTicket = tickets.find((t) => t.ticketId ===Number(id));
      setTicket(foundTicket);
    }
  }, [id]);

  if (!ticket) {
    return <p className="p-4 text-gray-500">Ticket not found.</p>;
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "bg-red-200 text-red-800";
      case "Medium": return "bg-yellow-200 text-yellow-800";
      case "Low": return "bg-green-200 text-green-800";
      default: return "bg-gray-200 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Open": return "bg-blue-200 text-blue-800";
      case "In Progress": return "bg-purple-200 text-purple-800";
      case "Closed": return "bg-gray-200 text-gray-800";
      default: return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <button
        className="mb-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-2">{ticket.title}</h2>
        <p className="text-gray-600 mb-4">{ticket.description}</p>
        <div className="flex gap-4">
          <span className={`px-2 py-8 rounded-full text-xs font-semibold ${getPriorityColor(ticket.priority)}`}>
            {ticket.priority}
          </span>
          <span className={`px-3 py-5 rounded-full text-xs font-semibold ${getStatusColor(ticket.status)}`}>
            {ticket.status}
          </span>

          <span className="border bg-gray-200 rounded-2xl px-1 border-gray-300">Create at :{ticket.createdAt}</span>


          <span className="border bg-gray-200 rounded-2xl px-2 border-gray-300">Update at : {ticket.updatedAt}</span>


        </div>
      </div>
    </div>
  );
};

export default TicketDetail;