import { Input } from "antd";
import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { connect, useDispatch } from "react-redux";
import {
  updateComponentSettings,
  appendSettings,
} from "../../redux/action/tree";

const Div = (props) => <div {...props}>点击添加一段文字</div>;

const Text = (props) => {
  let $settings = {};
  const [state, setState] = useState({
    isEditing: false,
    text: "",
  });

  const { isEditing, text } = state;
  const { dispatch, fid, cid, tree } = props;
  let $this = tree.filter((item) => item.cid === cid)[0];
  $settings = $this.settings.filter((item) => item.fid === fid)[0].$settings;
  const { $children, style } = $settings;

  if (isEditing) {
    return (
      <Input
        autoFocus
        style={style}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            dispatch(
              appendSettings({
                cid,
                append: {
                  name: "Text",
                  fid: nanoid(),
                  $settings: {
                    style: { color: "#1890ff" },
                    $children: "",
                  },
                },
              })
            );
          }
        }}
        onBlur={() => {
          setState({
            isEditing: false,
            text,
          });
          dispatch(
            updateComponentSettings({
              cid,
              fid,
              $settings: {
                style,
                $children: text,
              },
            })
          );
        }}
        onChange={(e) => {
          setState({
            isEditing,
            text: e.target.value,
          });
        }}
      />
    );
  }
  return (
    <div
      onClick={() => {
        setState({
          isEditing: true,
          text: $children,
        });
      }}
      style={style}
    >
      {$children || "点击添加一段文字"}
    </div>
  );
};

const fragmentComponent = [{ name: "Text", Component: Text }];

const SwitchComponent = (name) => {
  return fragmentComponent.filter((item) => item.name === name)[0];
};

function Test({ isShot, cid, $tree }) {
  const dispatch = useDispatch();
  const { tree } = $tree;

  const shotSetting = [
    {
      id: 1,
      component: Div,
      $settings: {
        style: {
          color: "#1890ff",
        },
        $children: "点击添加一行文字",
      },
    },
  ];

  if (isShot) {
    return shotSetting.map((Item, index) => {
      return <Item.component key={nanoid()} {...Item.$settings} />;
    });
  }

  let settings = tree.filter((item) => item.cid === cid)[0].settings;

  return settings.map((Item) => {
    const { Component } = SwitchComponent(Item.name);
    return (
      <Component
        fid={Item.fid}
        tree={tree}
        key={nanoid()}
        dispatch={dispatch}
        cid={cid}
      />
    );
  });
}

export default connect((state) => {
  return {
    $tree: state.tree,
  };
})(Test);
