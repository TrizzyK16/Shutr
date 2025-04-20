import { useState } from "react";
import { useNavigate} from "react-router-dom";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { loginDemoUser } from "../../redux/session";
import SignupFormModal from "../SignupFormModal/SignupFormModal.jsx"

function LoginFormModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal, setModalContent } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    
    try {
      // Show loading state or disable button here if needed
      
      const serverResponse = await dispatch(
        thunkLogin({
          email,
          password,
        })
      );

      if (serverResponse) {
        // Handle specific error types
        if (serverResponse.server && serverResponse.server.includes('Network error')) {
          setErrors({ 
            server: 'Unable to connect to the server. Please check your internet connection and try again.'
          });
        } else {
          setErrors(serverResponse);
        }
      } else {
        // Successful login
        closeModal();
        navigate('/');
        window.location.reload(); // Force a reload to ensure state is fresh
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ 
        server: 'An unexpected error occurred during login. Please try again.'
      });
    }
  };

  return (
    <div className="login-form-container">
      <div className="login-header">
        <h1>Welcome back to Shutr</h1>
        <p>Sign in to access your photos, groups, and more</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        {errors.server && (
          <div className="server-error">
            <p>{errors.server}</p>
            {errors.server.includes('server is currently experiencing issues') && (
              <p className="error-suggestion">
                You can try refreshing the page or coming back later when the server issues are resolved.
              </p>
            )}
          </div>
        )}
        <div className="login-form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className={errors.email ? 'input-error' : ''}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email address"
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        
        <div className="login-form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className={errors.password ? 'input-error' : ''}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>
        
        <div className="login-form-actions">
          <button className="login-submit-button" type="submit">Sign In</button>
        </div>
        
        <div className="login-form-footer">
          <p>Don&apos;t have an account? <button type="button" className="text-button" onClick={() => {
            // Open signup modal
            closeModal();
            setModalContent(<SignupFormModal />);
          }}>Sign up</button></p>
          <p>Don&apos;t want an account? Sign in with our demo user!<button type="button" className="text-button" onClick={async () => {
            try {
              setErrors({});
              const errors = await dispatch(loginDemoUser());
              if (errors) {
                setErrors(errors);
              } else {
                closeModal();
                navigate('/');
                window.location.reload(); // Force a reload to ensure state is fresh
              }
            } catch (error) {
              console.error('Demo login error:', error);
              setErrors({ 
                server: 'An error occurred with demo login. Please try again.'
              });
            }
          }}>Demo Sign In</button></p>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
