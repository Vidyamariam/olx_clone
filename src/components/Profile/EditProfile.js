import React, {  useContext, useState, useEffect } from 'react'
import "./EditProfile.css"
import { AuthContext, FirebaseContext } from '../../store/Context';
// import { Alert } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function EditProfile() {


    const [name, setName] = useState('')
    const [about, setAbout] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
   const [userDetails, setUserDetails] = useState(null)
   const [openAlert, setOpenAlert] = useState(false);
   const {user} = useContext(AuthContext);
  const {firebase} = useContext(FirebaseContext);
  const naviagteTo = useNavigate();
  
  useEffect(() => {
    if (user) {
      const fetchUserDetails = async () => {
        try {
          console.log("Fetching user details for ID:", user.uid); // Log the ID
  
          // Use where clause to find document by ID
          const userQuerySnapshot = await firebase
            .firestore()
            .collection("users")
            .where("id", "==", user.uid)
            .get();
  
  
          const userData = userQuerySnapshot.docs[0].data(); // Access user data
  
          setUserDetails(userData);
          setName(userData.username || "");
          setAbout(userData.about || "");
          setPhone(userData.phoneNo || "");
          setEmail(user.email); // Email should not be updated here
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };
  
      fetchUserDetails();
    }
  }, [user, firebase]);


  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!user) {
      console.log("User not logged in.");
      return;
    }
  
    try {
      console.log("Updating user details for ID:", user.uid);
  
      // Use where clause to find document by user ID field
      const userQuerySnapshot = await firebase
        .firestore()
        .collection("users")
        .where("id", "==", user.uid) // Replace "id" with your actual field name
        .get();
  
      if (userQuerySnapshot.empty) {
        console.error("User document with ID", user.uid, "not found!");
        // Handle the case where the document doesn't exist
        return;
      }
  
      // Get the document reference from the first result
      const userDoc = userQuerySnapshot.docs[0].ref;
  
      // Update the document with user data
      await userDoc.update({
        username: name,
        about: about,
        phoneNo: phone,
      });
  
      console.log("User details updated successfully");
      toast.success('User details updated successfully!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: "bounce", // Corrected transition name
      });

    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  const clearChanges= ()=> {

    setName('')
    setAbout('')
    setPhone('')
  }


  return (
    <div className='MainProfileDiv'>
       <ToastContainer/>
    <div className='ProfileContentDiv' >
        <div className='editProfileTitle' >
            <p>Edit Profile</p>

            <button className='profileButton' onClick={()=> naviagteTo(`/profile/${user.uid}`)} >View Profile</button>
        </div>
        
        <div className='basic_Info' >
             <h3>Basic Information</h3>
            <input className='userName' value={name} onChange={(e)=> setName(e.target.value)} placeholder={userDetails?.username || 'Username'}/>
            <input className='aboutUser' value={about} onChange={(e)=> setAbout(e.target.value)} placeholder="about" ></input>
        </div>
        <hr/>
        <div className='contact_info' >
            <input   placeholder={userDetails?.phoneNo || 'Phone'} value={phone} onChange={(e)=> setPhone(e.target.value)} />
            <input placeholder={user.email} value={email} onChange={(e)=> setEmail(e.target.value)} readOnly />
        </div>
        <hr/>
        <div className='profileButtons' >
            <button onClick={clearChanges} >Discard</button>
            <button onClick={handleSubmit} >Save changes</button>
            { openAlert  }
        </div>
    </div>
</div>
  )
}

export default EditProfile;
