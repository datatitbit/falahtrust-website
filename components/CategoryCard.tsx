import Link from "next/link";
import { Icon } from "@/components/Icon";
import type { Category } from "@/lib/site";

export function CategoryCard({ category, basePath = "/services" }: { category: Category; basePath?: string }) {
  return (
    <li className="card reveal">
      <span className="icon-tile">
        <Icon name={category.icon} />
      </span>
      <h3 className="font-display text-xl font-semibold text-ink">{category.title}</h3>
      <p className="leading-relaxed text-muted">{category.summary}</p>
      <Link
        href={`${basePath}/${category.slug}`}
        className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-semibold text-brand-ink hover:gap-3"
      >
        View details
        <span className="sr-only">: {category.title}</span>
        <Icon name="arrowRight" className="size-4 transition-all" />
      </Link>
    </li>
  );
}
