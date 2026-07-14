"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const MAX_SECONDS = 120;

export function LeadForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const clearAudio = useCallback(() => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioBlob(null);
    setAudioUrl(null);
    setSeconds(0);
  }, [audioUrl]);

  const stopRecording = useCallback(() => {
    mediaRecorderRef.current?.stop();
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setRecording(false);
  }, []);

  useEffect(() => {
    return () => {
      stopRecording();
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function startRecording() {
    clearAudio();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mimeType = MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : MediaRecorder.isTypeSupported("audio/mp4")
          ? "audio/mp4"
          : "";

      const recorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);

      chunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        const type = recorder.mimeType || "audio/webm";
        const blob = new Blob(chunksRef.current, { type });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setRecording(true);
      setSeconds(0);
      timerRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s + 1 >= MAX_SECONDS) {
            stopRecording();
            return MAX_SECONDS;
          }
          return s + 1;
        });
      }, 1000);
    } catch {
      setError("Microphone access was blocked. You can still type a short note.");
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!phone.trim()) {
      setError("Phone number is required.");
      return;
    }
    if (!message.trim() && !audioBlob) {
      setError("Add a short note or a voice memo.");
      return;
    }

    setStatus("sending");
    try {
      const form = new FormData();
      form.set("phone", phone.trim());
      form.set("name", name.trim());
      form.set("message", message.trim());
      form.set("company", honeypot);
      if (audioBlob) {
        const ext = audioBlob.type.includes("mp4") ? "mp4" : "webm";
        form.set("audio", audioBlob, `voice-memo.${ext}`);
      }

      const res = await fetch("/api/lead", { method: "POST", body: form });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(data?.error || "Something went wrong.");
      }
      setStatus("ok");
      setName("");
      setPhone("");
      setMessage("");
      clearAudio();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-2xl border border-[color:var(--signal)]/40 bg-[color:var(--signal)]/10 p-8 text-center">
        <p className="font-display text-2xl font-bold text-[color:var(--signal)]">
          Got it.
        </p>
        <p className="mt-2 text-sm text-[color:var(--muted)]">
          We’ll reach out ASAP — usually the same day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-[color:var(--foam)] underline underline-offset-2"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {/* Honeypot */}
      <input
        type="text"
        name="company"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
      />

      <div>
        <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-[color:var(--muted)]">
          Phone <span className="text-[color:var(--signal)]">*</span>
        </label>
        <input
          id="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Your number"
          className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[color:var(--foam)] outline-none placeholder:text-[color:var(--muted)]/50 focus:border-[color:var(--signal)]/50"
        />
      </div>

      <div>
        <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-[color:var(--muted)]">
          Name <span className="font-normal normal-case tracking-normal">(optional)</span>
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="What should we call you?"
          className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[color:var(--foam)] outline-none placeholder:text-[color:var(--muted)]/50 focus:border-[color:var(--signal)]/50"
        />
      </div>

      <div>
        <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-[color:var(--muted)]">
          Short note <span className="font-normal normal-case tracking-normal">(or use voice)</span>
        </label>
        <textarea
          id="message"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What do you need? e.g. restaurant site, salon booking CTA…"
          className="mt-1.5 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[color:var(--foam)] outline-none placeholder:text-[color:var(--muted)]/50 focus:border-[color:var(--signal)]/50"
        />
      </div>

      <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.03] p-4">
        <p className="text-xs font-bold uppercase tracking-wider text-[color:var(--muted)]">
          Voice memo
        </p>
        <p className="mt-1 text-xs text-[color:var(--muted)]">
          Tap record, say what you need (max 2 min), then send.
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          {!recording ? (
            <button
              type="button"
              onClick={startRecording}
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--amber)] px-4 py-2.5 text-sm font-bold text-[color:var(--ink)]"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--ink)]" />
              Record
            </button>
          ) : (
            <button
              type="button"
              onClick={stopRecording}
              className="inline-flex items-center gap-2 rounded-full bg-red-500 px-4 py-2.5 text-sm font-bold text-white"
            >
              <span className="h-2.5 w-2.5 animate-pulse rounded-sm bg-white" />
              Stop · {seconds}s
            </button>
          )}

          {audioUrl && !recording && (
            <>
              <audio controls src={audioUrl} className="h-10 max-w-full" />
              <button
                type="button"
                onClick={clearAudio}
                className="text-xs font-semibold text-[color:var(--muted)] underline underline-offset-2"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-[color:var(--signal)] px-6 py-4 text-sm font-bold uppercase tracking-wide text-[color:var(--ink)] transition hover:brightness-110 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send proposal request"}
      </button>
    </form>
  );
}
