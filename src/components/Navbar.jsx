"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ModeToggle } from "./ModeToggle";
import { useSession, signIn, signOut } from "next-auth/react"; // Import from next-auth/react

export default function Navbar() {
    const { data: session } = useSession();
    const username = session?.user?.name;
    const [accountDrop, setaccountDrop] = useState(false);
    const dropdownRef = useRef(null); // Ref for the dropdown
    const [profilePic, setProfilePic] = useState();
    const [userId, setUserId] = useState(null);
    // const [currentUser, setCurrentUser] = useState(null);
    const router = useRouter();
    const pathname = usePathname();
    const handleProfileClick = () => {
        if (!session) {
          signIn();
        } else {
            setaccountDrop(!accountDrop);
        }
    };
    
    const handleClickOutside = (event) => {
        // Check if the click is outside the dropdown
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setaccountDrop(false); // Close the dropdown if click is outside
        }
    };
    // Refresh session data after profile update
    useEffect(() => {
        router.refresh(); // Triggers a session reload
    }, [session?.user?.image, session?.user?.name]); // Watch for changes in session data

    
    useEffect(() => {
        
        if (accountDrop) {
            document.addEventListener('mousedown', handleClickOutside); // Add listener when dropdown is shown
          } else {
            document.removeEventListener('mousedown', handleClickOutside); // Remove listener when dropdown is closed
          }
      
          return () => {
            document.removeEventListener('mousedown', handleClickOutside); // Clean up listener on component unmount
          };
      }, [accountDrop]);

      // Handle file change
      const isActive = (path) => pathname === path;

      // API to fetch profile picture
      async function fetchProfilePic() {
        if (!username) return; // Ensure username is available from the session
    
        try {
            const response = await fetch(`/api/Users/editprofile?username=${username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            const data = await response.json();
            if (response.ok) {
                // console.log('Profile picture fetched successfully:', data.profile);
                setProfilePic(data.profile);
                
            } else {
                console.error('Error fetching profile picture:', data.message);
            }
        } catch (error) {
            console.error('Error fetching profile picture:', error);
        }
    }
    const fetchUserId = async () => {
        if (!username) return; // Ensure username is available from the session
        try {
            const response = await fetch(`/api/Users/id?username=${username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (response.ok) {
                
                setUserId(data.id); // Save the user's ID
            } else {
                console.error('Failed to fetch user ID');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

      useEffect(() => {
        fetchProfilePic();
        fetchUserId();
      }, [username]);
    //   useEffect(() => {
        

        
    // }, [username]);
    return (
        <nav className="bg-blue-500 p-4">
            <div className="container mx-auto items-center place-self-start flex flex-nowrap justify-between mr-10">
                <div className="logo-container flex flex-col place-self-start  mr-10">
                    <Image src="/pictures/kayvika.png" alt="logo" width={120} height={120} />
                    <h1 className="text-2xl text-center font-bold text-white">KAYVIKA</h1>
                </div>
                <div className="space-x-10 flex items-center justify-end ml-10">
                    <Link href="/" className={`text-white font-bold rounded-lg px-4 py-2 hover:bg-blue-700 no-underline hover:underline transition duration-200 ease-in-out ${isActive('/') ? 'bg-green-500 text-4xl' : 'text-3xl'} `}>
                        Home
                    </Link>
                    <div className="relative group">
                        <span className={`text-white text-3xl font-bold rounded-lg px-4 py-2 hover:bg-blue-700  hover:underline transition duration-200 ease-in-out ${isActive('/quiz') || isActive('/animations') || isActive('/course') || isActive(`/videocall/${userId}/recents`) || isActive(`/videocall/${userId}/friends`) || isActive(`/videocall/${userId}/adfriends`) ? ' bg-green-500 text-4xl' : ' text-3xl'}`}>Services</span>
                        <div className="absolute hidden group-hover:block bg-white rounded-lg shadow-lg p-2 mt-1 w-56">
                            <Link href="/course" className="block text-2xl text-blue-600 font-bold hover:text-white no-underline  text-start py-2 pl-2 hover:bg-blue-700 transition duration-200 ease-in-out">
                                Course
                            </Link>
                            <Link href={`/videocall/${userId}/recents`} className="block text-2xl text-blue-600 font-bold hover:text-white no-underline text-start hover:bg-blue-700 py-2 pl-2 transition duration-200 ease-in-out">
                                VideoCall
                            </Link>
                            <Link href="/animations" className="block text-2xl text-blue-600 font-bold hover:text-white no-underline text-start hover:bg-blue-700 py-2 pl-2 transition duration-200 ease-in-out">
                                3DAnimation
                            </Link>
                            <Link href="/quiz" className="block text-2xl text-blue-600 font-bold hover:text-white no-underline text-start hover:bg-blue-700 py-2 pl-2 transition duration-200 ease-in-out">
                                Quiz
                            </Link>
                        </div>
                    </div>
                    <Link href="/about" className={`text-white font-bold rounded-lg px-4 py-2 hover:bg-blue-700 no-underline hover:underline transition duration-200 ease-in-out ${isActive('/about') ? ' bg-green-600 text-4xl' : ' text-3xl'} `}>
                        AboutUs
                    </Link>
                    <Link href="/contact" className={`text-white font-bold rounded-lg px-4 py-2 hover:bg-blue-700 no-underline hover:underline transition duration-200 ease-in-out ${isActive('/contact') ? ' bg-green-600 text-4xl' : ' text-3xl'} `}>
                        Contact
                    </Link>
                    <div className="w-34 h-12 border-4 rounded-2xl hover:bg-blue-600">
                        {session?(
                            <Link href="/logout" className=" text-white px-2 py-2  border-blue-500 text-center text-3xl no-underline  hover:underline font-semibold">
                            Logout
                            </Link>
                        ):(
                            <Link href="/signin" className=" text-white px-2 py-2  border-blue-500 text-center text-3xl no-underline  hover:underline font-semibold">
                            Login
                            </Link>
                        )}
                        
                    </div>
                    <div className="relative " >
                        <Image src={session ? `/profiles/${profilePic}.jpeg` : "/pictures/notuser.jpeg"}  alt="profile" width={80} height={80} className="h-10 w-10 border-2 rounded-full cursor-pointer hover:border-blue-300 " onClick={handleProfileClick}/>
                        {session && accountDrop && (
                            <div ref={dropdownRef} className="flex flex-col absolute top-12 left-0 border-2 border-gray-300 w-48 rounded-md shadow-md ">
                            <div className="flex flex-row items-center">
                                <Image className="place-items-start account-img my-2" src={`/profiles/${profilePic}.jpeg`} alt="account" width={40} height={40} />
                                <h4 className="p-2 text-xl font-bold">{session?.user?.name}</h4>
                            </div>
                            {/* <p className="text-center text-blue-800">{session?.user?.email}</p> */}
                            <hr className="w-44 items-center h-2.5 mt-1 mb-1"/>
                                <Link href="/editprofile" className="flex flex-row items-center">
                                    <i className=" bi bi-pencil pl-2 text-2xl font-bold"></i>
                                    <p className="p-2 text-xl font-semibold">Edit Profile</p>
                                </Link>
                                <div className="flex flex-row items-center pl-2">
                                    <ModeToggle/>
                                </div>
                                <Link href="#" className="flex flex-row items-center">
                                    <i className=" bi bi-gear pl-2 text-2xl font-bold"></i>
                                    <p className="p-2 text-xl font-semibold">Setting</p>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
        
    )
}