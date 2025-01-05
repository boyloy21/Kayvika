'use client';
import * as fp from "fingerpose";

const YesGesture = new fp.GestureDescription('yes');

YesGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.FullCurl, 1.0);
YesGesture.addCurl(fp.Finger.Index, fp.FingerCurl.FullCurl, 1.0);
YesGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.FullCurl, 1.0);
YesGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1.0);
YesGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl, 1.0);

export default YesGesture;