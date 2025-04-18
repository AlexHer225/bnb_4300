import React, { useEffect, useState } from 'react';
import '../../css/Meal.css';
import mongoose from 'mongoose';

interface MealProps {
  id: string;
  title?: string;
  image?: string;
  readyInMinutes?: number;
  sourceUrl?: string;
  cheap?: boolean;
  diets?: [string];
  summary?: string;
}

const Meal: React.FC<MealProps> = ({ id }) => {
  const [meal, setMeal] = useState<MealProps | null>();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/meals/${id}`);
        const data = await res.json();
        const meal = data.meal;
        setMeal(meal);
      } catch (err) {
        console.error('Error fetching meal:', err);
      }
    })();
  }, [id]);

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
    </div>
    </>
  );
};

export default Meal;
