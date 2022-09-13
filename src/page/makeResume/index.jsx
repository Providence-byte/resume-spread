import { Modal, Input, Drawer, Empty } from "antd";
import React, { useEffect, useState } from "react";
import { TopHeader } from "../../components/topHeader";
import styled from "styled-components";
import { Route, Routes, useNavigate } from "react-router";

import { FileOutlined, FileDoneOutlined } from "@ant-design/icons";
import empty from "../../assets/empty.png";
import Editor from "./newResume";
import { nanoid } from "nanoid";
const { ipcRenderer } = window.require("electron");
export const MakeResume = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [isDrawerSee, setIsDrawerSee] = useState(false);
  const [ids, setIds] = useState([]);
  const showDrawer = () => {
    setIsDrawerSee(true);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
  const onClose = () => {
    setIsDrawerSee(false);
  };

  const handleOk = async () => {
    setIsModalVisible(false);
    ipcRenderer.send("async-write-file", name);
    navigate(`/makeresume/resume?pid=${name}`);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    ipcRenderer.invoke("read-data").then((res) => {
      setIds(res);
    });
  }, []);

  return (
    <div>
      <TopHeader />
      <Routes>
        <Route
          path="/"
          exact
          element={
            <>
              <Modal
                closable={false}
                maskClosable={false}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="确定"
                cancelText="取消"
              >
                <Input
                  placeholder="请输入模板名"
                  allowClear
                  onChange={(e) => setName(e.target.value)}
                />
              </Modal>
              <Drawer
                title="加载一个本地模板"
                placement={"left"}
                width={500}
                onClose={onClose}
                visible={isDrawerSee}
                closable
              >
                <DrawerWrapper>
                  {ids.map((item) => {
                    return (
                      <div
                        className="container_drawer"
                        key={nanoid()}
                        onClick={() => {
                          navigate(`/makeresume/resume?pid=${item.id}`);
                        }}
                      >
                        <img className="preview" src={item.preview || empty} />
                        <div>{item.id}</div>
                      </div>
                    );
                  })}
                </DrawerWrapper>
              </Drawer>

              <BtnGroup>
                <DivBtn
                  onClick={() => {
                    showModal();
                  }}
                >
                  <FileOutlined />
                  <div
                    style={{
                      fontSize: 16,
                      margin: "5px 0 0",
                    }}
                  >
                    新建空白简历
                  </div>
                </DivBtn>
                <DivBtn
                  onClick={() => {
                    showDrawer();
                  }}
                >
                  <FileDoneOutlined />
                  <div
                    style={{
                      fontSize: 16,
                      margin: "5px 0 0",
                    }}
                  >
                    使用本地模板
                  </div>
                </DivBtn>
              </BtnGroup>
            </>
          }
        ></Route>
        <Route path="/resume" element={<Editor />}></Route>
      </Routes>
    </div>
  );
};

const DivBtn = styled.div`
  border-radius: 12px;
  margin: 0 30px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-size: 40px;
  font-weight: 100;
  padding: 15px;
  cursor: pointer;
  :hover {
    color: #1890ff;
  }
`;

const BtnGroup = styled.div`
  min-width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #a0d5f9;
  height: calc(100vh - 60px);
`;

const DrawerWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .container_drawer {
    border: 1px solid #1890ff;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
    align-items: center;
    margin: 4px 7px;
    padding: 15px 15px;
    :hover {
      color: #1890ff;
    }
    div {
      transition: color 0.3s;
    }
  }
  .preview {
    width: 100px;
    height: 150px;
    margin: 25px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: small;
  }
`;
