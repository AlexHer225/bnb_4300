'use client';
import NewUser from "../components/NewUserForm";
import { auth } from "../../auth";
import Navbar from "../components/Navbar";

export default async function SignUpPage() {
    // const handleAddForm = (item: any) => {
    //     alert('User Signed Up!');
    // }

    const session = await auth();
    
    
    return(
        <>
        <Navbar session={session}/>
        <NewUser />
        </>
    );

}

