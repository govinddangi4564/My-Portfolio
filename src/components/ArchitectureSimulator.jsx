import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Database,
  Cpu,
  Zap,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Play,
  Terminal,
  Activity,
  Layers,
  Lock,
  Server
} from 'lucide-react';
import { sound } from '../utils/sound';

export default function ArchitectureSimulator() {
  const [activeStep, setActiveStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simType, setSimType] = useState('success'); // 'success' | '2fa' | 'rollback'
  const [log, setLog] = useState([
    { time: '00:00:01', msg: 'System initialized. Spring Boot & ACID engine active.', status: 'info' }
  ]);
  const [metrics, setMetrics] = useState({
    latency: '18ms',
    acidStatus: 'ACTIVE',
    tps: '1,240',
    securityScore: '100%'
  });

  const steps = [
    {
      id: 'client',
      title: '1. Client HTTPS Request',
      tech: 'React / Next.js Client',
      icon: Zap,
      desc: 'Encrypted payload with Bearer JWT token transmitted over TLS 1.3.'
    },
    {
      id: 'security',
      title: '2. Security Guard & 2FA',
      tech: 'Spring Security + JWT Filter',
      icon: Lock,
      desc: 'Validates cryptographic token signature, expiration claims & OTP challenge.'
    },
    {
      id: 'backend',
      title: '3. Spring Boot Controller',
      tech: 'REST Controller & Service Layer',
      icon: Server,
      desc: 'Dispatches request to business domain layer with Dependency Injection.'
    },
    {
      id: 'database',
      title: '4. MySQL ACID Transaction',
      tech: 'Hibernate JPA / InnoDB Engine',
      icon: Database,
      desc: 'Executes atomic statements under strict Read-Committed isolation level.'
    }
  ];

  const runSimulation = (type) => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimType(type);
    setActiveStep(1);
    sound.playClick();

    const timestamp = () => new Date().toLocaleTimeString().split(' ')[0];

    if (type === 'success') {
      setLog((prev) => [
        { time: timestamp(), msg: '→ [POST /api/v1/transaction] Payload dispatched.', status: 'info' },
        ...prev.slice(0, 8)
      ]);

      setTimeout(() => {
        setActiveStep(2);
        sound.playHover();
        setLog((prev) => [
          { time: timestamp(), msg: '✓ JWT Claims verified: User identity confirmed (ROLE_USER).', status: 'success' },
          ...prev.slice(0, 8)
        ]);
      }, 700);

      setTimeout(() => {
        setActiveStep(3);
        sound.playHover();
        setLog((prev) => [
          { time: timestamp(), msg: '⚡ Spring Service layer processed business rules & validation.', status: 'info' },
          ...prev.slice(0, 8)
        ]);
      }, 1400);

      setTimeout(() => {
        setActiveStep(4);
        sound.playSuccess();
        setMetrics({
          latency: '22ms',
          acidStatus: 'COMMITTED',
          tps: '1,450',
          securityScore: '100%'
        });
        setLog((prev) => [
          { time: timestamp(), msg: '✓ ACID COMMIT: Database record persisted with zero dirty reads.', status: 'success' },
          ...prev.slice(0, 8)
        ]);
        setIsSimulating(false);
      }, 2100);
    } else if (type === '2fa') {
      setLog((prev) => [
        { time: timestamp(), msg: '→ [POST /api/v1/auth/2fa] Triggered secondary factor challenge.', status: 'info' },
        ...prev.slice(0, 8)
      ]);

      setTimeout(() => {
        setActiveStep(2);
        sound.playHover();
        setLog((prev) => [
          { time: timestamp(), msg: '🛡️ 2FA TOTP Token verified against SHA-256 secret.', status: 'success' },
          ...prev.slice(0, 8)
        ]);
      }, 700);

      setTimeout(() => {
        setActiveStep(3);
        sound.playHover();
        setLog((prev) => [
          { time: timestamp(), msg: '⚡ Generated secure stateless JWT session token.', status: 'info' },
          ...prev.slice(0, 8)
        ]);
      }, 1400);

      setTimeout(() => {
        setActiveStep(4);
        sound.playSuccess();
        setMetrics({
          latency: '15ms',
          acidStatus: 'AUTHENTICATED',
          tps: '1,820',
          securityScore: '100%'
        });
        setLog((prev) => [
          { time: timestamp(), msg: '✓ Session established: 2FA Authentication Gate Passed.', status: 'success' },
          ...prev.slice(0, 8)
        ]);
        setIsSimulating(false);
      }, 2100);
    } else if (type === 'rollback') {
      setLog((prev) => [
        { time: timestamp(), msg: '→ [POST /api/v1/checkout] Simulating concurrent data collision.', status: 'warning' },
        ...prev.slice(0, 8)
      ]);

      setTimeout(() => {
        setActiveStep(2);
        sound.playHover();
        setLog((prev) => [
          { time: timestamp(), msg: '✓ Auth token verified.', status: 'info' },
          ...prev.slice(0, 8)
        ]);
      }, 700);

      setTimeout(() => {
        setActiveStep(3);
        sound.playHover();
        setLog((prev) => [
          { time: timestamp(), msg: '⚠️ Service detected inventory constraint violation.', status: 'warning' },
          ...prev.slice(0, 8)
        ]);
      }, 1400);

      setTimeout(() => {
        setActiveStep(4);
        sound.playClick();
        setMetrics({
          latency: '29ms',
          acidStatus: 'ROLLBACK OK',
          tps: '1,100',
          securityScore: '100%'
        });
        setLog((prev) => [
          { time: timestamp(), msg: '🛑 ACID ROLLBACK TRIGGERED: Zero partial writes. State restored cleanly.', status: 'error' },
          ...prev.slice(0, 8)
        ]);
        setIsSimulating(false);
      }, 2100);
    }
  };

  return (
    <div className="p-4 sm:p-7 rounded-2xl bg-zinc-900/60 border border-zinc-800 relative overflow-hidden my-8 shadow-sm">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-pink animate-pulse" />
            <span className="font-mono text-[0.68rem] uppercase tracking-widest text-brand-pink font-bold">
              Interactive System Simulator
            </span>
          </div>
          <h3 className="font-syne text-[1.15rem] sm:text-[1.35rem] font-bold text-white mt-0.5">
            Full-Stack Request &amp; ACID Pipeline Engine
          </h3>
          <p className="font-body text-[0.8rem] sm:text-[0.86rem] text-zinc-400 max-w-xl">
            Experience how my backend architectures execute end-to-end security filtering, transaction rollbacks, and ACID consistency under real-time conditions.
          </p>
        </div>

        {/* Action Simulation Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            disabled={isSimulating}
            onClick={() => runSimulation('success')}
            className="px-3.5 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-emerald-400 font-mono text-[0.68rem] font-bold hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            <Play size={11} />
            <span>200 OK Transaction</span>
          </button>

          <button
            type="button"
            disabled={isSimulating}
            onClick={() => runSimulation('2fa')}
            className="px-3.5 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-purple-400 font-mono text-[0.68rem] font-bold hover:border-purple-500/50 hover:bg-purple-500/10 transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            <Lock size={11} />
            <span>2FA Auth Gate</span>
          </button>

          <button
            type="button"
            disabled={isSimulating}
            onClick={() => runSimulation('rollback')}
            className="px-3.5 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-amber-400 font-mono text-[0.68rem] font-bold hover:border-amber-500/50 hover:bg-amber-500/10 transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            <RotateCcw size={11} />
            <span>Simulate ACID Rollback</span>
          </button>
        </div>
      </div>

      {/* Live 4-Step Pipeline Flow */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 mb-6">
        {steps.map((step, idx) => {
          const stepNum = idx + 1;
          const isActive = activeStep === stepNum;
          const isDone = activeStep > stepNum;
          const Icon = step.icon;

          return (
            <div
              key={step.id}
              className={`p-3.5 rounded-xl border transition-all duration-300 relative flex flex-col justify-between ${
                isActive
                  ? 'bg-emerald-500/15 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                  : isDone
                  ? 'bg-surface/90 border-emerald-500/40 text-text'
                  : 'bg-surface/50 border-[var(--border)] text-muted'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-1.5 rounded-lg ${isActive ? 'bg-emerald-400 text-black font-bold' : isDone ? 'bg-emerald-500/20 text-emerald-400' : 'bg-surface text-dimmed'}`}>
                    <Icon size={14} />
                  </div>
                  <span className="font-mono text-[0.62rem] font-bold text-dimmed">
                    {isActive ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <Activity size={10} className="animate-spin" /> EXECUTING
                      </span>
                    ) : isDone ? (
                      <span className="text-emerald-400">DONE ✓</span>
                    ) : (
                      `STAGE ${stepNum}`
                    )}
                  </span>
                </div>

                <h4 className="font-syne text-[0.85rem] font-bold text-text mb-0.5">
                  {step.title}
                </h4>
                <div className="font-mono text-[0.65rem] text-cyan-400 font-medium mb-1.5">
                  {step.tech}
                </div>
                <p className="font-body text-[0.72rem] text-muted leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Telemetry & Live Execution Log Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-3 pt-4 border-t border-[var(--border)]">
        {/* Real-Time Telemetry Specs */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2.5 rounded-xl bg-surface/70 border border-[var(--border)]">
            <span className="font-mono text-[0.58rem] text-dimmed uppercase tracking-wider block">Roundtrip Latency</span>
            <span className="font-syne text-[1.1rem] font-black text-emerald-400">{metrics.latency}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-surface/70 border border-[var(--border)]">
            <span className="font-mono text-[0.58rem] text-dimmed uppercase tracking-wider block">ACID State</span>
            <span className="font-syne text-[1.1rem] font-black text-cyan-400">{metrics.acidStatus}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-surface/70 border border-[var(--border)]">
            <span className="font-mono text-[0.58rem] text-dimmed uppercase tracking-wider block">Throughput Capacity</span>
            <span className="font-syne text-[1.1rem] font-black text-amber-400">{metrics.tps} TPS</span>
          </div>
          <div className="p-2.5 rounded-xl bg-surface/70 border border-[var(--border)]">
            <span className="font-mono text-[0.58rem] text-dimmed uppercase tracking-wider block">Zero-Trust Guard</span>
            <span className="font-syne text-[1.1rem] font-black text-emerald-400">{metrics.securityScore}</span>
          </div>
        </div>

        {/* Live Execution Console */}
        <div className="p-3 rounded-xl bg-[#080b12] border border-[var(--border)] font-mono text-[0.68rem] flex flex-col justify-between max-h-[140px] overflow-y-auto">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-1 mb-1.5 text-dimmed text-[0.6rem]">
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <Terminal size={11} /> Spring Context Execution Stream
            </span>
            <span>UTF-8 · STDOUT</span>
          </div>
          <div className="space-y-1 overflow-y-auto">
            {log.map((entry, idx) => (
              <div key={idx} className="flex items-start gap-2 leading-tight">
                <span className="text-dimmed select-none">[{entry.time}]</span>
                <span
                  className={
                    entry.status === 'success'
                      ? 'text-emerald-400 font-semibold'
                      : entry.status === 'warning'
                      ? 'text-amber-400 font-semibold'
                      : entry.status === 'error'
                      ? 'text-rose-400 font-bold'
                      : 'text-slate-300'
                  }
                >
                  {entry.msg}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
