import { Button } from "antd";
import React from "react";
import { TopHeader } from "../../components/topHeader";
import styled from "styled-components";

export const ResumeTemp = () => {
  return (
    <div>
       <TopHeader
        render={() => {
          return (
            <BtnGroup>
              <Button type={'primary'} size={'large'}>新建模板</Button>
              <Button type={'primary'} size={'large'}>导出pdf</Button>
            </BtnGroup>
          );
        }}
      />
    </div>
  )
}

const BtnGroup = styled.div`
  min-width: 200px;
  display: flex;
  justify-content: space-between;
`