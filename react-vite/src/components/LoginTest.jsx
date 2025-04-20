import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginDemoUser } from '../redux/session';

function LoginTest() {
  const dispatch = useDispatch();

  useEffect(() => {
    const login = async () => {
      try {
        console.log('Attempting to log in as demo user...');
        const result = await dispatch(loginDemoUser());
        console.log('Login result:', result);
      } catch (error) {
        console.error('Login error:', error);
      }
    };

    login();
  }, [dispatch]);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Login Test</h1>
      <p>Attempting to log in as demo user automatically...</p>
      <p>Check the browser console for results.</p>
      
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
        <h2>Troubleshooting Steps:</h2>
        <ol>
          <li>Make sure the backend server is running on port 8000</li>
          <li>Check that CSRF tokens are being properly set in cookies</li>
          <li>Verify that the demo user exists in your database</li>
          <li>Check browser console for any errors</li>
        </ol>
      </div>
    </div>
  );
}

export default LoginTest;
