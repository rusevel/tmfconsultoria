import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return <button type="button" className={`back-to-top ${visible ? "is-visible" : ""}`} onClick={goTop} aria-label="Voltar ao topo" aria-hidden={!visible} tabIndex={visible ? 0 : -1}><ArrowUp size={17} aria-hidden="true" /><span>Topo</span></button>;
}
