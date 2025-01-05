import React from 'react';

const YouTubeEmbed = ({ videoId }) => {
  return (
    <iframe
      width="640"
      height="360"
      src={`https://www.youtube.com/embed/${videoId}`}
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
    // <video
    //   controls
    //   width="640"
    //   height="360"
    //   src={`videos/${videoId}.mp4`}
    //   type="video/mp4"
    // />
  );
};

export default YouTubeEmbed;