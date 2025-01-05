'use client';
import React, { useState } from "react";
import HandLandmark from "@/components/Detection/hand-landmark";
import FaceLandmarks from "@/components/Detection/face-landmark";
import MixedLands from "@/components/Detection/mix-landmarks";
import HandLandmarks from "@/components/Hand_landMark";
import { set } from "lodash";

export default function Test() {
    const [openFace, setOpenFace] = useState(false);
    const [openHand, setOpenHand] = useState(false);
    const [openMix, setOpenMix] = useState(false);
    const [openDetect, setOpenDetect] = useState(false);

    const handleFace = () => {
        setOpenFace(true);
        setOpenHand(false);
        setOpenMix(false);
        setOpenDetect(false);
    };
    const handleHand = () => {
        setOpenFace(false);
        setOpenHand(true);
        setOpenMix(false);
        setOpenDetect(false);
    };
    const handleMix = () => {
        setOpenFace(false);
        setOpenHand(false);
        setOpenMix(true);
        setOpenDetect(false);
    };
    const handleDetect = () => {
        setOpenFace(false);
        setOpenHand(false);
        setOpenMix(false);
        setOpenDetect(true);
    };
    return (
        <div>
            <button onClick={handleFace} className="mr-2 border-2 rounded-lg p-2 bg-indigo-400 text-white mb-2">Face</button>
            <button onClick={handleHand} className="mr-2 border-2 rounded-lg p-2 bg-indigo-400 text-white mb-2">Hand</button>
            <button onClick={handleMix} className="mr-2 border-2 rounded-lg p-2 bg-indigo-400 text-white mb-2">Mix</button>
            <button onClick={handleDetect} className="mr-2 border-2 rounded-lg p-2 bg-indigo-400 text-white mb-2">Detect</button>
            {openFace && <FaceLandmarks />}
            {openHand && <HandLandmark />}
            {openMix && <MixedLands />}
            {openDetect && <HandLandmarks />}
        </div>
    );
}