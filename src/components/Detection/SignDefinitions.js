'use client';
import * as fp from "fingerpose";

// Define "ThankYou" Gesture
export const thankYouGesture = new fp.GestureDescription("ThankYou");
thankYouGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
thankYouGesture.addCurl(fp.Finger.all, fp.FingerCurl.NoCurl, 1.0);

// Define "Hello" Gesture
export const helloGesture = new fp.GestureDescription("Hello");
helloGesture.addCurl(fp.Finger.all, fp.FingerCurl.NoCurl, 1.0);
helloGesture.addDirection(fp.Finger.all, fp.FingerDirection.HorizontalLeft, 0.8);

// Define "LoveYou" Gesture
export const loveYouGesture = new fp.GestureDescription("LoveYou");
loveYouGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 1.0);
loveYouGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0);
loveYouGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.NoCurl, 1.0);
loveYouGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.FullCurl, 1.0);
loveYouGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1.0);

// Add other gestures similarly: "I", "You", "Want", "Home", "Drink", "Go"
