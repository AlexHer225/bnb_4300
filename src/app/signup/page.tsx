'use client';
import NewUser from "../components/NewUserForm";
import Navbar from "../Navbar";

export default function SignUpPage() {
    const handleAddForm = (item: any) => {
        alert('User Signed Up!');
    }
    
    return(
        <>
        <Navbar/>
        <NewUser onAddForm={handleAddForm} />
        </>
    );

}

