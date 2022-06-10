import webClient from "./WebClient";
import {message} from "antd";
import host from "../constants/Host";
import axios from "axios";

export default function authenticate(loginInfo) {
  webClient.post(`${host}/api/v1/authenticate`, loginInfo)
    .then((res) => res.data)
    .then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token)
        message.success("로그인 성공")
      }
      axios.defaults.headers.common['Authorization'] = data.token
      document.location.href = "/cafe"
    })
    .catch((err) => {
      message.error("로그인에 실패하였습니다. 아이디와 비밀번호를 확인해 주세요.")
    })
};

export function register(registerInfo) {
  webClient.post(`${host}/api/v1/members`, registerInfo)
    .then((res) => res.data)
    .then((data) => {
      console.log(data)
      message.success("회원가입 성공")
      document.location.href = "/sign-in"
    })
    .catch(() => {
      message.error("로그인에 실패하였습니다. 아이디와 비밀번호를 확인해 주세요.")
    })
};

export function hasToken() {
  return localStorage.getItem('token') !== null
}

export function getToken() {
  return localStorage.getItem('token')
}
