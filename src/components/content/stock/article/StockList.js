import "../../../../style/ArticleList.css"

import React, {useEffect, useState} from 'react';
import {Avatar, Button, List, message} from "antd";
import webClient from "../../../../modules/WebClient";
import querystring from "query-string";
import moment from "moment";
import getGravatar from "../../../../modules/Gravatar";
import host from "../../../../constants/Host";
import axios from "axios";
import StockLayout from "../../../../containers/StockLayout";
import {getToken, hasToken} from "../../../../modules/Authenticate";


export default function StockList() {
  const [stocks, setStocks] = useState([])
  const [paginationProps, setPaginationProps] = useState({
    current: 1,
    pageSize: 3,
    total: 0,
    onChange: handleChangePageNumber
  })

  const getSearchParams = (props) => {
    return {
      page: props.current,
      size: props.pageSize
    }
  }

  // onCreated
  useEffect(() => {
    return getStocks(getSearchParams(paginationProps))
  }, [])

  // Renderer
  const stockRenderer = item => (
    <List.Item
      key={item.stockId}
      extra={<img className="ArticleThumbnail" alt="Article Thumbnail"
                  src={`https://picsum.photos/id/${item.stockId}/500`}/>}
    >
      <List.Item.Meta
        avatar={<Avatar src={`${getGravatar(item.writerEmail)}`}/>}
        title={<a href={`/stock/${item.stockId}`}>{item.title}</a>}
        description={moment(item.createdDate).format("YYYY/MM/DD HH:mm:ss")}
      />
      {item.content.length > 150 ? item.content.substr(0, 150) + "..." : item.content}
    </List.Item>
  )

  const getStocks = (searchParams) => {
    if (hasToken()) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`
      webClient.get(`${host}/api/v1/stocks?${querystring.stringify(searchParams)}`)
        .then((res) => res.data)
        .then((data) => {
          setPaginationProps({
            ...paginationProps,
            current: data.page,
            pageSize: data.size,
            total: data.totalCount
          })
          setStocks(data.dtoList)
        })
        .catch(() => {
          message.error({content: "서버 오류가 발생했습니다.", key: "server_error"})
        })
    } else {
      message.error({content: "로그인 정보가 존재하지 않습니다.", key: "token_error"})
      document.location.href = "/sign-in"
    }
  }

  // onChangeHandler
  function handleChangePageNumber(nextPage) {
    getStocks(getSearchParams({
      ...paginationProps,
      current: nextPage
    }))
  }

  return (
    <StockLayout>
      {hasToken() && <Button key="2" href="/stock/new">글쓰기</Button>}
      <List
        itemLayout="vertical"
        size="large"
        pagination={paginationProps}
        dataSource={stocks}
        renderItem={stockRenderer}
        // footer={}
      />
    </StockLayout>
  )
}