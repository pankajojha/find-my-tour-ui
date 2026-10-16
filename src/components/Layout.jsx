import { Link, NavLink, Outlet } from 'react-router-dom';
import Logo from './Logo';

export default function Layout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-inner">
          <Link to="/" className="brand">
            <Logo size={36} />
            <span>
              FindMyTour<span className="brand-accent">.AI</span>
            </span>
          </Link>

          <nav className="main-nav">
            <NavLink to="/" end>
              Home
            </NavLink>
            <NavLink to="/tours">Tours</NavLink>
            <NavLink to="/ai">AI Planner</NavLink>
            <NavLink to="/bookings">Bookings</NavLink>
          </nav>
        </div>
      </header>

      <main className="app-main">
        <Outlet />
      </main>

      <footer className="app-footer">
        <p>© {new Date().getFullYear()} FindMyTour.AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
