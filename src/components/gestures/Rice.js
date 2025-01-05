const Rice = (landmarks) => {
    if (!landmarks) return null;

    const checkIntersection = (Math.abs(landmarks[4][1] - landmarks[16][1]) < 0.05) && (Math.abs(landmarks[4][0] - landmarks[16][0]) < 0.05);

    return checkIntersection;
}

export default Rice;