import { useSelector } from "react-redux"; // Only need useSelector now
import LPNUser from "./LPNUser/LPNUser";
import LPUser from "./LPUser/LPUser";

import "./LandingPage.css";

export default function LandingPage() {
  const user = useSelector(state => state.session.user);

  return (
    <div>
      {user ? (
        <LPUser />
      ) : (
        <LPNUser />
      )}
    </div>
  );
}
