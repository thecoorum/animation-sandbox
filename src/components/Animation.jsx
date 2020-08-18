// React
import React from "react";

// Libraries
import Lottie from "react-lottie-player";

const Animation = ({
  onComplete,
  animation,
  play,
  segments,
  direction,
  id,
}) => {
  return (
    <Lottie
      onComplete={onComplete}
      animationData={animation}
      loop={false}
      play={play}
      segments={segments}
      direction={direction}
      style={{ height: "100%" }}
      id={id}
    />
  );
};

export default Animation;
