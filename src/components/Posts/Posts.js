
import React, {useEffect, useContext, useState } from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';
import { PostContext } from '../../store/PostContext';
import { FaRegHeart } from "react-icons/fa6";


function Posts() {
  const {firebase} = useContext(FirebaseContext)
  const [products, setProducts] = useState([])
  const navigateTo = useNavigate();
  const {setPostDetails} = useContext(PostContext)
 

  useEffect(()=> {
     
      firebase.firestore().collection('products').get().then((snapshot)=> {
           const allPost = snapshot.docs.map((product)=> {
                return {
                  ...product.data(),
                  id:product.id
                }
           })
         // console.log(allPost);
          setProducts(allPost);
      })
  },[firebase])

  const sortedProducts = products.sort((a,b)=> {

    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    return dateB - dateA;
  })

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
  {sortedProducts.map((product, index) => (
    <div
      className="card"
      onClick={() => {
        setPostDetails(product);
        navigateTo('/viewpost');
      }}
      key={product.id} // Add a unique key for each product
    > 
    
      <div className="image">
        <img className="cardImg" src={product.url} alt="productImg" onClick={() => navigateTo('/viewpost')} />
        <div className="favorite">
          <FaRegHeart className="heartIcon" />
        </div>
      </div>
      <div className="content">
        {/* <p className='sNo' > {index+1} </p> */}
        <p className="rate">&#x20B9; {product.price}</p>
        <span className="kilometer">{product.category}</span>
        <p className="name"> {product.firstName}</p>
      </div>
      <div className="date">
        <span>{product.createdAt}</span>
      </div>
    </div>
  ))}
</div>

      </div>
      {/* <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
           
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
              <div className="favorite">
          <FaRegHeart className="heartIcon" />
              </div>
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div> */}
    </div>


  );
}

export default Posts;
