
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
                    w-full sm:w-2/2 lg:w-full xl:w-full story-script-regular 
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

         


        <button className="border p-1 rounded-xl border-gray-300 font-semibold shadow-2xl" onClick={() => navigate(`/ticket/${ticket.ticketId}`)}> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-icon lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg> </button>

        <span className="border w-full px-2 border-gray-300 p-2 flex justify-center text-xl font-semibold rounded-2xl bg-gray-300 text-gray-600 shadow-2xs">
         Created By : {ticket.user}
        </span>

      </div>
    </div>
  );
};

export default Card;
