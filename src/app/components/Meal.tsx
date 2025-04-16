import React from 'react';
import '../../css/Meal.css';

interface MealProps {
  title: string;
  image: string;
}

const Meal: React.FC<MealProps> = ({ title, image }) => {
  return (
    <div className="meal-card">
      <h4 className="meal-title">{title}</h4>
      <img className="meal-image" src={image} alt={title} />
      
    </div>
  );
};

export default Meal;
