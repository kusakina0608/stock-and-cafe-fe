import md5 from "md5"
import {getToken, hasToken} from "./Authenticate";

function getCurrentUserEmail() {
  if (hasToken()) {
    const token = getToken()
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''))
    return JSON.parse(jsonPayload).jti
  }
}

export default function getGravatar(email = getCurrentUserEmail()) {
  return `https://www.gravatar.com/avatar/${md5(email)}`
}