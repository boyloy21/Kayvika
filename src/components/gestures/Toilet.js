
const Toilet = (landmarks) => {
    if (!landmarks) return null;
    const ValueCompare = [5, 6, 7, 9, 10, 11, 12, 13, 14, 15];
    const diff = landmarks[4][1] - landmarks[8][1];
    // const diffLeft = Landmarkleft[4][1] - Landmarkleft[8][1];
    // const diffRight = Landmarkright[4][1] - Landmarkright[8][1];
    // const isXLeftValid = ValueCompare.every((i) => (Landmarkleft[4][0] < Landmarkleft[i][0]) && (Landmarkleft[8][0] < Landmarkleft[i][0]));
    // const isXRightValid = ValueCompare.every((i) => (Landmarkright[4][0] > Landmarkright[i][0]) && (Landmarkright[8][0] > Landmarkright[i][0]));

    const isYValid = ValueCompare.every((i) => landmarks[4][1] > landmarks[i][1]);
    // const isYRightValid = ValueCompare.every((i) => Landmarkright[4][1] > Landmarkright[i][1]);

    const Distance = diff > 0.08 && diff < 0.13;
    
    return (isYValid && Distance);
  };

export default Toilet;