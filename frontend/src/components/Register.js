import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    axios.post('/api/register/', { username, password, email })
      .then(response => {
        setSuccess(true);
      })
      .catch(error => {
        setError(error.response.data.error);
      });
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        {error && <p>{error}</p>}
        {success && <p>Registration successful! You can now log in.</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
