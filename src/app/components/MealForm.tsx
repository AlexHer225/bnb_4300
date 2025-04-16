'use client';
import { useState } from 'react';
import '../../css/newUserForm.css';

interface input  {
    title: string;
    image: string;
    readyInMinutes: number;
    sourceUrl: string;
    cheap: boolean;
    diets: string;
    summary: string;
}

interface newDetailProps{
    onAddForm: (item: { title: string, image: string }) => void;
}

export default function NewUser({ onAddForm }:newDetailProps){
    const[formArgs, setFormArgs ] = useState({
        title: '',
        image: '',
        readyInMinutes: 0,
        sourceUrl:'',
        cheap: false,
        diets:'',
        summary:'',
    });

    const handleSubmitTemp = (e: React.FormEvent) => {
        e.preventDefault();

        onAddForm({ title: formArgs.title, image: formArgs.image });
        setFormArgs({
            title: '',
            image: '',
            readyInMinutes: 0,
            sourceUrl:'',
            cheap: false,
            diets:'',
            summary:'',});
    };
    

 /*   const handleSubmit = async (e: React.FormEvent)=>{
        e.preventDefault();
        try{
        const response = await fetch('/api/meals', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formArgs),
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          onAddForm({ name: formArgs.title });
          setFormArgs({
            title: '',
            image: '',
            readyInMinutes: 0,
            sourceUrl:'',
            cheap: false,
            diets:'',
            summary:'',});

        //router.push('../../src/app/page')
        }
        catch(error){
            console.error('Error creating meal');

        }

    } */

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
         
        setFormArgs(prev => ({
  
          ...prev,
  
          [name]: type === 'checkbox' ? checked : value,
         }));
      };
    return(
    <div className = "meal-form-container">
        <form onSubmit = {handleSubmitTemp} className="form-style">
        <h2>Create Meal</h2>
        <img 
        src="/../images/Hangry-Bear-Transparent.png"
        alt="Hangry Logo"
        width={400}
        height={400}
        />
            <input
                name = "title"
                type="string"
                value={formArgs.title}
                onChange={handleChange}
                placeholder="Enter Meal"
                required
                className="user"
            />
            <input
                name = "image"
                type="string"
                value={formArgs.image}
                onChange={handleChange}
                placeholder="Enter Image Url"
                required
                className="user"
            />
            <input
                name = "readyInMinutes"
                type="number"
                value={formArgs.readyInMinutes}
                onChange={handleChange}
                placeholder="Enter Cook Time (Minutes)"
                required
                className="user"
            />
            <input
                name = "sourceUrl"
                type="string"
                value={formArgs.sourceUrl}
                onChange={handleChange}
                placeholder="Enter Source Url"
                required
                className="user"
            />
            <br></br>
        <label style={{ marginLeft: '60px' }}>
            Cheap?:
        <input
                name = "cheap"
                type="checkbox"
                checked={formArgs.cheap}
                onChange={handleChange}
                placeholder="Is Meal Cheap (true/false)"
                required
                className="user"
            />
            </label>
            <input
                name = "diets"
                type="string"
                value={formArgs.diets}
                onChange={handleChange}
                placeholder="Enter Dietary Specifics"
                
                className="user"
            />
            <input
                name = "summary"
                type="string"
                value={formArgs.summary}
                onChange={handleChange}
                placeholder="Summarize meal"
                className="user"
            />

            <button type='submit' className='submit-form-button'>
            Create Meal
            </button>

            
        </form>
        </div>
    );
}