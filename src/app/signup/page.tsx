'use client';
import NewUser from "../components/NewUserForm";
import { auth } from "../../auth";
import Navbar from "../components/Navbar";
import { useSession } from "next-auth/react";

export default function SignUpPage() {
    // const handleAddForm = (item: any) => {
    //     alert('User Signed Up!');
    // }

    const session = useSession();
    
    
    return(
        <>
        {/* <Navbar /> */}
        <NewUser />
        </>
    );

}

