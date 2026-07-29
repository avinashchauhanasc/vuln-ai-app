import React, { useState } from 'react';
import { LiquidPanel, LiquidCard, LiquidButton } from './LiquidGlass';
import { ShieldCheck, Copy, Check, Sparkles, Code, BookOpen } from 'lucide-react';

export default function PatchView({ activeVuln, rawCode }) {
  const [copied, setCopied] = useState(false);

  if (!activeVuln) {
    return (
      <LiquidPanel style={{ padding: '3rem', textAlign: 'center', maxWidth: 700 }}>
        <Sparkles size={42} color="var(--primary)" style={{ margin: '0 auto 1rem', display: 'block', filter: 'drop-shadow(0 0 10px rgba(0,242,254,0.5))' }} />
        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem' }}>No Vulnerability Selected</h3>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          Run a scan and click "View Automated Secure Patch" on any detected vulnerability to see the secure code recommendations here.
        </p>
      </LiquidPanel>
    );
  }

  const patchedCode = activeVuln.patchedCode || rawCode;

  const handleCopy = () => {
    navigator.clipboard.writeText(patchedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: 900 }}>

      {/* Header */}
      <LiquidPanel style={{ padding: '1.25rem', borderLeft: '3px solid var(--vuln-low)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: 44, height: 44,
            background: 'rgba(0,230,118,0.1)',
            border: '1px solid rgba(0,230,118,0.25)',
            borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <ShieldCheck size={22} color="var(--vuln-low)" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 800, letterSpacing: '-0.01em' }}>
              Automated Secure Patch Recommendation
            </h2>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>
              Remediation for: <strong style={{ color: 'var(--text-main)' }}>{activeVuln.name}</strong> ({activeVuln.cwe})
            </p>
          </div>
        </div>
      </LiquidPanel>

      {/* Patched Code Diff */}
      <LiquidPanel style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.85rem' }}>
            <Code size={16} color="var(--primary)" />
            Secure Patched Code Diff
          </div>
          <LiquidButton
            onClick={handleCopy}
            icon={copied ? <Check size={14} color="var(--vuln-low)" /> : <Copy size={14} />}
            size="sm"
          >
            {copied ? 'Copied!' : 'Copy Patch'}
          </LiquidButton>
        </div>

        <div className="code-editor-box">
          <div className="code-header" style={{ background: 'rgba(0,230,118,0.05)', color: 'var(--vuln-low)', borderColor: 'rgba(0,230,118,0.12)' }}>
            <span>Secure Patched Implementation</span>
            <span className="badge badge-low">Remediated</span>
          </div>
          <div className="code-line-view">
            {patchedCode.split('\n').map((line, i) => (
              <div
                key={i}
                className={`code-line ${(line.includes('# SECURE:') || line.includes('// SECURE:')) ? 'patched-highlight' : ''}`}
              >
                <span className="line-num">{i + 1}</span>
                <span className="line-content">{line}</span>
              </div>
            ))}
          </div>
        </div>
      </LiquidPanel>

      {/* Remediation Guide */}
      <LiquidPanel style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <BookOpen size={16} color="var(--primary)" />
          <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary)' }}>Defensive Remediation Guidelines</h3>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-main)', lineHeight: 1.6, marginBottom: '0.85rem' }}>
          {activeVuln.remediation_guide}
        </p>

        <LiquidCard glowColor="rgba(127,0,255,0.1)" style={{ border: '1px solid rgba(127,0,255,0.15)' }}>
          <div style={{ fontSize: '0.63rem', fontWeight: 700, color: 'var(--text-dim)', letterSpacing: '0.07em', marginBottom: '0.3rem' }}>
            RESEARCH NOVELTY HIGHLIGHT
          </div>
          <p style={{ fontSize: '0.73rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Unlike conventional AST scanners that only flag issues, our platform uses Context-Aware Neural Patching to rewrite unsafe syntax constructs directly into secure idioms without altering core execution semantics.
          </p>
        </LiquidCard>
      </LiquidPanel>

    </div>
  );
}
