type LeadershipCardProps = {
  index: string;
  label: string;
  name: string;
  role: string;
  biography: string;
};

export function LeadershipCard({ index, label, name, role, biography }: LeadershipCardProps) {
  return <article className="essence-card leadership-card reveal"><span>{index} · {label}</span><h3>{name}</h3><p><strong>{role}</strong><br />{biography}</p></article>;
}
