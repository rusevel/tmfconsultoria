/* Cenvara brand primitive: the CVA mark is paired with a restrained, editorial wordmark across every public route. */
type BrandProps = { href?: string; className?: string; label?: string };

export function Brand({ href = "/", className = "", label = "Cenvara início" }: BrandProps) {
  return <a className={`brand ${className}`.trim()} href={href} aria-label={label}><svg className="brand-logo" viewBox="0 0 36 36" fill="none" aria-hidden="true" focusable="false"><path d="M29 8.5A13 13 0 1 0 29 27.5" stroke="#A2F0BD" strokeWidth="3.2" strokeLinecap="round"/><path d="M10 10.5 18 25.5 26 10.5" stroke="#31D17C" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M22.2 21.3h7.2" stroke="#31D17C" strokeWidth="3.2" strokeLinecap="round"/></svg><span>Cenvara<span className="brand-dot">.</span></span></a>;
}
