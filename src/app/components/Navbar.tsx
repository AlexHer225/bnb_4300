'use client';
import {useEffect, useState} from 'react';
import Link from 'next/link';
import '../../css/nav.css';
import { Session } from 'next-auth';
import { doLogout } from '../actions';
import { signOut, useSession, SessionProvider } from 'next-auth/react';
 
interface NavbarProps {
    session: Session | null;
}

const Navbar = () => {
    const { data: session, status } = useSession();
    const isLoggedIn = !!session?.user;

    // Wait until session status is not loading
    if (status === "loading") {
        return null; // or a loading spinner
    }    

    const handleLogout = () => {
        doLogout();
        signOut({callbackUrl: "/"});
        // window.location.href = "/";
    }
    console.log('session: ', session);

    return (
        <nav className="topbar">
            <div className="text">
                <h1>
                    <Link className="homebutton" href="/">Hangry</Link>
                </h1>
            </div>
    
            {/* Right Side Menu */}
            <div className="content">
            {isLoggedIn ? (
                    <button onClick={handleLogout} className="logbutton">
                    Logout
                    </button>
            ) : (
                <>
                <Link className="signbutton" href="/signup">Sign Up</Link>
                <Link className="logbutton" href="/login">Login</Link>
                </>
            )}
            </div>
        </nav>
    );
    
}
export default Navbar;