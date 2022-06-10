import React from 'react';
import 'antd/dist/antd.css';
import {Menu} from "antd";
import {Header} from "antd/es/layout/layout";
import {Link} from "react-router-dom";
import {hasToken} from "../../modules/Authenticate";

function BlogHeader() {
  const children = [
    {key: "/", label: 'Home'},
    {key: "/stock", label: 'StockLayout'},
    {key: "/cafe", label: 'CafeLayout'}
  ]

  return (
    <Header
      style={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
      }}
    >
      <div className="logo"/>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
      >
        <Menu.Item key="/">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="/stock">
          <Link to="/stock">Stock</Link>
        </Menu.Item>
        <Menu.Item key="/cafe">
          <Link to="/cafe">Cafe</Link>
        </Menu.Item>
        {hasToken() ?
          <Menu.Item key="/sign-out">
            <Link to="/sign-out">Logout</Link>
          </Menu.Item> :
          <>
            <Menu.Item key="/sign-in">
              <Link to="/sign-in">Login</Link>
            </Menu.Item>
            <Menu.Item key="/sign-up">
              <Link to="/sign-up">Register</Link>
            </Menu.Item>
          </>
        }
      </Menu>
    </Header>
  );
}

export default BlogHeader;