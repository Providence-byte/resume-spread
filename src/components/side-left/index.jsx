import React from "react";
import styled from "styled-components";
import { Layout } from "antd";
import Dragger from "../dragger";
const { Sider } = Layout;
export const SideLeft = ({ title, menuItems }) => {
  return (
    <div>
      <Sider
        theme="light"
        collapsed={false}
        width={260}
        style={{ boxShadow: "10px 10px 20px #efefef" }}
      >
        <div
          style={{
            display: "flex",
            height: "100vh",
            flexDirection: "column",
          }}
        >
          <LeftTitle>{title}</LeftTitle>
          <ComponentMenu>
            {menuItems.map((item, index) => {
              return (
                <div key={index} style={{ transform: "scale(0.8)", borderStyle: "dashed", padding: "0.5rem", borderWidth: "2px", borderColor: "rgba(0, 0, 0, 0.5)" }}>
                  <Dragger
                    name={item.name}
                    Component={item.Component}
                  ></Dragger>
                </div>
              );
            })}
          </ComponentMenu>
        </div>
      </Sider>
    </div>
  );
};

const LeftTitle = styled.div`
  min-height: 60px;
  background-color: #e0e0e0;
  font-size: 20px;
  text-align: center;
  line-height: 60px;
`;

const ComponentMenu = styled.div`
  height: 100%;
  overflow-y: auto;
  padding-bottom: 30px;
  margin-bottom: 50px;
`;
