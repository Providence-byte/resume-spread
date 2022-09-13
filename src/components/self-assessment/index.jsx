import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { connect, useDispatch } from "react-redux";
import styled from "styled-components";
import { ComponentTitle } from "../component-title";
import { updateComponentSettings } from "../../redux/action/tree";
import TextArea from "antd/lib/input/TextArea";

const Snapshot = (props) => {
  return (
    <InfoContainer>
      <ComponentTitle title={"自我评价"} />
      <MainContainer>
        <SelfTextArea>
          <p style={{ minHeight: "50px" }}>1111</p>
        </SelfTextArea>
      </MainContainer>
    </InfoContainer>
  );
};

const SelfAssessment = (props) => {
  const { dispatch, fid, cid, tree } = props;
  let $this = tree.filter((item) => item.cid === cid)[0];
  let $settings = $this.settings.filter((item) => item.fid === fid)[0]
    .$settings;
  const { $children, style } = $settings;
  const [selfAssessmentText, setSelfAssessmentText] = useState($children);
  return (
    <SelfTextArea
      onBlur={() => {
        dispatch(
          updateComponentSettings({
            cid,
            fid,
            $settings: {
              style,
              $children: selfAssessmentText,
            },
          })
        );
      }}
    >
      {selfAssessmentText.isEditing ? (
        <TextArea
          autoFocus
          rows={4}
          cols={100}
          style={style}
          value={selfAssessmentText.text}
          placeholder="请输入自我评价"
          onChange={(e) => {
            setSelfAssessmentText((prev) => {
              let newList = { ...prev };
              newList.text = e.target.value;
              return newList;
            });
          }}
          onBlur={() => {
            setSelfAssessmentText((prev) => {
              let newList = { ...prev };
              newList.isEditing = false;
              return newList;
            });
          }}
        />
      ) : (
        <List
          key={selfAssessmentText.sid}
          onClick={() => {
            setSelfAssessmentText((prev) => {
              let newList = { ...prev };
              newList.isEditing = true;
              return newList;
            });
            dispatch(
              updateComponentSettings({
                cid,
                fid,
                $settings: {
                  style,
                  $children: selfAssessmentText,
                },
              })
            );
          }}
          style={style}
        >
          {selfAssessmentText.text}
        </List>
      )}
    </SelfTextArea>
  );
};

const fragmentComponent = [
  { name: "SelfAssessment", Component:SelfAssessment },
];

const SwitchComponent = (name) => {
  return fragmentComponent.filter((item) => item.name === name)[0];
};

function SelfAssessments({ isShot, cid, $tree }) {
  const dispatch = useDispatch();
  const { tree } = $tree;

  const shotSetting = [
    {
      id: 1,
      component: Snapshot,
      $settings: {},
    },
  ];

  if (isShot) {
    return shotSetting.map((Item, index) => {
      return <Item.component key={nanoid()} {...Item.$settings} />;
    });
  }

  let settings = tree.filter((item) => item.cid === cid)[0].settings;

  console.log("@", settings);

  return settings.map((Item) => {
    console.log(Item);
    const { Component } = SwitchComponent(Item.name);
    return (
      <InfoContainer key={nanoid()}>
        <ComponentTitle title={"个人评价"} />
        <MainContainer>
          <Component
            fid={Item.fid}
            tree={tree}
            key={nanoid()}
            dispatch={dispatch}
            cid={cid}
          />
        </MainContainer>
      </InfoContainer>
    );
  });
}

export default connect((state) => {
  return {
    $tree: state.tree,
  };
})(SelfAssessments);

const InfoContainer = styled.div``;
const MainContainer = styled.div`
  display: flex;
`;
const SelfTextArea = styled.ul`
  list-style-position: inside;
`;
const List = styled.div`
  min-width: 200px;
  word-wrap: "break-word";
  word-break: "break-all";
  overflow: "hidden";
`;
