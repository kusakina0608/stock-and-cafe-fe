import "../../../../style/ArticleList.css"

import React, {useEffect, useState} from 'react';
import CafeLayout from "../../../../containers/CafeLayout";
import webClient from "../../../../modules/WebClient";
import {useParams} from "react-router-dom";
import {Button, PageHeader, Row, Tag, Typography} from "antd";
import getGravatar from "../../../../modules/Gravatar";
import moment from "moment";
import ReplyList from "../reply/ReplyList";

export default function ArticleDetail() {
  const {articleId} = useParams();
  const [article, setArticle] = useState([])

  // onCreated
  useEffect(() => {
    return getArticle(articleId)
  }, [])

  function getArticle(articleId) {
    webClient.get(`/api/v1/articles/${articleId}`)
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

  return (
    <CafeLayout>
      <PageHeader
        title={article.title}
        className="site-page-header"
        subTitle={moment(article.createdDate).format("YYYY/MM/DD HH:mm:ss")}
        tags={<Tag color="blue">카페</Tag>}
        extra={[
          <Button key="1">글목록</Button>,
          <Button key="2">수정하기</Button>,
          <Button key="3">삭제하기</Button>
        ]}
        avatar={{src: getGravatar()}}
      >
        <Content>
        </Content>
      </PageHeader>
      <ReplyList/>
    </CafeLayout>
  )
}