'use client';
import * as fp from 'fingerpose'
const You = (landmarks) => {
    if (!landmarks) return null;

    const indicesToCompare = [1, 2, 3, 4, 5, 13, 14, 15, 16, 17, 18, 19, 20];
    const zValues = landmarks[8][2] < -0.05;
    return (indicesToCompare.every((i) => landmarks[8][1] < landmarks[i][1])) && zValues;
};

// const YouGestures = new fp.GestureDescription('you');

// YouGestures.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);


const I = (landmarks) => {
    if (!landmarks) return null;

    const indicesToCompare = [1, 2, 3, 4, 5, 13, 14, 15, 16, 17, 18, 19, 20];
    const zValues = landmarks[8][2] > 0.01;
    return (indicesToCompare.every((i) => landmarks[8][1] < landmarks[i][1])) && zValues;
};

export default { You, I };