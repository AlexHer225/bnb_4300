'use client';
import NewUser from "../components/NewUserForm";
import Navbar from "../components/Navbar";

export default function SignUpPage() {
    // const handleAddForm = (item: any) => {
    //     alert('User Signed Up!');
    // }
    
    return(
        <>
        <Navbar/>
        <NewUser />
        </>
    );

}

