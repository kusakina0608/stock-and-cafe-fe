import React from 'react';
import TextArea from "antd/es/input/TextArea";

export default function ArticleForm() {
  const onChange = () => {
    console.log("changed!")
  }
  return (
    <TextArea
      bordered={false}
      maxLength={100}
      style={{height: 120}}
      showCount
      onChange={onChange}
    />
  )
}