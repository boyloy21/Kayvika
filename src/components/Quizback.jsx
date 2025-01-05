'use client';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useRouter } from "next/navigation";

const Quizback = ({nameroute}) => {
    const router = useRouter();
    const handleClickArrow = () => {
        router.push(nameroute);
    }
    return (
        <button className="absolute top-0 left-0 flex items-center justify-center p-2 " onClick={handleClickArrow}>
            <FontAwesomeIcon icon={faArrowLeft} className=" h-14 w-14 text-white hover:text-gray-300  transition duration-200 ease-in-out cursor-pointer" />
        </button>
    )
}

export default Quizback