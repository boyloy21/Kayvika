import * as fp from "fingerpose";

const DrinkGesture = new fp.GestureDescription('drink');

DrinkGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
// DrinkGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalUp, 1.0);
// DrinkGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 1.0);
// DrinkGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 1.0);

for (let finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    DrinkGesture.addCurl(finger, fp.FingerCurl.HalfCurl, 1.0);
}

export default DrinkGesture;