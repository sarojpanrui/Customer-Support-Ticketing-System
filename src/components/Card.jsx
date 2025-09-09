
import { useNavigate } from "react-router-dom";

const Card = ({ ticket }) => {
  const navigate = useNavigate();
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

  return (
    <div className="border rounded-2xl p-5 shadow-lg hover:shadow-2xl transition duration-300 bg-white flex flex-col gap-3 
                    w-full sm:w-1/2 lg:w-full xl:w-full
                    "   >
      <h3 className="text-xl font-bold text-gray-800">{ticket.title}</h3>
      <p className="text-gray-600">{ticket.description}</p>

      <div className="flex justify-between flex-wrap gap-2 mt-2">
        <span className={`px-3 py-1 rounded-full font-semibold ${getPriorityColor(ticket.priority)}`}>
          {ticket.priority}
        </span>
        <span className={`px-3 py-1 rounded-full font-semibold ${getStatusColor(ticket.status)}`}>
          {ticket.status}
        </span>


        <button className="border p-1 rounded-xl bg-green-500 text-white font-semibold" onClick={() => navigate(`/ticket/${ticket.ticketId}`)}> view </button>

      </div>
    </div>
  );
};

export default Card;
