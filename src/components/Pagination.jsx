// React
import React from "react";

// Libraries
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Dot = styled.div`
  width: 15px;
  height: 15px;

  border-radius: 15rem;
  ${(props) => css`
    background-color: ${props.secondaryColor};
  `}

  margin: 0 10px;

  cursor: pointer;

  ${({ selected, primaryColor }) =>
    selected &&
    css`
      width: 35px;

      background-color: ${primaryColor};
    `}

  transition: all 0.15s;
`;

const Dots = styled.div`
  position: absolute;
  bottom: 15px;
  left: 50%;

  transform: translate(-50%, -50%);

  display: flex;
  flex-flow: row nowrap;

  align-items: center;
  justify-content: center;

  padding: 15px;
`;

const Arrows = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);

  width: 100%;

  display: flex;
  flex-flow: row nowrap;

  align-items: center;
  justify-content: space-between;
`;

const Arrow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 15px;
  margin: 15px;

  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 5px;

  cursor: pointer;

  transition: all 0.15s;

  ${({ disabled }) =>
    disabled
      ? css`
          opacity: 0.5;
          cursor: default;
        `
      : css`
          &:hover {
            color: #fff;

            &:first-child {
              transform: translateX(-5px);
            }

            &:last-child {
              transform: translateX(5px);
            }
          }
        `}
`;

const Wrapper = styled.div`
  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
`;

const Pagination = ({
  onNextPageClick,
  onPrevPageClick,
  numOfPages,
  onPageChange,
  page,
  primaryColor,
  secondaryColor,
}) => {
  const handleKeyPress = (e, dir) => {
    if (e.key === "Enter") {
      switch (dir) {
        case "next":
          onNextPageClick();
          break;
        case "prev":
          onPrevPageClick();
          break;
        default:
          throw new Error("Invalid direction");
      }
    }
  };

  const renderDots = () => {
    const elements = [];

    for (let i = 0; i < numOfPages; i++) {
      elements.push(
        <Dot
          onClick={() => onPageChange(i + 1)}
          selected={page === i + 1}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          key={i}
        />
      );
    }

    return elements;
  };

  return (
    <Wrapper>
      <Arrows>
        <Arrow
          disabled={page === 1}
          onClick={onPrevPageClick}
          onKeyPress={(e) => handleKeyPress(e, "prev")}
          tabIndex="1"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </Arrow>
        <Arrow
          disabled={page === numOfPages}
          onClick={onNextPageClick}
          onKeyPress={(e) => handleKeyPress(e, "next")}
          tabIndex="1"
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </Arrow>
      </Arrows>
      <Dots>
        {renderDots().map((el) => {
          return el;
        })}
      </Dots>
    </Wrapper>
  );
};

Pagination.defaultProps = {
  primaryColor: "lightblue",
  secondaryColor: "lightgrey",
};

export default Pagination;
