// process.env.NODE_ENV 这个值：
/*
  开发环境：development
  生产环境：production
  测试环境：test
*/
// process.env.NODE_ENV

let BASE_URL: string;
const TIME_OUT = 5000;

if (process.env.NODE_ENV === "development") {
  BASE_URL = "/api";
} else if (process.env.NODE_ENV === "production") {
  BASE_URL = "http://152.136.185.210:5000";
} else {
  // test环境
  BASE_URL = "http://";
}

export { TIME_OUT, BASE_URL };
