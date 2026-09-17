"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "@/components/Icon";
import { academy, categories, emailLink, whatsappLink } from "@/lib/site";

function composeMessage(form: HTMLFormElement) {
  const data = new FormData(form);
  const name = String(data.get("name") ?? "").trim();
  const service = String(data.get("service") ?? "");
  const details = String(data.get("details") ?? "").trim();

  const lines = [
    `Hello Falahtrust${name ? `, my name is ${name}` : ""}.`,
    service ? `I would like help with: ${service}.` : "",
    details,
  ].filter(Boolean);

  return { service, text: lines.join("\n\n") };
}

export function RequestForm() {
  const [error, setError] = useState<string | null>(null);

  function validate(form: HTMLFormElement) {
    const message = composeMessage(form);
    if (!message.service) {
      setError("Please choose a service so we can point you in the right direction.");
      form.querySelector<HTMLSelectElement>("#request-service")?.focus();
      return null;
    }
    setError(null);
    return message;
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const message = validate(e.currentTarget);
    if (message) window.open(whatsappLink(message.text), "_blank", "noopener,noreferrer");
  }

  function onEmail(form: HTMLFormElement | null) {
    if (!form) return;
    const message = validate(form);
    if (message) window.location.href = emailLink(`Service request: ${message.service}`, message.text);
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-[1.75rem] border border-line bg-surface p-6 text-ink shadow-[0_40px_80px_-40px_rgb(0_0_0/0.6)] sm:p-8"
    >
      <h3 className="font-display text-2xl font-semibold">Start a request</h3>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
        Fill this in and we will open WhatsApp with your message ready to send.
      </p>

      <div className="mt-6 grid gap-5">
        <div>
          <label htmlFor="request-name" className="mb-2 block text-sm font-semibold">
            Your name <span className="font-normal text-muted">(optional)</span>
          </label>
          <input id="request-name" name="name" type="text" autoComplete="name" className="field" />
        </div>

        <div>
          <label htmlFor="request-service" className="mb-2 block text-sm font-semibold">
            Service you need
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
          {error && (
            <p id="request-error" role="alert" className="mt-2 text-sm font-medium text-[#b42318] dark:text-[#fda29b]">
              {error}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="request-details" className="mb-2 block text-sm font-semibold">
            A few details <span className="font-normal text-muted">(optional)</span>
          </label>
          <textarea id="request-details" name="details" rows={4} className="field resize-y" />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button type="submit" className="btn btn-gold flex-1">
          <Icon name="chat" />
          Send on WhatsApp
          <span className="sr-only"> (opens in a new tab)</span>
        </button>
        <button
          type="button"
          onClick={(e) => onEmail(e.currentTarget.form)}
          className="btn flex-1 border border-line text-ink hover:border-gold-500"
        >
          <Icon name="mail" />
          Email instead
        </button>
      </div>

      <p className="mt-5 flex gap-2 text-xs leading-relaxed text-muted">
        <Icon name="shield" className="mt-px size-4 flex-none text-accent-ink" />
        This website does not store what you type. Your message is only sent when you press send in
        WhatsApp or your email app.
      </p>
    </form>
  );
}
