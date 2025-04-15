'use client';
import {useState} from 'react';
import Link from 'next/link';
import './nav.css'
 

const Navbar = () =>{
    const [isLoggedIn,setIsLoggedIn ] = useState(false);

  const userAuth = () => {
    setIsLoggedIn(prev => !prev);

  }

  const handleSignup = () =>{
    //userAuth();
    window.location.href = "/signup";

  }

  const handleLogin = () =>{
   // userAuth();
    window.location.href = "/login";
  }

  const handleDashboard = () => {
    window.location.href = "/dashboard";
  }
    
    
    return(
        <nav className = "topbar">
            <div className='text'>
            <h1
                onClick={handleDashboard}
                >Hangry
            </h1>
            
            </div>
            {
                !isLoggedIn &&(
            <div className = "content">
                
                <button onClick ={handleSignup}className ="signbutton">Sign Up</button>
                <button onClick = {handleLogin} className ="logbutton">
                    Login
                </button>
            </div>
                )
                
}
{
        isLoggedIn &&(
            <div className = "content">
                
                
                <button onClick = {userAuth} className ="logbutton">
                    Logout
                </button>
            </div>
                )
            }
        </nav>
       

    )
}
export default Navbar;