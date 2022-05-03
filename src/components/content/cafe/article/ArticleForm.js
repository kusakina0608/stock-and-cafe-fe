import React, {useState} from 'react';
import MDEditor from '@uiw/react-md-editor';
import CafeLayout from "../../../../containers/CafeLayout";
import {Button, Input, PageHeader, Tag} from "antd";
import moment from "moment";
import getGravatar from "../../../../modules/Gravatar";
import ReplyList from "../reply/ReplyList";

export default function ArticleForm() {
  const [value, setValue] = useState("**Hello world!!!**");
  const [article, setArticle] = useState([])
  return (
    <CafeLayout>
      <div data-color-mode="light">
        <PageHeader
          title={<Input placeholder="Borderless" bordered={false} value={article.title}/>}
          className="site-page-header"
          subTitle={moment(article.createdDate).format("YYYY/MM/DD HH:mm:ss")}
          tags={<Tag color="blue">카페</Tag>}
          extra={[
            <Button key="1">글목록</Button>,
            <Button key="2">등록하기</Button>
          ]}
          avatar={{src: getGravatar()}}
        >
        </PageHeader>
        <div className="container">
          <MDEditor
            value={value}
            onChange={setValue}
          />
          <MDEditor.Markdown source={value}/>
        </div>
      </div>
      <ReplyList/>
    </CafeLayout>
  )
}