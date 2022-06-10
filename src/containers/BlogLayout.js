import 'antd/dist/antd.css';
import "../style/BlogLayout.css"

import React from 'react';
import {Route, Routes} from "react-router";
import {Layout} from "antd";

import BlogHeader from "../components/common/BlogHeader";
import BlogFooter from "../components/common/BlogFooter";
import StockLayout from "./StockLayout";
import Home from "../components/content/Home";
import ArticleList from "../components/content/cafe/article/ArticleList";
import ArticleForm from "../components/content/cafe/article/ArticleForm";
import SignIn from "../components/content/SignIn";
import ArticleDetail from "../components/content/cafe/article/ArticleDetail";
import ArticleEdit from "../components/content/cafe/article/ArticleEdit";
import StockList from "../components/content/stock/article/StockList";
import StockForm from "../components/content/stock/article/StockForm";
import StockEdit from "../components/content/stock/article/StockEdit";
import StockDetail from "../components/content/stock/article/StockDetail";
import SignUp from "../components/content/SignUp";
import SignOut from "../components/content/SignOut";

function BlogLayout() {
  const children = [
    {key: "/", label: 'Home'},
    {key: "/stock", label: 'StockLayout'},
    {key: "/cafe", label: 'Cafe'}
  ]

  return (
    <Layout className="BlogLayout">
      <BlogHeader/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/sign-out" element={<SignOut/>}/>
        <Route path="/stock" element={<StockList/>}/>
        <Route path="/stock/:stockId" element={<StockDetail/>}/>
        <Route path="/stock/:stockId/edit" element={<StockEdit/>}/>
        <Route path="/stock/new" element={<StockForm/>}/>
        <Route path="/cafe" element={<ArticleList/>}/>
        <Route path="/cafe/:articleId" element={<ArticleDetail/>}/>
        <Route path="/cafe/:articleId/edit" element={<ArticleEdit/>}/>
        <Route path="/cafe/new" element={<ArticleForm/>}/>
      </Routes>
      <BlogFooter/>
    </Layout>
  );
}

export default BlogLayout;