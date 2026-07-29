import React from 'react';
import { LiquidPanel, LiquidCard } from './LiquidGlass';
import { BookOpen, Users, Award, FileText, CheckCircle2 } from 'lucide-react';

export default function SynopsisView() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: 960 }}>

      {/* Header */}
      <LiquidPanel style={{ padding: '1.4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
          <BookOpen size={24} color="var(--primary)" style={{ filter: 'drop-shadow(0 0 10px rgba(0,242,254,0.6))' }} />
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '-0.02em' }}>Project Synopsis & Metadata</h2>
        </div>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          Official academic project specification, team member details, and research paper publication plan.
        </p>
      </LiquidPanel>

      {/* Team Members */}
      <LiquidPanel style={{ padding: '1.35rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontWeight: 800, fontSize: '0.9rem', color: 'var(--primary)' }}>
          <Users size={18} /> Project Team Members
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
          {[
            { name: 'Aishwarya Sharma',        roll: '2300950100006', role: 'Team Member' },
            { name: 'Avinash Singh Chauhan',   roll: '2300950100026', role: 'Team Member' },
            { name: 'Aman Sharma',             roll: '2300950100014', role: 'Team Member' },
          ].map(m => (
            <LiquidCard key={m.roll} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.86rem', fontWeight: 800 }}>{m.name}</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', marginTop: '2px' }}>Roll No: {m.roll}</div>
              </div>
              <span className="badge badge-low">{m.role}</span>
            </LiquidCard>
          ))}
        </div>
      </LiquidPanel>

      {/* Aim & Objectives */}
      <LiquidPanel style={{ padding: '1.35rem' }}>
        <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--secondary)', marginBottom: '0.65rem' }}>
          Aim & Core Objectives
        </div>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-main)', lineHeight: 1.6, marginBottom: '0.95rem' }}>
          Develop an intelligent software security platform capable of identifying vulnerabilities in source code using a hybrid approach that combines static code analysis, machine learning, and explainable artificial intelligence (XAI) techniques.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            'Multi-language vulnerability detection framework (Python, JavaScript, Java, C/C++, PHP, SQL).',
            'Identify common vulnerabilities: SQL Injection, Cross-Site Scripting (XSS), Command Injection, Path Traversal, and Hardcoded Secrets.',
            'Integrate ML classification models (Scikit-learn, PyTorch) with rule-based static analysis.',
            'Provide explainable vulnerability reports including CVSS severity, impact, and attack scenarios.',
            'Generate automated secure patch recommendations for detected vulnerabilities with line-by-line diffs.',
            'Evaluate system performance using publicly available cybersecurity datasets (SARD, CVE, Devign, Big-Vul).'
          ].map((obj, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
              <CheckCircle2 size={15} color="var(--vuln-low)" style={{ marginTop: '2px', flexShrink: 0 }} />
              <span>{obj}</span>
            </div>
          ))}
        </div>
      </LiquidPanel>

      {/* Research Paper Plan */}
      <LiquidPanel style={{ padding: '1.35rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem', fontWeight: 800, fontSize: '0.95rem', color: 'var(--accent-purple)' }}>
          <FileText size={18} /> Research Paper Publication Plan
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[
            {
              num: 'Research Paper 1',
              title: '"AI-Based Detection of Software Vulnerabilities Using Hybrid Static Analysis and Machine Learning."',
            },
            {
              num: 'Research Paper 2',
              title: '"Automated Secure Patch Recommendation Using Explainable Artificial Intelligence."',
            },
          ].map(p => (
            <LiquidCard key={p.num} style={{ padding: '1rem' }}>
              <div style={{ fontSize: '0.67rem', fontWeight: 800, color: 'var(--text-dim)', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>{p.num}:</div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-main)', lineHeight: 1.5, fontWeight: 600 }}>{p.title}</p>
            </LiquidCard>
          ))}
        </div>
      </LiquidPanel>

    </div>
  );
}
