import React, { useState } from 'react';
import { SAMPLE_CODES, analyzeSourceCode } from './engine/analyzer';
import ScannerView from './components/ScannerView';
import AnalysisView from './components/AnalysisView';
import PatchView from './components/PatchView';
import MetricsView from './components/MetricsView';
import SynopsisView from './components/SynopsisView';
import LiquidBackground from './components/LiquidBackground';
import { GlassFilter } from './components/LiquidGlass';

import {
  ShieldAlert,
  Scan,
  Cpu,
  ShieldCheck,
  BarChart3,
  BookOpen,
} from 'lucide-react';

const NAV_ITEMS = [
  { key: 'scanner',  label: 'Scanner',   icon: Scan,         short: 'Scan' },
  { key: 'analysis', label: 'XAI Report', icon: Cpu,          short: 'XAI' },
  { key: 'patch',    label: 'Patch',      icon: ShieldCheck,  short: 'Patch' },
  { key: 'metrics',  label: 'Datasets',   icon: BarChart3,    short: 'Data' },
  { key: 'synopsis', label: 'Synopsis',   icon: BookOpen,     short: 'Info' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('scanner');
  const [code, setCode] = useState(SAMPLE_CODES.sqli.code);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [activeVulnForPatch, setActiveVulnForPatch] = useState(null);

  const handleAnalyze = () => {
    setIsScanning(true);
    setScanResult(null);
    setTimeout(() => {
      const result = analyzeSourceCode(code);
      setScanResult(result);
      setIsScanning(false);
      setActiveTab('analysis');
      if (result.detectedVulns?.length > 0) {
        setActiveVulnForPatch(result.detectedVulns[0]);
      }
    }, 1600);
  };

  const handleNavigateToPatch = (vuln) => {
    setActiveVulnForPatch(vuln);
    setActiveTab('patch');
  };

  return (
    <>
      {/* Animated liquid background */}
      <LiquidBackground />

      {/* Global SVG glass distortion filter */}
      <GlassFilter />

      {/* App shell */}
      <div className="app-shell">

        {/* ── Top Header ── */}
        <header className="app-header">
          <div className="brand">
            <div className="brand-icon">
              <ShieldAlert size={20} />
            </div>
            <div className="brand-text">
              <h1>VulnAI XAI Engine</h1>
              <p>Explainable AI · Secure Patch Recommendation System</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="header-badge">SYSTEM ACTIVE</div>
          </div>
        </header>

        {/* ── Body: Sidebar + Content ── */}
        <div className="app-body">

          {/* ── Sidebar Navigation ── */}
          <nav className="sidebar">
            <div className="sidebar-section-label">Navigation</div>

            {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                className={`sidebar-item ${activeTab === key ? 'active' : ''}`}
                onClick={() => setActiveTab(key)}
              >
                <Icon size={17} />
                {label}
              </button>
            ))}

            {/* Sidebar bottom info */}
            <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
              <div style={{
                padding: '0.75rem',
                background: 'rgba(0,242,254,0.05)',
                border: '1px solid rgba(0,242,254,0.12)',
                borderRadius: '12px',
                fontSize: '0.68rem',
                color: 'var(--text-dim)',
                lineHeight: 1.5,
              }}>
                <div style={{ color: 'var(--primary)', fontWeight: 700, marginBottom: '0.2rem' }}>
                  Hybrid Detection Engine
                </div>
                Static Analysis + ML Heuristics + XAI Explanation
              </div>
            </div>
          </nav>

          {/* ── Main Content Area ── */}
          <main className="main-content">
            {activeTab === 'scanner'  && <ScannerView  code={code} setCode={setCode} onAnalyze={handleAnalyze} isScanning={isScanning} />}
            {activeTab === 'analysis' && <AnalysisView result={scanResult} rawCode={code} onNavigateToPatch={handleNavigateToPatch} />}
            {activeTab === 'patch'    && <PatchView    activeVuln={activeVulnForPatch} rawCode={code} />}
            {activeTab === 'metrics'  && <MetricsView />}
            {activeTab === 'synopsis' && <SynopsisView />}
          </main>
        </div>

        {/* ── Bottom Nav for Mobile ── */}
        <nav className="bottom-nav-mobile">
          {NAV_ITEMS.map(({ key, short, icon: Icon }) => (
            <button
              key={key}
              className={`mobile-nav-btn ${activeTab === key ? 'active' : ''}`}
              onClick={() => setActiveTab(key)}
            >
              <Icon size={19} />
              <span>{short}</span>
            </button>
          ))}
        </nav>

      </div>
    </>
  );
}
