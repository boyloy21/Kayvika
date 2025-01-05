"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import "../styles.css";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import { faArrowUpRightFromSquare, faPhone, faStar, faMessage, faUser, faCircleExclamation} from "@fortawesome/free-solid-svg-icons";
import { useSession } from 'next-auth/react'; // Ensure you're using next-auth for session management
import { set } from "lodash";
// Data Storage users for recents

export default function VideoCall({ params }) {
    const { data: session } = useSession();
    const username = session?.user?.name;
    // Example data for suggestions
    // const sampleSuggestions = ['Yunboyloy','Phu','Samuel','Peter','Rickey','Alex','John',
    //     'Jane','Bob','Kevin','Mark','Joker','Yoda','Vader','Obiwan',
    //     'Anakin','Leia','Han','Chewbacca','C-3PO',
    // ];
    
    const {id} = params;
    // Handle input change
    const [recents, setRecents] = useState({});
        // State for the input value and suggestions
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const dropdownRef = useRef(null);
    const sampleSuggestions = recents;
    // const RecentRefs = useRef([]);

    // function handleAddRecent() {
    //     const inputRecent = document.getElementById("recent").value;
    //     document.getElementById("recent").value = "";
    //     setRecents([inputRecent, ...recents]);
        
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
    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion);
        setSuggestions([]); // Hide suggestions after selection
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

    useEffect(() => {
        async function fetchRecents() {
            try {
                setLoading(true);
                const response = await fetch(`/api/Users/recents?username=${username}`);
                const data = await response.json();
                
                if (response.ok) {
                    setRecents(data);
                    console.log(data);
                } else {
                    console.error("Error:", data.message);
                }
            } catch (error) {   
                console.error("Error fetching recents:", error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchRecents();
    }, [username]);

    if (loading) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    return(
        <>
            <nav className=" min-w-full h-20 bg-sky-500 rounded-xl border-2 ">
                <div className="flex justify-between items-center text-white text-2xl font-sans font-bold w-full mt-3">
                    <div className="border-solid border-4 px-8 py-2 text-center rounded-2xl  bg-green-700 ml-10 cursor-not-allowed border-white">
                        <Link href={`/videocall/${id}/recents/`} className=" mt-2 text-left cursor-not-allowed">Recent</Link>
                    </div>
                    <Link href={`/videocall/${id}/friends/`}>
                        <p className="text-center hover:text-blue-600">Friends</p></Link>
                    <Link href={`/videocall/${id}/addfriends/`} className="text-right mr-10  hover:text-blue-600">AddFriends</Link>
                </div>
                
            </nav>
            <div className="flex items-center justify-center min-w-full mt-0 bg-gray-100 py-12">
                <div className="relative w-full max-w-lg h-5 " ref={dropdownRef}>
                    <div className="flex ">
                        <input
                        id="recent"
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Search Recent Friends"
                        className="flex-grow px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                        <button className="px-6 py-2 bg-indigo-500 text-white rounded-r-lg hover:bg-indigo-600">
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
                </div>
            </div>
  
            <div className="flex mt-1 justify-between w-full"> 
                <ul className="flex flex-col w-full">
                {Object.keys(recents).length > 0 ? (
                        Object.entries(recents).map(([name, count], index) => (
                    // {recents.map((recent, index) => 
                    <li key={index} className="flex justify-between items-center mt-2 cursor-pointer hover:bg-gray-200">
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-6 w-6 mr-2 ml-2"/>
                            <FontAwesomeIcon icon={faUser} className="h-8 w-8 mr-2 ml-2 text-gray-500 border-4 mt-1 rounded-full border-slate-900"/>
                            <span className="font-bold font-sans text-2xl ">{name}</span>
                        </div>
                        <div className="flex place-items-end">
                            <p className=" mr-4 font-sans text-green-500 font-bold text-2xl  ">{`(${count})`}</p>
                            <FontAwesomeIcon icon={faCircleExclamation} className="h-8 w-8 text-green-500 mr-2"/>
                        </div>
                        
                     </li>
                 ))
                ) : (
                    <p className="text-center mt-4">No recent calls found</p>
                )}
                </ul>
            </div>
        </>
    );
}