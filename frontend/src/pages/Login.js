import React, {  useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handlesuccess } from '../Utilis'; // Ensure handleError is properly imported




function Login() {
    // State for form data
    const [logininfo, setloginup] = useState({
        
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    // Handle input changes and update the state
    const handlechanges = (e) => {
        const { name, value } = e.target;
        setloginup((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission
    const handlelogin = async (e) => {
        e.preventDefault();
        const { email, password } = logininfo;

        // Debugging: Log current form values
        console.log('Current signup state:', logininfo);

        // Check if any field is empty
        if ( !email || !password) {
            handleError('All fields are required');
            return;
        }

        try {
            const url = "http://localhost:4040/auth/login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(logininfo)
            })
            const result = await response.json();
            const { success, message, jwttoken, name,error } = result;
            console.log(success,message,error);
            if (success) {
                handlesuccess(message);
                //setting jwt token
                localStorage.setItem('token',jwttoken);
                localStorage.setItem('loggedInUser', name)


                setTimeout(() => {
                    navigate('/home')
                }, 1000);
            } else if (error) {
                const details = error?.details?.[0]?.message || error.message || 'An unexpected error occurred.';
                handleError(details);
              }
              else if(!success){
                handleError(message);
              }
            } catch (err) {
              // Catch and handle any network or unexpected errors
              handleError(err.message || 'An unexpected error occurred.');
            }
 
            
          
    };

    return (
        <div className="container" style={{ cursor: 'default' }}>
            <h1>Login Page</h1>
            <form onSubmit={handlelogin}>
               <div>
                    <label htmlFor="email">Email</label>
                    <input
                        onChange={handlechanges}
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={logininfo.email}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        onChange={handlechanges}
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={logininfo.password}
                    />
                </div>
                <button type="submit">Signup</button>
                <span>
                    Dont  have an account? <Link to="/signup">Signup</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    );
}



export default Login;
