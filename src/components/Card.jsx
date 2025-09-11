
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
    <div className="border rounded-2xl p-5 shadow-lg hover:shadow-2xl transition duration-300 bg-white flex flex-col gap-2 
                    w-full sm:w-2/2 lg:w-full xl:w-full lora h-[100%] min-h-[200px] max-h-[400px] overflow-hidden 
                    "   >
      <h3 className=" text-base lg:text-xl font-bold text-gray-800 truncate md:text-base">{ticket.title}</h3>
      <p className="text-gray-600 line-clamp-3 md:text-sm">{ticket.description}</p>

      <div className="flex gap-2 lg:gap-5 mt-2 flex-wrap md:mx-auto justify-between lg:justify-between w-full">
        <span className={`px-3 py-1 rounded-full font-semibold ${getPriorityColor(ticket.priority)} md:text-sm text-[15px]`}>
          {ticket.priority}
        </span>
        <span className={`px-3 py-1 rounded-full font-semibold ${getStatusColor(ticket.status)} text-[15px]`}>
          {ticket.status}
        </span>


      </div>

      {/* <button className="border p-1 rounded-xl border-gray-300 font-semibold shadow-2xl cursor-pointer" onClick={() => navigate(`/ticket/${ticket.ticketId}`)}> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-icon lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /><circle cx="12" cy="12" r="3" /></svg> </button> */}





      <div className="border w-full px-2 border-gray-300 p-2 flex justify-center text-xl font-semibold rounded-2xl bg-gray-300 text-gray-600 shadow-2xs lg:gap-5 md:gap-2 gap-5 mt-5 align-middle">



        <span className="flex cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-user-round-icon lucide-circle-user-round"><path d="M18 20a6 6 0 0 0-12 0" /><circle cx="12" cy="10" r="4" /><circle cx="12" cy="12" r="10" /></svg>

          <span className="md:text-base text-lg lg:text-xl">{ticket.user.slice(0, 5)}</span>
        </span>

        <button onClick={() => { setLike(!like) }} className=" cursor-pointer">

          {
            like ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="" stroke="#362d3e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-icon lucide-heart"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" /></svg>

            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#362d3e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-icon lucide-heart"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" /></svg>
            )
          }


        </button>

        <button className="border rounded-xl border-gray-300 font-semibold shadow-2xl cursor-pointer" onClick={() => navigate(`/ticket/${ticket.ticketId}`)}> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-icon lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /><circle cx="12" cy="12" r="3" /></svg> </button>


      </div>

    </div>

  );
};

export default Card;
