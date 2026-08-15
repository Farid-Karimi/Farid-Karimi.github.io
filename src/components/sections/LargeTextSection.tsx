const WORDS = ["Global", "Since", "Day", "1"];

export default function LargeTextSection() {
  return (
    <section className="home-large-text layout-block">
      <div className="home-large-text__content content">
        {WORDS.map((word) => (
          <span key={word} className="display">
            {word}
          </span>
        ))}
      </div>
    </section>
  );
}