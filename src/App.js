

import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import { useEffect,useContext } from 'react';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Create from './Pages/Create';
import {AuthContext, FirebaseContext} from './store/Context'
import ViewPost from './Pages/ViewPost';
import Post from './store/PostContext';
import Profile from './Pages/Profile';
import EditProfile from './Pages/ProfileEdit';
import MyAds from './Pages/Ads';

function App() {
  const {user,setUser} = useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)

  useEffect(()=> {   
    firebase.auth().onAuthStateChanged((user)=> {  
         setUser(user)
    })
  })

  return (
    <div> 
      <Post>
       <Router>
         <Routes>
         <Route path='/' element={<Home/>} />
        <Route path='/signup' element={<Signup/>} /> 
        <Route path='/login' element={<Login/>} /> 
        <Route path='/create' element={<Create/>} /> 
        <Route path='/viewpost' element={<ViewPost/>} /> 
        <Route path='/profile/:userId' element={<Profile/>} /> 
        <Route path='/edit/:userId' element={<EditProfile/>} /> 
        <Route path='/myads/:userId' element={<MyAds/>} /> 
         </Routes>
     </Router>  
     </Post>  
       
    </div>
  );
}

export default App;
