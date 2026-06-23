import Link from "next/link";

/**
 * Breadcrumb navigation trail.
 * @param {{ items: Array<{ label: string, href?: string }> }} props
 */
export default function Breadcrumb({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol className="breadcrumb-list">
        <li className="breadcrumb-item">
          <Link href="/" className="breadcrumb-link">
            <span aria-hidden="true">📖</span> Codex
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.label} className="breadcrumb-item">
              <span className="breadcrumb-separator" aria-hidden="true">
                ›
              </span>
              {isLast || !item.href ? (
                <span className="breadcrumb-current" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="breadcrumb-link">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
