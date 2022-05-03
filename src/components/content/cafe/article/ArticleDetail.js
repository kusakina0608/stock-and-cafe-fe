import "../../../../style/ArticleList.css"
import "../../../../style/CustomMD.css"

import React, {useEffect, useState} from 'react';
import CafeLayout from "../../../../containers/CafeLayout";
import webClient from "../../../../modules/WebClient";
import {useParams} from "react-router-dom";
import {Button, PageHeader, Row, Tag, Typography} from "antd";
import getGravatar from "../../../../modules/Gravatar";
import moment from "moment";
import ReplyList from "../reply/ReplyList";
import host from "../../../../constants/Host";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import axios from "axios";

export default function ArticleDetail() {
  const {articleId} = useParams();
  const [article, setArticle] = useState([])

  // onCreated
  useEffect(() => {
    return getArticle(articleId)
  }, [])

  function getArticle(articleId) {
    webClient.get(`${host}/api/v1/articles/${articleId}`)
      .then((res) => res.data)
      .then((data) => {
        console.log("data: ", data)
        setArticle(data)
      })
  }

  const {Paragraph} = Typography;

  const Content = ({children, extraContent}) => (
    <Row>
      <div style={{flex: 1}}>{children}</div>
      <div className="image">{extraContent}</div>
    </Row>
  );

  const deleteArticle = () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    webClient.delete(`${host}/api/v1/articles/${articleId}`)
      .then((res) => res.data)
  }

  return (
    <CafeLayout>
      <div data-color-mode="light">
        <PageHeader
          title={article.title}
          className="site-page-header"
          subTitle={moment(article.createdDate).format("YYYY/MM/DD HH:mm:ss")}
          tags={<Tag color="blue">카페</Tag>}
          extra={[
            <Button key="1" onClick={() => {
              document.location.href = "/cafe"
            }}>글목록</Button>,
            <Button key="2" onClick={() => {
              document.location.href = `/cafe/${articleId}/edit`
            }}>수정하기</Button>,
            <Button key="3" onClick={deleteArticle}>삭제하기</Button>
          ]}
          avatar={{src: getGravatar()}}
        >
          <ReactMarkdown rehypePlugins={[rehypeRaw, remarkGfm, remarkMath]}
                         children={article.content}/>
        </PageHeader>
      </div>
      <ReplyList/>
    </CafeLayout>
  )
}