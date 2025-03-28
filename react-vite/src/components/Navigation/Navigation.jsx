import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux"; // Import useSelector and useDispatch
import { useEffect } from "react";
import { thunkAuthenticate } from "../../redux/session";  // Make sure to import your action
import NavNUser from "./NavNUser/NavNUser";
import NavUser from "./NavUser/NavUser"


export default function Navigation() {
  const dispatch = useDispatch();  // To dispatch actions
    const user = useSelector(state => state.session.user);  // Access the user from Redux state
  
    useEffect(() => {
      // Dispatch the authenticate action only once when the component mounts
      dispatch(thunkAuthenticate());
    }, [dispatch]);  // Empty dependency array to ensure it's run only once

  return (
    <div>
      {user ? (
        <NavUser />
      ) : (
        <NavNUser />
      )}
    </div>
  );
}

