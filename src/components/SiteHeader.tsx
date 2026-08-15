import CrosshairIcon from "./CrosshairIcon";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__content layout-block">
        <a className="a-div animate" href="/">
          <span className="h2-alt letter-d default">D</span>
          <span className="h2-alt letter-f extra">
            <span>F</span>
          </span>
          <span className="h2-alt letter-l extra">
            <span>L</span>
          </span>
          <span className="h2-alt letter-y extra">
            <span>Y</span>
          </span>
        </a>
        <span className="h2-alt letter-f default animate">
          <span>F</span>
        </span>
      </div>
      <div className="site-header__overlay">
        <div className="layout-grid">
          <div className="site-header__overlay--item">
            <CrosshairIcon />
          </div>
          <div className="site-header__overlay--item">
            <CrosshairIcon />
          </div>
        </div>
      </div>
    </header>
  );
}
