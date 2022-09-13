import React from "react";
import styled from "styled-components";

export const ComponentTitle = ({ title }) => {
  return (
    <TitleContainer>
      <h2 style={{color:"#514b6f"}}>{title}</h2>
      <UnderLine></UnderLine>
      <UnderLine></UnderLine>
    </TitleContainer>
  );
};

const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const UnderLine = styled.span`
  width: 100%;
  height: 1px;
  margin-bottom: 1px;
  border-radius: 1px;
  background-color: rgb(168, 172, 181);
`;
