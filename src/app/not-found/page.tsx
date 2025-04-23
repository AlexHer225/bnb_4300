'use client';
import { useSession } from "next-auth/react";
import '../../css/notfound.css';

export default function notFound()  {
    return(
        
        <div className="text">
            <br></br>
            <br></br>
        <h2>404 Page Not Found</h2>
        </div>
    )

}