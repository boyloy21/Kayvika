'use client'
import * as fp from "fingerpose";

const MeetGesture = new fp.GestureDescription('meet');

MeetGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
MeetGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.FullCurl, 1.0);
MeetGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl, 1.0);
MeetGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1.0);
MeetGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.FullCurl, 1.0);

export default MeetGesture;