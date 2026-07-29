import React, { useState, useRef } from 'react';
import { SAMPLE_CODES } from '../engine/analyzer';
import { LiquidPanel, LiquidCard, LiquidButton } from './LiquidGlass';
import { Play, Code2, Sparkles, ShieldCheck, Zap, AlertTriangle, Eraser, Upload, FileCode } from 'lucide-react';

const SAMPLES = [
  { key: 'sqli',             label: 'SQL Injection' },
  { key: 'xss',              label: 'Reflected XSS' },
  { key: 'cmd_inj',          label: 'Command Injection' },
  { key: 'path_traversal',   label: 'Path Traversal' },
  { key: 'hardcoded_creds',  label: 'Hardcoded Secrets' },
];

export default function ScannerView({ code, setCode, onAnalyze, isScanning }) {
  const [selectedKey, setSelectedKey] = useState('sqli');
  const [loadedFileName, setLoadedFileName] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleSelect = (key) => {
    setSelectedKey(key);
    setLoadedFileName('');
    setCode(SAMPLE_CODES[key].code);
  };

  const handleFileUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setCode(e.target.result);
      setLoadedFileName(file.name);
      setSelectedKey('');
    };
    reader.readAsText(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: 960 }}>

      {/* Hero Banner */}
      <LiquidPanel style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.4rem' }}>
              <Zap size={22} color="var(--primary)" style={{ filter: 'drop-shadow(0 0 8px rgba(0,242,254,0.7))' }} />
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
                Source Code Security Scanner
              </h2>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5, maxWidth: 540 }}>
              Analyze source code using hybrid static pattern matching & ML heuristic classification. Select sample code or drag & drop a file to run an XAI security scan.
            </p>
          </div>

          {/* Quick stats */}
          <div style={{ display: 'flex', gap: '0.75rem', flexShrink: 0 }}>
            {[
              { label: 'Vuln Rules', value: '15+' },
              { label: 'Languages', value: '6' },
            ].map(s => (
              <div key={s.label} style={{
                padding: '0.65rem 1rem',
                background: 'rgba(0,242,254,0.08)',
                border: '1px solid rgba(0,242,254,0.2)',
                borderRadius: '14px',
                textAlign: 'center',
                backdropFilter: 'blur(12px)',
              }}>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary)' }}>{s.value}</div>
                <div style={{ fontSize: '0.62rem', color: 'var(--text-dim)', fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Sample selector + File Upload trigger */}
        <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ fontSize: '0.66rem', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              Pre-loaded Test Cases:
            </div>

            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept=".py,.js,.jsx,.ts,.tsx,.java,.cpp,.c,.h,.php,.sql,.json,.txt"
              onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
            />

            <LiquidButton
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              icon={<Upload size={14} />}
              size="sm"
            >
              Upload Local File (.py, .js, .java)
            </LiquidButton>
          </div>

          <div className="tab-pills">
            {SAMPLES.map(({ key, label }) => (
              <button
                key={key}
                className={`pill-btn ${selectedKey === key ? 'active' : ''}`}
                onClick={() => handleSelect(key)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </LiquidPanel>

      {/* Code Editor Box with Drag & Drop */}
      <LiquidPanel
        style={{
          padding: '1rem',
          border: isDragOver ? '2px dashed var(--primary)' : '1px solid rgba(255,255,255,0.1)',
          background: isDragOver ? 'rgba(0,242,254,0.08)' : undefined,
          transition: 'all 0.2s ease',
        }}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
      >
        <div className="code-header" style={{ borderRadius: '10px 10px 0 0', marginBottom: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {loadedFileName ? <FileCode size={15} color="var(--primary)" /> : <Code2 size={15} color="var(--primary)" />}
            <span>{loadedFileName ? `Loaded File: ${loadedFileName}` : 'Target Source Code Input'}</span>
          </div>
          <span style={{ background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: '4px' }}>
            {code.split('\n').length} lines
          </span>
        </div>

        <div className="code-editor-box" style={{ borderRadius: '0 0 12px 12px', border: 'none', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <textarea
            className="code-textarea"
            value={code}
            onChange={e => { setCode(e.target.value); setLoadedFileName(''); }}
            placeholder="Paste code or drag & drop a file here to scan..."
            spellCheck={false}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.85rem', gap: '0.75rem', flexWrap: 'wrap' }}>
          <LiquidButton
            onClick={() => { setCode(''); setLoadedFileName(''); setSelectedKey(''); }}
            icon={<Eraser size={15} />}
            size="sm"
          >
            Clear Code
          </LiquidButton>

          <button
            className="btn-primary"
            onClick={onAnalyze}
            disabled={isScanning || !code.trim()}
          >
            {isScanning ? (
              <><Sparkles size={16} style={{ animation: 'spin 1s linear infinite' }} /> Analyzing Code...</>
            ) : (
              <><Play size={15} fill="currentColor" /> Run AI Scan</>
            )}
          </button>
        </div>
      </LiquidPanel>

      {/* Radar animation */}
      {isScanning && (
        <LiquidPanel style={{ padding: '2.5rem', textAlign: 'center' }}>
          <div className="radar-scanner">
            <div className="radar-sweep"></div>
            <ShieldCheck size={36} color="var(--primary)" style={{ filter: 'drop-shadow(0 0 10px rgba(0,242,254,0.8))' }} />
          </div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '-0.01em' }}>
            Running Hybrid Security Analysis...
          </h3>
          <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
            Extracting AST patterns & querying ML security classifiers
          </p>
        </LiquidPanel>
      )}

      {/* Feature Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
        <LiquidCard glowColor="rgba(255,85,0,0.12)">
          <AlertTriangle size={20} color="var(--vuln-high)" style={{ marginBottom: '0.4rem' }} />
          <div style={{ fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.2rem' }}>XAI Reasoning</div>
          <p style={{ fontSize: '0.73rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>Provides natural language explanations for flagged code patterns.</p>
        </LiquidCard>
        <LiquidCard glowColor="rgba(0,230,118,0.12)">
          <ShieldCheck size={20} color="var(--vuln-low)" style={{ marginBottom: '0.4rem' }} />
          <div style={{ fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.2rem' }}>Auto-Patching</div>
          <p style={{ fontSize: '0.73rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>Generates secure executable patch code recommendations.</p>
        </LiquidCard>
        <LiquidCard glowColor="rgba(0,242,254,0.12)">
          <Zap size={20} color="var(--secondary)" style={{ marginBottom: '0.4rem' }} />
          <div style={{ fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.2rem' }}>OWASP Mapping</div>
          <p style={{ fontSize: '0.73rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>Maps findings directly to official OWASP Top 10 categories.</p>
        </LiquidCard>
      </div>

    </div>
  );
}
