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

function BlogLayout() {
  const items = [
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
        <Route path="/sign-up" element={<StockLayout/>}/>
        <Route path="/stock" element={<StockLayout/>}/>
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