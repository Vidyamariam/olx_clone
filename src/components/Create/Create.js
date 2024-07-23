import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import {FirebaseContext, AuthContext} from '../../store/Context'
import { useNavigate } from 'react-router-dom';
import { HiArrowLongLeft } from "react-icons/hi2";

const Create = () => {
  const {user} = useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)

   const [firstName, setFirstName] = useState('')
   const [category, setCategory] = useState('')
   const [price, setPrice] = useState('')
  const [file, setFile] = useState('')
  const [error, setError] = useState('')
  const [nameError, setNameError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [imageError, setImageError] = useState('');
  const navigateTo = useNavigate();
  const date = new Date()
  

  const validateFields = ()=> {
      let isValid = true;
    if (!firstName) {
      setNameError('Name is required');
      isValid= false;
    }
    else{
         setNameError('');
    }
    if (!category) {
      setCategoryError('Category is required');
      isValid= false;
    }else{
        setCategoryError("");
    }
   
    if (!price) {
      setPriceError('Price is required');
      isValid = false;
    }else{
       setPriceError('')
    }
    if (!file) {
      setImageError('Select atleast one file');
      isValid= false;
    }
    else{
       setImageError('');
    }

    return isValid;

   };



const handleSubmit= (e)=> {
   e.preventDefault();

   if(!user){
    navigateTo('/login');
    return;
   }

   const isValid = validateFields()
   if(!isValid){
    return;
   }
    
  firebase.storage().ref(`/images/${file.name}`).put(file).then(({ref})=> {
     ref.getDownloadURL().then((url)=> {
           console.log(url);
           firebase.firestore().collection('products').add({
              firstName,
              category,
              price,
              url,
              userId:user.uid,
              createdAt: date.toDateString()
           })
           navigateTo('/')
     })
  })
}

  return (
    <Fragment>
      <Header />    
      <card>  
        <div className="centerDiv">
        <HiArrowLongLeft size={48} className='leftarrow' onClick={()=> navigateTo('/')} />
           <h1>POST YOUR AD</h1>
                
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={firstName}
              onChange={(e)=> setFirstName(e.target.value)}
              id="fname"
              name="Name"
              defaultValue="John"
            />
            {nameError && <p className='error' >{nameError}</p> }
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e)=> setCategory(e.target.value)}
              id="fname"
              name="category"
              defaultValue="John"
            />
             {categoryError && <p className='error' >{categoryError}</p> }
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price" value={price} onChange={(e)=> setPrice(e.target.value)} />
            {priceError && <p className='error' >{priceError}</p> }
            <br />
         
          <br />
          <img alt="Posts" width="200px" height="200px" src={file ? URL.createObjectURL(file) : ''}></img>
        
            <br />
            <input type="file" onChange={(e)=> setFile(e.target.files[0])} />
            {imageError && <p className='error' >{imageError}</p> }
            <br />
            
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
         
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
