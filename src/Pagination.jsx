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

  ${(props) =>
    props.selected &&
    css`
      width: 35px;

      background-color: ${props.primaryColor};
    `}

  ${(props) =>
    props.clickable &&
    css`
      cursor: pointer;
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

  &:hover {
    color: #fff;

    &:first-child {
      transform: translateX(-5px);
    }

    &:last-child {
      transform: translateX(5px);
    }
  }

  transition: all 0.15s;
`;

const Wrapper = styled.div`
  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
`;

const Pagination = (props) => {
  const handleClick = (page) => {
    if (props.onPageChange) {
      props.onPageChange(page);
    }
  };

  const isClickable = (f) => {
    if (typeof f === "function") return true;

    return false;
  };

  const renderDots = () => {
    const elements = [];

    for (let i = 0; i < props.numOfPages; i++) {
      elements.push(
        <Dot
          onClick={() => handleClick(i + 1)}
          clickable={isClickable(props.onPageChange)}
          selected={props.page === i + 1}
          primaryColor={props.primaryColor}
          secondaryColor={props.secondaryColor}
          key={i}
        />
      );
    }

    return elements;
  };

  return (
    <Wrapper>
      <Arrows>
        <Arrow onClick={props.onPrevPageClick && props.onPrevPageClick}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Arrow>
        <Arrow onClick={props.onNextPageClick && props.onNextPageClick}>
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

export default Pagination;
