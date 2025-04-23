'use client';
import NewUser from "../components/NewUserForm";
import { useSession } from "next-auth/react";

export default function SignUpPage() {

    const session = useSession();
    
    return(
        <>
        {/* <Navbar /> */}
        <NewUser />
        </>
    );

}

