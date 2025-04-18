import React from 'react';
import Meal from '../models/mealSchema';
import connectMongoDB from '../../../config/mongodb';
import mongoose, { mongo } from 'mongoose';
// import '../../css/Meal.css';


interface MealInfoProps {
    id: string;
    title: string;
    image: string;
    readyInMinutes: number;
    sourceUrl: string;
    cheap: boolean;
    diets?: [string];
    summary?: string;
}

async function MealInfo({ id }: MealInfoProps ) {
    connectMongoDB;
    // const response = await fetch(`/api/meals/${id}`);
    // const meal = await response.json;
    console.log('Attempting to find meal: ', id);
    // const meal = await Meal.findOne({ _id: objectId }).lean;
    const meal = fetch(`/api/meals/${id}`)
      .then(res => res.json());
    if (!meal) console.error('Meal not found');
    else console.log('Meal found: ', meal);
    return (
        <>
            <h2>MEAL INFO</h2>
        </>
    );
}

export default MealInfo;