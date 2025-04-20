'use client';
import { useState } from 'react';
// import connectMongoDB from "../../../config/mongodb";
import { useRouter } from 'next/navigation';
import '../../css/newUserForm.css';

interface input {
    id: number;
    name: string;
    userName: string;
    password: string;
    confirmPassword: string;
    excludeCusuine: string, 
    diet: string;
    intolerances: string;
    excludeIngredients: string;
}

interface newDetailProps{
    onAddForm: (item: input) => void;
}

const NewUser = () => {
    const[formArgs, setFormArgs ] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        password: '',
        confirmPassword: '',
        excludeCuisine:'',
        diet: '',
        intolerances:'',
        excludeIngredients:'',
    });
    

    const router = useRouter();
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            let dbArgs = {
                name: formArgs.firstName + ' ' + formArgs.lastName,
                username: formArgs.userName,
                password: formArgs.confirmPassword,
                excludeCuisine: formArgs.excludeCuisine,
                diet: formArgs.diet,
                intolerances: formArgs.intolerances,
                excludeIngredients: formArgs.excludeIngredients,
            }
        
            const response = await fetch('/api/user', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(dbArgs),
            });
        
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setFormArgs({
                firstName: '',
                lastName: '',
                userName: '',
                password: '',
                confirmPassword: '',
                excludeCuisine:'',
                diet: '',
                intolerances:'',
                excludeIngredients:'',
            });

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
        <div className = "form-border">
            <div className = "form-block">
        <form onSubmit = {handleSubmit} className="form-style">
        <h2>SIGN UP</h2>
        <img 
        src="/../images/Hangry-Bear-Transparent.png"
        alt="Hangry Logo"
        width={400}
        height={400}
        />
            <input
                name = "firstName"
                type="string"
                value={formArgs.firstName}
                onChange={handleChange}
                placeholder="Enter First Name"
                required
                className="user"
            />
            <input
                name = "lastName"
                type="string"
                value={formArgs.lastName}
                onChange={handleChange}
                placeholder="Enter Last Name"
                required
                className="user"
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
            <input
                name = "confirmPassword"
                type="string"
                value={formArgs.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
                className="user"
            />
            <input
                name = "excludeIngredients"
                type="string"
                value={formArgs.excludeIngredients}
                onChange={handleChange}
                placeholder="Exclude Ingredients"
                required
                className="user"
            />

        <input
                name = "excludeCuisine"
                type="string"
                value={formArgs.excludeCuisine}
                onChange={handleChange}
                placeholder="Exclude Cuisine"
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
                name = "intolerances"
                type="string"
                value={formArgs.intolerances}
                onChange={handleChange}
                placeholder="Enter Food Intolerances"
                className="user"
            />

            <button type='submit' className='submit-form-button'>
            Submit
            </button>

            
        </form>
        </div>
        </div>
    );
}

export default NewUser;