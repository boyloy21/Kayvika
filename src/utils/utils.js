'use client';
export const drawHand = (predictions, ctx) => {
    if (!predictions) return;
  
    predictions.forEach((prediction) => {
      const landmarks = prediction.landmarks;
  
      for (let i = 0; i < landmarks.length; i++) {
        const x = landmarks[i][0];
        const y = landmarks[i][1];
  
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
      }
    });
  };
  