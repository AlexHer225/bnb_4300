'use client';
import {useEffect, useState} from 'react';
import Link from 'next/link';
import '../../css/nav.css';
import { doLogout } from '../actions';
import { signOut, useSession, SessionProvider } from 'next-auth/react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const [ name, setName ] = useState<string>('');
    const [showUser, setShowUser] = useState<boolean>(true);
    const { data: session, status } = useSession();
    const isLoggedIn = !!session?.user;

    useEffect(() => {
        const getUser = async () => {
            const response = await fetch(`api/users/${session?.user?.id}`);
            const user = await response.json();
            setName(user.user.name);
        };
        if (session?.user?.id) {
            getUser();
        }
    }, [session]);

    const pathname = usePathname();
    useEffect(() => {
        if (pathname === '/user-info') {
            setShowUser(false);
        } else {
            setShowUser(true);
        }
    }, [pathname]);

    // Wait until session status is not loading
    if (status === "loading") {
        return null; // or a loading spinner
    }    

    const handleLogout = () => {
        doLogout();
        signOut({callbackUrl: "/"});
    }
    // console.log('session: ', session);
    // console.log('user: ', session?.user );

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
                    <>
                        {showUser && 
                            <Link className="namebutton" href="/user-info">
                                {name || 'User'}
                                {/* if no name, User? */}
                            </Link>
                        }   
                        <button onClick={handleLogout} className="logbutton">
                            Logout
                        </button>
                    </>
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