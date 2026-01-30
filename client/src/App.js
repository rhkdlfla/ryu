import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4000"); // 서버 주소

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1> Open Ryu! </h1>
      <p>서버 연결 상태: {isConnected ? "🟢 연결됨" : "🔴 연결 안 됨"}</p>
      <p>내 소켓 ID: {socket.id}</p>
    </div>
  );
}

export default App;