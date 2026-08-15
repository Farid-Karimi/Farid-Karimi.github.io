import { stats } from "@/data/content";

export default function StatsSection() {
  return (
    <div className="home-stats layout-grid">
      {stats.map((stat) => (
        <div key={stat.label} className="home-stats__item">
          <div className="display">{stat.value}</div>
          <div className="label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}