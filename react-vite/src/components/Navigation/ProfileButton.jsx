import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaBars, FaCamera, FaUser, FaCog, FaSignOutAlt, FaUserPlus, FaSignInAlt } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";

function ProfileButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();
  const { setModalContent } = useModal();

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

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
    navigate("/");
  };

  const openLoginModal = () => {
    setModalContent(<LoginFormModal />);
    closeMenu();
  };

  const openSignupModal = () => {
    setModalContent(<SignupFormModal />);
    closeMenu();
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
              <a href="/photos" className="dropdown-item">
                <FaCamera className="dropdown-icon" />
                <span>Photos</span>
              </a>
              <a href="/you" className="dropdown-item">
                <FaUser className="dropdown-icon" />
                <span>Your Page</span>
              </a>
              <a href="/settings" className="dropdown-item">
                <FaCog className="dropdown-icon" />
                <span>Settings</span>
              </a>
              <button onClick={logout} className="dropdown-item">
                <FaSignOutAlt className="dropdown-icon" />
                <span>Log Out</span>
              </button>
            </div>
          ) : (
            <>
              <div className="dropdown-grid">
                <button onClick={openSignupModal} className="dropdown-item">
                  <FaUserPlus className="dropdown-icon" />
                  <span>Sign Up</span>
                </button>
                <button onClick={openLoginModal} className="dropdown-item">
                  <FaSignInAlt className="dropdown-icon" />
                  <span>Log In</span>
                </button>
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
