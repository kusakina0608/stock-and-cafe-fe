import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import webClient from "../../../../modules/WebClient";
import querystring from "query-string";
import {Avatar, Button, Comment, Form, List, message, Tooltip} from "antd";
import getGravatar from "../../../../modules/Gravatar";
import host from "../../../../constants/Host";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";
import {getToken, hasToken} from "../../../../modules/Authenticate";
import axios from "axios";

export default function ReplyList() {
  const {articleId} = useParams()
  const userAvatar = getGravatar()
  const [content, setContent] = useState('')
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

  const saveReply = () => {
    if (!content)
      message.error({content: "댓글을 입력해주세요.", key: "data_empty"})
    if (hasToken()) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`
      webClient.post(`${host}/api/v1/articles/${articleId}/replies`, {text: content})
        .then((res) => res.data)
        .then((data) => {
          console.log("data: ", data)
          document.location.href = `/cafe/${data.articleId}`
        })
        .catch(() => {
          message.error({content: "서버 오류가 발생했습니다.", key: "server_error"})
        })
    } else {
      message.error({content: "로그인 정보가 존재하지 않습니다.", key: "token_error"})
      document.location.href = "/sign-in"
    }
  };

  const onReplyChange = (e) => {
    setContent(e.target.value);
  };

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

  const CommentList = ({comments}) => (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
      renderItem={(comment) =>
        <Comment
          author={comment.writerName}
          avatar={getGravatar(comment.writerEmail)}
          content={comment.text}
          datetime={
            <Tooltip title={moment(comment.createdDate).format('YYYY-MM-DD HH:mm:ss')}>
              <span>{moment(comment.createdDate).fromNow()}</span>
            </Tooltip>
          }
        />}
    />
  );

  return (
    <>
      {replies.length > 0 && <CommentList comments={replies}/>}
      {hasToken() &&
        <Comment
          avatar={<Avatar src={userAvatar} alt="Han Solo"/>}
          content={
            <>
              <Form.Item>
                <TextArea rows={4} onChange={onReplyChange} value={content}/>
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" onClick={saveReply} type="primary">
                  Add Comment
                </Button>
              </Form.Item>
            </>
          }
        />
      }
    </>
  )
}