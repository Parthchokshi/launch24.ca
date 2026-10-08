"use client";

import { useEffect, useRef, useState } from "react";
import { MicIcon } from "@/components/new/Icons";
import { googleAdsConversionImageUrl, trackGoogleAdsConversion } from "@/lib/ads";
import { heardFromOptions } from "@/lib/heard-from";
import { getDesignVersion, getUtms, track } from "@/lib/tracking";

const MAX_SECONDS = 120;
const MAX_BYTES = 8 * 1024 * 1024;

type Voice = { blob: Blob; name: string; url: string };

const input =
  "mt-1.5 block min-h-14 w-full border-[3px] border-white bg-white px-4 text-lg text-ink placeholder:text-[#6b6b6b]";
const label = "block text-sm font-extrabold uppercase tracking-[0.12em] text-white";

export function LeadForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok">("idle");
  const [error, setError] = useState("");
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [voice, setVoice] = useState<Voice | null>(null);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const voiceRef = useRef<Voice | null>(null);
  const submittingRef = useRef(false);
  useEffect(() => {
    voiceRef.current = voice;
  }, [voice]);

  function stopTimerAndStream() {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }

  function stopRecording() {
    const r = recorderRef.current;
    if (r && r.state !== "inactive") r.stop();
    stopTimerAndStream();
    setRecording(false);
  }

  function clearVoice() {
    if (voiceRef.current) URL.revokeObjectURL(voiceRef.current.url);
    setVoice(null);
    setSeconds(0);
  }

  useEffect(
    () => () => {
      stopTimerAndStream();
      if (voiceRef.current) URL.revokeObjectURL(voiceRef.current.url);
    },
    [],
  );

  async function startRecording() {
    setError("");
    clearVoice();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mimeType = ["audio/webm", "audio/mp4"].find((t) =>
        MediaRecorder.isTypeSupported(t),
      );
      const recorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);
      const chunks: BlobPart[] = [];
      recorder.ondataavailable = (e) => e.data.size > 0 && chunks.push(e.data);
      recorder.onstop = () => {
        const type = recorder.mimeType || "audio/webm";
        const blob = new Blob(chunks, { type });
        const ext = type.includes("mp4") ? "mp4" : "webm";
        setVoice({ blob, name: `voice-note.${ext}`, url: URL.createObjectURL(blob) });
      };
      recorderRef.current = recorder;
      recorder.start();
      setRecording(true);
      setSeconds(0);
      track("voice_note_start", { location: "form" });
      timerRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s + 1 >= MAX_SECONDS) stopRecording();
          return s + 1;
        });
      }, 1000);
    } catch {
      setError("We couldn't use your microphone. Upload a file, or just call or text us.");
    }
  }

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (file.size > MAX_BYTES) {
      setError("That file is too big (max 8MB).");
      return;
    }
    setError("");
    clearVoice();
    setVoice({ blob: file, name: file.name, url: URL.createObjectURL(file) });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submittingRef.current) return; // ignore double taps before state updates
    if (recording) stopRecording();
    setError("");
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const business = String(data.get("business") ?? "").trim();
    if (!name || !phone || !business) {
      setError("Please fill in your name, phone, and business name.");
      return;
    }

    const utms = getUtms();
    const body = new FormData();
    body.set("name", name);
    body.set("phone", phone);
    body.set("business", business);
    body.set("_hp", String(data.get("_hp") ?? ""));
    body.set("heard_from", String(data.get("heard_from") ?? ""));
    body.set("page_url", window.location.href.split("#")[0]);
    body.set("design_version", getDesignVersion());
    for (const [k, v] of Object.entries(utms)) body.set(k, v);
    if (voice) body.set("audio", voice.blob, voice.name);

    submittingRef.current = true;
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", { method: "POST", body });
      if (!res.ok) {
        const j = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(j?.error || "Something went wrong. Please call or text us.");
      }
      track("form_submit", { has_voice_note: voice ? "yes" : "no" });
      trackGoogleAdsConversion();
      clearVoice();
      setStatus("ok");
    } catch (err) {
      setStatus("idle");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      submittingRef.current = false;
    }
  }

  if (status === "ok") {
    return (
      <div role="status" className="border-[3px] border-yellow p-6 text-center">
        <p className="display text-4xl text-yellow sm:text-5xl">
          Got it. We&apos;ll call you back as soon as we can.
        </p>
        {/* Backup conversion pixel for when gtag.js is blocked. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={googleAdsConversionImageUrl()}
          alt=""
          width={1}
          height={1}
          className="hidden"
          aria-hidden
        />
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      {/* Honeypot: odd name so browsers don't autofill it. */}
      <input
        type="text"
        name="_hp"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <div>
        <label htmlFor="lead-name" className={label}>
          Name
        </label>
        <input id="lead-name" name="name" type="text" autoComplete="name" required className={input} />
      </div>
      <div>
        <label htmlFor="lead-phone" className={label}>
          Phone
        </label>
        <input
          id="lead-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          className={input}
        />
      </div>
      <div>
        <label htmlFor="lead-business" className={label}>
          Business name
        </label>
        <input
          id="lead-business"
          name="business"
          type="text"
          autoComplete="organization"
          required
          className={input}
        />
      </div>

      <div>
        <label htmlFor="lead-heard" className={label}>
          How did you hear about us?{" "}
          <span className="font-semibold normal-case tracking-normal text-muted-on-ink">(optional)</span>
        </label>
        <select id="lead-heard" name="heard_from" defaultValue="" className={input}>
          <option value="">Select one</option>
          {heardFromOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div id="voice-note" className="border-[3px] border-dashed border-white/60 p-4">
        <p className={label}>
          Voice note <span className="font-semibold normal-case tracking-normal text-muted-on-ink">(optional)</span>
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          {recording ? (
            <button
              type="button"
              id="voice-record"
              onClick={stopRecording}
              className="btn btn-white w-auto!"
            >
              <span aria-hidden className="pulse-dot h-3 w-3 rounded-full bg-danger" />
              Stop · {seconds}s
            </button>
          ) : (
            <button
              type="button"
              id="voice-record"
              onClick={startRecording}
              className="btn btn-white w-auto!"
            >
              <MicIcon />
              {voice ? "Record again" : "Record"}
            </button>
          )}
          <label className="inline-flex min-h-12 cursor-pointer items-center text-base font-bold text-white underline decoration-2 underline-offset-4 focus-within:outline focus-within:outline-4 focus-within:outline-offset-2 focus-within:outline-yellow">
            Or upload a file
            <input type="file" accept="audio/*" onChange={onFile} className="sr-only" />
          </label>
        </div>
        {voice && !recording && (
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <audio controls src={voice.url} className="h-11 min-w-0 flex-1" />
            <button
              type="button"
              onClick={clearVoice}
              className="min-h-12 px-2 text-base font-bold text-white underline decoration-2 underline-offset-4"
            >
              Remove
            </button>
          </div>
        )}
      </div>

      {error && (
        <p role="alert" className="border-[3px] border-white bg-white p-3 text-base font-bold text-danger">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        aria-busy={status === "sending"}
        className="btn btn-ink disabled:opacity-60"
      >
        Call me back
      </button>
    </form>
  );
}
