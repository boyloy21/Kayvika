'use client';

import * as fp from "fingerpose";

const iLoveYouGesture = new fp.GestureDescription("love");

    // Thumb: No Curl
    iLoveYouGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);

    // Index: No Curl
    iLoveYouGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);

    // Pinky: No Curl
    iLoveYouGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.NoCurl, 1.0);

    // Middle and Ring: Full Curl
    [fp.Finger.Middle, fp.Finger.Ring].forEach((finger) => {
        iLoveYouGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
    });
export default iLoveYouGesture;