"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const MAX_SECONDS = 120;

export function LeadForm({ idPrefix = "lead" }: { idPrefix?: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
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
    if (!email.trim()) {
      setError("Email is required.");
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
      form.set("email", email.trim());
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
      setEmail("");
      setMessage("");
      clearAudio();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-[18px] border border-[color:var(--accent)]/25 bg-[color:var(--panel-mint)]/40 p-10 text-center">
        <p className="accent-serif text-3xl text-[color:var(--ink)]">
          Consider it started.
        </p>
        <p className="mt-3 text-sm text-[color:var(--muted)]">
          We&apos;ll reach out today — keep your phone close.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 text-xs font-semibold uppercase tracking-widest text-[color:var(--accent)] underline-offset-4 hover:underline"
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

      <div className="grid gap-3.5 sm:grid-cols-2">
        <div>
          <label
            htmlFor={`${idPrefix}-phone`}
            className="text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--muted)]"
          >
            Phone
          </label>
          <input
            id={`${idPrefix}-phone`}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Your number"
            className="mt-2 w-full rounded-[11px] border border-black/[0.12] bg-white px-[15px] py-[13px] text-sm text-[color:var(--ink)] outline-none transition-colors focus-visible:border-[color:var(--accent)] placeholder:text-[color:var(--muted-2)]"
          />
        </div>
        <div>
          <label
            htmlFor={`${idPrefix}-email`}
            className="text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--muted)]"
          >
            Email
          </label>
          <input
            id={`${idPrefix}-email`}
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@business.com"
            className="mt-2 w-full rounded-[11px] border border-black/[0.12] bg-white px-[15px] py-[13px] text-sm text-[color:var(--ink)] outline-none transition-colors focus-visible:border-[color:var(--accent)] placeholder:text-[color:var(--muted-2)]"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor={`${idPrefix}-name`}
          className="text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--muted)]"
        >
          Name
        </label>
        <input
          id={`${idPrefix}-name`}
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="What should we call you?"
          className="mt-2 w-full rounded-[11px] border border-black/[0.12] bg-white px-[15px] py-[13px] text-sm text-[color:var(--ink)] outline-none transition-colors focus-visible:border-[color:var(--accent)] placeholder:text-[color:var(--muted-2)]"
        />
      </div>

      <div>
        <label
          htmlFor={`${idPrefix}-message`}
          className="text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--muted)]"
        >
          What do you need?{" "}
          <span className="font-medium normal-case tracking-normal opacity-70">
            (type it — or record it below)
          </span>
        </label>
        <textarea
          id={`${idPrefix}-message`}
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="e.g. “Website for my salon — services, prices, booking button.”"
          className="mt-2 w-full resize-none rounded-[11px] border border-black/[0.12] bg-white px-[15px] py-[13px] text-sm text-[color:var(--ink)] outline-none transition-colors focus-visible:border-[color:var(--accent)] placeholder:text-[color:var(--muted-2)]"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-[11px] border border-dashed border-black/[0.22] bg-[color:var(--surface)] p-4">
        {!recording ? (
          <button
            type="button"
            onClick={startRecording}
            className="inline-flex items-center gap-2.5 rounded-[11px] px-5 py-3 text-[13.5px] font-semibold text-[color:var(--ink)] transition-colors hover:text-[color:var(--accent)]"
          >
            Record a voice note
          </button>
        ) : (
          <button
            type="button"
            onClick={stopRecording}
            className="inline-flex items-center gap-2.5 rounded-[11px] bg-[color:var(--danger)] px-5 py-3 text-[13.5px] font-semibold text-white"
          >
            <span className="pulse-dot h-[9px] w-[9px] rounded-full bg-white" />
            Stop · {seconds}s
          </button>
        )}

        {audioUrl && !recording && (
          <>
            <audio controls src={audioUrl} className="h-9 min-w-0 max-w-full flex-1" />
            <button
              type="button"
              onClick={clearAudio}
              className="text-[11px] font-semibold uppercase tracking-widest text-[color:var(--muted)] underline-offset-4 hover:underline"
            >
              Delete
            </button>
          </>
        )}

        {!audioUrl && !recording && (
          <span className="text-xs text-[color:var(--muted-2)]">
            Faster than typing — max 2 min.
          </span>
        )}
      </div>

      {error && (
        <p className="text-sm text-[color:var(--danger)]" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-dark w-full rounded-[11px] px-6 py-4 text-sm font-bold disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Get my website started"}
      </button>
    </form>
  );
}
