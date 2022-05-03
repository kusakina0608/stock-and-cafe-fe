import React, {useEffect, useState} from 'react';
import CafeLayout from "../../../../containers/CafeLayout";
import {Button, Col, Input, PageHeader, Row, Tag} from "antd";
import moment from "moment";
import getGravatar from "../../../../modules/Gravatar";
import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import TextArea from "antd/es/input/TextArea";
import webClient from "../../../../modules/WebClient";
import host from "../../../../constants/Host";
import axios from "axios";
import {useParams} from "react-router-dom";

export default function ArticleEdit() {
  const {articleId} = useParams();
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [createdDate, setCreatedDate] = useState("")


  function getArticle() {
    webClient.get(`${host}/api/v1/articles/${articleId}`)
      .then((res) => res.data)
      .then((data) => {
        console.log("data: ", data)
        setTitle(data.title)
        setContent(data.content)
        setCreatedDate(data.createdDate)
      })
  }

  useEffect(getArticle, [])

  const onTitleChange = (e) => {
    setTitle(e.target.value)
  }
  const onContentChange = (e) => {
    setContent(e.target.value)
  }

  function updateArticle() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    webClient.patch(`${host}/api/v1/articles/${articleId}`, {title, content})
      .then((res) => res.data)
      .then((data) => {
        console.log("data: ", data)
        document.location.href = `/cafe/${data.articleId}`
      })
  }

  return (
    <CafeLayout>
      <div data-color-mode="light">
        <PageHeader
          title={<Input placeholder="제목을 입력해주세요" bordered={false} value={title} onChange={onTitleChange}/>}
          className="site-page-header"
          subTitle={moment(createdDate).format("YYYY/MM/DD HH:mm:ss")}
          tags={<Tag color="blue">카페</Tag>}
          extra={[
            <Button key="1" onClick={() => {
              document.location.href = "/cafe"
            }}>글목록</Button>,
            <Button key="2" onClick={updateArticle}>수정하기</Button>
          ]}
          avatar={{src: getGravatar()}}
        >
        </PageHeader>
        <Row>
          <Col span={12}>
            <TextArea placeholder="Borderless" bordered={false} value={content} onChange={onContentChange}
                      autoSize={true}/>
          </Col>
          <Col span={12}>
            <ReactMarkdown
              rehypePlugins={[rehypeRaw, remarkGfm, remarkMath]}
              children={content}
            />
          </Col>
        </Row>
      </div>
    </CafeLayout>
  )
}