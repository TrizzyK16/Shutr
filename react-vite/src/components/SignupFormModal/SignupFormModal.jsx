import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className="signup-form-container">
      <div className="signup-header">
        <h1>Join the Shutr community</h1>
        <p>Share your photos with millions of photographers worldwide</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        {errors.server && <div className="error-message server-error">{errors.server}</div>}
        
        <div className="signup-form-group">
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
        
        <div className="signup-form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            className={errors.username ? 'input-error' : ''}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Choose a username"
          />
          {errors.username && <div className="error-message">{errors.username}</div>}
        </div>
        
        <div className="signup-form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className={errors.password ? 'input-error' : ''}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Create a password"
          />
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>
        
        <div className="signup-form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            className={errors.confirmPassword ? 'input-error' : ''}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
        </div>
        
        <div className="signup-form-actions">
          <button className="signup-submit-button" type="submit">Create Account</button>
        </div>
        
        <div className="signup-form-footer">
          <p>Already have an account? <button type="button" className="text-button" onClick={() => {
            closeModal();
            // Open login modal - this would need to be implemented
          }}>Sign in</button></p>
        </div>
      </form>
    </div>
  );
}

export default SignupFormModal;
