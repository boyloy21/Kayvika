'use client';
import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import * as handpose from "@tensorflow-models/handpose";
import { drawHand } from "@/utils/utils";
import * as fp from "fingerpose";
import { thankYouGesture, helloGesture, loveYouGesture } from "./SignDefinitions";
const GestureDetection = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [gesture, setGesture] = useState("");

  useEffect(() => {
    const loadModel = async () => {
      const net = await handpose.load();
      detect(net);
    };

    loadModel();
  }, []);

  const detect = async (net) => {
    if (
      webcamRef.current &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const hand = await net.estimateHands(video);
      if (hand.length > 0) {
        const GE = new fp.GestureEstimator([
          thankYouGesture,
          helloGesture,
          loveYouGesture,
        ]);

        const gestureEstimate = await GE.estimate(hand[0].landmarks, 8);

        if (gestureEstimate.gestures.length > 0) {
          const detectedGesture = gestureEstimate.gestures.reduce((p, c) =>
            p.score > c.score ? p : c
          );
          setGesture(detectedGesture.name);
        }
      }

      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }

    setTimeout(() => detect(net), 100);
  };

  return (
    <div>
      <Webcam ref={webcamRef} style={{ position: "absolute" }} />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
        }}
      />
      <h1>Gesture: {gesture}</h1>
    </div>
  );
};

export default GestureDetection;
