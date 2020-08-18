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

const SmallTitle = styled.h2`
  text-align: center;
  text-transform: uppercase;

  font-size: 28px;

  color: #fff;
`;

const Titles = ({ titles }) => {
  const renderTitles = titles.map((title, i) => (
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
          {renderTitles}
        </CSSTransitionGroup>
      </TopWrapper>
    </Wrapper>
  );
};

export default Titles;
