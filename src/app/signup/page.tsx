'use client';
import NewUser from "../components/NewUserForm";

export default function SignUpPage() {
    const handleAddForm = (item: any) => {
        alert('User Signed Up!');
    }
    
    return <NewUser onAddForm={handleAddForm} />;

}

