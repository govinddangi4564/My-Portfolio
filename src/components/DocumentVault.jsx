import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Building2, Download, FileKey2, LoaderCircle, LockKeyhole, Send, ShieldCheck, UserRound, X } from "lucide-react";
import { sound } from "../utils/sound";

const manifestUrl = "/vault/manifest.json";
const base64Bytes = (value) => Uint8Array.from(atob(value), (char) => char.charCodeAt(0));

async function deriveKey(password, kdf) {
  const passwordKey = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey({ name: "PBKDF2", salt: base64Bytes(kdf.salt), iterations: kdf.iterations, hash: kdf.hash }, passwordKey, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
}

export default function DocumentVault({ isOpen, onClose }) {
  const [mode, setMode] = useState("password");
  const [manifest, setManifest] = useState(null);
  const [manifestError, setManifestError] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [request, setRequest] = useState({ name: "", company: "", email: "", note: "" });
  const [requestStatus, setRequestStatus] = useState("");

  useEffect(() => {
    if (!isOpen) return undefined;
    fetch(manifestUrl, { cache: "no-store" })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data) => data?.kdf && Array.isArray(data.documents) ? setManifest(data) : Promise.reject())
      .catch(() => setManifestError("Password access is not configured yet."));
    return undefined;
  }, [isOpen]);

  const download = async (document) => {
    if (!password) { setError("Enter the password provided by Govind."); return; }
    setBusy(true); setError("");
    try {
      const key = await deriveKey(password, manifest.kdf);
      const response = await fetch(`/vault/${document.file}`, { cache: "no-store" });
      if (!response.ok) throw new Error("Missing document");
      const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv: base64Bytes(document.iv) }, key, await response.arrayBuffer());
      const url = URL.createObjectURL(new Blob([decrypted], { type: document.type || "application/octet-stream" }));
      const anchor = window.document.createElement("a");
      anchor.href = url; anchor.download = document.name; anchor.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
      sound.playSuccess();
    } catch {
      setError("Unable to unlock this document. Check the password and try again.");
    } finally { setBusy(false); }
  };

  const submitRequest = async (event) => {
    event.preventDefault();
    setRequestStatus("");
    if (!import.meta.env.VITE_WEB3FORMS_KEY || import.meta.env.VITE_WEB3FORMS_KEY === "your_access_key_here") {
      setRequestStatus("Request email is not configured yet. Please contact Govind directly.");
      return;
    }
    setBusy(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          subject: "Document vault access request",
          from_name: request.name,
          email: request.email,
          message: `Document access request\n\nName: ${request.name}\nCompany: ${request.company}\nEmail: ${request.email}\nNote: ${request.note || "Not provided"}`,
        }),
      });
      const result = await response.json();
      if (!result.success) throw new Error("Request failed");
      setRequestStatus("Request sent. Govind will review it before sharing any access password.");
      setRequest({ name: "", company: "", email: "", note: "" });
      sound.playSuccess();
    } catch {
      setRequestStatus("Could not send the request. Please contact Govind directly.");
    } finally { setBusy(false); }
  };

  const inputClass = "w-full rounded-xl border border-zinc-700 bg-zinc-950 py-3 px-3 font-mono text-sm text-white outline-none focus:border-emerald-400";

  return <AnimatePresence>{isOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
    <motion.section initial={{ opacity: 0, scale: 0.96, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 12 }} onClick={(event) => event.stopPropagation()} className="relative w-full max-w-lg my-auto rounded-3xl border border-emerald-500/30 bg-[#090c14] p-5 sm:p-7 shadow-[0_25px_70px_rgba(0,0,0,0.85)]" role="dialog" aria-modal="true" aria-labelledby="vault-title">
      <button onClick={onClose} type="button" className="absolute top-4 right-4 p-2 rounded-full bg-surface border border-[var(--border)] text-muted hover:text-white" aria-label="Close document vault"><X size={16} /></button>
      <div className="w-11 h-11 mb-4 rounded-2xl bg-emerald-400 text-black flex items-center justify-center"><FileKey2 size={21} /></div>
      <h2 id="vault-title" className="font-syne text-xl font-bold text-white">Secure document vault</h2>
      <p className="mt-2 font-body text-sm leading-relaxed text-zinc-400">Request access for approval, or unlock documents with a password already provided by Govind.</p>
      <div className="mt-5 grid grid-cols-2 rounded-xl border border-zinc-800 bg-zinc-950 p-1">
        <button type="button" onClick={() => setMode("request")} className={`rounded-lg py-2 font-mono text-xs ${mode === "request" ? "bg-emerald-500 text-black font-bold" : "text-zinc-400"}`}>Request access</button>
        <button type="button" onClick={() => setMode("password")} className={`rounded-lg py-2 font-mono text-xs ${mode === "password" ? "bg-emerald-500 text-black font-bold" : "text-zinc-400"}`}>Use password</button>
      </div>
      {mode === "request" ? <form onSubmit={submitRequest} className="mt-5 space-y-3">
        <p className="font-body text-sm text-zinc-400">Your request is sent to Govind. Documents remain locked until he approves and sends you a password.</p>
        <label className="block"><span className="font-mono text-[0.68rem] text-emerald-400">Your name</span><div className="relative mt-1"><UserRound size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" /><input required value={request.name} onChange={(event) => setRequest({ ...request, name: event.target.value })} className={`${inputClass} pl-9`} placeholder="Your full name" /></div></label>
        <label className="block"><span className="font-mono text-[0.68rem] text-emerald-400">Company</span><div className="relative mt-1"><Building2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" /><input required value={request.company} onChange={(event) => setRequest({ ...request, company: event.target.value })} className={`${inputClass} pl-9`} placeholder="Company name" /></div></label>
        <label className="block"><span className="font-mono text-[0.68rem] text-emerald-400">Work email</span><input required type="email" value={request.email} onChange={(event) => setRequest({ ...request, email: event.target.value })} className={`${inputClass} mt-1`} placeholder="name@company.com" /></label>
        <label className="block"><span className="font-mono text-[0.68rem] text-emerald-400">Message (optional)</span><textarea value={request.note} onChange={(event) => setRequest({ ...request, note: event.target.value })} className={`${inputClass} mt-1 min-h-20 resize-y`} placeholder="Which documents are needed?" /></label>
        <button disabled={busy} type="submit" className="w-full rounded-xl bg-emerald-400 py-3 text-black font-mono text-sm font-bold hover:bg-emerald-300 disabled:opacity-60 flex items-center justify-center gap-2">{busy ? <LoaderCircle size={16} className="animate-spin" /> : <Send size={16} />}Send request</button>
        {requestStatus && <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 font-body text-sm text-emerald-100">{requestStatus}</p>}
      </form> : <div className="mt-5">
        {manifest && <label className="block"><span className="font-mono text-[0.68rem] uppercase tracking-wider text-emerald-400">Access password</span><div className="relative mt-2"><LockKeyhole size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" /><input value={password} onChange={(event) => setPassword(event.target.value)} type="password" autoComplete="off" placeholder="Enter password" className={`${inputClass} pl-10`} /></div></label>}
        {error && <p className="mt-4 flex gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 font-body text-sm text-rose-200"><AlertCircle size={17} className="shrink-0" />{error}</p>}
        {manifestError && <p className="mt-4 flex gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 font-body text-sm text-rose-200"><AlertCircle size={17} className="shrink-0" />{manifestError}</p>}
        {!manifest && !manifestError && <div className="py-10 flex justify-center"><LoaderCircle className="animate-spin text-emerald-400" /></div>}
        {manifest && <div className="mt-5 space-y-2">{manifest.documents.map((document) => <button key={document.id} type="button" disabled={busy} onClick={() => download(document)} className="w-full p-3 rounded-xl border border-zinc-800 bg-zinc-900/70 hover:border-emerald-500/40 disabled:opacity-60 flex items-center justify-between gap-3 text-left"><span className="min-w-0"><span className="block truncate font-syne text-sm font-bold text-white">{document.name}</span><span className="font-mono text-[0.62rem] text-zinc-500">Encrypted document</span></span>{busy ? <LoaderCircle size={17} className="animate-spin text-emerald-400 shrink-0" /> : <Download size={17} className="text-emerald-400 shrink-0" />}</button>)}</div>}
      </div>}
      <p className="mt-5 flex gap-2 text-xs leading-relaxed text-zinc-500"><ShieldCheck size={16} className="shrink-0 text-emerald-400" />Approved access should be used only for the recruitment process. Downloaded copies cannot be remotely removed.</p>
    </motion.section>
  </motion.div>}</AnimatePresence>;
}