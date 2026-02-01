import React, { useState, useMemo } from "react";
import { rules } from "./rules";

function App() {
  const [password, setPassword] = useState("");

  // 규칙 초기화 로직
  // visibleRules 계산 시에 init을 호출하면 렌더링 중 부작용이 발생하므로,
  // 검사 로직과 초기화 로직을 분리하는 것이 이상적이나, 
  // 여기서는 간단히 useEffect로 처리하거나, check 내부에서 처리하기보다
  // "활성화된 규칙"이 처음 등장할 때 init을 호출해주는 별도 로직이 필요함.

  // 하지만 규칙이 순차적으로 보여야 하므로, 
  // "통과하지 못한 첫 번째 규칙"까지만 보여주는 로직을 유지하면서
  // 그 규칙이 init이 필요하고 state가 없다면 init을 수행해야 함.

  const visibleRules = useMemo(() => {
    const results = [];
    for (const rule of rules) {
      // rule-specific state는 rule module 내부에서 관리됨
      // 따라서 check에 password만 전달하면 됨
      const isPassed = rule.check(password);
      results.push({ ...rule, isPassed });

      if (!isPassed) break;
    }
    return results.reverse();
  }, [password]);

  // 필요한 규칙 초기화 (Effect)
  React.useEffect(() => {
    // 현재 보여지는 규칙 중 통과하지 못한 가장 최신 규칙 찾기
    const lastVisibleRule = visibleRules[0];
    if (lastVisibleRule && !lastVisibleRule.isPassed) {
      // init 함수가 있다면 호출하여 내부 상태 초기화 (이미 초기화되었다면 모듈 내부에서 처리)
      if (lastVisibleRule.init) {
        lastVisibleRule.init();
      }
    }
  }, [visibleRules]);

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
            {/* 커스텀 렌더링이 있으면 출력 */}
            {rule.render && <rule.render />}
            <span>{rule.isPassed ? "✅ 통과" : "❌ 미달"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;