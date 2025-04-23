'use client';
import { useState } from 'react';
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
        
            const response = await fetch('/api/users', {
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

            router.push('/signup-landing');
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
        <div className="label">
            <label htmlFor="firstName">First Name </label>
            <input
                name = "firstName"
                type="string"
                value={formArgs.firstName}
                onChange={handleChange}
                placeholder="Enter First Name"
                required
                className="user"
            />
        </div>
        <div className="label">
            <label htmlFor="lastName">Last Name </label>
            <input
                name = "lastName"
                type="string"
                value={formArgs.lastName}
                onChange={handleChange}
                placeholder="Enter Last Name"
                required
                className="user"
            />
        </div>
        <div className="label">
            <label htmlFor="userName">Username </label>
            <input  
                name = "userName"
                type="string"
                value={formArgs.userName}
                onChange={handleChange}
                placeholder="Enter Username"
                required
                className="user"
            />
        </div>
        <div className="label">
            <label htmlFor="password">Password </label>
            <input
                name = "password"
                type="password"
                value={formArgs.password}
                onChange={handleChange}
                placeholder="Enter Password"
                required
                className="user"
            />
        </div>
        <div className="label">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
                name = "confirmPassword"
                type="password"
                value={formArgs.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
                className="user"
            />
        </div>
        <div className="label">
            <label htmlFor="excludeIngredients">Exclude Ingredients </label>
            <input
                name = "excludeIngredients"
                type="string"
                value={formArgs.excludeIngredients}
                onChange={handleChange}
                placeholder="Exclude Ingredients"
                className="user"
            />
        </div>
        <div className="label">
            <label htmlFor="excludeCuisine">Exclude Cuisine </label>
            <input
                name = "excludeCuisine"
                type="string"
                value={formArgs.excludeCuisine}
                onChange={handleChange}
                placeholder="Exclude Cuisine"
                className="user"
            />
        </div>
        <div className="label">
            <label htmlFor="diet">Diet </label>
            <input
                name = "diet"
                type="string"
                value={formArgs.diet}
                onChange={handleChange}
                placeholder="Enter Diets (vegan, vegetarian, etc.)"
                className="user"
            />
        </div>
        <div className="label">
            <label htmlFor="intolerances">Intolerances </label>
            <input
                name = "intolerances"
                type="string"
                value={formArgs.intolerances}
                onChange={handleChange}
                placeholder="Enter Food Intolerances"
                className="user"
            />
        </div>

            <button type='submit' className='submit-form-button'>
            Submit
            </button>

            
        </form>
        </div>
        </div>
    );
}

export default NewUser;