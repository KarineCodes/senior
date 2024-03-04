import axios from 'axios';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPasswordForm: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');
  // Explicitly extract token from URL
  // const { token } = useParams<{ token: string }>();
  console.log('Token from URL:', token);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("password:" ,password);
    try {
      const response = await axios.post<string>('http://localhost:8081/reset-password', 
      {
        password: password,
      },
      {
        headers: {
          'Authorization': `${token}`, // Include the token in the headers
        },
      }
      );

      console.log('Server Response:', response);

      if (response.data === 'Success') {
        setMessage('Password reset successful');
        alert('Password changed successfully');
        navigate('/login');
      } else {
        setMessage(response.data);
        alert('Rejected password change');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage('An error occurred while resetting the password. Please check the console for details.');
    }
  };

  return (
    <div>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
