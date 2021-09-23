const EXPIRE_TIME = "indigospace_expire_time";
const ACCESS_TOKEN = "access_token";
export function setToken(token) {
  localStorage.setItem(ACCESS_TOKEN, token);
}
export function getToken() {
  return localStorage.getItem(ACCESS_TOKEN);
}
export function deleteToken() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(EXPIRE_TIME);
}

export function setExpireTime(value) {
  localStorage.setItem(EXPIRE_TIME, value * 1000);
}

export function checkExpireTime() {
  const time = new Date().getTime();

  const expire = localStorage.getItem(EXPIRE_TIME)
    ? localStorage.getItem(EXPIRE_TIME)
    : 0;
  return time > new Date(expire).getTime();
}
