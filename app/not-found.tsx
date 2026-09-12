import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-page flex flex-col items-start py-24 sm:py-32">
      <p className="eyebrow">Page not found</p>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        We couldn&apos;t find that page.
      </h1>
      <p className="mt-4 max-w-xl text-lg text-muted">
        It may have moved, or the link may be mistyped. Everything we offer is on our home page.
      </p>
      <Link href="/" className="btn btn-gold mt-10">
        Back to home
      </Link>
    </section>
  );
}
