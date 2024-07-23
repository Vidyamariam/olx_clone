import React, { useContext, useState } from 'react'
import './Profile.css'
import { AuthContext } from '../../store/Context';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
function Profile() {
   const {user} = useContext(AuthContext);
   const naviagteTo = useNavigate();

  return (
 <div className='profileMaidiv' >
     <div className='myProfile_left' >
         <div className='avatar' >
            <Avatar/>
         </div>
          <div className='profiledetails' >
            <h1>{user? user.displayName: "" }</h1>

             <div className='followers' >
                <p>Followers 0</p>
                <p>Following 0</p>

             </div>
          </div>
           <button onClick={()=> naviagteTo(`/edit/${user.uid}`)} >Edit Profile</button>
     </div>
       
       <div className='myProfile_right' >
         <div className='myProfile_adDetails' >
            <p>There are no adds</p>
            <p1>When users post ads, will appear here. If you want to post something you can do it now</p1>
                <br />
           <button onClick={()=> naviagteTo('/create')} >Start selling</button>
         </div>

       </div>


 </div>
  )
}

export default Profile
