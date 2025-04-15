import Card from "./Card"
import Button from "./Button";
import { useState } from "react";
import MealForm from "./MealForm";

import "../../css/dashboard.css";

interface DayComponentProps {
    day: {
        _id: string;
        dayOfWeek: string;
        date: Date;
        meals: { name: string}[];
      };
}

function DayComponent({ day } : DayComponentProps) {
    const [meals, setMeals] = useState(day.meals);

    let isAddButton = true;

    // Function to handle adding a meal
    function handleAddMeal(newMeal: {name: string}) {
        setMeals((prevMeals) => [...prevMeals, newMeal]);
        isAddButton = false;
    } 

    // Day component without a meal, used when deleting
    const emptyDayComponent = () => {
        return (
            <div className="dayComponent">
              <Card title={day.dayOfWeek} />
              <h3>Meals:</h3>
              <ul>
                {meals.map((meal, index) => (
                  <li key={index}>{meal.name}</li>
                ))}
              </ul>
              <MealForm
                onAddForm={(newMeal) => handleAddMeal()}
              />
              <Button onClick={chooseButtonHandler}/>
            </div>
        );
    };

    function handleDeleteMeal() {
        setMeals((prevMeals) => prevMeals.slice(0, -1));
        isAddButton = true;

        return emptyDayComponent();
    }

    function chooseButtonHandler() {
        if (isAddButton) {
            return handleAddMeal();
        } else {
            return handleDeleteMeal();
        }
    }

    return (
        <div className="dayComponent">
          <Card title={day.dayOfWeek} />
          <h3>Meals:</h3>
          <ul>
            {meals.map((meal, index) => (
              <li key={index}>{meal.name}</li>
            ))}
          </ul>
          <MealForm
            onAddForm={(newMeal) => handleAddMeal()}
          />
          
        <Button onClick={chooseButtonHandler}/>    
        </div>
    );
}

export default DayComponent;