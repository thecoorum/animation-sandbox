// React
import React from "react";

// Libraries
import Lottie from "react-lottie-player";

const Animation = (props) => {
  return (
    <Lottie
      onComplete={props.onComplete}
      animationData={props.animation}
      loop={false}
      play={props.play}
      segments={props.segments}
      direction={props.direction}
      style={{ height: "100%" }}
      id={props.id}
    />
  );
};

export default Animation;
