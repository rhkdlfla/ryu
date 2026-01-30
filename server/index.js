const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // React 기본 포트
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`유저 접속 성공: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log("유저 접속 끊김", socket.id);
  });
});

server.listen(4000, () => {
  console.log("서버가 4000번 포트에서 작동 중입니다.");
});