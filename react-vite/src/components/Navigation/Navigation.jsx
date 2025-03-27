import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <ul>
      <li>
        <NavLink to="/">Shutr</NavLink>
      </li>

      <li>
        <NavLink to="/features">Features</NavLink>
      </li>

      <li>
        <NavLink to="/shutrpro">ShutrPro</NavLink>
      </li>

      <li>
        <NavLink to="/theapps">The Apps</NavLink>
      </li>

      <li>
        <NavLink to="/community">Community</NavLink>
      </li>

      <li>
        <NavLink to="/company">Company</NavLink>
      </li>

      <li>
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Navigation;
