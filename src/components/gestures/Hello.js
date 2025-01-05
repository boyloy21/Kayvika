'use client';
import * as fp from "fingerpose";

const HelloGesture = new fp.GestureDescription('hello');

HelloGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
HelloGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
HelloGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);
HelloGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.NoCurl, 1.0);
HelloGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.NoCurl, 1.0);
HelloGesture.addDirection(fp.Finger.all, fp.FingerDirection.HorizontalLeft, 0.75);
HelloGesture.addDirection(fp.Finger.all, fp.FingerDirection.HorizontalRight, 0.75);
HelloGesture.addDirection(fp.Finger.all, fp.FingerDirection.VerticalUp, 1.0);


export default HelloGesture;