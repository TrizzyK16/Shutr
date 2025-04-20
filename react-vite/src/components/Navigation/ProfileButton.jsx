import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaBars, FaUser, FaSignOutAlt, FaUserPlus, FaSignInAlt } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useNavigate } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";

function ProfileButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();
  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = async (e) => {
    e.preventDefault();
    try {
      const response = dispatch(thunkLogout());

      if (!response?.errro) {
        closeMenu();
        navigate("/");
      } else {
        console.error("Logout error:", response.error);
      }
    } catch (err) {
      console.error("Unexpected logout error:", err);
    }
  };



  return (
    <div className="profile-button-wrapper">
      <button onClick={toggleMenu} className="profile-icon-button">
        <FaBars />
      </button>
      
      {showMenu && (
        <div className="profile-dropdown" ref={ulRef}>
          {user ? (
            <div className="dropdown-grid">
              <a href="/you" className="dropdown-item">
                <FaUser className="dropdown-icon" />
                <span>Your Page</span>
              </a>
              <button onClick={logout} className="dropdown-item">
                <FaSignOutAlt className="dropdown-icon" />
                <span>Log Out</span>
              </button>
            </div>
          ) : (
            <>
              <div className="dropdown-grid">
                <OpenModalButton
                  buttonText="Sign Up"
                  modalComponent={<SignupFormModal />}
                  className="dropdown-item"
                  icon={<FaUserPlus className="dropdown-icon" />}
                  onButtonClick={closeMenu}
                />
                <OpenModalButton
                  buttonText="Log In"
                  modalComponent={<LoginFormModal />}
                  className="dropdown-item"
                  icon={<FaSignInAlt className="dropdown-icon" />}
                  onButtonClick={closeMenu}
                />
              </div>
              <div className="dropdown-divider"></div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
