import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { connect, useDispatch } from "react-redux";
import styled from "styled-components";
import { ComponentTitle } from "../component-title";
import {
  updateComponentSettings,
  appendSettings,
} from "../../redux/action/tree";

const Snapshot = (props) => {
  return (
    <InfoContainer>
      <ComponentTitle title={"个人技能"} />
      <MainContainer>
        <SkillList>
          <List>人在江湖，须有一技傍身</List>
          <List>此乃第二技</List>
          <List>事不过三，技不嫌多</List>
        </SkillList>
      </MainContainer>
    </InfoContainer>
  );
};

const Skill = (props) => {
  const { dispatch, fid, cid, tree } = props;
  let $this = tree.filter((item) => item.cid === cid)[0];
  let $settings = $this.settings.filter((item) => item.fid === fid)[0].$settings;
  const { $children, style } = $settings;
  const [skillsList, setSkillsList] = useState($children);
  return (
    <SkillList onBlur={() => {
      dispatch(
        updateComponentSettings({
          cid, fid, $settings: {
            style,
            $children: skillsList,
          }
        })
      );
    }}>
      {
        skillsList.map((item, index) => {
          if (item.isEditing) {
            return (
              <List key={item.sid}>
                <Input autoFocus style={style} value={item.text} onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    setSkillsList((prev) => {
                      let newList = [...prev];
                      newList[index].isEditing = false;
                      newList.splice(index + 1, 0, {
                        sid: nanoid(),
                        text: "",
                        isEditing: true,
                      });
                      return newList;
                    });
                  } else if (e.key === "Backspace" && skillsList.length > 1 && item.text === "") {
                    setSkillsList((prev) => {
                      let newList = [...prev];
                      newList[index - 1].isEditing = true;
                      newList.splice(index, 1);
                      return newList;
                    });
                  }
                }} onChange={(e) => {
                  setSkillsList((prev) => {
                    let newList = [...prev];
                    newList[index].text = e.target.value;
                    return newList;
                  });
                }} onBlur={() => {
                  setSkillsList((prev) => {
                    let newList = [...prev];
                    newList[index].isEditing = false;
                    return newList;
                  });
                }} />
              </List>
            )
          } else {
            return (
              <List key={item.sid} onClick={() => {
                setSkillsList((prev) => {
                  let newList = [...prev];
                  newList[index].isEditing = true;
                  return newList;
                });
                dispatch(
                  updateComponentSettings({
                    cid, fid, $settings: {
                      style,
                      $children: skillsList,
                    }
                  })
                );
              }} style={style}>{item.text}</List>
            )
          }
        })
      }
    </SkillList>
  );
};

const fragmentComponent = [{ name: "Skill", Component: Skill }];

const SwitchComponent = (name) => {
  return fragmentComponent.filter((item) => item.name === name)[0];
};

function Skills({ isShot, cid, $tree }) {
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

  // console.log("@", settings);

  return settings.map((Item) => {
    const { Component } = SwitchComponent(Item.name);
    return (
      <InfoContainer key={nanoid()}>
        <ComponentTitle title={"个人技能"} />
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
})(Skills);


const InfoContainer = styled.div``;
const MainContainer = styled.div`
  display: flex;
`;
const SkillList = styled.ul`
  list-style-position: inside;
`;
const List = styled.li`
  list-style-position: inside;
  list-style-type: disc;
  display: list-item;
`;
const Input = styled.input``;
