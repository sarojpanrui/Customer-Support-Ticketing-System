import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [user, setUser] = useState(null);
  const [comment, setComment] = useState(""); // new comment input
  const [comments, setComments] = useState([]); // list of comments

  // edit mode
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const storedTickets = localStorage.getItem("tickets");
    const storedUser = localStorage.getItem("loggedInUser");
    const storedComments = localStorage.getItem("comments");

    if (storedTickets) {
      const tickets = JSON.parse(storedTickets);
      const foundTicket = tickets.find((t) => t.ticketId === Number(id));
      setTicket(foundTicket);
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, [id]);

  // Add comment
  function handleSubmit(e) {
    e.preventDefault();
    if (!comment.trim()) return;

    const newComment = {
      text: comment,
      createdAt: new Date().toString(),
      createdBy: user?.id,
      username: user?.username,
      ticketId: Number(id),
      role: user?.role,
    };

    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
    setComment("");
  }

  // Delete comment
  function handleDelete(idx) {
    const updated = comments.filter((_, i) => i !== idx);
    setComments(updated);
    localStorage.setItem("comments", JSON.stringify(updated));
  }

  // Start editing
  function handleEdit(idx, currentText) {
    setEditingIndex(idx);
    setEditText(currentText);
  }

  // Save edited comment
  function handleSave(idx) {
    const updated = [...comments];
    updated[idx].text = editText;
    updated[idx].updatedAt = new Date().toString();
    setComments(updated);
    localStorage.setItem("comments", JSON.stringify(updated));
    setEditingIndex(null);
    setEditText("");
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700 border border-red-300";
      case "Medium":
        return "bg-yellow-100 text-yellow-700 border border-yellow-300";
      case "Low":
        return "bg-green-100 text-green-700 border border-green-300";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-300";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "bg-blue-100 text-blue-700 border border-blue-300";
      case "In Progress":
        return "bg-purple-100 text-purple-700 border border-purple-300";
      case "Resolved":
        return "bg-gray-200 text-gray-700 border border-gray-400";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-300";
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

  if (!ticket) {
    return (
      <p className="p-4 text-gray-500 text-center">⚠️ Ticket not found.</p>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Back Button */}
      <button
        className="mb-6 px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-xl shadow-sm transition-all"
        onClick={() => navigate(-1)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left-from-line-icon lucide-arrow-left-from-line"><path d="m9 6-6 6 6 6" /><path d="M3 12h14" /><path d="M21 19V5" /></svg>
      </button>

      {/* Ticket Card */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-3xl font-bold mb-3 text-gray-900">
          {ticket.title}
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          {ticket.description}
        </p>

        {/* Status Row */}
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={`px-4 py-1.5 rounded-full text-sm font-semibold ${getPriorityColor(
              ticket.priority
            )}`}
          >
            Priority: {ticket.priority}
          </span>

          <span
            className={`px-4 py-1.5 rounded-full text-sm font-semibold ${getStatusColor(
              ticket.status
            )}`}
          >
            Status: {ticket.status}
          </span>
        </div>

        {/* Dates */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 text-sm text-gray-600">
          <span className="px-3 py-2 bg-gray-100 rounded-lg shadow-sm">
            Created At: <strong>{formatDate(ticket.createdAt)}</strong>
          </span>
          <span className="px-3 py-2 bg-gray-100 rounded-lg shadow-sm">
            Updated At:{" "}
            <strong>
              {ticket.updatedAt ? formatDate(ticket.updatedAt) : "Not updated"}
            </strong>
          </span>
        </div>

        {/* Comment Form */}
        <div className="mt-5">
          <form className="flex gap-5" onSubmit={handleSubmit}>
            <textarea
              placeholder="Add comment"
              className="border border-gray-300 rounded-2xl w-full resize-none text-center"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className=" text-center px-9 border rounded-2xl border-gray-300 bg-green-300"
              type="submit"
            >
              Add
            </button>
          </form>
        </div>

        {/* Comment List */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Comments</h3>

          {comments
            .filter((c) => c.ticketId === Number(id))
            .map((c, idx) => (
              <div
                key={idx}
                className="mb-3 p-3 border rounded-xl bg-gray-50 shadow-sm relative"
              >
                {/* Role Tag */}
                <span
                  className={`absolute -top-2 -left-2 px-2 py-0.5 text-xs font-semibold rounded-full ${c.role === "Admin"
                      ? "bg-red-500 text-white"
                      : "bg-green-500 text-white"
                    }`}
                >
                  {c.username}({c.role})
                </span>

                {/* Edit mode */}
                {editingIndex === idx ? (
                  <textarea
                    className="w-full border p-2 rounded-lg"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                ) : (
                  <p className="text-gray-800">{c.text}</p>
                )}

                <div className="text-xs text-gray-500 mt-1">
                  By <strong>{c.username}</strong> on {formatDate(c.createdAt)}
                </div>

                {/* Actions (only author can edit/delete) */}
                {c.createdBy === user?.id && (
                  <div className="flex gap-3 mt-2">
                    {editingIndex === idx ? (
                      <>
                        <button
                          onClick={() => handleSave(idx)}
                          className="text-green-600 hover:underline"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingIndex(null)}
                          className="text-gray-600 hover:underline"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(idx, c.text)}
                          className="text-blue-500 hover:underline cursor-pointer"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen-icon lucide-square-pen"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" /></svg>
                        </button>
                        <button
                          onClick={() => handleDelete(idx)}
                          className="text-red-500  cursor-pointer"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
