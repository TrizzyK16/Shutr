import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import LPNUser from "./LPNUser/LPNUser";
import LPUser from "./LPUser/LPUser";

import "./LandingPage.css";

export default function LandingPage() {
  const user = useSelector(state => state.session.user);
  const [isNewUser, setIsNewUser] = useState(true);
  
  // Check if the user is new or returning
  useEffect(() => {
    if (user) {
      // We can use localStorage to track if a user has visited before
      const visitedBefore = localStorage.getItem(`shutr_user_${user.id}_visited`);
      
      if (!visitedBefore) {
        // First visit - mark as visited and show the new user landing page
        localStorage.setItem(`shutr_user_${user.id}_visited`, 'true');
        setIsNewUser(true);
      } else {
        // Returning user - they've been here before
        setIsNewUser(false);
      }
    }
  }, [user]);

  // If not logged in, show the non-user landing page
  if (!user) {
    return <LPNUser />;
  }
  
  // If returning user, redirect to dashboard
  if (user && !isNewUser) {
    return <Navigate to="/you" replace />;
  }
  
  // If new user, show the user-friendly landing page
  return <LPUser />;
}
