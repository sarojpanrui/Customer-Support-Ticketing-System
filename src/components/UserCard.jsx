import React, { useState } from 'react'

const UserCard = () => {
  const [open, setIsOpen] = useState(false);

  return (
    <div>
      <button className='p-2 bg-red-400 border border-gray-300 rounded text-white'
        onClick={() => setIsOpen(true)}
      >Click to open</button>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Ticket</h2>

            <input
              type="text"
              // value={editedTicket.title}
              // onChange={(e) => setEditedTicket({ ...editedTicket, title: e.target.value })}
              className="w-full mb-3 p-2 border rounded-lg"
              placeholder="Title"
            />

            <textarea
              // value={editedTicket.description}
              // onChange={(e) => setEditedTicket({ ...editedTicket, description: e.target.value })}
              className="w-full mb-3 p-2 border rounded-lg"
              placeholder="Description"
            />

            <select
              // value={editedTicket.priority}
              // onChange={(e) => setEditedTicket({ ...editedTicket, prio/rity: e.target.value })}
              className="w-full mb-3 p-2 border rounded-lg"
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

            <select
              // value={editedTicket.status}
              // onChange={(e) => setEditedTicket({ ...editedTicket, status: e.target.value })}
              className="w-full mb-3 p-2 border rounded-lg"
            >
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                // onClick={handleSave}
              >
                Save
              </button>



            </div>



          </div>
        </div>
      )}

    </div>
  )
}

export default UserCard
