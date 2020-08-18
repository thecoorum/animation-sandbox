// React
import React, { useState, useEffect } from "react";

// Libraries
import styled, { createGlobalStyle } from "styled-components";

// Components
import Pagination from "./components/Pagination";
import Animation from "./components/Animation";
import Titles from "./components/Titles";

// Assets
import animation from "./assets/van-animation.json";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;

    box-sizing: border-box;
  }

  #root {
    width: 100vw;
    height: 100vh;

    overflow-x: hidden;
  }

  .animation-enter {
    opacity: 0.01;
  }
  
  .animation-enter.animation-enter-active {
    opacity: 1;
    transition: opacity 500ms ease-in;
  }
  
  .animation-leave {
    opacity: 1;
  }
  
  .animation-leave.animation-leave-active {
    opacity: 0.01;
    transition: opacity 300ms ease-in;
  }

  .animation-appear {
    opacity: 0.01;
  }
  
  .animation-appear.animation-appear-active {
    opacity: 1;
    transition: opacity .5s ease-in;
  }
`;

const Wrapper = styled.div`
  position: relative;

  background-color: lightcoral;

  height: 100vh;
`;

const availableSegments = {
  start: [55, 230],
  stop: [175, 350],
};

export default function App() {
  const pages = 3;
  const [page, setPage] = useState(1);
  const [segments, setSegments] = useState([0, 33]);
  const [direction, setDirection] = useState(1);
  const [play, setPlay] = useState(false);
  const [titles, setTitles] = useState(["Travel"]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });

  useEffect(() => {
    handleSegmentsChange(page);
    handleTitleChange(page);
  }, [page]);

  const handleTitleChange = (title) => {
    const titles = ["Travel", "Surf", "Rest"];

    setTitles(titles.splice(0, title));
  };

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
          availableSegments.stop[page - 2],
        ]);
      }
    } else {
      if (page !== pages) {
        setSegments([
          availableSegments.stop[page - 1],
          availableSegments.start[page - 1],
        ]);
      }
    }
  };

  const handlePrevPageClick = () => {
    if (page !== 1 && !play) {
      setDirection(-1);
      setPlay(true);
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPageClick = () => {
    if (page !== pages && !play) {
      setDirection(1);
      setPlay(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleAnimationComplete = (e) => {
    setPlay(false);
  };

  return (
    <Wrapper>
      <GlobalStyles />
      <Titles titles={titles} />
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
        onPrevPageClick={handlePrevPageClick}
        onNextPageClick={handleNextPageClick}
      />
    </Wrapper>
  );
}
