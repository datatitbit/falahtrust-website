"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "@/components/Icon";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * The lighter of the site's two forms: no service field, because none is
 * needed here — this just gives Falahtrust a way to keep in touch with
 * people who are interested, separate from the detailed quote request
 * form in the Contact section (see RequestForm.tsx).
 */
export function CommunitySignup() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (String(data.get("company") ?? "")) return; // honeypot

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();

    if (!email && !phone) {
      setError("Please add your email address or phone number.");
      requestAnimationFrame(() => document.getElementById("community-email")?.focus());
      return;
    }
    setError(null);
    setStatus("sending");

    try {
      const res = await fetch("/send-inquiry.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ kind: "community", name, email, phone }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="flex items-center gap-2 text-sm font-semibold text-gold-300">
        <Icon name="check" className="size-5 flex-none" />
        You&apos;re on the list — thank you!
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full max-w-md">
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="community-company">Leave this field empty</label>
        <input id="community-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <label htmlFor="community-name" className="sr-only">
          Your name (optional)
        </label>
        <input
          id="community-name"
          name="name"
          type="text"
          placeholder="Name (optional)"
          autoComplete="name"
          className="field !bg-white/5 !text-white placeholder:text-slate-400 sm:col-span-2"
        />

        <label htmlFor="community-email" className="sr-only">
          Email address (or phone)
        </label>
        <input
          id="community-email"
          name="email"
          type="email"
          placeholder="Email"
          autoComplete="email"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "community-error" : undefined}
          className="field !bg-white/5 !text-white placeholder:text-slate-400"
        />

        <label htmlFor="community-phone" className="sr-only">
          Phone or WhatsApp number (or email)
        </label>
        <input
          id="community-phone"
          name="phone"
          type="tel"
          placeholder="WhatsApp number"
          autoComplete="tel"
          aria-invalid={error ? true : undefined}
          className="field !bg-white/5 !text-white placeholder:text-slate-400"
        />
      </div>

      <button type="submit" disabled={status === "sending"} className="btn btn-gold mt-3 w-full disabled:opacity-60">
        {status === "sending" ? "Joining…" : "Join us"}
      </button>

      {error && (
        <p id="community-error" role="alert" className="mt-2 text-sm font-medium text-[#fda29b]">
          {error}
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="mt-2 text-sm font-medium text-[#fda29b]">
          Something went wrong — please try again, or message us on WhatsApp.
        </p>
      )}
    </form>
  );
}
