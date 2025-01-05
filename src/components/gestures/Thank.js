const Thank = (Landmarkleft, Landmarkright) => {
    if (!Landmarkleft || !Landmarkright) return null;
  
    // Check if landmarks[2][1] is greater than all other specified landmarks on the left hand
    const indicesToCompare = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    const isLeftValid = indicesToCompare.every((i) => Landmarkleft[1][1] > Landmarkleft[i][1]);
    const isRightValid = indicesToCompare.every((i) => Landmarkright[1][1] > Landmarkright[i][1]);
    // Check if the absolute difference between landmarks[8][1] of left and right hands is in range (0.5 - 0.6)
    const isInRangeLeft = indicesToCompare.every((i) => Landmarkleft[i][0] > 0.4 && Landmarkleft[i][0] < 0.6);
    const isInRangeRight = indicesToCompare.every((i) => Landmarkright[i][0] > 0.4 && Landmarkright[i][0] < 0.6);
    const isInRangeLeft2 = Landmarkleft[0][0] > 0.45 && Landmarkleft[8][1] < 0.6;
    const isInRangeRight2 = Landmarkright[0][0] > 0.45 && Landmarkright[8][1] < 0.6;
    // Return true if both conditions are satisfied
    return isLeftValid && isRightValid && isInRangeLeft && isInRangeRight && isInRangeLeft2 && isInRangeRight2;
  };
  
export default Thank;