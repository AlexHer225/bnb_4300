'use client';
import { useSession } from "next-auth/react";
import "../css/splash.css";

export default function Home() {
  const { data: session, status } = useSession();
  const isLoggedIn = !!session?.user;

  return (
    <div className="splash-container">
     <div className="top-div-splash">
      <h1>ARE YOU</h1>
      <>
      <img 
        src="/images/Hangry-Bear-Transparent.png"
        alt="Hangry Logo"
        width={400}
        height={400}
        />
      </>
      {!isLoggedIn && 
        <div className="splash-buttons-flex"> 
          <button
          className="splash-button-signup"
          onClick={() => {
            window.location.href = "/signup"
          }}
          >SIGN UP</button>
          <button 
            className="splash-button-login"
            onClick={() => {
              window.location.href = "/login";
            }}
          >LOGIN</button>
        </div> }
     </div>
      <div className="middle-div-splash">
        <h1>Use Hangry Yourself</h1>
        <button
          onClick={() => {
            {isLoggedIn ? window.location.href = "/my-dashboard" : window.location.href = "/dashboard";}
          }}
        >{isLoggedIn ? "Go to Dashboard" : "Try it now" }</button>
      </div>

      <div className="bottom-div-splash">
        <h1>About Us</h1>
        <p>Hangry takes the hassle out of deciding what to eat. 
          College students have enough to deal with between classes, a social
          life, a job, going to the gym, and enjoying the night life.
          Managing a budget, having personal perferences, dietary restrictions, time and location
          restrictions, health goals, and ingredient availability add to the complexity of this problem
          as well. Hangry is designed to allow a person to create a personailzed meal schedule based on what
          they need from their food. Our team commonly felt the stress of these issues and found themsleves
          eating the same handful of meals repeatedly. They strove to bring back the art of cooking and enjoyment
          of eating. Instead of being Hangry about it, do something about it and make a plan today.
        </p>
        <h2>What Will You Create?</h2>
      </div>
    </div>
    
  );
}
