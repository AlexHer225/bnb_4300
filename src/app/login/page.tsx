'use client';
import LoginForm from "../components/LoginForm";
import Navbar from "../components/Navbar";

export default function Login(){
    const handleAddForm = (item: any) => {
        alert('User Logged In!');
    }
        
    return(
    
        <>
            {/* <Navbar /> */}
            <LoginForm onAddForm={handleAddForm} />
        </>

    );
}

