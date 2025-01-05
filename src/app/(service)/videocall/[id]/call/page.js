'use client';

import { useState, useEffect, use } from 'react';
import {useRouter} from "next/navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { faPhone, faShareFromSquare, faVideo, faVideoSlash ,faMicrophone, faMicrophoneSlash, faMessage, faList, faArrowLeft, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { useSession } from 'next-auth/react';


export default function Call({params}) {
    // State to track whether the button is hovered
  const { data: session } = useSession();
  const username = session?.user?.name;
  const [nameCall, setNameCall] = useState('');
  const [loading, setLoading] = useState(true);
  const [isHoveredBack, setIsHoveredBack] = useState(false);
  const [isHoveredShare, setIsHoveredShare] = useState(false);
  const [isHoveredVideo, setIsHoveredVideo] = useState(false);
  const [isHoveredMic, setIsHoveredMic] = useState(false);
  const [isHoveredChat, setIsHoveredChat] = useState(false);
  const [isHoveredList, setIsHoveredList] = useState(false);
  const [isHoveredPhone, setIsHoveredPhone] = useState(false);
  const [isHoveredVolume, setIsHoveredVolume] = useState(false);
  const [isClickedMic, setIsClickedMic] = useState(false);
//   const [isClickedVideo, setIsClickedVideo] = useState(false);
  const router = useRouter();
  const {id} = params;

  useEffect(() => {
    async function fetchLastFriendCall() {
        setLoading(true);
        try {
            const response = await fetch(`/api/Users/call?username=${username}`);
            const data = await response.json();

            if (response.ok) {
                // Set the last friend's name to nameCall
                setNameCall(data.lastFriendCall);
                setLoading(false);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching last friend call:", error);
        } finally {
            setLoading(false);
        }
    }

    if (username) {
        fetchLastFriendCall();
    }
}, [username]);
  // Function to handle mouse entering the button (hover start)
  const handleMouseEnterBack = () => setIsHoveredBack(true);
    const handleMouseLeaveBack = () => setIsHoveredBack(false);

    const handleMouseEnterShare = () => setIsHoveredShare(true);
    const handleMouseLeaveShare = () => setIsHoveredShare(false);

    const handleMouseEnterVideo = () => setIsHoveredVideo(true);
    const handleMouseLeaveVideo = () => setIsHoveredVideo(false);

    const handleMouseEnterMic = () => setIsHoveredMic(true);
    const handleMouseLeaveMic = () => setIsHoveredMic(false);

    const handleMouseEnterChat = () => setIsHoveredChat(true);
    const handleMouseLeaveChat = () => setIsHoveredChat(false);

    const handleMouseEnterList = () => setIsHoveredList(true);
    const handleMouseLeaveList = () => setIsHoveredList(false);

    const handleMouseEnterPhone = () => setIsHoveredPhone(true);
    const handleMouseLeavePhone = () => setIsHoveredPhone(false);

    const handleMouseEnterVolume = () => setIsHoveredVolume(true);
    const handleMouseLeaveVolume = () => setIsHoveredVolume(false);

    const handleClickback = () => {
        router.push(`/videocall/${id}/friends`);
    }
    const handleClickphone = () => {
        router.push(`/videocall/${id}/recents`);
    }
    const hadlerClickVideo = () => {
        router.push(`/videocall/${id}/video`);
    }
    const hadlerClickMic = () => {
        setIsClickedMic(!isClickedMic);
    }
    if (loading) return <p className='text-white text-xl font-bold flex justify-center'>Loading...</p>;
    return (
       <div className='flex items-center justify-center h-screen w-full bg-no-repeat  bg-cover bg-center'>
           <div className="flex flex-col justify-between h-3/4 w-8/12 min-w-96  border-8 border-black border-solid rounded-lg bg-gradient-to-r from-cyan-500 to-green-500">
               <div className="flex flex-row justify-between">
                    <div className="h-10 w-10 text-3xl text-white ml-4 mt-2 cursor-pointer">
                        <FontAwesomeIcon icon={faArrowLeft} onClick={handleClickback} onMouseEnter={handleMouseEnterBack}
                                onMouseLeave={handleMouseLeaveBack}/>
                        {isHoveredBack && (
                            <p className='text-white text-xl font-bold mt-2'>Back</p>
                        )}
                    </div>
                    <div className="h-10 w-10 text-3xl text-white mt-2 cursor-pointer">
                        <FontAwesomeIcon icon={faShareFromSquare} onMouseEnter={handleMouseEnterShare} onMouseLeave={handleMouseLeaveShare} />
                        {isHoveredShare && (
                            <p className='text-white text-xl font-bold mt-2'>Share</p>
                        )}
                    </div>
                    <div className="h-10 w-10 text-3xl text-white mr-4 mt-2 cursor-pointer">
                        <FontAwesomeIcon icon={faList}  onMouseEnter={handleMouseEnterList} onMouseLeave={handleMouseLeaveList}/>
                        {isHoveredList && (
                            <p className='text-white text-xl font-bold mt-2'>List</p>
                        )}
                    </div>
               </div>
               <div className="flex flex-col items-center">
        
                    <Image src="/profiles/profile.jpeg" width={120} height={120} alt="Picture of the author" className=" border-4 border-white rounded-full mt-1" />
                    <h1 className="text-4xl text-bold text-white">{nameCall}</h1>
               </div>
               <div className="flex flex-row justify-center bg-white rounded-lg border-solid cursor-pointer">
                    <div className="h-14 w-14 text-4xl text-blue-500  mb-2 mt-2" >
                        <FontAwesomeIcon icon={faVideoSlash} onClick={hadlerClickVideo} onMouseEnter={handleMouseEnterVideo} onMouseLeave={handleMouseLeaveVideo}/>
                        {isHoveredVideo && (
                            <p className='text-blue text-xl font-bold'>Video</p>
                        )}
                    </div>
                    <div className="h-14 w-14 text-4xl text-blue-500 mx-10  mb-2 mt-2 cursor-pointer" >
                        <FontAwesomeIcon icon={faMessage} onMouseEnter={handleMouseEnterChat} onMouseLeave={handleMouseLeaveChat}/>
                        {isHoveredChat && (
                            <p className='text-blue text-xl font-bold'>Text</p>
                        )}
                    </div>
                    <div className="h-14 w-14 text-4xl text-red-500 mx-10 mb-2 mt-2 cursor-pointer">
                        <FontAwesomeIcon icon={faPhone} onClick={handleClickphone} onMouseEnter={handleMouseEnterPhone} onMouseLeave={handleMouseLeavePhone}/>
                        {isHoveredPhone && (
                            <p className='text-blue text-xl font-bold'>CloseCall</p>
                        )}
                    </div>
                    <div className="h-14 w-14 text-4xl text-blue-500 mx-10 mb-2 mt-2 ">
                    <div
                        onClick={hadlerClickMic} onMouseEnter={handleMouseEnterMic} onMouseLeave={handleMouseLeaveMic}
                        style={{
                        cursor: "pointer",
                        }}
                    >
                        {isClickedMic ?  <FontAwesomeIcon icon={faMicrophone}  /> :  <FontAwesomeIcon icon={faMicrophoneSlash} />}
                        {isHoveredMic && (
                                            <p className='text-blue text-xl font-bold'>Microphone</p>
                                        )}
                    </div>
                        {/* <FontAwesomeIcon icon={faMicrophone}  />
                        {isHoveredMic && (
                            <p className='text-blue text-xl font-bold'>Microphone</p>
                        )} */}
                    </div>
                    <div className="h-14 w-14 text-4xl text-blue-500  mb-2 mt-2 cursor-pointer">
                        <FontAwesomeIcon icon={faVolumeHigh} onMouseEnter={handleMouseEnterVolume} onMouseLeave={handleMouseLeaveVolume}/>
                        {isHoveredVolume && (
                            <p className='text-blue text-xl font-bold'>Volume</p>
                        )}
                    </div>
               </div>
           </div>
       </div>
    );
}