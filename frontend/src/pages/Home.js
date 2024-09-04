import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handlesuccess ,handleError } from '../Utilis';
import { ToastContainer } from 'react-toastify';


const Home = () => {
  const [loggedInUser, setloggedUser] = useState('');
  const [products, setproducts] = useState('');
  const navigate = useNavigate();

  useEffect(() => {

    setloggedUser(localStorage.getItem('loggedInUser'))
  }, [])

  const handleloggedout = (e) => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('token');
    handlesuccess("user logged out succesfully")
    setTimeout(() => {
      navigate('/login')
    }, 1000)

  }

  const fetchproduct = async () => {
    try {

      const headers ={
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      }

      const url = "http://localhost:4040/products";
      const response = await fetch(url, headers);
      const result = await response.json();
      console.log(result);
      setproducts(result);

    }
    catch (error) {
      handleError(error);

    }

  }
  useEffect(() => {
    fetchproduct();
  }, [])

  return (
    <div>
      <h1>{loggedInUser}</h1>
      <button onClick={handleloggedout}> Logged out</button>
      <div>
        {/* Render the list of products */}
        {products.length > 0 ? (
          products.map((item, index) => (
            <ul key={index}>
              <li>
                <span>
                  {item.name} :: {item.price}
                </span>
              </li>
            </ul>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}




export default Home;

