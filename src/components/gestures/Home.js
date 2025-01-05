const Home = (Landmarkleft, Landmarkright) => {
  if (!Landmarkleft || !Landmarkright) return null;

  // Check if landmarks[2][1] is greater than all other specified landmarks on the left hand
  const indicesToCompare = [4, 5, 6, 7, 8, 9, 10, 11, 13, 14];
  const isLeftValid = indicesToCompare.every((i) => Landmarkleft[1][1] > Landmarkleft[i][1]);
  const isRightValid = indicesToCompare.every((i) => Landmarkright[1][1] > Landmarkright[i][1]);
  // Check if the absolute difference between landmarks[8][1] of left and right hands is in range (0.5 - 0.6)
  const isInRangeLeft = Landmarkleft[8][0] > 0.40 && Landmarkleft[8][0] < 0.55;
  const isInRangeRight = Landmarkright[8][0] > 0.40 && Landmarkright[8][0] < 0.55;
  const isInRangeLeft2 = Landmarkleft[1][0] > 0.58 && Landmarkleft[1][0] < 0.65;
  const isInRangeRight2 = Landmarkright[1][0] > 0.35 && Landmarkright[1][0] < 0.42;
  // Return true if both conditions are satisfied
  return isLeftValid && isRightValid && isInRangeLeft && isInRangeRight;
};

export default Home;