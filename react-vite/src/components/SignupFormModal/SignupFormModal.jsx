import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  
  // Validation states
  const isUsernameValid = username.length >= 4;
  const isPasswordValid = password.length >= 6;
  const doPasswordsMatch = password === confirmPassword;
  const areAllFieldsFilled = firstName && lastName && email && username && password && confirmPassword;
  const isFormValid = isUsernameValid && isPasswordValid && doPasswordsMatch && areAllFieldsFilled;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form fields
    const validationErrors = {};
    
    if (!isUsernameValid) {
      validationErrors.username = "Username must be at least 4 characters";
    }
    
    if (!isPasswordValid) {
      validationErrors.password = "Password must be at least 6 characters";
    }

    if (!doPasswordsMatch) {
      validationErrors.confirmPassword = "Confirm Password field must be the same as the Password field";
    }
    
    if (Object.keys(validationErrors).length > 0) {
      return setErrors(validationErrors);
    }

    const serverResponse = await dispatch(
      thunkSignup({
        firstName,
        lastName,
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
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            className={errors.firstName ? 'input-error' : ''}
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder="Enter your first name"
          />
          {errors.firstName && <div className="error-message">{errors.firstName}</div>}
        </div>
        
        <div className="signup-form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            className={errors.lastName ? 'input-error' : ''}
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder="Enter your last name"
          />
          {errors.lastName && <div className="error-message">{errors.lastName}</div>}
        </div>
        
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
            placeholder="Choose a username (min. 4 characters)"
          />
          {errors.username && <div className="error-message">{errors.username}</div>}
          {username && !isUsernameValid && !errors.username && (
            <div className="error-message">Username must be at least 4 characters</div>
          )}
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
            placeholder="Create a password (min. 6 characters)"
          />
          {errors.password && <div className="error-message">{errors.password}</div>}
          {password && !isPasswordValid && !errors.password && (
            <div className="error-message">Password must be at least 6 characters</div>
          )}
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
          {password && confirmPassword && !doPasswordsMatch && !errors.confirmPassword && (
            <div className="error-message">Passwords do not match</div>
          )}
        </div>
        
        <div className="signup-form-actions">
          <button 
            className={`signup-submit-button ${!isFormValid ? 'disabled' : ''}`} 
            type="submit"
            disabled={!isFormValid}
          >
            Create Account
          </button>
          {!isFormValid && areAllFieldsFilled && (
            <div className="validation-message">
              {!isUsernameValid && <p>Username must be at least 4 characters</p>}
              {!isPasswordValid && <p>Password must be at least 6 characters</p>}
              {!doPasswordsMatch && <p>Passwords do not match</p>}
            </div>
          )}
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
