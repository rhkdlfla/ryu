import React from 'react';
import './DoorSecurityInterface.css';

const DoorSecurityInterface = ({ password, setPassword, rules, maxReached, isGameComplete }) => {
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
      <div className="dsi-content">
        <div className="dsi-section-label">TARGET PASSWORD INPUT</div>
        <div className="dsi-input-wrapper">
          <input
            type="text"
            className="dsi-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="입력하세요..."
            maxLength={99}
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
              if (aPassed !== bPassed) return aPassed ? 1 : -1;
              return b.id - a.id;
            })
            .map((rule) => {
              const passed = rule.check(password);
              return (
                <div
                  key={rule.id}
                  className={`dsi-rule-card ${passed ? 'dsi-rule-pass' : 'dsi-rule-fail'}`}
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
                      {rule.render && <rule.render />}
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

      {/* Corner Accents */}
      <div className="dsi-corner dsi-corner-tl" />
      <div className="dsi-corner dsi-corner-tr" />
      <div className="dsi-corner dsi-corner-bl" />
      <div className="dsi-corner dsi-corner-br" />
    </div>
  );
};

export default DoorSecurityInterface;
