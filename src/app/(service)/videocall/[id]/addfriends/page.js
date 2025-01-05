"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef, use } from "react";
import { faArrowRight, faPhone, faStar, faMessage, faUser, faEllipsisH} from "@fortawesome/free-solid-svg-icons";
// import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { useSession } from 'next-auth/react'; // Ensure you're using next-auth for session management
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AddFriends({params}) {
    const { data: session } = useSession();
    const [addFriend, setAddFriend] = useState([]);
    // const [allAddFriends, setAllAddFriends] = useState([]);
    // const [friends, setFriends] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const dropdownRef = useRef(null);
    const [isAdding, setIsAdding] = useState(false); // Loading state for add friend
    const [loading, setLoading] = useState(false); // Loading state
    const currentUser = session?.user?.name;
    const router =  useRouter();
    const {id} = params;

    const sampleSuggestions = addFriend;

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

    const handleSuggestionClick = async (suggestion) => {
        setLoading(true); // Start loading
        setInputValue(suggestion);
        setSuggestions([]); // Hide suggestions after selection

        try {
            // Simulate a search or fetch operation
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
            console.log(`Searching for ${suggestion}...`);
        } finally {
            setLoading(false); // End loading
        }
    };
    // Handle suggestion click
    // const handleSuggestionClick = (suggestion) => {
    //     setInputValue(suggestion);
    //     setSuggestions([]); // Hide suggestions after selection
    // };
    // // Close dropdown when clicking outside
    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //     // If click is outside the dropdown or input, close the suggestions
    //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
    //         setSuggestions([]);
    //     }
    //     };

    //     // Listen for click events
    //     document.addEventListener('mousedown', handleClickOutside);

    //     return () => {
    //     // Clean up the event listener
    //     document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, []);

    async function fetchFriends() {
        try {
          
            const response = await fetch(`/api/Users/friends?username=${currentUser}`);
            const data = await response.json();

          console.log(data.friends);
          return data.friends || [];
        } catch (error) {
          console.error('Error fetching friends:', error);
        }
      }
    
    async function fetchAllFriends() {
        try {
          const response =  await fetch(`/api/Users/alluser?currentUser=${encodeURIComponent(currentUser)}`);
          const data = await response.json();
          console.log(data.usernames);
          return data.usernames || [];
        } catch (error) {
          console.error('Error fetching friends:', error);
        }
    }

    const getAvailableFriends = async (currentUser) => {
        try {
            const currentUserFriends = await fetchFriends(currentUser);
            const allUsers = await fetchAllFriends();

            // Ensure both are arrays
            if (!Array.isArray(currentUserFriends) || !Array.isArray(allUsers)) {
                console.error("One of the arrays is not valid.");
                return [];
            }

            // Filter available friends
            const availableFriends = allUsers.filter(user => !currentUserFriends.includes(user));
            return availableFriends;
        } catch (error) {
            console.error("Error getting available friends:", error);
            return [];
        }
    };
    useEffect(() => {
        const fetchAndSetFriends = async () => {
            const availableFriends = await getAvailableFriends(currentUser);
            setAddFriend(availableFriends); // Set the available friends to state
        };

        fetchAndSetFriends();
    }, [currentUser]); // Dependency array ensures it runs on mount and when currentUser changes

    const handleAddFriend = async ( friendUsername) => {
        setIsAdding(true); // Start loading
        try {
            const response = await fetch('/api/Users/addfriend', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: currentUser, friendUsername })
            });
    
            const data = await response.json();
            if (response.ok) {
                
                router.refresh();
                
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error("Error adding friend:", error);
        } finally {
            setIsAdding(false); // End loading
            // Remove added friend from suggestions
            setAddFriend((prev) => prev.filter((friend) => friend !== friendUsername));
        }
    };
    

    return(
        <>
            <nav className=" min-w-full h-20 bg-sky-500 rounded-xl border-2 ">
                <div className="flex justify-between items-center text-white text-2xl font-sans font-bold w-full mt-3">
                    <Link href={`/videocall/${id}/recents`} className="ml-10 text-left hover:text-blue-600">Recent</Link>
                    <Link href={`/videocall/${id}/friends`} className=" text-left hover:text-blue-600">Friends</Link>
                    <div className="border-solid border-4 px-10 py-2 text-center rounded-2xl bg-green-700 mr-10 cursor-not-allowed border-white">
                        <Link href={`/videocall/${id}/addfriends`} className="mt-2 text-right ">AddFriends</Link>
                    </div>
                </div>
                
            </nav>
            {/* items-center justify-center */}
            <div className="flex justify-between min-w-full mt-0 bg-gray-100 py-12">
                <p className="flex text-left mt-5 ml-5 font-sans font-bold text-2xl">{`Request Friends ${addFriend.length} members`}</p>
                <div className="relative w-full max-w-lg mx-auto h-5 flex-col place-items-center " ref={dropdownRef}>
                    <div className="flex w-full">
                        <input
                        id="recent"
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Search Add Friends"
                        className="flex-grow px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                        <button className="px-6 py-2 bg-indigo-500 text-white rounded-r-lg hover:bg-indigo-600" >
                        <FontAwesomeIcon icon={faSearch}/>
                        </button>
                    </div>
                    {/* Dropdown menu */}
                    {suggestions.length > 0 && (
                    <ul className="absolute bg-white border border-gray-300 mt-2 w-full rounded-lg shadow-lg max-h-48 overflow-y-auto">
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
                {/* Loading message */}
                {loading && (
                    <p className="text-center text-gray-500 mt-2">Please wait, finding this name...</p>
                )}
                    {/* {suggestions.length > 0 && (
                    <ul className="absolute bg-white border border-gray-300 mt-2 w-full rounded-lg shadow-lg max-h-48 overflow-y-auto">
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
                    )} */}
                </div>
            </div>
  
            <div className="flex mt-1 justify-between w-full"> 
                <ul className="flex flex-col w-full">
                    {addFriend.map((addfriend, index) => 
                    <li key={index} className="flex justify-between items-center mt-2  hover:bg-gray-200">
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faArrowRight} className="h-8 w-8 mr-2 ml-2"/>
                            <Image src={`/profiles/${index+1}.jpeg`} alt="profile" width={50} height={50} className="rounded-full mx-2" />
                            {/* <FontAwesomeIcon icon={faUser} className="h-8 w-8 mr-2 ml-2 text-gray-600"/> */}
                            <span className="font-bold font-sans text-2xl ">{addfriend}</span>
                        </div>
                        <div className="place-items-end">
                            <button onClick={() => handleAddFriend(addfriend)} 
                            // disabled={isAdding}
                            className={`mr-4 px-6 py-2 text-white font-sans font-bold text-2xl border-2 border-green-600 rounded-2xl ${isAdding ? 'bg-gray-400' : 'bg-blue-700 hover:bg-blue-400'}`}
                                >{isAdding ? 'Adding...' : 'Accept'}</button>
                            {/* <AddFriendButton userId={session?.user?.name} friendUsername={recent} onFriendAdded={handleFriendAdded} /> */}
                           
                            <button className="ml-4 mr-4 px-6 py-2 text-white font-sans font-bold text-2xl border-2 border-green-600 rounded-2xl bg-red-700 hover:bg-red-400">Delete</button>
                        </div>
                        
                        {/* <p className=" mr-2 font-sans italic font-bold text-xl text-right ">19/11/2022</p> */}
                     </li>)}
                </ul>
            </div>
        </>
    );
}