'use client';
import { useState } from 'react';
import '../../css/mealForm.css';

interface input  {
    title: string;
    image: string;
    maxReadyTime: number;
    sourceUrl: string;
    cheap: boolean;
    diets: string;
    summary: string;
}

interface newDetailProps{
    onAddForm: (newMeal: string) => void;
    closeForm: () => void;
}

export default function MealForm ({ onAddForm, closeForm }:newDetailProps) {
    const[formArgs, setFormArgs ] = useState({
        search: '',
        cuisine: '',
        diet: '',
        cheap: false,
        intolerances: '',
        includeIngredients: '',
        maxReadyTime: 100,
        maxPrice: 20,        
    });

    const handleSubmit = async (e: React.FormEvent)=>{
        e.preventDefault();

        setFormArgs({
            search: formArgs.search,
            cuisine: formArgs.cuisine,
            diet: formArgs.diet,
            cheap: formArgs.cheap,
            intolerances: formArgs.intolerances,
            includeIngredients: formArgs.includeIngredients,
            maxReadyTime: formArgs.maxReadyTime,
            maxPrice: formArgs.maxPrice,    
        });

        try{
            // console.log('CREATING MEAL: ', formArgs.search);
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
            const newMeal = await response.json();

            onAddForm(newMeal);
            closeForm();

            // Clear the form
            setFormArgs({
                search: '',
                cuisine: '',
                diet: '',
                cheap: false,
                intolerances: '',
                includeIngredients: '',
                maxReadyTime: 100,
                maxPrice: 20,
            });
        } catch (error) {
            console.error('Error creating meal');
        }
    } 
    
    function handleEnterKeyToNextField(e: React.KeyboardEvent<HTMLFormElement>) {
        if (
          e.key === 'Enter' &&
          e.target instanceof HTMLInputElement &&
          e.target.type !== 'textarea'
        ) {
          e.preventDefault();
          const form = e.currentTarget;
          const index = Array.prototype.indexOf.call(form.elements, e.target);
          const nextElement = form.elements[index + 1] as HTMLElement;
          nextElement?.focus();
        }
      }

      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = e.target;
      
        const { name, value, type } = target;
      
        const newValue =
          type === 'checkbox'
            ? (target as HTMLInputElement).checked
            : type === 'number'
            ? Number(value)
            : value;
      
        setFormArgs(prev => ({
          ...prev,
          [name]: newValue,
        }));
      };      

    return(
    <div className = "meal-form-container">
        <form onSubmit = {handleSubmit} onKeyDown={handleEnterKeyToNextField} className="form-style">
        <img 
        src="/../images/Hangry-Bear-Transparent.png"
        alt="Hangry Logo"
        width={400}
        height={400}
        />
            <label htmlFor="search">What are you hungry for?</label>
            <input
                id = "search"
                name = "search"
                type="string"
                value={formArgs.search}
                onChange={handleChange}
                placeholder="Chicken & Waffles, Cinnamon Roll Pancakes, Sloppy Joes"
                className="meal"
            />
            <label htmlFor="cuisine">Cuisine: </label>            
            <input
                id = "cuisine"
                name = "cuisine"
                type="string"
                value={formArgs.cuisine}
                onChange={handleChange}
                placeholder="Italian, Mexican, Chinese"
                className="meal"
            />
            <label htmlFor="maxReadyTime">Max Cooking Time: </label>
            <input
                id = "maxReadyTime"
                name = "maxReadyTime"
                type="number"
                value={formArgs.maxReadyTime}
                onChange={handleChange}
                placeholder="Enter Cook Time (Minutes)"
                className="meal"
            />
            <label htmlFor="diet">Diets: </label>
            <input
                id = "diet"
                name = "diet"
                type="string"
                value={formArgs.diet}
                onChange={handleChange}
                placeholder="Vegetarian, Vegan, Pescatarian"
                className="meal"
            />
            <div className='checkbox-area'>
                <label htmlFor="cheap" style={{ marginLeft: '0px' }}>
                    Budget<br></br>Friendly?
                    <br></br>
                </label>
                <input
                    id = "cheap"
                    name = "cheap"
                    type="checkbox"
                    checked={formArgs.cheap}
                    onChange={handleChange}
                    placeholder="Is Meal Cheap (true/false)"
                    className="meal"
                />
            </div>
            <label htmlFor="intolerances">Intolerances: </label>            
            <input
                id = "intolerances"
                name = "intolerances"
                type="string"
                value={formArgs.intolerances}
                onChange={handleChange}
                placeholder="Enter Any Intolerances or Allergies"
                className="meal"
            />
            <label htmlFor="includeIngredients">Include Ingredients: </label>            
            <input
                id = "includeIngredients"
                name = "includeIngredients"
                type="string"
                value={formArgs.includeIngredients}
                onChange={handleChange}
                placeholder="Enter Ingredients You Crave"
                className="meal"
            />
            <label htmlFor="maxPrice">Max Price: </label>            
            <input
                id = "maxPrice"                
                name = "maxPrice"
                type="string"
                value={formArgs.maxPrice}
                onChange={handleChange}
                placeholder="20"
                className="meal"
            />

        <button type='submit' className='submit-form-button'>
        Create Meal
        </button>

            
        </form>
        </div>
    );
}