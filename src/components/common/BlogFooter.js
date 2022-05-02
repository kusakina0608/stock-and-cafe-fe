import React from 'react';
import 'antd/dist/antd.css';
import {Footer} from "antd/es/layout/layout";

function BlogFooter() {
  const items = [
    {key: "/", label: 'Home'},
    {key: "/stock", label: 'StockLayout'},
    {key: "/cafe", label: 'CafeLayout'}
  ]

  return (
    <Footer
      style={{
        textAlign: 'center',
      }}
    >
      Stock and Cafe ©2022 Created by Kina.lee
    </Footer>
  );
}

export default BlogFooter;