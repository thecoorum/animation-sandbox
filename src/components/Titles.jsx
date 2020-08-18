// React
import React from "react";

// Libraries
import styled from "styled-components";
import { CSSTransitionGroup } from "react-transition-group";

const Wrapper = styled.div`
  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
`;

const TopWrapper = styled.div`
  position: absolute;
  top: 25px;
  left: 0;

  width: 100%;
`;

const MiddleWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 0;

  width: 100%;
  height: 100%;

  z-index: 1000;
`;

const SmallTitle = styled.h2`
  text-align: center;
  color: #fff;
  font-family: "Alata", sans-serif;
  text-transform: uppercase;
`;

const Titles = ({ smallTitles }) => {
  const renderSmallTitles = smallTitles.map((title, i) => (
    <SmallTitle key={`smallTitle_${i}`}>{title}</SmallTitle>
  ));

  return (
    <Wrapper>
      <TopWrapper>
        <CSSTransitionGroup
          transitionName="subtitle"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {renderSmallTitles}
        </CSSTransitionGroup>
      </TopWrapper>
    </Wrapper>
  );
};

export default Titles;
