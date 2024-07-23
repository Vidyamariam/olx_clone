import React,{useState,useEffect,useContext} from 'react';

import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Context';
function View() {

    const [userDetails, setUserDetails] = useState([]);
    const {postDetails} = useContext(PostContext);
    const {firebase} = useContext(FirebaseContext);

    useEffect(()=> {
           const {userId} = postDetails
        firebase.firestore().collection('users').where('id','==',userId).get().then((res)=> {
                res.forEach(doc => {
                    setUserDetails(doc.data())
                });
        })
    },[])

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt="card"
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.firstName}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phoneNo}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
