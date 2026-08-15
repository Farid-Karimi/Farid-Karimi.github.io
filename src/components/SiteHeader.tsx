import CrosshairIcon from "./CrosshairIcon";

export default function SiteHeader() {
  return (
    <header className="site-header">
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