import React, { useState, useMemo, useRef, useEffect } from "react";
import { rules } from "./rules";
import { initPyodide } from "./rulelist/Compilable";

function App() {
  const [password, setPassword] = useState("");
  const [maxReached, setMaxReached] = useState(0);
  const maxReachedRef = useRef(0);

  useEffect(() => {
    maxReachedRef.current = maxReached;
  }, [maxReached]);

  useEffect(() => {
    if (maxReachedRef.current >= rules.length) return;
    for (let i = 0; i <= maxReachedRef.current; i++) {
      if (i >= rules.length) break;
      if (!rules[i].check(password)) return;
    }
    let i;
    for (i = maxReachedRef.current + 1; i < rules.length; i++) {
      if (rules[i] && rules[i].init != null) rules[i].init();
      if (!rules[i].check(password)) break;
    }
    setMaxReached(i);
  }, [password]);

  // 1분마다 주기적 업데이트
  useEffect(() => {
    const interval = setInterval(() => {
      setPassword((prev) => {
        let newPw = prev;
        const limit = maxReachedRef.current;
        // Apply updates from all unlocked rules (Index 0 to limit)
        for (let i = 0; i <= limit; i++) {
          if (i >= rules.length) break;
          const rule = rules[i];
          if (rule && rule.update) {
            newPw = rule.update(newPw);
          }
        }
        return newPw;
      });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Pyodide 초기화
  useEffect(() => {
    initPyodide();
  }, []);

  const isGameComplete =
    maxReached >= rules.length && rules.every(rule => rule.check(password));

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
        {rules
          .slice(0, maxReached + 1)
          .sort((a, b) => {
            const aPassed = a.check(password);
            const bPassed = b.check(password);
            if (aPassed !== bPassed) return aPassed ? 1 : -1; // 미달 먼저
            return b.id - a.id; // 동일 상태: id 내림차순
          })
          .map((rule) => (
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