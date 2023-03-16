const http = require("http");
const server = http.createServer();

const users = [
  {
    id: 1,
    name: "Rebekah Johnson",
    email: "Glover12345@gmail.com",
    password: "123qwe",
  },
  {
    id: 2,
    name: "Fabian Predovic",
    email: "Connell29@gmail.com",
    password: "password",
  },
];

const posts = [
  {
    id: 1,
    title: "간단한 HTTP API 개발 시작!",
    description: "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현.",
    userId: 1,
  },
  {
    id: 2,
    title: "HTTP의 특성",
    description: "Request/Response와 Stateless!!",
    userId: 2,
  },
];

const httpRequestListener = function (request, response) {
  const { url, method } = request;
  if (method === "GET") {
    if (url === "/ping") {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: "pong" }));
    }
  } else if (method === "POST") {
    // (3)
    if (url === "/users") {
      let body = ""; // (4)

      request.on("data", (data) => {
        body += data;
      }); // (5)

      // stream을 전부 받아온 이후에 실행
      request.on("end", () => {
        // (6)
        const user = JSON.parse(body); //(7)

        users.push({
          // (8)
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
        });
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: "ok!" })); // (9)
      });
    }
  }
};

server.on("request", httpRequestListener);

// http request가 발생하면 httpRequestListener가 실행될 수 있도록
// request 이벤트에 httpRequestListener(함수) 등록

server.listen(8000, "127.0.0.1", function () {
  console.log("Listening to requests on port 8000");
});

//파일을 실행시키기만 하면 서버가 생성돼서 기다리는 상태

// JSON 자바스크립트의 객체처럼 생긴 string
