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
    } else if (url === "/postlist") {
      const data = [];
      for (let i = 0; i < posts.length; i++) {
        for (let a = 0; a < users.length; a++) {
          if (users[a].id === posts[i].userId) {
            let postlist = {
              userID: users[a].id,
              userName: users[a].name,
              postingId: posts[i].id,
              postingTitle: posts[i].title,
              postingContent: posts[i].description,
            };
            data.push(postlist);
          }
        }
      }
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ data: data }));
    }
  } else if (method === "POST") {
    if (url === "/users") {
      let body = "";

      request.on("data", (data) => {
        body += data;
      });

      // stream을 전부 받아온 이후에 실행
      request.on("end", () => {
        const user = JSON.parse(body);

        users.push({
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
        });
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: "ok", data: users }));
      });
    }
    if (url === "/posts") {
      let body = "";

      request.on("data", (data) => {
        body += data;
      });
      request.on("end", () => {
        const post = JSON.parse(body);

        posts.push({
          id: post.id,
          title: post.title,
          description: post.description,
          userId: post.userId,
        });
        response.writeHead(200, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: "postCreated", data: posts }));
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
