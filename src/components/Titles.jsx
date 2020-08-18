// React
import React from "react";

// Libraries
import styled from "styled-components";
import { CSSTransitionGroup } from "react-transition-group";

const Wrapper = styled.div`
  position: absolute;

  top: 25px;
  left: 0;

  width: 100%;
`;

const Title = styled.h1`
  text-align: center;
  color: #fff;
  font-family: sans-serif;
  text-transform: uppercase;
`;

const Titles = ({ titles }) => {
  const renderTitle = titles.map((title) => (
    <Title key={`title_${title}`}>{title}</Title>
  ));

  return (
    <Wrapper>
      <CSSTransitionGroup
        transitionName="animation"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        {renderTitle}
      </CSSTransitionGroup>
    </Wrapper>
  );
};

export default Titles;
