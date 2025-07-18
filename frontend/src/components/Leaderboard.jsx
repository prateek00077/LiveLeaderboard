import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext.jsx";

const USERS_PER_PAGE = 10;

const getRankStyle = (rank) => {
  switch (rank) {
    case 1:
      return "bg-yellow-300 text-black";
    case 2:
      return "bg-gray-300 text-black";
    case 3:
      return "bg-orange-300 text-black";
    default:
      return "bg-white text-gray-800";
  }
};

const Leaderboard = () => {
  const { users, getUser, claimPoints, addUser } = useAppContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [newUserName, setNewUserName] = useState("");

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  // Filter out any falsy or invalid users before sorting
  const filteredUsers = users.filter((user) => user && user.name && typeof user.points === "number");

  // Sort users by points descending and add rank
  const sortedUsers = [...filteredUsers]
    .sort((a, b) => b.points - a.points)
    .map((user, idx) => ({ ...user, rank: idx + 1 }));

  const totalPages = Math.max(1, Math.ceil(sortedUsers.length / USERS_PER_PAGE));
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const currentUsers = sortedUsers.slice(startIndex, startIndex + USERS_PER_PAGE);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleClaim = async (userId) => {
    await claimPoints(userId);
    getUser(); // Refresh users after claiming points
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!newUserName.trim()) return;
    await addUser(newUserName.trim());
    setNewUserName("");
    getUser(); // Refresh users after adding
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">🏆 Points Leaderboard</h2>

      {/* Add New User Form */}
      <form
        onSubmit={handleAddUser}
        className="flex items-center gap-2 mb-6 justify-center"
      >
        <input
          type="text"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          placeholder="Enter new user name"
          className="border rounded px-3 py-2 w-2/3 focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Add User
        </button>
      </form>

      <div className="flex flex-col gap-4">
        {currentUsers.map((user) => (
          <div
            key={user._id}
            className={`flex items-center justify-between px-4 py-3 rounded-lg shadow-md ${getRankStyle(
              user.rank
            )}`}
          >
            <div className="flex items-center gap-3">
              <span className="font-bold">#{user.rank}</span>
              <span>{user.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span>{user.points}</span>
              <button
                className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
                onClick={() => handleClaim(user._id)}
              >
                Claim
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <span className="self-center font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages
              ? "bg-gray-300"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
