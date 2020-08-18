// React
import React, { useState, useEffect, useRef } from "react";

// Libraries
import styled, { createGlobalStyle } from "styled-components";
import Lottie from "lottie-react";

// Components
import Pagination from "./components/Pagination";
import Titles from "./components/Titles";

// Assets
import animation from "./assets/van-animation.json";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    font-family: "Alata", sans-serif;
  }

  #root {
    width: 100vw;
    height: 100vh;

    overflow-x: hidden;
  }

  .subtitle-enter {
    opacity: 0.01;
  }
  
  .subtitle-enter.subtitle-enter-active {
    opacity: 1;
    transition: opacity 500ms ease-in;
  }

  .subtitle-leave {
    opacity: 1;
  }
  
  .subtitle-leave.subtitle-leave-active {
    opacity: 0.01;
    transition: opacity 500ms ease-in;
  }

  .subtitle-appear {
    opacity: 0.01;
  }

  .subtitle-appear.subtitle-appear-active {
    opacity: 1;
    transition: opacity 500ms ease-in;
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
  const animationRef = useRef();

  const [page, setPage] = useState(1);
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
    handleTitlesChange(page);
  }, [page]);

  const handleTitlesChange = (title) => {
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
    if (!animationRef || !animationRef.current) return


    if (direction === 1) {
      if (page !== 1) {
        animationRef.current.playSegments(
          [availableSegments.start[page - 2], availableSegments.stop[page - 2]],
          true
        );
      }
    } else {
      if (page !== pages) {
        animationRef.current.playSegments(
          [availableSegments.stop[page - 1], availableSegments.start[page - 1]],
          true
        );
      }
    }
  };

  const handlePrevPageClick = () => {
    if (page !== 1 && !play) {
      animationRef.current.setDirection(-1);
      setDirection(-1);
      setPlay(true);
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPageClick = () => {
    if (page !== pages && !play) {
      animationRef.current.setDirection(1);
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
      <Lottie
        lottieRef={animationRef}
        style={{ height: "100%", width: "100%" }}
        animationData={animation}
        loop={false}
        autoplay={false}
        onComplete={handleAnimationComplete}
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
