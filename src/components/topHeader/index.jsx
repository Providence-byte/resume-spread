import React from "react";
import { LeftOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useNavigate } from "react-router";
export const TopHeader = (props) => {
  const navigate = useNavigate();
  return (
    <Container>
      <LeftOutlined
        style={{ fontSize: "18px", color: "#fff" }}
        onClick={() => {
          navigate(-1);
        }}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 60px;
  background-color: #27292d;
  padding: 0 40px;
  justify-content: space-between;
  align-items: center;
`;
