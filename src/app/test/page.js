'use client';
import React, { useState } from "react";
import HandLandmarks from "@/components/Detection/hand-landmark";
import FaceLandmarks from "@/components/Detection/face-landmark";
import MixedLands from "@/components/Detection/mix-landmarks";

export default function Test() {
    const [openFace, setOpenFace] = useState(false);
    const [openHand, setOpenHand] = useState(false);
    const [openMix, setOpenMix] = useState(false);

    const handleFace = () => {
        setOpenFace(true);
        setOpenHand(false);
        setOpenMix(false);
    };
    const handleHand = () => {
        setOpenFace(false);
        setOpenHand(true);
        setOpenMix(false);
    };
    const handleMix = () => {
        setOpenFace(false);
        setOpenHand(false);
        setOpenMix(true);
    };
    return (
        <div>
            <button onClick={handleFace} className="mr-2 border-2 rounded-lg p-2 bg-indigo-400 text-white mb-2">Face</button>
            <button onClick={handleHand} className="mr-2 border-2 rounded-lg p-2 bg-indigo-400 text-white mb-2">Hand</button>
            <button onClick={handleMix} className="mr-2 border-2 rounded-lg p-2 bg-indigo-400 text-white mb-2">Mix</button>
            {openFace && <FaceLandmarks />}
            {openHand && <HandLandmarks />}
            {openMix && <MixedLands />}
            
        </div>
    );
}