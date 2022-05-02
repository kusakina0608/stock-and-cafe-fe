import webClient from "./WebClient";
import {message} from "antd";
import host from "../constants/Host";

export default function authenticate(loginInfo) {
  webClient.post(`${host}/api/v1/authenticate`, loginInfo)
    .then((res) => res.data)
    .then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token)
        message.success("로그인 성공")
      }
      document.location.href = "/cafe"
    })
    .catch((err) => {
      message.error("로그인에 실패하였습니다. 아이디와 비밀번호를 확인해 주세요.")
    })
};

export function getToken() {
  return localStorage.getItem('token')
}