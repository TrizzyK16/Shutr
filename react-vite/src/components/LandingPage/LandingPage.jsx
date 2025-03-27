import { useSelector, useDispatch } from "react-redux"; // Import useSelector and useDispatch
import { useEffect } from "react";
import { thunkAuthenticate } from "../../redux/session";  // Make sure to import your action

import "./LandingPage.css";

export default function LandingPage() {
  const dispatch = useDispatch();  // To dispatch actions
  const user = useSelector(state => state.session.user);  // Access the user from Redux state

  useEffect(() => {
    // Dispatch the authenticate action only once when the component mounts
    dispatch(thunkAuthenticate());
  }, [dispatch]);  // Empty dependency array to ensure it's run only once

  return (
    <div>
      {user ? (
        // Displayed if the user is logged in
        <h1>Welcome, {user.username}!</h1>
      ) : (
        // Displayed if the user is not logged in
        <h1>Stinky! Please log in.</h1>
      )}
    </div>
  );
}
