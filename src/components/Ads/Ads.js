import React, { useContext, useEffect, useState } from 'react'
import "./Ads.css"
import { Search, MoreHoriz, Visibility,Favorite} from '@mui/icons-material'
import Popup from 'reactjs-popup'
import { IconButton} from '@mui/material'
import { AuthContext, FirebaseContext } from '../../store/Context'
import { PostContext } from '../../store/PostContext'
import { useNavigate } from 'react-router-dom'


function Ads() {
    const {firebase} = useContext(FirebaseContext);
    const {user} = useContext(AuthContext);
    const [ads, setAds] = useState([]);
    const {postDetails} = useContext(PostContext);
    const navigateTo = useNavigate();

    useEffect(()=> {

         const fetchUserAds= async ()=> {
          if(user && user.uid){
             
             try{
              const snapshot = await firebase.firestore().collection('products').where('userId','==', user.uid).get();

              console.log("fethed ads", snapshot);
                
              const fetchedAds = snapshot.docs.map((doc)=>{
                return {
                  ...doc.data(),
                  id: doc.id,
                }
              });
              console.log(fetchedAds);

                  setAds(fetchedAds);
             }catch (error) {
          console.error('Error fetching user ads:', error);
        }
          }
         }
         fetchUserAds();
    },[user,firebase])

    // const handleRemove= (adId)=> {
        
      
    //     firebase.firestore().collection('products').doc(adId).delete();
    //     console.log("ad deleted");
       
    //      navigateTo(`/myads/${user.uid}`)
      
          
    // }


  return (
    <div className='ads_container'>
      
    <div className='ads_headers'>
      <button>ADS</button>
      <button>FAVOURITES</button>
    </div>

    <div className='search_myads_div'>
      {/* <div className='myads_search'> */}
        <div className='myads_search1'>  
          <Search/>
          <input type="text" placeholder='Search by Ad Title'/>
        </div>
      <p>Filter By:</p>
      <div className='search_view'>
        <button>View all (0)</button>
      </div>
      <div className='search_view_buttons'>
        <button>Active Ads (0)</button>
        <button>Inactive Ads (0)</button>
        <button>Pending Ads (0)</button>
        <button>Moderated Ads (0)</button>
      </div>
    </div>

    <div className='package'>
      <h6>Heavy discount on Business Packages</h6>
      <button>View packages</button>
    </div>
      
    <div className='ad'>

    {
          ads.map((ad)=> (

              <div className='MyAds' key={ad.id} >
                       <div className='ad_date_from'>
            <p1>FROM:</p1>
            <p>{ad.createdAt}</p>
          </div>
          <div className='ad_detail'>

              <div className='ad_details' >
                  <img src={ad.url} alt="adImg" />
                  <div className='ad_desc'>
                    <p>{ad.firstName}</p>
                    <p1>{ad.category}</p1>
                  </div>
                  <p>{ad.price}</p>
                  <button1>POSTED</button1>
                  {/* <button2>REJECTED</button2> */}
                  {/* <p1>Wait 12 days to post fro free or pay to post now</p1> */}
                  {/* <p2>This ad was not published. Edit it and go live.</p2> */}
                  <p2>This ad is published. Edit it if you needed.</p2>
                  <Popup contentStyle={{ width: '15%',
                                    height: '22%',
                                    marginTop: '-1rem'                                
                                  }} 
                      className='my-popup-content' trigger={
                  <IconButton>
                      <MoreHoriz/>
                  </IconButton>} 
                  position="bottom right">
                    <div className='ad_settings'>
                      <p >Edit</p>
                      <p >Remove</p>
                      <div className='download_lead'>
                        <p>Downoad Leads</p>
                      </div>
                    </div>
                  </Popup>
              </div>


              <div className='ad_views'>
                  <div className='visibility'>
                    <IconButton>
                      <Visibility/>
                    </IconButton>
                    <p>Views: -</p>
                  </div>
                  <div className='favorite'>
                    <IconButton>
                      <Favorite/>
                    </IconButton>
                    <p1>Likes: -</p1>
                  </div>
                  <div className='post_now'>
                    {/* <button>Post now</button> */}
                    {/* <div  className='edit_now'>
                      <button >Edit now</button>
                    </div> */}
                  </div>
              </div>
          </div>

                </div>
          ))
       }
         
    </div>
 
  </div>
  )
}

export default Ads

