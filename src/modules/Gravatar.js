import md5 from "md5"

export default function getGravatar(email = "platina.kusakina@gmail.com") {
  return `https://www.gravatar.com/avatar/${md5(email)}`
}