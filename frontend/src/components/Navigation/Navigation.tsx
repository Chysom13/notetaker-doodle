import { NavLink } from 'react-router-dom';
import { Home, List } from 'lucide-react';
import './Navigation.css';

export const Navigation = () => {
  return (
    <nav className="main-nav">
      <div className="nav-container">
        <div className="nav-brand">Notetaker</div>
        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} end>
            <Home size={18} />
            <span>Home</span>
          </NavLink>
          <NavLink to="/notes" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            <List size={18} />
            <span>View Notes</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
