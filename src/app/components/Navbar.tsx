'use client';
import {useEffect, useState} from 'react';
import Link from 'next/link';
import '../../css/nav.css';
import { Session } from 'next-auth';
import { doLogout } from '../actions';
import { useSession, SessionProvider } from 'next-auth/react';
 
interface NavbarProps {
    session: Session | null;
}

const Navbar = ({session}: NavbarProps) => {
    const [ isLoggedIn, setIsLoggedIn ] = useState(!!session?.user);

    useEffect(() => {
        setIsLoggedIn(!!session?.user);
    }, [session]);

    const handleLogout = () => {
        doLogout();
        setIsLoggedIn(!!session?.user);
        window.location.href = '/';
    }

    return (
        <nav className="topbar">
            <div className="text">
                <h1>
                    <Link className="homebutton" href="/">Hangry</Link>
                </h1>
            </div>
    
            {/* Right Side Menu */}
            <div className="content">
            <Link className="signbutton" href="/signup">Sign Up</Link>
            {isLoggedIn && session?.user ? (
                    <button onClick={handleLogout} className="logbutton">
                    Logout
                    </button>
            ) : (
                    <Link className="logbutton" href="/login">Login</Link>
            )}
            </div>
        </nav>
    );
    
}
export default Navbar;