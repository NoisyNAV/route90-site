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
  "w-full border-2 border-cream bg-ink px-4 py-3 font-body text-cream placeholder:text-cream/40 focus:border-mustard focus:outline-none";
const labelBase =
  "block font-mono text-xs uppercase tracking-widest text-cream/80";
const errorText = "mt-1 font-mono text-xs uppercase tracking-wide text-mustard";

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
        className="border-2 border-mustard bg-forest p-8 focus:outline-none"
      >
        <p className="font-mono text-xs uppercase tracking-widest text-mustard">
          Message sent
        </p>
        <p className="mt-4 font-display text-2xl uppercase tracking-tight text-cream">
          Thanks — we&apos;ll be in touch soon.
        </p>
        <p className="mt-3 font-body text-cream/80">
          Your message is on its way. We usually reply within a business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 border-2 border-cream px-5 py-2 font-mono text-xs uppercase tracking-widest text-cream transition-colors hover:border-mustard hover:text-mustard"
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
            className={`mt-2 ${fieldBase} ${errors.firstName ? "border-mustard" : ""}`}
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
            className={`mt-2 ${fieldBase} ${errors.lastName ? "border-mustard" : ""}`}
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
          className={`mt-2 ${fieldBase} ${errors.email ? "border-mustard" : ""}`}
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
          Business Name <span className="text-cream/40">(optional)</span>
        </label>
        <input
          id="business"
          className={`mt-2 ${fieldBase} ${errors.business ? "border-mustard" : ""}`}
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
          Service <span className="text-cream/40">(optional)</span>
        </label>
        <select
          id="service"
          className={`mt-2 ${fieldBase} ${errors.service ? "border-mustard" : ""}`}
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
          rows={4}
          className={`mt-2 resize-y ${fieldBase} ${errors.message ? "border-mustard" : ""}`}
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
          className="border-2 border-mustard bg-mustard/10 px-4 py-3 font-mono text-xs uppercase tracking-wide text-mustard"
        >
          {serverError}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="w-fit border-2 border-mustard bg-mustard px-8 py-3 font-display text-lg uppercase tracking-wide text-ink transition-colors hover:bg-transparent hover:text-mustard disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-mustard disabled:hover:text-ink"
      >
        {submitting ? "Sending…" : site.contact.submit}
      </button>
    </form>
  );
}
