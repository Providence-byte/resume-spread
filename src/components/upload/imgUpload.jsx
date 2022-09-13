/**
 * @description 图片上传组件，基于 Input 二次封装
 * @author {pengdaokuan}
 */
import React from "react";
import styled from "styled-components";
import Upload from "./upload";
import { CameraOutlined } from "@ant-design/icons";

const ImageUpload = ({
  text = "上传头像",
  preventInputManager = false,
  onAfterClick = () => { },
  onBlur,
  ...otherProps
}) => {
  return (
    <UploadWrapper onClick={onAfterClick}>
      {!preventInputManager && (
        <UploadInput>
          <Upload
            {...otherProps}
            onAfterClick={() => {}}
            style={{ width: "84px", height: "102px" }}
          />
        </UploadInput>
      )}
      <UploadBox>
        <CameraOutlined />
        <p>{text}</p>
      </UploadBox>
    </UploadWrapper>
  );
};

export default ImageUpload;

const UploadWrapper = styled.div`
  width: 84px;
  height: 102px;
  background-color: #eee;
  border: 1px solid #ccc;
  margin: 10px auto;
  position: relative;
  display: inline-block;
  vertical-align: text-bottom;
`;

const UploadInput = styled.div`
  position: absolute;
  opacity: 0;
  z-index: 2;
  height: 100%;
  width: 100%;
  cursor: pointer;
`;

const UploadBox = styled.div`
  position: absolute;
  z-index: 1;
  display: flex;
  height: 100%;
  width: 100%;
  cursor: pointer;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-size: 12px;
  line-height: 18px;
  color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  border: 1px dashed #ddd;
`;
