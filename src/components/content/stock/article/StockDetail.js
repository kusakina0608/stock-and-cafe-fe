import "../../../../style/ArticleList.css"
import "../../../../style/CustomMD.css"

import React, {useEffect, useState} from 'react';
import webClient from "../../../../modules/WebClient";
import {useParams} from "react-router-dom";
import {Button, message, PageHeader, Row, Tag, Typography} from "antd";
import getGravatar from "../../../../modules/Gravatar";
import moment from "moment";
import host from "../../../../constants/Host";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import axios from "axios";
import StockLayout from "../../../../containers/StockLayout";
import {getToken, hasToken} from "../../../../modules/Authenticate";

export default function StockDetail() {
  const {stockId} = useParams();
  const [stock, setStock] = useState([])

  // onCreated
  useEffect(() => {
    return getStocks(stockId)
  }, [])

  const getStocks = (articleId) => {
    if (hasToken()) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`
      webClient.get(`${host}/api/v1/stocks/${articleId}`)
        .then((res) => res.data)
        .then((data) => {
          console.log("data: ", data)
          setStock(data)
        })
        .catch(() => {
          message.error({content: "서버 오류가 발생했습니다.", key: "server_error"})
        })
    } else {
      message.error({content: "로그인 정보가 존재하지 않습니다.", key: "token_error"})
      document.location.href = "/sign-in"
    }
  }

  const {Paragraph} = Typography;

  const Content = ({children, extraContent}) => (
    <Row>
      <div style={{flex: 1}}>{children}</div>
      <div className="image">{extraContent}</div>
    </Row>
  );

  const deleteArticle = () => {
    if (hasToken()) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`
      webClient.delete(`${host}/api/v1/stocks/${stockId}`)
        .then(() => {
          document.location.href = "/stock"
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
          title={stock.title}
          className="site-page-header"
          subTitle={moment(stock.createdDate).format("YYYY/MM/DD HH:mm:ss")}
          tags={<Tag color="blue">카페</Tag>}
          extra={[
            <Button key="1" onClick={() => {
              document.location.href = "/stock"
            }}>글목록</Button>,
            <Button key="2" onClick={() => {
              document.location.href = `/stock/${stockId}/edit`
            }}>수정하기</Button>,
            <Button key="3" onClick={deleteArticle}>삭제하기</Button>
          ]}
          avatar={{src: getGravatar(stock.writerEmail)}}
        >
          <ReactMarkdown rehypePlugins={[rehypeRaw, remarkGfm, remarkMath]}
                         children={stock.content}/>
        </PageHeader>
      </div>
    </StockLayout>
  )
}