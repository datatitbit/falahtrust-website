import type { ReactNode, SVGProps } from "react";
import type { IconName } from "@/lib/site";

const paths: Record<IconName, ReactNode> = {
  wallet: (
    <>
      <rect x="3" y="6" width="18" height="14" rx="2.5" />
      <path d="M21 11h-4a1.75 1.75 0 0 0 0 3.5h4" />
      <path d="M6 6V5.5A2.5 2.5 0 0 1 8.5 3H17" />
    </>
  ),
  building: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1.5" />
      <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10.5 21v-2.5h3V21" />
    </>
  ),
  file: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </>
  ),
  monitor: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4M9 10.25l2 2 4-4" />
    </>
  ),
  smartphone: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.25" />
      <path d="M11 18h2" />
    </>
  ),
  truck: (
    <>
      <path d="M3 6h11v10H3zM14 10h4l3 3v3h-7" />
      <circle cx="7" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
    </>
  ),
  book: (
    <>
      <path d="M12 6.5C10 5 7 4.5 4 4.5v14c3 0 6 .5 8 2 2-1.5 5-2 8-2v-14c-3 0-6 .5-8 2z" />
      <path d="M12 6.5v14" />
    </>
  ),
  trending: <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />,
  heart: <path d="M12 20s-7.5-4.5-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.5 12 20 12 20z" />,
  chat: (
    <>
      <path d="M4.5 19.5l1.2-3.6A8 8 0 1 1 8.4 18.6z" />
      <path d="M9 12h.01M12 12h.01M15 12h.01" strokeWidth={2.4} />
    </>
  ),
  phone: (
    <path d="M5.5 3.5h3.2l1.8 4.6-2.3 1.5a11.5 11.5 0 0 0 6.2 6.2l1.5-2.3 4.6 1.8v3.2a2 2 0 0 1-2.1 2A17 17 0 0 1 3.5 5.6a2 2 0 0 1 2-2.1z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 7l8.5 6 8.5-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11.2a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.8" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 2" />
    </>
  ),
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  star: (
    <path
      d="M12 2l2.47 6.6 7.04.31-5.52 4.39 1.89 6.79L12 16.2l-5.88 3.89 1.89-6.79-5.52-4.39 7.04-.31z"
      fill="currentColor"
      stroke="none"
    />
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7" />,
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5.5M12 7.75h.01" />
    </>
  ),
  chevronDown: <path d="M6 9l6 6 6-6" />,
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  twitter: (
    <path
      d="M4 4l7.2 9.3L4.4 20H7l5.6-5.7L17 20h3.2l-7.6-9.8L19.7 4h-2.6l-5.1 5.3L7.3 4z"
      fill="currentColor"
      stroke="none"
    />
  ),
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" />
      <path d="M10.5 9.3l5 2.7-5 2.7z" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: (
    <path
      d="M14.5 21v-7.2h2.4l.4-2.8h-2.8V9.2c0-.8.2-1.4 1.4-1.4h1.5V5.3c-.3 0-1.1-.1-2.1-.1-2.1 0-3.6 1.3-3.6 3.7v2.1H9.3v2.8h2.4V21z"
      fill="currentColor"
      stroke="none"
    />
  ),
  tiktok: (
    <path
      d="M14 3.5c.4 1.9 1.6 3.1 3.7 3.3v2.6c-1.3.1-2.5-.3-3.7-1.1v6.1a5 5 0 1 1-4.3-5v2.7a2.3 2.3 0 1 0 1.7 2.3V3.5z"
      fill="currentColor"
      stroke="none"
    />
  ),
};

export function Icon({ name, ...rest }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
