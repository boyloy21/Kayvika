'use client';
// Points for fingers
const fingerJoints = {
    thumb: [0, 1, 2, 3, 4],
    indexFinger: [0, 5, 6, 7, 8],
    middleFinger: [0, 9, 10, 11, 12],
    ringFinger: [0, 13, 14, 15, 16],
    pinky: [0, 17, 18, 19, 20],
};

// Infinnity Gauntlet Style
const style = {
    0: { color: "yellow", size: 15 },
    1: { color: "blue", size: 6 },
    2: { color: "red", size: 10 },
    3: { color: "green", size: 6 },
    4: { color: "white", size: 6 },
    5: { color: "yellow", size: 10 },
    6: { color: "blue", size: 6 },
    7: { color: "red", size: 6 },
    8: { color: "green", size: 6 },
    9: { color: "white", size: 10 },
    10: { color: "yellow", size: 6 },
    11: { color: "blue", size: 6 },
    12: { color: "red", size: 6 },
    13: { color: "green", size: 10 },
    14: { color: "white", size: 6 },
    15: { color: "yellow", size: 6 },
    16: { color: "blue", size: 6 },
    17: { color: "red", size: 10 },
    18: { color: "green", size: 6 },
    19: { color: "white", size: 6 },
    20: { color: "yellow", size: 6 },
};
// const handStyles = [
//     { // Style for Hand 1
//         0: { color: "yellow", size: 15 },
//         1: { color: "blue", size: 6 },
//         2: { color: "red", size: 10 },
//         3: { color: "green", size: 6 },
//         4: { color: "white", size: 6 },
//         5: { color: "yellow", size: 10 },
//         6: { color: "blue", size: 6 },
//         7: { color: "red", size: 6 },
//         8: { color: "green", size: 6 },
//         9: { color: "white", size: 10 },
//         10: { color: "yellow", size: 6 },
//         11: { color: "blue", size: 6 },
//         12: { color: "red", size: 6 },
//         13: { color: "green", size: 10 },
//         14: { color: "white", size: 6 },
//         15: { color: "yellow", size: 6 },
//         16: { color: "blue", size: 6 },
//         17: { color: "red", size: 10 },
//         18: { color: "green", size: 6 },
//         19: { color: "white", size: 6 },
//         20: { color: "yellow", size: 6 },
//     },
//     { // Style for Hand 2
//         0: { color: "cyan", size: 15 },
//         1: { color: "purple", size: 6 },
//         2: { color: "orange", size: 10 },
//         3: { color: "pink", size: 6 },
//         4: { color: "lightgreen", size: 6 },
//         5: { color: "cyan", size: 10 },
//         6: { color: "purple", size: 6 },
//         7: { color: "orange", size: 6 },
//         8: { color: "pink", size: 6 },
//         9: { color: "lightgreen", size: 10 },
//         10: { color: "cyan", size: 6 },
//         11: { color: "purple", size: 6 },
//         12: { color: "orange", size: 6 },
//         13: { color: "pink", size: 10 },
//         14: { color: "lightgreen", size: 6 },
//         15: { color: "cyan", size: 6 },
//         16: { color: "purple", size: 6 },
//         17: { color: "orange", size: 10 },
//         18: { color: "pink", size: 6 },
//         19: { color: "lightgreen", size: 6 },
//         20: { color: "cyan", size: 6 },
//     },
// ];



// Drawing functions
export const drawHand = (predictions, ctx) => {
    // Check if we have predictions
    if (predictions.length > 0) {
        // Loop through each prediction
        predictions.forEach((prediction) => {
            // Grabbing the landmarks
            const landmarks = prediction.landmarks;
            // Loop through keypoints
            for (let j = 0; j < Object.keys(fingerJoints).length; j++) {
                let finger = Object.keys(fingerJoints)[j];
                // Loop through pairs of joints
                for (let k=0; k<fingerJoints[finger].length-1; k++) {
                    //Get pairs of points
                    const firtstJointIndex = fingerJoints[finger][k];
                    const secondJointIndex = fingerJoints[finger][k+1];
                    // Draw path
                    ctx.beginPath();
                    ctx.moveTo(
                        landmarks[firtstJointIndex][0],
                        landmarks[firtstJointIndex][1]
                    );
                    ctx.lineTo(
                        landmarks[secondJointIndex][0],
                        landmarks[secondJointIndex][1]
                    );
                    ctx.strokeStyle = "gold";
                    ctx.lineWidth = 4;
                    ctx.stroke();
                }
            };

            // loop through landmarks and drae em
            for (let i = 0; i < landmarks.length; i++) {
                // Get x point
                const x = landmarks[i][0];
                // Get y point
                const y = landmarks[i][1];
                // Start circle
                ctx.beginPath();
                ctx.arc(x, y, style[i]["size"], 0, 3 * Math.PI);
                // Set color
                ctx.fillStyle = style[i]["color"];
                // Fill
                ctx.fill();
                // Border
                ctx.strokeStyle = "black";
                ctx.stroke();

            }
           
        });
    }
}