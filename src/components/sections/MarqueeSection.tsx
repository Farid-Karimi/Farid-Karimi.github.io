import { marquee } from "@/data/content";

export default function MarqueeSection() {
  const items = [...marquee, ...marquee, ...marquee, ...marquee];
  return (
    <section id="skills" className="home-marquee layout-block">
      <div className="home-marquee__track" aria-hidden="false">
        <div className="home-marquee__group">
          {items.map((item, i) => (
            <span key={`${item}-${i}`} className="display">
              {item}
              <span className="home-marquee__sep">*</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}