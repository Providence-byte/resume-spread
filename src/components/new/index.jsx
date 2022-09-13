import React, { useState } from "react";
import styled from "styled-components";
import { ComponentTitle } from "../component-title";
import { nanoid } from "nanoid";
import { Input } from "antd";
import { updateComponentSettings } from "../../redux/action/tree";
import { connect, useDispatch } from "react-redux";
import { log } from "util";

const { TextArea } = Input;
const HShot = () => {
  return (
    <InfoContainer>
      <ComponentTitle title={"项目经历"}></ComponentTitle>
      <TopContainer>
        <div>xxxx.xx-xxxx.xx</div>
        <div>项目名</div>
        <div>进度</div>
      </TopContainer>
      <Title>项目内容:</Title>
      <TextAreaContainer>
        <TextArea defaultValue={"内容"}></TextArea>
      </TextAreaContainer>
      <Title>项目地址:</Title>
      <TextAreaContainer>
        {" "}
        <TextArea defaultValue={"地址"}></TextArea>
      </TextAreaContainer>
    </InfoContainer>
  );
};
const RenderH = (props) => {
  const { dispatch, fid, cid, tree } = props;
  let $this = tree.filter((item) => item.cid === cid)[0];
  let $settings = $this.settings.filter((item) => item.fid === fid)[0]
    .$settings;
  const { $children, style } = $settings;
  const [topMessage, setTopMessage] = useState($children[0]);
  const [content, setContent] = useState($children[1]);
  const [address, setAddress] = useState($children[2]);
  const handleBlurTop = (idx) => {
    return (e) => {
      if (e.target.value !== "") {
        setTopMessage((prev) => {
          let newInfo = [...prev];
          newInfo[idx].isEditing = false;
          newInfo[idx].text = e.target.value;
          return newInfo;
        });
      }
    };
  };
  const handleClickTop = (idx) => {
    return () => {
      setTopMessage((prev) => {
        let newInfo = [...prev];
        newInfo[idx].isEditing = true;
        return newInfo;
      });
    };
  };
  const handleBlurAddress = (idx) => {
    return (e) => {
      if (e.target.value !== "") {
        setAddress((prev) => {
          let newInfo = [...prev];
          newInfo[idx].isEditing = false;
          newInfo[idx].text = e.target.value;
          return newInfo;
        });
      }
    };
  };
  const handleClickAddress = (idx) => {
    return () => {
      setAddress((prev) => {
        let newInfo = [...prev];
        newInfo[idx].isEditing = true;
        return newInfo;
      });
    };
  };
  return (
    <>
      <TopContainer
        onBlur={() => {
          dispatch(
            updateComponentSettings({
              cid,
              fid,
              $settings: {
                style,
                $children: [topMessage, content, address],
              },
            })
          );
        }}
      >
        <Time onClick={handleClickTop(0)}>
          {topMessage[0].isEditing ? (
            <Input placeholder="项目时间" onBlur={handleBlurTop(0)} />
          ) : (
            topMessage[0].text
          )}
        </Time>
        <Name onClick={handleClickTop(1)}>
          {topMessage[1].isEditing ? (
            <Input placeholder="项目名称" onBlur={handleBlurTop(1)} />
          ) : (
            topMessage[1].text
          )}
        </Name>
        <Process onClick={handleClickTop(2)}>
          {topMessage[2].isEditing ? (
            <Input placeholder="项目进程" onBlur={handleBlurTop(2)} />
          ) : (
            topMessage[2].text
          )}
        </Process>
      </TopContainer>
      <Title>项目内容:</Title>
      <TextAreaContainer
        onBlur={() => {
          dispatch(
            updateComponentSettings({
              cid,
              fid,
              $settings: {
                style,
                $children: [topMessage, content, address],
              },
            })
          );
        }}
      >
        {content.isEditing ? (
          <TextArea
            rows={4}
            cols={100}
            style={style}
            value={content.text}
            placeholder="请输入内容"
            onChange={(e) => {
              setContent((prev) => {
                let newList = { ...prev };
                console.log("newList.text", newList);
                newList.text = e.target.value;
                return newList;
              });
            }}
            onBlur={() => {
              setContent((prev) => {
                let newList = { ...prev };
                newList.isEditing = false;
                return newList;
              });
            }}
          />
        ) : (
          <List
            key={content.sid}
            onClick={() => {
              setContent((prev) => {
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
                    $children: [topMessage, content, address],
                  },
                })
              );
            }}
            style={style}
          >
            {content.text}
          </List>
        )}
      </TextAreaContainer>
      <Title>项目地址:</Title>
      <TextAreaContainer
        onBlur={() => {
          dispatch(
            updateComponentSettings({
              cid,
              fid,
              $settings: {
                style,
                $children: [topMessage, content, address],
              },
            })
          );
        }}
      >
        <Address onClick={handleClickAddress(0)}>
          {address[0].isEditing ? (
            <Input placeholder="项目地址" onBlur={handleBlurAddress(0)} />
          ) : (
            address[0].text
          )}
        </Address>
      </TextAreaContainer>
    </>
  );
};
const fragmentComponent = [{ name: "RenderH", Component: RenderH }];

const SwitchComponent = (name) => {
  return fragmentComponent.filter((item) => item.name === name)[0];
};
function H({ isShot, cid, $tree }) {
  const dispatch = useDispatch();
  const { tree } = $tree;

  const shotSetting = [
    {
      id: 1,
      component: HShot,
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

  console.log("tree", tree);

  return settings.map((Item) => {
    const { Component } = SwitchComponent(Item.name);
    return (
      <InfoContainer key={nanoid()}>
        <ComponentTitle title={"项目经历"}></ComponentTitle>
        <Component
          fid={Item.fid}
          tree={tree}
          key={nanoid()}
          dispatch={dispatch}
          cid={cid}
        />
      </InfoContainer>
    );
  });
}

const InfoContainer = styled.div``;
const TextAreaContainer = styled.div``;
const Address = styled.h1`
  color: #514b6f;
`;
const Title = styled.div`
  font-weight: 500;
  font-size: 18px;
  color: rgb(110, 102, 140);
  margin-top: 10px;
`;
const Time = styled.h1`
  width: 20%;
  color: #514b6f;
`;
const Name = styled.h1`
  width: 20%;
  color: #514b6f;
`;
const Process = styled.h1`
  width: 20%;
  color: #514b6f;
`;
const TopContainer = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 15px;
  padding: 10px 0;
  font-weight: 500;
`;

const List = styled.div`
  max-width: 400px;

  min-width: 200px;
  min-height: 100px;
  word-wrap: break-word;
  word-break: break-all;
`;

export default connect((state) => {
  return {
    $tree: state.tree,
  };
})(H);
