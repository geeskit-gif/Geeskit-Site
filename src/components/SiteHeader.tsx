export function SiteHeader() {
  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Primary">
        <a className="nav-link nav-link--active" href="#products">
          Products
        </a>
        <a className="nav-link" href="#about">
          About
        </a>
      </nav>
    </header>
  );
}
