"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import {useRouter} from "next/navigation";
import { faPhone, faStar, faMessage, faUser, faEllipsisH} from "@fortawesome/free-solid-svg-icons";
import { useSession } from 'next-auth/react'; // Ensure you're using next-auth for session management


export default function Friends({params}) {
    const { data: session } = useSession();
    const Username = session?.user?.name;
    const [userId, setUserId] = useState(null);
    // Example data for suggestions
    const {id} = params;
    const [friends, setFriend] = useState([]);
        // State for the input value and suggestions
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedIndices, setSelectedIndices] = useState(friends.map(() => false));
    const sampleSuggestions = friends;
    const friendRefs = useRef([]);
    async function fetchFriends(username) {
        try {
          const response = await fetch(`/api/Users/friends?username=${username}`);
          const data = await response.json();
          
          if (response.ok) {
            // console.log("Friends list:", data.friends);
            setFriend(data.friends);
          } else {
            console.error("Error:", data.message);
          }
        } catch (error) {
          console.error("Error fetching friends:", error);
        }
      }
      
      useEffect(() => {
        if (Username) {
            fetchFriends(Username); // Fetch friends on component mount
        }
    }, [Username]);
    const handleStarClick = (index) => {
        // Create a copy of selectedIndices and toggle the specific index
        const updatedSelectedIndices = [...selectedIndices];
        updatedSelectedIndices[index] = !updatedSelectedIndices[index]; // Toggle the selected state
        setSelectedIndices(updatedSelectedIndices); // Update the state
    };

    const dropdownRef = useRef(null);
    const router = useRouter();

    // function handleAddRecent() {
    //     inputRecent = document.getElementById("recent").value;
    //     document.getElementById("recent").value = "";
    //     setFriend([...friends, inputRecent]);
        
    // }

    // Handle input change
    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        // Filter suggestions based on input value
        const filteredSuggestions = sampleSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
    };

    // Handle suggestion click
    // Handle suggestion click
    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion);
        setSuggestions([]); // Hide suggestions after selection
        // Scroll to the friend in the list
        const index = friends.indexOf(suggestion);
        if (index !== -1 && friendRefs.current[index]) {
            friendRefs.current[index].scrollIntoView({
                behavior: 'smooth', // Smooth scroll to the friend
                block: 'center', // Scroll the item to the center of the container
            });
        }
    };
    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
        // If click is outside the dropdown or input, close the suggestions
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setSuggestions([]);
        }
        };

        // Listen for click events
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
        // Clean up the event listener
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    const handleClickCall = async (inputFriend) => {
        try {
            const response = await fetch('/api/Users/call', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: Username, friendUsername: inputFriend }),
            });
            
            const data = await response.json();
            
            if (response.ok) {
                console.log('Call initiated successfully:', data);
                router.push(`/videocall/${id}/call`);
            } else {
                console.error('Error:', data.message);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };
    
    
      
    return(
        <>
            <nav className=" min-w-full h-20 bg-sky-500 rounded-xl border-2 ">
                <div className="flex justify-between items-center text-white text-2xl font-sans font-bold w-full mt-3">
                    <Link href={`/videocall/${id}/recents`} className="ml-10 text-left hover:text-blue-600">Recent</Link>
                    <div className="border-solid border-4  py-2 text-center rounded-2xl px-10  bg-green-700  cursor-not-allowed border-white">
                        <Link href={`/videocall/${id}/friends`} className=" mt-2 text-center  cursor-not-allowed">Friends</Link>
                    </div>
                    <Link href={`/videocall/${id}/addfriends`} className="text-right mr-10  hover:text-blue-600">AddFriends</Link>
                </div>
                
            </nav>
            {/* items-center justify-center */}
            <div className="flex justify-between min-w-full mt-0 bg-gray-100 py-12">
                <p className="flex text-left mt-5 ml-5 font-sans font-bold text-2xl">{`Friends ${friends.length} members`}</p>
                <div className="relative w-full max-w-lg mx-auto h-5 flex-col place-items-center  " ref={dropdownRef}>
                    <div className="flex w-full">
                        <input
                        id="recent"
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Search Friends"
                        className="flex-grow px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                        <button className="px-6 py-2 bg-indigo-500 text-white rounded-r-lg hover:bg-indigo-600" >
                        <FontAwesomeIcon icon={faSearch}/>
                        </button>
                    </div>
                    {/* Dropdown menu */}
                    {suggestions.length > 0 && (
                    <ul className=" absolute bg-white border border-gray-300  w-full rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {suggestions.map((suggestion, index) => (
                        
                        <li
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        >
                            {suggestion}
                        </li>
                        ))}
                    </ul>
                    )}
                </div>
            </div>
  
            <div className="flex mt-1 justify-between w-full"> 
                <ul className="flex flex-col w-full">
                    {friends.map((friend, index) => 
                    <li key={index} 
                        className="flex justify-between items-center mt-2  hover:bg-gray-200"
                        ref={(el) => (friendRefs.current[index] = el)}>
                            
                        <div className="flex items-center">
                        <FontAwesomeIcon 
                                icon={faStar} 
                                className={`h-8 w-8 mr-2 ml-2 cursor-pointer ${selectedIndices[index] ? 'text-yellow-500' : 'text-gray-500'}`} 
                                onClick={() => handleStarClick(index)} 
                            />
                            {/* <FontAwesomeIcon icon={faStar} className="h-8 w-8 mr-2 ml-2 "/> */}
                            <FontAwesomeIcon icon={faUser} className="h-8 w-8 mr-2 ml-2 text-gray-600 hover:text-gray-700 cursor-pointer"/>
                            <span className="font-bold font-sans text-2xl ">{friend}</span>
                        </div>
                        <div className="place-items-end">
                            <FontAwesomeIcon icon={faPhone} onClick={() => handleClickCall(friend)} className="h-8 w-8 ml-4 mr-4 text-lime-500 hover:text-lime-500/70 cursor-pointer"/>
                            <FontAwesomeIcon icon={faMessage} className="h-8 w-8 ml-4 mr-4 text-sky-600 hover:text-sky-700 cursor-pointer"/>
                            <FontAwesomeIcon icon={faEllipsisH} className="h-8 w-8 ml-4 mr-4 text-gray-600 hover:text-gray-700 cursor-pointer"/>
                        </div>
                        
                        {/* <p className=" mr-2 font-sans italic font-bold text-xl text-right ">19/11/2022</p> */}
                     </li>)}
                </ul>
            </div>
        </>
    );
}