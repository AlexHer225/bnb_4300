'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
        excludeCusuine:'',
        diet: '',
        intolerances:'',
        excludeIngredients:'',
    });

    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent)=>{
        e.preventDefault();
        try{
        const response = await fetch('/api/users', {
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
        excludeCusuine:'',
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
  
          [name]: value,
         }));
      };
    return(
   
        <div className = "form-style">
        <form onSubmit = {handleSubmit} className="space-y-4  p-4 rounded">
            <input
                name = "userName"
                type="string"
                value={formArgs.userName}
                onChange={handleChange}
                placeholder="Enter Username"
                required
                className="w-full p-2 border rounded"
            />
            <input
                name = "Exclude Ingredients"
                type="string"
                value={formArgs.excludeIngredients}
                onChange={handleChange}
                placeholder="Enter Email"
                required
                className="w-full p-2 border rounded"
            />

        <input
                name = "Exclude Cusuine"
                type="string"
                value={formArgs.excludeCusuine}
                onChange={handleChange}
                placeholder="Enter Email"
                required
                className="w-full p-2 border rounded"
            />
            <input
                name = "password"
                type="string"
                value={formArgs.password}
                onChange={handleChange}
                placeholder="Enter Password"
                required
                className="w-full p-2 border rounded"
            />
            <input
                name = "diet"
                type="string"
                value={formArgs.diet}
                onChange={handleChange}
                placeholder="Diet Specifics"
                required
                className="w-full p-2 border rounded"
            />
            <input
                name = "Intolerances"
                type="string"
                value={formArgs.intolerances}
                onChange={handleChange}
                placeholder="Enter Food Intolerances"
                required
                className="w-full p-2 border rounded"
            />

            
        </form>
        </div>
    );
}