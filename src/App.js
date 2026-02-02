import React, { useState, useMemo, useRef, useEffect } from "react";
import { rules } from "./rules";

function App() {
  const [password, setPassword] = useState("");
  const [maxReached, setMaxReached] = useState(0);
  const maxReachedRef = useRef(0);

  useEffect(() => {
    maxReachedRef.current = maxReached;
  }, [maxReached]);

  useEffect(() => {
    const limit = maxReachedRef.current;
    for (let i = 0; i <= limit; i++) {
      const rule = rules[i];
      if (!rule.check(password)) break;
      if (i == limit) {
        setMaxReached(v => v + 1);
        if (rules[i + 1] && rules[i + 1].init != null) rules[i + 1].init();
      }
    }
  }, [password]);

  // 1분마다 주기적 업데이트
  useEffect(() => {
    const interval = setInterval(() => {
      setPassword((prev) => {
        let newPw = prev;
        const limit = maxReachedRef.current;
        // Apply updates from all unlocked rules (Index 0 to limit)
        for (let i = 0; i <= limit; i++) {
          const rule = rules[i];
          if (rule.update) {
            newPw = rule.update(newPw);
          }
        }
        return newPw;
      });
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const isGameComplete =
    maxReached > rules.length && rules.every(rule => rule.check(password));

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", textAlign: "center", fontFamily: "sans-serif" }}>
      <h1>🔓Ryu.open()</h1>

      <div style={{ position: "sticky", top: "20px", background: "white", padding: "20px", zIndex: 10 }}>
        <textarea
          style={{ width: "100%", fontSize: "20px", padding: "10px", borderRadius: "8px" }}
          rows="3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요..."
        />
        <p>글자 수: {password.length}</p>
        {isGameComplete && <h2 style={{ color: "green" }}>🎉 탈출 성공!</h2>}
      </div>

      <div style={{ marginTop: "30px" }}>
        {rules.slice(0, maxReached + 1).reverse().map((rule) => (
          <div
            key={rule.id}
            style={{
              border: `2px solid ${rule.check(password) ? "#4CAF50" : "#FF5252"}`,
              backgroundColor: rule.check(password) ? "#E8F5E9" : "#FFEBEE",
              padding: "15px",
              margin: "10px 0",
              borderRadius: "10px",
              textAlign: "left",
              transition: "all 0.3s ease"
            }}
          >
            <strong>Rule {rule.id}</strong>
            <p>{rule.desc}</p>
            {/* 커스텀 렌더링이 있으면 출력 */}
            {rule.render && <rule.render />}
            <span>{rule.check(password) ? "✅ 통과" : "❌ 미달"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;