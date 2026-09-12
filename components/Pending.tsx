import type { ReactNode } from "react";
import { Icon } from "@/components/Icon";
import { site } from "@/lib/site";

/** Inline marker for a detail the client has not supplied. Never a link. */
export function Placeholder({ children }: { children: ReactNode }) {
  return <span className="placeholder-token">{children}</span>;
}

/** A visibly empty section: says exactly what is needed instead of inventing it. */
export function PendingBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div role="note" className="pending-block">
      <p className="flex items-center gap-2 font-display text-base font-semibold text-ink">
        <Icon name="info" className="size-5 text-accent-ink" />
        Awaiting from Falahtrust: {title}
      </p>
      <div className="mt-2 text-[0.95rem] leading-relaxed text-muted">{children}</div>
    </div>
  );
}

/** Marks drafted wording while the site is in preview. */
export function DraftTag() {
  if (!site.isPreview) return null;
  return <span className="draft-tag">Draft wording</span>;
}
