import { useDrop } from "react-dnd";
import { connect } from "react-redux";
import styled from "styled-components";
import { appendComponent } from "../../redux/action/tree";

import { nanoid } from "nanoid";
import { useState } from "react";

const switchSettings = (name) => {
  switch (name) {
    case "Skills":
      return [
        {
          name: "Skill",
          fid: nanoid(),
          $settings: {
            style: {},
            $children: [
              {
                sid: nanoid(),
                text: "输入你的技能",
                isEditing: false,
              },
            ],
          },
        },
      ];
    case "PersonalInfo":
      return [
        {
          name: "RenderPersonalInfo",
          fid: nanoid(),
          $settings: {
            style: {},
            $children: [
              null,
              [
                {
                  id: nanoid(),
                  text: "输入你的姓名",
                  isEditing: true,
                },
                {
                  id: nanoid(),
                  text: "输入你的职位",
                  isEditing: true,
                },
              ],
              [
                {
                  id: nanoid(),
                  key: "学历",
                  value: "你的院校",
                  isKeyEditing: false,
                  isValueEditing: false,
                },
                {
                  id: nanoid(),
                  key: "手机",
                  value: "手机号码",
                  isKeyEditing: false,
                  isValueEditing: false,
                },
                {
                  id: nanoid(),
                  key: "邮箱",
                  value: "xxx@xx.com",
                  isKeyEditing: false,
                  isValueEditing: false,
                },
              ],
            ],
          },
        },
      ];
    case "H":
      return [
        {
          name: "RenderH",
          fid: nanoid(),
          $settings: {
            style: {},
            $children: [
              [
                {
                  id: nanoid(),
                  text: "项目时间",
                  isEditing: true,
                },
                {
                  id: nanoid(),
                  text: "项目名称",
                  isEditing: true,
                },
                {
                  id: nanoid(),
                  text: "项目过程",
                  isEditing: true,
                },
              ],
              [
                {
                  id: nanoid(),
                  text: "项目内容",
                  isEditing: true,
                },
              ],
              [
                {
                  id: nanoid(),
                  text: "项目地址",
                  isEditing: true,
                },
              ],
            ],
          },
        },
      ];
    case "SelfAssessment":
      return [
        {
          name: "SelfAssessment",
          fid: nanoid(),
          $settings: {
            style: {},
            $children: {
              sid: nanoid(),
              text: "输入你的自我评价",
              isEditing: false,
            },
          },
        },
      ];

    default:
      return [
        {
          name: "Text",
          fid: nanoid(),
          $settings: {
            style: { color: "#1890ff" },
            $children: "",
          },
        },
      ];
  }
};
const PaperDorp = ({ wh, $tree, selector, menuItems, appendComponent }) => {
  const { tree } = $tree;
  console.log(tree);
  const HitComponent = (name) => {
    return menuItems.filter((item) => item.name === name)[0];
  };
  const [clientTop, setClientTop] = useState(0);
  const [{ isOver, item }, dropContainer] = useDrop(
    () => ({
      accept: "box",
      collect: (monitor) => ({
        isOver: monitor.isOver({ shallow: true }),
        item: monitor.getItem(),
      }),
      drop: (item, monitor) => {
        appendComponent({
          cid: nanoid(),
          top: 0,
          settings: switchSettings(item.type),
          name: item.type,
        });
      },
    }),
    []
  );

  return (
    <Canvas wh={wh} ref={dropContainer} id="htmltopdf">
      {tree.map((item) => {
        const { Component } = HitComponent(item.name);
        return <Component key={nanoid()} {...item}></Component>;
      })}
    </Canvas>
  );
};

export default connect(
  (state) => {
    return {
      $tree: state.tree,
      selector: state.selector,
    };
  },
  (dispatch) => ({
    appendComponent: (data) => dispatch(appendComponent(data)),
  })
)(PaperDorp);

const Canvas = styled.div`
  width: ${({ wh }) => (wh.width ? wh.width : "450px")};
  height: ${({ wh }) => (wh.height ? wh.height : "800px")};
  box-shadow: 10px 10px 30px #cecece, -10px -10px 30px #ffffff;
  background-clip: #fff;
  padding: 10px 15px;
  margin: 20px 0;
`;
