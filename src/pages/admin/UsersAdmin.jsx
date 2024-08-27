import React, { useEffect, useState } from "react";
import axios from "axios";


export default function UsersAdmin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8002/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = (email) => {
    axios.delete(`http://localhost:8002/users/${email}`)
      .then(() => {
        setUsers(users.filter(user => user.email !== email));
      })
      .catch((error) => {
        console.error("There was an error deleting the user!", error);
      });
  };



  return (
    <ul role="list" className="divide-y divide-gray-200 ml-10">
      {users.map((person) => (
        <li key={person.email} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
            </div>
          </div>
            <button onClick={()=>handleDelete(person.email)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 h-8 rounded-md"
              >
                Delete
              </button>
        </li>
      ))}
    </ul>
  )
}
