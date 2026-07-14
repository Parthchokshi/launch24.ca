"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const MAX_SECONDS = 120;

export function LeadForm({ idPrefix = "lead" }: { idPrefix?: string }) {
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
      <div className="rounded-2xl border border-[color:var(--gold)]/30 bg-[color:var(--gold)]/[0.06] p-10 text-center">
        <p className="font-display text-3xl font-semibold italic gold-text">
          Consider it started.
        </p>
        <p className="mt-3 text-sm text-[color:var(--muted)]">
          We&apos;ll reach out today — keep your phone close.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 text-xs font-semibold uppercase tracking-widest text-[color:var(--gold)] underline-offset-4 hover:underline"
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

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor={`${idPrefix}-phone`}
            className="text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--muted)]"
          >
            Phone <span className="text-[color:var(--gold)]">*</span>
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
            className="input-lux mt-2 w-full rounded-xl border border-[color:var(--line-soft)] bg-white/[0.03] px-4 py-3.5 text-[color:var(--ivory)] outline-none placeholder:text-[color:var(--muted)]/50"
          />
        </div>
        <div>
          <label
            htmlFor={`${idPrefix}-name`}
            className="text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--muted)]"
          >
            Name{" "}
            <span className="font-medium normal-case tracking-normal opacity-70">
              (optional)
            </span>
          </label>
          <input
            id={`${idPrefix}-name`}
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="What should we call you?"
            className="input-lux mt-2 w-full rounded-xl border border-[color:var(--line-soft)] bg-white/[0.03] px-4 py-3.5 text-[color:var(--ivory)] outline-none placeholder:text-[color:var(--muted)]/50"
          />
        </div>
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
          className="input-lux mt-2 w-full resize-none rounded-xl border border-[color:var(--line-soft)] bg-white/[0.03] px-4 py-3.5 text-[color:var(--ivory)] outline-none placeholder:text-[color:var(--muted)]/50"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-dashed border-[color:var(--line)] bg-[color:var(--gold)]/[0.03] p-4">
        {!recording ? (
          <button
            type="button"
            onClick={startRecording}
            className="btn-ghost inline-flex items-center gap-2.5 rounded-full border border-[color:var(--line)] px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-[color:var(--gold)]"
          >
            <span className="h-2 w-2 rounded-full bg-[color:var(--gold)]" />
            Record a voice note
          </button>
        ) : (
          <button
            type="button"
            onClick={stopRecording}
            className="inline-flex items-center gap-2.5 rounded-full bg-red-500/90 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white"
          >
            <span className="h-2 w-2 animate-pulse rounded-sm bg-white" />
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
          <span className="text-xs text-[color:var(--muted)]/70">
            Faster than typing — max 2 min.
          </span>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-gold w-full rounded-full px-6 py-4 text-sm font-bold uppercase tracking-widest disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Get my website started"}
      </button>
    </form>
  );
}
