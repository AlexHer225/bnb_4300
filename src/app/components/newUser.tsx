'use client';
import { useState } from 'react';
import connectMongoDB from "../../../config/mongodb";
import { useRouter } from 'next/navigation';
import './formstyles.css'

interface input {
    id: number;
    userName: string;
    password: string;
    excludeCusuine: string, 
    diet: string;
    intolerances: string;
    excludeIngredients: string;
    
}

interface newDetailProps{
    onAddForm: (item: input) => void;
}

export default function newUser({ onAddForm }:newDetailProps){
    const[formArgs, setFormArgs ] = useState({
        userName: '',
        password: '',
        excludeCuisine:'',
        diet: '',
        intolerances:'',
        excludeIngredients:'',
    });

    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent)=>{
        e.preventDefault();
        try{
        const response = await fetch('/api/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formArgs),
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
        setFormArgs({
        userName: '',
        password: '',
        excludeCuisine:'',
        diet: '',
        intolerances:'',
        excludeIngredients:'',});

        router.push('../../src/app/page')
        }
        catch(error){
            console.error('Error creating item');

        }

    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
         
        setFormArgs(prev => ({
  
          ...prev,
  
          [name]: name=== 'owner' ? Number(value) : value,
         }));
      };
    return(
        <div className = "form-border">
            <div className = "form-block">
        <form onSubmit = {handleSubmit} className="form-style">
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
                name = "Exclude Ingredients"
                type="string"
                value={formArgs.excludeIngredients}
                onChange={handleChange}
                placeholder="Exclude Ingredients"
                required
                className="user"
            />

        <input
                name = "Exclude Cuisine"
                type="string"
                value={formArgs.excludeCuisine}
                onChange={handleChange}
                placeholder="Exclude Cuisine"
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
            <input
                name = "diet"
                type="string"
                value={formArgs.diet}
                onChange={handleChange}
                placeholder="Enter Dietary Specifics"
                required
                className="user"
            />
            <input
                name = "Intolerances"
                type="string"
                value={formArgs.intolerances}
                onChange={handleChange}
                placeholder="Enter Food Intolerances"
                className="user"
            />

            
        </form>
        </div>
        </div>
    );
}