import React, { useState, useContext } from 'react';

import Logo from '../../olx-logo.png';
import './Login.css';
import { FirebaseContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';

function Login() {
     
   const navigateTo = useNavigate();
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const {firebase} = useContext(FirebaseContext);
  const [error, setError] = useState('');
   const [emailError, setEmailError] = useState('');
   const [passwordError, setPasswordError] = useState('');

   const validateFields = ()=> {

   let isValid = true;

    if (!email || email=== '') {
      setEmailError('Email is required');
      isValid = false;
    }
     else{
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        setEmailError('Invalid email format');
      }
      else{
         setEmailError('');
      }

     }
   
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    }else if (password.length < 6 || password === '') {
      setPasswordError('Password must be at least 6 characters long');
    }else{
      setPasswordError('');
    }

    return isValid;

   };

   const handleSubmit= async (e)=> {
    e.preventDefault();

    const isValid = validateFields();
    if(!isValid){
       return;
    }

        try{
         await firebase.auth().signInWithEmailAndPassword(email,password)
       
          // alert("successfully signed in..")
           navigateTo('/');
        }catch(error) {
         setError('Invalid email or password', error.message); 
        }
   }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt='logo' ></img>
        <form onSubmit={handleSubmit} >
        {error && <p className='error' >{error}</p> }
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          {emailError && <p className='error' >{emailError}</p>}
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
           {passwordError && <p className='error' >{passwordError}</p>}
          <br />
          <br />
          <button>Login</button>
        </form>
        <a href='/signup' >Signup</a>
      </div>
    </div>
  );
}

export default Login;
