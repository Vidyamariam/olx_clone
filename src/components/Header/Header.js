import React, {useContext, useEffect, useState} from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';

import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';

import { BiCaretDown } from "react-icons/bi";
import { AuthContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';

import Popup from 'reactjs-popup';
import { Avatar, IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {FirebaseContext} from '../../store/Context';

function  Header() {
   const {user} = useContext(AuthContext) 
 const {firebase} =  useContext(FirebaseContext)
   const navigateTo = useNavigate();
 
  


  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo />
        </div>
        <div className="placeSearch">
          <Search />
          <input type="text" />
          <BiCaretDown />
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car, mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff" />
          </div>
        </div>
        <div className="language">
           <div className='select_langauage' >
              <input value='ENGLISH' type='text' />
              <Popup contentStyle={{
                   width: '15%',
                   height: '18%',
                   background: 'white',
                   border: '1px solid #dedede',
                   borderRadius: '4px'
              }} className='my-popup-content' trigger={ <IconButton>
                <KeyboardArrowDownIcon/>
              </IconButton> } position="bottom center" >
               <div className='lang_settings'>
                    <p>ENGLISH</p>
                    <p>HINDI</p>
               </div>
              </Popup>
           </div>
        </div>
        <div className="loginPage">
          <a className='login'>
            {user ? `Welcome ${user.displayName}` : <span onClick={()=>navigateTo('/login')} className='login'>Login</span>  }
          </a>

           {user? "" : <hr/> }
          {/* <BiCaretDown className='dropdownArrow' onClick={toggleDropdown} />
          {dropdownVisible && (
            <div ref={dropdownRef}>
              <DropdownMenu />
            </div>
          )} */}
        </div>

        {user ? 
        <div className='pop'>
          <Popup contentStyle={{ width: '20%',
                                height:'77%',
                                background: 'White',
                                border: '1px solid #dedede',
                                borderRadius: '4px',  }} 
                                className='my-popup-content' trigger={<IconButton>
                          <KeyboardArrowDownIcon/>
                          </IconButton>} 
                          position="bottom right">
                            <div className='popup-arrow'>
                                
                            </div>
            <div className='profile_popup'>
              <div className='avatar'>
                <Avatar/>
              </div>
              {/* <div className='settings'>
                
              </div> */}
              
              <div className='settings'>
                <p>Hello,</p>
                <h5>{ user ? user.displayName : ""}</h5>
                {/* <a href="" onClick={()=>navigate('/profile')}>View and edit profile</a> */}
                  <span onClick={()=>navigateTo(`/profile/${user.uid}`)}>View and edit profile</span>
              </div>
            </div>
            <div className='popup_others'>
                  {/* <p onClick={()=>navigate('/myads')}>My Ads</p> */}
                  <p onClick={()=>{
                                  navigateTo(`/myads/${user.uid}`)
                                  }}>My Ads</p>
                  <p>Buy Business Packages</p>
                  <p>Bought Packages & Billing</p>
                  <p>Help</p>
                  {/* <p onClick={()=>navigate('/settings')}>Settings</p> */}
                  <p>Settings</p>
                  {/* <p1  onClick={()=>
                        {
                        firebase.auth().signOut()
                        navigate('/')
                        }}>Logout</p1> */}
                        <p onClick={()=> {
                          firebase.auth().signOut()
                          navigateTo('/login')
                        }} >Logout</p>
            </div>
          </Popup>
        </div> : ""}
         

        <div className="sellMenu">
          <SellButton />
          <div className="sellMenuContent" onClick={() => navigateTo('/create')}>
            <SellButtonPlus />
            <span onClick={() => navigateTo('/create')}>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
