
import React, { useContext, useState } from 'react';

import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/config'; 

export default function Signup() {
   const navigateTo = useNavigate()
   const [username, setUsername] = useState('')
   const [email, setEmail] = useState('')
   const [phoneNo, setPhoneNo] = useState('')
   const [password, setPassword] = useState('')
   const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneNoError, setPhoneNoError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [firebaseError, setFirebaseError] = useState('');
   const {firebase} = useContext(FirebaseContext)

   const validateFields = () => {
    let isValid = true;

    if (!username) {
      setUsernameError('Username is required');
      isValid = false;
    } else {
      setUsernameError('');
    }

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        setEmailError('Invalid email format');
        isValid = false;
      } else {
        setEmailError('');
      }
    }

    if (!phoneNo) {
      setPhoneNoError('Phone number is required');
      isValid = false;
    } else if (phoneNo.length < 10) {
      setPhoneNoError('Phone number should have at least 10 digits');
      isValid = false;
    } else {
      setPhoneNoError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

   const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateFields();
    if (!isValid) {
      return;
    }
    

    try {
      const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
      await result.user.updateProfile({ displayName: username });

      await firebase.firestore().collection('users').add({
        id: result.user.uid,
        username: username,
        phoneNo: phoneNo,
      });

      navigateTo('/login');
    } catch (error) {
      console.error('Error signing up:', error.message);
      setFirebaseError(error.message);
    }
  };


  return (
    <div>
      <div className="signupParentDiv">
        <img width="250px" height="200px" src={Logo} alt='olxLogo' ></img>
        <form onSubmit={handleSubmit} >
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=> setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />

          {usernameError && <p className='error' >{usernameError}</p>}
          <br />
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
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phoneNo}
            onChange={(e)=> setPhoneNo(e.target.value)}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
            {phoneNoError && <p className='error' >{phoneNoError}</p>}
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
          <button>Signup</button>
        </form>
        {firebaseError && <p className='error' >{firebaseError}</p>}
        <a href='/login' >Login</a>
      </div>
    </div>
  );
}
