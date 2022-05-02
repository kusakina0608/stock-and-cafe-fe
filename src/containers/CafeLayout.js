import "../style/BlogLayout.css"

import React from 'react';
import {Content} from "antd/es/layout/layout";
import {Breadcrumb} from "antd";

export default function CafeLayout(props) {
  const {children} = props
  return (
    <Content className="site-layout BlogBody">
      <Breadcrumb className="Breadcrumb">
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Cafe</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background BlogContent">
        {children}
      </div>
    </Content>
  )
}