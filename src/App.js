import React, { useState, useMemo } from "react";
import { rules } from "./rules";

function App() {
  const [password, setPassword] = useState("");

  // 성능 최적화: password가 바뀔 때만 규칙 검사 수행
  const visibleRules = useMemo(() => {
    const results = [];
    for (const rule of rules) {
      const isPassed = rule.check(password);
      results.push({ ...rule, isPassed });

      // Password Game의 핵심: 하나라도 실패하면 그 다음 규칙은 보여주지 않음
      if (!isPassed) break;
    }
    return results.reverse(); // 최신 규칙이 위에 오게 하려면 reverse
  }, [password]);

  // 모든 규칙 통과 여부 확인
  const isGameComplete = 
    visibleRules.length === rules.length && 
    visibleRules.every(r => r.isPassed);

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
        {visibleRules.map((rule) => (
          <div
            key={rule.id}
            style={{
              border: `2px solid ${rule.isPassed ? "#4CAF50" : "#FF5252"}`,
              backgroundColor: rule.isPassed ? "#E8F5E9" : "#FFEBEE",
              padding: "15px",
              margin: "10px 0",
              borderRadius: "10px",
              textAlign: "left",
              transition: "all 0.3s ease"
            }}
          >
            <strong>Rule {rule.id}</strong>
            <p>{rule.desc}</p>
            <span>{rule.isPassed ? "✅ 통과" : "❌ 미달"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;