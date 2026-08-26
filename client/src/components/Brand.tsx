/* Cenvara brand primitive: the CVA mark is paired with a restrained, editorial wordmark across every public route. */
type BrandProps = { href?: string; className?: string; label?: string };

export function Brand({ href = "/", className = "", label = "Cenvara início" }: BrandProps) {
  return <a className={`brand ${className}`.trim()} href={href} aria-label={label}><img className="brand-logo" src="/manus-storage/cenvara-cva-mark_da14a16b.png" alt="" aria-hidden="true" /><span>Cenvara<span className="brand-dot">.</span></span></a>;
}
