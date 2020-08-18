// React
import React, { useState, useEffect } from "react";
import "./styles.css";

// Libraries
import styled from "styled-components";

// Components
import Pagination from "./Pagination";
import Animation from "./Animation";

// Assets
import animation from "./van-animation.json";

const Wrapper = styled.div`
  position: relative;

  background-color: lightcoral;

  height: 100vh;
`;

const availableSegments = {
  start: [55, 230],
  stop: [175, 350]
};

export default function App() {
  const pages = 3;
  const [page, setPage] = useState(1);
  const [segments, setSegments] = useState([0, 33]);
  const [direction, setDirection] = useState(1);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });

  useEffect(() => {
    handleSegmentsChange(page);
  }, [page]);

  const handleKeyPress = (e) => {
    e = e || window.event;

    if (!play) {
      if (e.keyCode === 37) {
        handlePrevPageClick();
      } else if (e.keyCode === 39) {
        handleNextPageClick();
      }
    }
  };

  const handleSegmentsChange = (page) => {
    if (direction === 1) {
      if (page !== 1) {
        setSegments([
          availableSegments.start[page - 2],
          availableSegments.stop[page - 2]
        ]);
      }
    } else {
      if (page !== pages) {
        setSegments([
          availableSegments.stop[page - 1],
          availableSegments.start[page - 1]
        ]);
      }
    }
  };

  const handlePrevPageClick = () => {
    if (page !== 1) {
      setDirection(-1);
      setPage((prevPage) => prevPage - 1);
      setPlay(true);
    }
  };

  const handleNextPageClick = () => {
    if (page !== pages) {
      setDirection(1);
      setPage((prevPage) => prevPage + 1);
      setPlay(true);
    }
  };

  const handleAnimationComplete = (e) => {
    setPlay(false);
  };

  return (
    <Wrapper>
      <Animation
        animation={animation}
        segments={segments}
        direction={direction}
        play={play}
        onComplete={handleAnimationComplete}
        id="animation"
      />
      <Pagination
        numOfPages={pages}
        page={page}
        primaryColor="lightblue"
        secondaryColor="lightgrey"
        onPrevPageClick={handlePrevPageClick}
        onNextPageClick={handleNextPageClick}
      />
    </Wrapper>
  );
}
