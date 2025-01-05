import { useState } from "react";

export default function AddFriendButton({ userId, friendUsername, onFriendAdded }) {
    const [isAdding, setIsAdding] = useState(false);

    const handleAddFriend = async (friendUsername) => {
        try {
            const response = await fetch('/api/Users/addfriend', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: session.user.name, // Current user's username
                    friendUsername: friendUsername // Username of the friend to add
                }),
            });
    
            const data = await response.json();
            if (response.ok) {
                // Successfully added friend and received updated Andfriends list
                console.log(data.message);
                
                // Update the Andfriends list in state to reflect the changes
                setRecent(data.updatedAndfriends);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error adding friend:', error);
        }
    };
    

    return (
        <button
            className="ml-4 mr-4 px-6 py-2 text-white font-sans font-bold text-2xl border-2 border-green-600 rounded-2xl bg-blue-700 hover:bg-blue-400"
            onClick={() => handleAddFriend(friendUsername)}
        >
            Add Friend
        </button>
    );
}
