import React, { useState, useMemo, useRef, useEffect } from "react";
import { rules } from "./rules";
import { initPyodide } from "./rulelist/Compilable";
import DoorSecurityInterface from "./components/DoorSecurityInterface";

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

  /* Intro Video State */
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Failsafe: End intro after 11.5s if video doesn't trigger end
    const timer = setTimeout(() => setShowIntro(false), 11500);
    return () => clearTimeout(timer);
  }, []);

  if (showIntro) {
    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: 'black',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <video
          autoPlay muted playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onEnded={() => setShowIntro(false)}
        >
          <source src={require('./assets/intro.mp4')} type="video/mp4" />
        </video>
      </div>
    );
  }

  const isGameComplete =
    maxReached >= rules.length && rules.every(rule => rule.check(password));

  return (
    <div className="App" style={{
      minHeight: "100vh",
      backgroundImage: `url(${require('./assets/bg_door.png')})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <DoorSecurityInterface
        password={password}
        setPassword={setPassword}
        rules={rules}
        maxReached={maxReached}
        isGameComplete={isGameComplete}
      />
    </div>
  );
}

export default App;