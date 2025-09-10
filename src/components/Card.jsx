
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ ticket }) => {
  const navigate = useNavigate();
  const [like, setLike] = useState(false);
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




        <button className="border p-1 rounded-xl border-gray-300 font-semibold shadow-2xl" onClick={() => navigate(`/ticket/${ticket.ticketId}`)}> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-icon lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /><circle cx="12" cy="12" r="3" /></svg> </button>

        <div className="border w-full px-2 border-gray-300 p-2 flex justify-center text-xl font-semibold rounded-2xl bg-gray-300 text-gray-600 shadow-2xs gap-9">



          <span className="flex"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-user-round-icon lucide-circle-user-round"><path d="M18 20a6 6 0 0 0-12 0" /><circle cx="12" cy="10" r="4" /><circle cx="12" cy="12" r="10" /></svg> {ticket.user}
          </span>

          <button onClick={() => { setLike(!like) }} className=" cursor-pointer">

            {
              like ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#362d3e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-icon lucide-heart"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" /></svg>

              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thumbs-up-icon lucide-thumbs-up"><path d="M7 10v12" /><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" /></svg>
              )
            }

          
          </button>

          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send-icon lucide-send"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" /><path d="m21.854 2.147-10.94 10.939" /></svg>


        </div>

      </div>
    </div>
  );
};

export default Card;
