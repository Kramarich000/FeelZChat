import React, { useState } from "react";

const SpotifyPlayer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [buttonText, setButtonText] = useState("♪ Показать плеер");

  const togglePlayer = () => {
    setIsVisible(!isVisible);
    setButtonText(isVisible ? "♪ Показать плеер" : "♪ Скрыть плеер");
  };

  return (
    <div>
      <button className="spotify-btn" onClick={togglePlayer}>
        {buttonText}
      </button>
      {isVisible && (
        <iframe
  id="spotifyPlayer"
  style={{
    borderRadius: "12px",
    zIndex: 9999,
    position: "fixed",
    width: "500px",
    bottom: "100px",
    right: "100px",
  }}
  src="https://open.spotify.com/embed/playlist/37i9dQZF1DX1v8lYaeA4hr?utm_source=generator"
  width="100%"
  height="380"
  frameBorder="0"
  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
  loading="lazy"
></iframe>

      )}
    </div>
  );
};

export default SpotifyPlayer;
