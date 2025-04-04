import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
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
    <div className="login-form-container">
      <div className="login-header">
        <h1>Welcome back to Shutr</h1>
        <p>Sign in to access your photos, groups, and more</p>
      </div>
      
      <form onSubmit={handleSubmit}>
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
            closeModal();
            // Open signup modal - this would need to be implemented
          }}>Sign up</button></p>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
