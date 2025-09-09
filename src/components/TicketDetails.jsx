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
      const foundTicket = tickets.find((t) => t.ticketId === Number(id));
      setTicket(foundTicket);
    }
  }, [id]);

  if (!ticket) {
    return <p className="p-4 text-gray-500 text-center">⚠️ Ticket not found.</p>;
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-700 border border-red-300";
      case "Medium": return "bg-yellow-100 text-yellow-700 border border-yellow-300";
      case "Low": return "bg-green-100 text-green-700 border border-green-300";
      default: return "bg-gray-100 text-gray-700 border border-gray-300";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Open": return "bg-blue-100 text-blue-700 border border-blue-300";
      case "In Progress": return "bg-purple-100 text-purple-700 border border-purple-300";
      case "Resolved": return "bg-gray-200 text-gray-700 border border-gray-400";
      default: return "bg-gray-100 text-gray-700 border border-gray-300";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Back Button */}
      <button
        className="mb-6 px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-xl shadow-sm transition-all"
        onClick={() => navigate(-1)}
      >
         Back
      </button>

      {/* Ticket Card */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-3xl font-bold mb-3 text-gray-900">{ticket.title}</h2>
        <p className="text-gray-600 mb-6 leading-relaxed">{ticket.description}</p>

        {/* Status Row */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Priority */}
          <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${getPriorityColor(ticket.priority)}`}>
            Priority: {ticket.priority}
          </span>

          {/* Status */}
          <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${getStatusColor(ticket.status)}`}>
            Status: {ticket.status}
          </span>
        </div>

        {/* Dates */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 text-sm text-gray-600">
          <span className="px-3 py-2 bg-gray-100 rounded-lg shadow-sm">
             Created At: <strong>{formatDate(ticket.createdAt)}</strong>
          </span>
          <span className="px-3 py-2 bg-gray-100 rounded-lg shadow-sm">
             Updated At: <strong>{ticket.updatedAt ? formatDate(ticket.updatedAt) : "Not updated"}</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
