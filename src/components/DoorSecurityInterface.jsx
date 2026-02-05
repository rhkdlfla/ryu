import React, { useRef, useEffect } from 'react';
import './DoorSecurityInterface.css';

const DoorSecurityInterface = ({ password, setPassword, rules, maxReached, isGameComplete, onRuleChange }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [password]);

  return (
    <div className="dsi-container">
      {/* Scanline Effect */}
      <div className="dsi-scanline" />

      {/* Header */}
      <div className="dsi-header">
        <div className="dsi-title-group">
          <div className="dsi-status-dot" />
          <h2 className="dsi-title-text">
            RYU's SECRET LAB - DOOR SECURITY
          </h2>
        </div>
        <div className="dsi-header-bars">
          <div className="dsi-bar dsi-bar-dark" />
          <div className="dsi-bar dsi-bar-dark" />
          <div className="dsi-bar dsi-bar-light" />
        </div>
      </div>

      {/* Content */}
      <div className="dsi-content" style={{ opacity: isGameComplete ? 0.3 : 1, transition: 'opacity 0.5s' }}>
        <div className="dsi-section-label">TARGET PASSWORD INPUT</div>
        <div className="dsi-input-wrapper">
          <textarea
            ref={textareaRef}
            className="dsi-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password..."
            maxLength={99}
            disabled={isGameComplete}
            rows={1}
            style={{ resize: 'none', overflow: 'hidden' }}
          />
          <div className="dsi-length">LENGTH: {password.length}</div>
        </div>

        <div className="dsi-section-label">SYSTEM REQUIREMENTS</div>
        <div className="dsi-rules-container">
          {rules
            .slice(0, maxReached + 1)
            .sort((a, b) => {
              const aPassed = a.check(password);
              const bPassed = b.check(password);
              // Failed first (top), Passed last (bottom)
              if (aPassed !== bPassed) return aPassed ? 1 : -1;
              // Descending ID (High ID at top)
              return b.id - a.id;
            })
            .map((rule) => {
              const passed = rule.check(password);
              return (
                <div
                  key={rule.id}
                  className={`dsi-rule-card ${passed ? 'dsi-rule-pass' : 'dsi-rule-fail'}`}
                  style={{ opacity: isGameComplete ? 0.5 : 1 }}
                >
                  <div className="dsi-rule-icon">
                    {passed ? (
                      <span style={{ fontSize: '1.2rem' }}>✓</span>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                        <path d="M12 7V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <circle cx="12" cy="17" r="1" fill="currentColor" />
                      </svg>
                    )}
                  </div>
                  <div className="dsi-rule-content">
                    <strong>RULE {rule.id}</strong>
                    <div>
                      {rule.desc}
                      {rule.render && <rule.render onRuleChange={onRuleChange} />}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="dsi-footer">
          {isGameComplete ? (
            <span className="dsi-status-open">SYSTEM UNLOCKED</span>
          ) : (
            <span className="dsi-status-locked">SYSTEM LOCKED</span>
          )}
        </div>
      </div>

      {/* Success Overlay */}
      {isGameComplete && (
        <div className="dsi-success-overlay">
          <div className="dsi-shield-container">
            <img
              src={require('../assets/success_icon.png')}
              alt="Success Shield"
              className="dsi-shield-icon"
              style={{ width: '160px', height: 'auto' }}
            />
          </div>
          <h1 className="dsi-access-granted">ACCESS GRANTED</h1>
          <div className="dsi-access-subtext">SECURITY PROTOCOLS DISENGAGED</div>

          <button className="dsi-enter-btn" onClick={() => window.location.href = 'https://plrg.kaist.ac.kr/'}>
            ENTER SYSTEM
          </button>
        </div>
      )}

      {/* Corner Accents */}
      <div className="dsi-corner dsi-corner-tl" />
      <div className="dsi-corner dsi-corner-tr" />
      <div className="dsi-corner dsi-corner-bl" />
      <div className="dsi-corner dsi-corner-br" />
    </div>
  );
};

export default DoorSecurityInterface;
