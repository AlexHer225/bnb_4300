'use client';
import MealForm from "../components/MealForm";
import Navbar from "../Navbar";
import { useState } from 'react';


export default function Meal(){
    
    
    const handleAddForm = (item: any) => {
        alert('User Created a Meal!');
    }
        
    return(
    
        <>
            <Navbar />
            <MealForm onAddForm={handleAddForm} />
        </>

    );
}
