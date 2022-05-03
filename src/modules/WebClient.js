import React from 'react';
import axios from 'axios'
import {message, Typography} from 'antd'

const createErrorMessage = (err) => {
  console.log(err.response.status)
  switch (err.response.status) {
    case 401:
      return <>인증에 실패했습니다.</>
    case 403:
      return <>해당기능을 수행할 권한이 없습니다.</>
    case 404:
      return <>요청한 데이터가 존재하지 않습니다. ({err.config.url})</>
    default:
      return <>{err.response.status} - {err.response.data && err.response.data.msg ? err.response.data.msg : err.message}</>
  }
}

const handleError = (err) => {
  console.log(err)
  message.error(
    <Typography.Text>
      {createErrorMessage(err)}
    </Typography.Text>
  )
  throw err
}

class WebClient {
  get() {
    return axios.get(...arguments)
      .catch(handleError)
  }

  post() {
    return axios.post(...arguments)
      .catch(handleError)
  }

  put() {
    return axios.put(...arguments)
      .catch(handleError)
  }

  patch() {
    return axios.patch(...arguments)
      .catch(handleError)
  }

  delete() {
    return axios.delete(...arguments)
      .catch(handleError)
  }
}

const webClient = new WebClient()
export default webClient