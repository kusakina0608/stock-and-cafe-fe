import "../../../../style/ArticleList.css"

import React, {useEffect, useState} from 'react';
import {Avatar, Button, List} from 'antd';
import CafeLayout from "../../../../containers/CafeLayout";
import webClient from "../../../../modules/WebClient";
import querystring from "query-string";
import moment from "moment";
import getGravatar from "../../../../modules/Gravatar";
import host from "../../../../constants/Host";


export default function ArticleList() {
  const [articles, setArticles] = useState([])
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
    return getArticles(getSearchParams(paginationProps))
  }, [])

  // Renderer
  const articleRenderer = item => (
    <List.Item
      key={item.articleId}
      extra={<img className="ArticleThumbnail" alt="Article Thumbnail"
                  src="https://stock-and-cafe.s3.us-west-1.amazonaws.com/resources/images/cafe_default.jpeg"/>}
    >
      <List.Item.Meta
        avatar={<Avatar src={`${getGravatar(item.writerEmail)}`}/>}
        title={<a href={`/cafe/${item.articleId}`}>{item.title}</a>}
        description={moment(item.createdDate).format("YYYY/MM/DD HH:mm:ss")}
      />
      {item.content}
    </List.Item>
  )

  function getArticles(searchParams) {
    webClient.get(`${host}/api/v1/articles?${querystring.stringify(searchParams)}`)
      .then((res) => res.data)
      .then((data) => {
        setPaginationProps({
          ...paginationProps,
          current: data.page,
          pageSize: data.size,
          total: data.totalCount
        })
        setArticles(data.dtoList)
      })
  }

  // onChangeHandler
  function handleChangePageNumber(nextPage) {
    getArticles(getSearchParams({
      ...paginationProps,
      current: nextPage
    }))
  }

  return (
    <CafeLayout>
      <Button key="2" href="/cafe/new">글쓰기</Button>
      <List
        itemLayout="vertical"
        size="large"
        pagination={paginationProps}
        dataSource={articles}
        renderItem={articleRenderer}
        // footer={}
      />
    </CafeLayout>
  )
}