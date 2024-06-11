const express = require("express");
const ws = require("ws");

const app = express();

const httpServer = app.listen(3001, () => {
  console.log("서버동작");
});

const webSocketServer = new ws.Server({ server: httpServer });

webSocketServer.on("connection", (ws, request) => {
  const ip = request.socket.remoteAddress;
  console.log(`클라이언드 ${ip} 접속`);

  if (ws.readyState === ws.OPEN) {
    console.log("연결성공");
  }

  ws.on("message", (msg) => {
    ws.send(`${msg} 전송완`);
    console.log(msg);
  });

  ws.on("error", (error) => {
    console.log(error + "발생");
  });

  ws.on("close", () => {
    console.log("종료");
  });
});
