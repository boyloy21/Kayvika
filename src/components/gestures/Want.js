

const Want = (landmarks) => {
    if (!landmarks) return null;

    const indicesToCompare = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const indicesToCompare2 = [3, 4, 5, 6, 7, 8];
    const rangeY = indicesToCompare2.every((i) => landmarks[9][1] > landmarks[i][1]);
    const rangeX = indicesToCompare.every((i) => landmarks[0][0] < landmarks[i][0] );
    // const rangeZ = indicesToCompare.every((i) => landmarks[i][2] > -0.1 && landmarks[i][2] < 0.1);
    return rangeY && rangeX;
};

export default Want;