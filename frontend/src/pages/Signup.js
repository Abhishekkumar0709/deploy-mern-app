import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handlesuccess } from '../Utilis'; // Ensure handleError is properly imported




function Signup() {
    // State for form data
    const [signup, setSignup] = useState({
        name: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    // Handle input changes and update the state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignup((prevSignup) => ({
            ...prevSignup,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = signup;

        // Debugging: Log current form values
        console.log('Current signup state:', signup);

        // Check if any field is empty
        if (!name || !email || !password) {
            handleError('All fields are required');
            return;
        }

        try {
            const url = "https://deploy-mern-app-api1.vercel.app/auth/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(signup)
            })
            const result = await response.json();
            const { success, message, error } = result;
            console.log(success,message,error);
            if (success) {
                handlesuccess(message);
                setTimeout(() => {
                    navigate('/login')
                }, 1000);
            } else if (error) {
                const details = error?.details?.[0]?.message;
                handleError(details);
              }

            console.log(result);
        } catch (error) {
            handleError(error);

        }
    };

    return (
        <div className="container" style={{ cursor: 'default' }}>
            <h1>Signup Page</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="name"
                        autoFocus
                        placeholder="Enter your name"
                        value={signup.name}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        onChange={handleChange}
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={signup.email}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        onChange={handleChange}
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={signup.password}
                    />
                </div>
                <button type="submit">Signup</button>
                <span>
                    Already have an account? <Link to="/login">Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
}

export default Signup;
