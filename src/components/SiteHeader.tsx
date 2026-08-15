import CrosshairIcon from "./CrosshairIcon";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__content layout-block">
        <a className="a-div animate" href="/">
          <span className="h2-alt letter-f default">F</span>
          <span className="h2-alt letter-k extra">
            <span>K</span>
          </span>
        </a>
        <span className="h2-alt letter-k default animate">
          <span>K</span>
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
