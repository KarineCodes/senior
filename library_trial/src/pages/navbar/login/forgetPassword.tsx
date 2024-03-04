import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useToken } from './TokenContext';

const PasswordRequestForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);
  const { token, setToken } = useToken();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post<{ success: string; token: string }>(
        'http://localhost:8081/password-request',
        {
          email: email,
        }
      );

      if (response.data.success === 'Password reset email sent. Check your email for the link.') {
        setMessage('Password reset email sent. Check your email for the link.');
        setToken(response.data.token);
        localStorage.setItem('userToken', response.data.token);
        console.log('Token set in handleSubmit:', response.data.token);
        // navigate('/reset-password/' + response.data.token);
      } else {
        setMessage('Error sending password reset email.');
      }
    } catch (error) {
      console.error('Error sending password reset email:', error);
      setMessage('An error occurred.');
    }
  };

  return (
    <div>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PasswordRequestForm;
