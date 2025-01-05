'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react'; // Ensure you're using next-auth for session management

const UserList = () => {
  const { data: session } = useSession(); // Get session data to access the current user's information
  const [usernames, setUsernames] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsernames = async () => {
      if (!session) return; // Return if there's no session
      
      try {
        const response = await fetch('/api/Users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ currentUsername: session.user.name }), // Pass the current user's username
        });

        if (!response.ok) throw new Error('Failed to fetch usernames');

        const data = await response.json();
        setUsernames(data); // Set the usernames in state
      } catch (err) {
        setError(err.message); // Set error message if fetching fails
      }
    };

    fetchUsernames();
  }, [session]); // Fetch usernames when the session changes

  return (
    <div>
      <h2>Available Usernames</h2>
      {error && <p className="text-red-500">{error}</p>} {/* Display error message if any */}
      <ul>
        {usernames.map((user) => (
          <li key={user._id} className="py-2">
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;