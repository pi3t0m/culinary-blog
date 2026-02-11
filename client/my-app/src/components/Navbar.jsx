import { NavLink } from "react-router-dom";
import "@/styles/Page.css";


const navClass = ({ isActive }) => `nav__link${isActive ? " nav__link--active" : ""}`;

export default function Navbar() {
  return (
    <header className="nav">
      <div className="nav__container">
        <NavLink to="/" className="nav__brand">
          Culinary Blog
        </NavLink>

        <nav className="nav__links">
          <NavLink to="/" end className={navClass}>
            Home
          </NavLink>
          <NavLink to="/recipes/new" className={navClass}>
            Dodaj przepis
            </NavLink>
          <NavLink to="/recipes" className={navClass}>
            Przepisy
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
