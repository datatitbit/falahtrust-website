"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "@/components/Icon";
import { academy, categories, emailLink, whatsappLink } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

interface Fields {
  name: string;
  email: string;
  phone: string;
  service: string;
  details: string;
}

function readFields(form: HTMLFormElement): Fields {
  const data = new FormData(form);
  return {
    name: String(data.get("name") ?? "").trim(),
    email: String(data.get("email") ?? "").trim(),
    phone: String(data.get("phone") ?? "").trim(),
    service: String(data.get("service") ?? ""),
    details: String(data.get("details") ?? "").trim(),
  };
}

/** Name and a service are always required. We also need one way to reach you back — email or phone. */
function validate(f: Fields): string | null {
  if (!f.name) return "Please tell us your name.";
  if (!f.service) return "Please choose a service so we can point you in the right direction.";
  if (!f.email && !f.phone) return "Please add an email address or a phone number, so we have a way to reach you.";
  return null;
}

function composeMessage(f: Fields) {
  const lines = [
    `Hello Falahtrust, my name is ${f.name}.`,
    `I would like help with: ${f.service}.`,
    f.phone ? `My phone number: ${f.phone}` : "",
    f.email ? `My email: ${f.email}` : "",
    f.details,
  ].filter(Boolean);
  return lines.join("\n\n");
}

export function RequestForm() {
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  function focusFirstInvalid() {
    document.getElementById(error?.includes("name") ? "request-name" : "request-service")?.focus();
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fields = readFields(form);

    // Honeypot: a real visitor never fills this hidden field; a bot usually does.
    if (String(new FormData(form).get("company") ?? "")) return;

    const problem = validate(fields);
    if (problem) {
      setError(problem);
      setStatus("idle");
      requestAnimationFrame(() =>
        document.getElementById(fields.name ? "request-service" : "request-name")?.focus(),
      );
      return;
    }
    setError(null);
    setStatus("sending");

    try {
      const res = await fetch("/send-inquiry.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ kind: "quote", ...fields }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  function onWhatsApp(form: HTMLFormElement | null) {
    if (!form) return;
    const fields = readFields(form);
    const problem = validate(fields);
    if (problem) {
      setError(problem);
      requestAnimationFrame(focusFirstInvalid);
      return;
    }
    setError(null);
    window.open(whatsappLink(composeMessage(fields)), "_blank", "noopener,noreferrer");
  }

  function onEmail(form: HTMLFormElement | null) {
    if (!form) return;
    const fields = readFields(form);
    const problem = validate(fields);
    if (problem) {
      setError(problem);
      requestAnimationFrame(focusFirstInvalid);
      return;
    }
    setError(null);
    window.location.href = emailLink(`Service request: ${fields.service}`, composeMessage(fields));
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-start gap-3 rounded-[1.75rem] border border-line bg-surface p-8 text-ink shadow-[0_40px_80px_-40px_rgb(0_0_0/0.6)]">
        <span className="grid size-12 place-items-center rounded-full bg-gold-400 text-navy-900">
          <Icon name="check" className="size-6" />
        </span>
        <h3 className="font-display text-2xl font-semibold">Thank you — we&apos;ve got it.</h3>
        <p className="text-[0.95rem] leading-relaxed text-muted">
          Your request has been sent to Falahtrust Enterprise. We&apos;ll get back to you using the details
          you provided.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="btn mt-2 border border-line text-ink hover:border-gold-500">
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-[1.75rem] border border-line bg-surface p-6 text-ink shadow-[0_40px_80px_-40px_rgb(0_0_0/0.6)] sm:p-8"
    >
      <h3 className="font-display text-2xl font-semibold">Start a request</h3>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
        Fill this in and we&apos;ll get back to you. Fields marked <span className="text-accent-ink">*</span> are required.
      </p>

      {/* Honeypot — hidden from real visitors, often filled in by bots. */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="request-company">Leave this field empty</label>
        <input id="request-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-6 grid gap-5">
        <div>
          <label htmlFor="request-name" className="mb-2 block text-sm font-semibold">
            Full name <span className="text-accent-ink">*</span>
          </label>
          <input id="request-name" name="name" type="text" autoComplete="name" required className="field" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="request-email" className="mb-2 block text-sm font-semibold">
              Email address <span className="font-normal text-muted">(or phone)</span>
            </label>
            <input id="request-email" name="email" type="email" autoComplete="email" className="field" />
          </div>
          <div>
            <label htmlFor="request-phone" className="mb-2 block text-sm font-semibold">
              Phone number <span className="font-normal text-muted">(or email)</span>
            </label>
            <input id="request-phone" name="phone" type="tel" autoComplete="tel" className="field" />
          </div>
        </div>

        <div>
          <label htmlFor="request-service" className="mb-2 block text-sm font-semibold">
            Service you need <span className="text-accent-ink">*</span>
          </label>
          <select
            id="request-service"
            name="service"
            defaultValue=""
            required
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "request-error" : undefined}
            className="field appearance-none bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-10"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23d4a72c' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
            }}
            onChange={() => setError(null)}
          >
            <option value="" disabled>
              Choose a service
            </option>
            {categories.map((c) => (
              <option key={c.slug} value={c.title}>
                {c.title}
              </option>
            ))}
            <option value={academy.title}>{academy.title}</option>
            <option value="Something else">Something else</option>
          </select>
        </div>

        <div>
          <label htmlFor="request-details" className="mb-2 block text-sm font-semibold">
            A few details <span className="font-normal text-muted">(optional)</span>
          </label>
          <textarea id="request-details" name="details" rows={4} className="field resize-y" />
        </div>

        {error && (
          <p id="request-error" role="alert" className="text-sm font-medium text-[#b42318] dark:text-[#fda29b]">
            {error}
          </p>
        )}
        {status === "error" && (
          <p role="alert" className="text-sm font-medium text-[#b42318] dark:text-[#fda29b]">
            Something went wrong sending your request. Please try WhatsApp or email below instead.
          </p>
        )}
      </div>

      <button type="submit" disabled={status === "sending"} className="btn btn-gold mt-6 w-full disabled:opacity-60">
        <Icon name="chat" />
        {status === "sending" ? "Sending…" : "Send request"}
      </button>

      <div className="mt-4 flex flex-col gap-2 text-center text-sm text-muted sm:flex-row sm:justify-center sm:gap-4">
        <button type="button" onClick={(e) => onWhatsApp(e.currentTarget.form)} className="underline hover:text-ink">
          Or chat on WhatsApp
        </button>
        <span aria-hidden="true" className="hidden sm:inline">·</span>
        <button type="button" onClick={(e) => onEmail(e.currentTarget.form)} className="underline hover:text-ink">
          Or email us directly
        </button>
      </div>

      <p className="mt-5 flex gap-2 text-xs leading-relaxed text-muted">
        <Icon name="shield" className="mt-px size-4 flex-none text-accent-ink" />
        Sending this form emails your details to Falahtrust Enterprise so we can get back to you — see our{" "}
        <a href="/privacy" className="underline">
          privacy policy
        </a>
        . We don&apos;t sell your information or use it for anything else.
      </p>
    </form>
  );
}
