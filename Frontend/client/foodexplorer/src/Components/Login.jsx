import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { hash } from 'hash-it'; // Import a hashing library

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://foodexplorer-iqox.onrender.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            if (response.ok) {
                const responseData = await response.json();
                const { token } = responseData
                console.log(responseData)
                document.cookie = `token=${token}; path=/;`;
                navigate('/');
            } else {
                const errorData = await response.json();
                navigate('/')
                alert(errorData.error);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Something went wrong. Please try again later.');
        }
    };
    

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" value={username} onChange={handleUsernameChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={handlePasswordChange} required />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;
