import React, {useEffect, useState} from 'react';
import {Button, Col, Input, message, PageHeader, Row, Tag} from "antd";
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
import StockLayout from "../../../../containers/StockLayout";
import {getToken, hasToken} from "../../../../modules/Authenticate";

export default function StockEdit() {
  const {stockId} = useParams();
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [createdDate, setCreatedDate] = useState("")
  const [writerEmail, setWriterEmail] = useState("")


  const getArticle = () => {
    if (hasToken()) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`
      webClient.get(`${host}/api/v1/stocks/${stockId}`)
        .then((res) => res.data)
        .then((data) => {
          console.log("data: ", data)
          setTitle(data.title)
          setContent(data.content)
          setCreatedDate(data.createdDate)
          setWriterEmail(data.writerEmail)
        })
        .catch(() => {
          message.error({content: "서버 오류가 발생했습니다.", key: "server_error"})
        })
    } else {
      message.error({content: "로그인 정보가 존재하지 않습니다.", key: "token_error"})
      document.location.href = "/sign-in"
    }
  }

  useEffect(getArticle, [])

  const onTitleChange = (e) => {
    setTitle(e.target.value)
  }
  const onContentChange = (e) => {
    setContent(e.target.value)
  }

  const updateArticle = () => {
    if (hasToken()) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`
      webClient.patch(`${host}/api/v1/stocks/${stockId}`, {title, content})
        .then((res) => res.data)
        .then((data) => {
          console.log("data: ", data)
          document.location.href = `/stock/${data.stockId}`
        })
        .catch(() => {
          message.error({content: "서버 오류가 발생했습니다.", key: "server_error"})
        })
    } else {
      message.error({content: "로그인 정보가 존재하지 않습니다.", key: "token_error"})
      document.location.href = "/sign-in"
    }
  }

  return (
    <StockLayout>
      <div data-color-mode="light">
        <PageHeader
          title={<Input placeholder="제목을 입력해주세요" bordered={false} value={title} onChange={onTitleChange}/>}
          className="site-page-header"
          subTitle={moment(createdDate).format("YYYY/MM/DD HH:mm:ss")}
          tags={<Tag color="blue">주식</Tag>}
          extra={[
            <Button key="1" onClick={() => {
              document.location.href = "/cafe"
            }}>글목록</Button>,
            <Button key="2" onClick={updateArticle}>수정하기</Button>
          ]}
          avatar={{src: getGravatar(writerEmail)}}
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
    </StockLayout>
  )
}