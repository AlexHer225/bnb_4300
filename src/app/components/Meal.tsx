import React, { useEffect, useState } from 'react';
import '../../css/meal.css';
import mongoose from 'mongoose';
import Button from './Button';
import MealInfo from './MealInfo';
import { responseCookiesToRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

interface MealProps {
  id: string;
  title?: string;
  image?: string;
  readyInMinutes?: number;
  sourceUrl?: string;
  cheap?: boolean;
  diets?: [string];
  summary?: string;
  dayId?: string;
  onDelete: (mealId: string) => void;
}

function Meal ({id, dayId, onDelete}: MealProps) {
// const Meal: React.FC<MealProps> = ({ id }) => {
  const [meal, setMeal] = useState<MealProps | null>();
  const [showDetails, setShowDetails] = useState(false);
  // console.log('meal item created id: ', id);

  useEffect(() => {
    const getMeal = async () => {      
      try {
        // console.log('ATTEMPTING TO GET MEAL: ', id);
        const res = await fetch(`/api/meals/${id}`);
        const data = await res.json();
        const meal = data.meal;
        setMeal(meal);
      } catch (err) {
        console.error('Error fetching meal:', err);
      }
    };
    if (id) {
      getMeal();
    } else {
      // console.log('DID NOT GET MEAL BECAUSE ID: ', id);
    }
  }, [id]);

  useEffect(() => {
    const getNewMeal = async () => {
      try {
        // console.log('attempting to get NEW MEAL: ', id);
        const res = await fetch(`/api/meals/${id}`);
        const data = await res.json();
        const meal = data.meal;
        setMeal(meal);
      } catch (err) {
        console.error('Error fetching meal:', err);
      }
    };
    if (id) {
      getNewMeal();
    } else {
      console.log('DID NOT GET NEW MEAL BECAUSE ID: ', id);
    }
  }, []);


  function buttonHandler() {
    console.log('button clicked');
  }

  function handleCloseModal() {
    setShowDetails(false);
  }

  function viewButtonHandler() {
    setShowDetails(true);
  }

  async function deleteButtonHandler() {
    onDelete(id);
  }

  if (!meal) return (
    <div className="meal-card">
      Loading ...
    </div>
  );
  return (
    <>
    <div className="meal-card">
      <h4 className="meal-title">{meal.title}</h4>
      <img className="meal-image" src={meal.image} alt={meal.title}/>
      <div className='meal-buttons'>
        <Button onClick={viewButtonHandler} text={'View'} />
        <Button onClick={deleteButtonHandler} text={'Delete'} />
        <Button onClick={buttonHandler} text={'Edit'} />
      </div>
        {/* add modal here */}
        {showDetails &&  <MealInfo meal={meal} onClose={handleCloseModal} />}      
    </div>
    </>
  );
};

export default Meal;
