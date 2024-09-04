import  { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RefrshHandler({ setIsAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the token exists in localStorage
    if (localStorage.getItem('token')) {
      // If token exists, set the authentication state to true
      setIsAuthenticated(true);

      // Redirect to '/home' if the current path is '/login' or '/signup'
      if (
        location.pathname ==='/'||
        location.pathname === '/login' ||
        location.pathname === '/signup'
      ) {
        navigate('/home', { replace: false });
      }
    }
  }, [location, navigate, setIsAuthenticated]);

  return null; // Since this component handles redirection and does not render anything
}

export default RefrshHandler;
