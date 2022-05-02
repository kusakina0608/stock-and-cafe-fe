import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import CafeLayout from "../../../../containers/CafeLayout";

export default function ArticleForm() {
  const [value, setValue] = React.useState("**Hello world!!!**");
  return (
    <CafeLayout>
      <MDEditor.Markdown source="# Hello Markdown!"/>
    </CafeLayout>
  )
}