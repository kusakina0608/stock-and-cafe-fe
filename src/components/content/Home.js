import React from 'react';
import {Content} from "antd/es/layout/layout";
import {Breadcrumb} from "antd";

export default function Home() {
  return (
    <Content className="site-layout BlogBody">
      <Breadcrumb className="Breadcrumb">
        <Breadcrumb.Item>Home</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background BlogContent">
        Content
      </div>
    </Content>
  )
}