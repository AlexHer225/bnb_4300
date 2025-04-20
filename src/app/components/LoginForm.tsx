'use client';
import { FormEvent, useState } from 'react';
import connectMongoDB from "../../../config/mongodb";
import { useRouter } from 'next/navigation';
import '../../css/loginForm.css';
import { doCredentialLogin, doLogout } from '../actions/index';


interface loginInput{
    id: number;
    userName: string;
    password: string;
}

interface loginDetailProps{
    onAddForm: (item: loginInput) => void;
}

export default function LoginForm({ onAddForm }:loginDetailProps) {
    const[formArgs, setFormArgs ] = useState({
        userName: '',
        password: '',
    });

    const router = useRouter();
    async function handleSubmit (event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        try{
            let dbArgs = {
                username: formArgs.userName,
                hashedPassword: formArgs.password,
            };
            const formData = new FormData(event.currentTarget);
            const response = await doCredentialLogin(formData);
    
            if (response?.error) {
                throw new Error('Network response was not ok');
            } else {
                window.location.href = "/dashboard";
            }
        } catch (e: any) {
            console.error(e);
        }
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
         
        setFormArgs(prev => ({
  
          ...prev,
  
          [name]: value,
         }));
      };

      return(
        <div className = "form-border">
            <div className = "form-block">
        <form onSubmit = {handleSubmit} className="form-style">
        <h2>LOGIN</h2>
        <img 
        src="/../images/Hangry-Bear-Transparent.png"
        alt="Hangry Logo"
        width={400}
        height={400}
        />
            <input
                name = "userName"
                type="string"
                value={formArgs.userName}
                onChange={handleChange}
                placeholder="Enter Username"
                required
                className="user"
            />
            <input
                name = "password"
                type="string"
                value={formArgs.password}
                onChange={handleChange}
                placeholder="Enter Password"
                required
                className="user"
            />
            <a href="/signup" className="signup-link">Don't have an account? Sign Up!</a>

            <button type='submit' className='submit-form-button'>
            Login
            </button>

            
        </form>
        </div>
        </div>
    );

}