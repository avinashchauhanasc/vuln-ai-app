import React from 'react';
import { LiquidPanel, LiquidCard, LiquidButton } from './LiquidGlass';
import { AlertCircle, ShieldAlert, Cpu, CheckCircle2, ShieldX, ArrowRight, Printer, Shield, Terminal, Flame, Zap } from 'lucide-react';

export default function AnalysisView({ result, rawCode, onNavigateToPatch }) {
  if (!result) {
    return (
      <LiquidPanel style={{ padding: '3rem', textAlign: 'center', maxWidth: 720 }}>
        <Cpu size={44} color="var(--primary)" style={{ margin: '0 auto 1rem', display: 'block', filter: 'drop-shadow(0 0 12px rgba(0,242,254,0.6))' }} />
        <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.4rem' }}>No Security Scan Results Yet</h3>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          Run an AI scan from the Scanner tab to view the Explainable AI vulnerability report here.
        </p>
      </LiquidPanel>
    );
  }

  if (result.vulnerabilitiesCount === 0) {
    return (
      <LiquidPanel style={{ padding: '3rem', textAlign: 'center', maxWidth: 720 }}>
        <CheckCircle2 size={48} color="var(--vuln-low)" style={{ margin: '0 auto 1rem', display: 'block' }} />
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--vuln-low)' }}>No Security Flaws Detected!</h3>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.4rem', lineHeight: 1.5 }}>
          The scanned source code passed all static rule checks and ML security classifiers cleanly.
        </p>
      </LiquidPanel>
    );
  }

  const lines = rawCode.split('\n');

  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: 960 }}>

      {/* Summary Banner with PDF Export Button */}
      <LiquidPanel style={{ padding: '1.4rem', borderLeft: '4px solid var(--vuln-critical)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span className="badge badge-critical">
                <ShieldX size={12} /> {result.vulnerabilitiesCount} Vulnerability{result.vulnerabilitiesCount > 1 ? 'ies' : ''} Detected
              </span>
              <span className="badge badge-owasp">
                <Shield size={11} /> OWASP Top 10 Mapped
              </span>
            </div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
              Explainable AI Vulnerability Audit Report
            </h2>
            <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Completed at {new Date(result.timestamp).toLocaleTimeString()} · {result.linesCount} lines of source code scanned
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{
              padding: '0.75rem 1.1rem',
              background: 'rgba(255,0,85,0.08)',
              border: '1px solid rgba(255,0,85,0.25)',
              borderRadius: '14px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '0.62rem', color: 'var(--text-dim)', fontWeight: 700 }}>CVSS v3.1 SCORE</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--vuln-critical)', lineHeight: 1 }}>
                {result.maxCvss}
              </div>
              <div style={{ fontSize: '0.6rem', color: 'var(--text-dim)' }}>out of 10.0</div>
            </div>

            <LiquidButton
              onClick={handlePrintPDF}
              icon={<Printer size={15} />}
              size="md"
            >
              Export PDF Audit Report
            </LiquidButton>
          </div>
        </div>
      </LiquidPanel>

      {/* Individual vulnerability breakdown */}
      {result.detectedVulns.map((vuln, vIdx) => (
        <LiquidPanel key={vIdx} style={{ padding: '1.35rem' }}>

          {/* Header & Badges */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.1rem', flexWrap: 'wrap', gap: '0.6rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                <span className="badge badge-critical">{vuln.severity}</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 700, letterSpacing: '0.04em' }}>{vuln.cwe}</span>
                {vuln.owasp && <span className="badge badge-owasp">{vuln.owasp}</span>}
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, letterSpacing: '-0.01em' }}>{vuln.name}</h3>
            </div>

            <div style={{
              padding: '0.55rem 0.95rem',
              background: 'rgba(0,242,254,0.08)',
              border: '1px solid rgba(0,242,254,0.25)',
              borderRadius: '12px',
              textAlign: 'right',
            }}>
              <div style={{ fontSize: '0.6rem', color: 'var(--text-dim)', fontWeight: 700 }}>ML CLASSIFIER CONFIDENCE</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--primary)' }}>{(vuln.mlConfidence * 100).toFixed(1)}%</div>
            </div>
          </div>

          {/* Code Highlight */}
          <div style={{ marginBottom: '1.1rem' }}>
            <div style={{ fontSize: '0.66rem', color: 'var(--text-dim)', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '0.45rem' }}>
              FLAGGED CODE LOCATION (LINES {vuln.affectedLines.join(', ')}):
            </div>
            <div className="code-editor-box">
              <div className="code-line-view">
                {lines.map((lineText, i) => {
                  const lineNo = i + 1;
                  return (
                    <div key={i} className={`code-line ${vuln.affectedLines.includes(lineNo) ? 'vulnerable-highlight' : ''}`}>
                      <span className="line-num">{lineNo}</span>
                      <span className="line-content">{lineText}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* XAI Reasoning Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '0.75rem', marginBottom: '1.1rem' }}>
            <LiquidCard glowColor="rgba(0,242,254,0.12)" style={{ border: '1px solid rgba(0,242,254,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--primary)', fontWeight: 800, fontSize: '0.78rem', marginBottom: '0.35rem' }}>
                <Cpu size={15} /> XAI Natural Language Reasoning
              </div>
              <p style={{ fontSize: '0.76rem', color: 'var(--text-main)', lineHeight: 1.5 }}>{vuln.xai_explanation.summary}</p>
            </LiquidCard>

            <LiquidCard glowColor="rgba(255,170,0,0.12)" style={{ border: '1px solid rgba(255,170,0,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#ffaa00', fontWeight: 800, fontSize: '0.78rem', marginBottom: '0.35rem' }}>
                <AlertCircle size={15} /> Root Cause Analysis
              </div>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{vuln.xai_explanation.root_cause}</p>
            </LiquidCard>

            <LiquidCard glowColor="rgba(255,0,85,0.12)" style={{ border: '1px solid rgba(255,0,85,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#ff3377', fontWeight: 800, fontSize: '0.78rem', marginBottom: '0.35rem' }}>
                <ShieldAlert size={15} /> Security Impact & Harm
              </div>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{vuln.xai_explanation.impact}</p>
            </LiquidCard>
          </div>

          {/* Visual Attack Flow Diagram */}
          <div style={{ marginBottom: '1.1rem', padding: '0.9rem', background: 'rgba(255,255,255,0.02)', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: '0.66rem', fontWeight: 700, color: 'var(--text-dim)', letterSpacing: '0.06em', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Terminal size={14} color="var(--vuln-high)" /> SIMULATED ATTACK FLOW STEP-BY-STEP:
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              {[
                { step: '1', title: 'Untrusted Input', desc: 'Attacker injects payload string' },
                { step: '2', title: 'Flawed Code', desc: 'Unsanitized concatenation' },
                { step: '3', title: 'Execution', desc: 'OS / Database parses payload' },
                { step: '4', title: 'Compromise', desc: 'Full data exfiltration / RCE' }
              ].map((s, idx, arr) => (
                <React.Fragment key={s.step}>
                  <div style={{
                    padding: '0.55rem 0.8rem',
                    background: 'rgba(0,0,0,0.4)',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    fontSize: '0.7rem',
                    flex: '1',
                    minWidth: '130px'
                  }}>
                    <div style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '0.65rem' }}>STEP {s.step}: {s.title}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.68rem', marginTop: '2px' }}>{s.desc}</div>
                  </div>
                  {idx < arr.length - 1 && <ArrowRight size={14} color="var(--text-dim)" className="hide-mobile" />}
                </React.Fragment>
              ))}
            </div>
          </div>

          <button className="btn-primary" onClick={() => onNavigateToPatch(vuln)} style={{ width: '100%' }}>
            View Automated Secure Patch & Code Diff <ArrowRight size={15} />
          </button>
        </LiquidPanel>
      ))}

    </div>
  );
}
