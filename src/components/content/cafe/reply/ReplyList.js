import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import webClient from "../../../../modules/WebClient";
import querystring from "query-string";
import {Avatar, List} from "antd";
import getGravatar from "../../../../modules/Gravatar";
import host from "../../../../constants/Host";

export default function ReplyList() {
  const {articleId} = useParams();
  const [replies, setReplies] = useState([])
  const [paginationProps, setPaginationProps] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    onChange: handleChangePageNumber
  })

  const getSearchParams = (props) => {
    return {
      page: props.current,
      size: props.pageSize
    }
  }

  function getReplies(searchParams) {
    webClient.get(`${host}/api/v1/articles/${articleId}/replies?${querystring.stringify(searchParams)}`)
      .then((res) => res.data)
      .then((data) => {
        console.log("data: ", data)
        setReplies(data.dtoList)
      })
  }

  // onCreated
  useEffect(() => {
    return getReplies(getSearchParams(paginationProps))
  }, [])

  // onChangeHandler
  function handleChangePageNumber(nextPage) {
    getReplies(getSearchParams({
      ...paginationProps,
      current: nextPage
    }))
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={replies}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={getGravatar(item.writerEmail)}/>}
            title={item.text}
            description={item.createdDate}
          />
        </List.Item>
      )}
    />
  )
}