"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactSchema,
  serviceOptions,
  type ContactInput,
} from "@/lib/contact-schema";
import { site } from "@/data/site";

// Contact form. React Hook Form + the SHARED Zod schema (client/server parity).
// Inline errors + the error/success panels use mustard — one of CLAUDE.md's five
// locked hexes, high-contrast on the forest field — so no new color is introduced.
// 2px cream borders, zero radius, no shadow. Submits JSON to /api/contact.

const fieldBase =
  "w-full rounded-xl border border-warm-cream/15 bg-ember-ink/55 px-4 py-3.5 font-body text-warm-cream placeholder:text-smoke focus:border-signal focus:outline-none focus-visible:ring-2 focus-visible:ring-signal/40";
const labelBase =
  "block font-mono text-[9px] uppercase tracking-[.16em] text-warm-cream/60";
const errorText = "mt-1 font-mono text-[9px] uppercase tracking-wide text-ember";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  // Focus target for the success confirmation (A11y-3). tabIndex={-1} + .focus()
  // moves keyboard/SR focus into the panel instead of dropping it on <body>.
  const successRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    // A11y-2: on invalid submit, move focus to the first errored field. This is
    // RHF's default, set explicitly so the intent is visible and can't regress.
    shouldFocusError: true,
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      business: "",
      service: "",
      message: "",
      website: "",
    },
  });

  // A11y-3: when the form swaps to the success confirmation, pull focus into it.
  // role="status" on that panel announces it; this keeps focus from falling to
  // <body> so keyboard/SR users stay oriented.
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  async function onSubmit(values: ContactInput) {
    setStatus("submitting");
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setServerError(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
      reset();
    } catch {
      setServerError("Network error — check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      // role="status" => implicit aria-live="polite": announced on appearance.
      // tabIndex={-1} makes it a programmatic focus target (not tab-reachable);
      // focus:outline-none because a -1 focus target needs no visible ring.
      <div
        ref={successRef}
        role="status"
        tabIndex={-1}
        className="rounded-2xl border border-signal/40 bg-signal/10 p-8 focus:outline-none"
      >
        <p className="font-mono text-xs uppercase tracking-widest text-signal">
          Message sent
        </p>
        <p className="mt-4 font-display text-3xl font-semibold tracking-tight text-warm-cream">
          Thanks — we&apos;ll be in touch soon.
        </p>
        <p className="mt-3 font-body text-warm-cream/70">
          Your message is on its way. We usually reply within a business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-full border border-warm-cream/20 px-5 py-2 font-mono text-xs uppercase tracking-widest text-warm-cream transition-colors hover:border-signal hover:text-signal"
        >
          Send another
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      {/* Honeypot — hidden from humans, off the a11y tree, not tab-focusable. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={labelBase}>
            First Name
          </label>
          <input
            id="firstName"
            autoComplete="given-name"
            className={`mt-2 ${fieldBase} ${errors.firstName ? "border-ember" : ""}`}
            aria-invalid={errors.firstName ? "true" : undefined}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
            {...register("firstName")}
          />
          {/* Persistent live region: empty (0-height, no margin under Tailwind
              preflight) when valid, so the error is announced on appearance, not
              only on tab-in. */}
          <p
            id="firstName-error"
            aria-live="polite"
            className={errors.firstName ? errorText : undefined}
          >
            {errors.firstName?.message}
          </p>
        </div>

        <div>
          <label htmlFor="lastName" className={labelBase}>
            Last Name
          </label>
          <input
            id="lastName"
            autoComplete="family-name"
            className={`mt-2 ${fieldBase} ${errors.lastName ? "border-ember" : ""}`}
            aria-invalid={errors.lastName ? "true" : undefined}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
            {...register("lastName")}
          />
          <p
            id="lastName-error"
            aria-live="polite"
            className={errors.lastName ? errorText : undefined}
          >
            {errors.lastName?.message}
          </p>
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelBase}>
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          spellCheck={false}
          className={`mt-2 ${fieldBase} ${errors.email ? "border-ember" : ""}`}
          aria-invalid={errors.email ? "true" : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register("email")}
        />
        <p
          id="email-error"
          aria-live="polite"
          className={errors.email ? errorText : undefined}
        >
          {errors.email?.message}
        </p>
      </div>

      <div>
        <label htmlFor="business" className={labelBase}>
          Business Name <span className="text-smoke">(optional)</span>
        </label>
        <input
          id="business"
          autoComplete="organization"
          className={`mt-2 ${fieldBase} ${errors.business ? "border-ember" : ""}`}
          aria-invalid={errors.business ? "true" : undefined}
          aria-describedby={errors.business ? "business-error" : undefined}
          {...register("business")}
        />
        <p
          id="business-error"
          aria-live="polite"
          className={errors.business ? errorText : undefined}
        >
          {errors.business?.message}
        </p>
      </div>

      <div>
        <label htmlFor="service" className={labelBase}>
          Service <span className="text-smoke">(optional)</span>
        </label>
        <select
          id="service"
          autoComplete="off"
          className={`mt-2 ${fieldBase} ${errors.service ? "border-ember" : ""}`}
          defaultValue=""
          aria-invalid={errors.service ? "true" : undefined}
          aria-describedby={errors.service ? "service-error" : undefined}
          {...register("service")}
        >
          <option value="">Select a service…</option>
          {serviceOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <p
          id="service-error"
          aria-live="polite"
          className={errors.service ? errorText : undefined}
        >
          {errors.service?.message}
        </p>
      </div>

      <div>
        <label htmlFor="message" className={labelBase}>
          {site.contact.fields.message}
        </label>
        <textarea
          id="message"
          autoComplete="off"
          rows={4}
          className={`mt-2 resize-y ${fieldBase} ${errors.message ? "border-ember" : ""}`}
          aria-invalid={errors.message ? "true" : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message")}
        />
        <p
          id="message-error"
          aria-live="polite"
          className={errors.message ? errorText : undefined}
        >
          {errors.message?.message}
        </p>
      </div>

      {status === "error" && serverError ? (
        <div
          role="alert"
          className="rounded-xl border border-ember/40 bg-ember/10 px-4 py-3 font-mono text-xs uppercase tracking-wide text-ember"
        >
          {serverError}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="w-fit rounded-full bg-signal px-7 py-3.5 font-body text-sm font-semibold text-ember-ink transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Sending…" : site.contact.submit}
      </button>
    </form>
  );
}
