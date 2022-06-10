import React from 'react';
import {Content} from "antd/es/layout/layout";
import {Breadcrumb} from "antd";

export default function StockLayout(props) {
  const {children} = props
  return (
    <Content className="site-layout BlogBody">
      <Breadcrumb className="Breadcrumb">
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Stock</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background BlogContent">
        {children}
      </div>
    </Content>
  )
}