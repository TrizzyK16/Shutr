import { useSelector, useDispatch } from "react-redux"; // Import useSelector and useDispatch
import { useEffect } from "react";
import { thunkAuthenticate } from "../../redux/session";  // Make sure to import your action
import LPNUser from "./LPNUser/LPNUser";
import LPUser from "./LPUser/LPUser";

import "./LandingPage.css";

export default function LandingPage() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(thunkAuthenticate());
  }, [dispatch]); 

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
