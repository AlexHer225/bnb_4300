import React, { useEffect, useState } from 'react';
import '../../css/meal.css';
import Button from './Button';
import MealInfo from './MealInfo';

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

  const [meal, setMeal] = useState<MealProps | null>();
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const getMeal = async () => {      
      try {

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
    } 
      
  }, [id]);

  useEffect(() => {
    const getNewMeal = async () => {
      try {
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
