
const Eat = (landmarks) => {
    if (!landmarks) return null;
    // Check if landmarks[2][1] is greater than all other specified landmarks on the left hand
    const YCompare = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    const XCompare = [8, 12, 16, 20];
    

    const isYValid = YCompare.every((i) => landmarks[i][1] > 0.58 &&  landmarks[i][1] < 0.72);
    const isXValid = XCompare.every((i) => landmarks[i][0] > 0.40 &&  landmarks[i][0] < 0.6);
    // const isZMiddle = landmarks[9][2] < landmarks[12][2];
    // const isZRing = landmarks[13][2] < landmarks[16][2];
    // const isZPinky = landmarks[20][2] < landmarks[16][2];

    return isXValid && isYValid;
}

export default Eat;