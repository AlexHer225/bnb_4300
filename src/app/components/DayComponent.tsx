import Card from "./Card";
import Button from "./Button";
import MealForm from "./MealForm";
import { SetStateAction, useState } from "react";
import "../../css/dashboard.css";
import NewUser from "./MealForm";
import Meal from "./Meal";
import mongoose from "mongoose";

interface DayComponentProps {
  day: {
    _id: string;
    dayOfWeek: string;
    date: Date;
    meals: { _id: string, title: string, image: string }[];
  };
  onClick: () => void;
  selectedDay: string | null;
}

function DayComponent({ day, selectedDay }: DayComponentProps) {
  const [meals, setMeals] = useState(day.meals);
  const [isAddButton, setIsAddButton] = useState(true);
  const [showForm, setShowForm] = useState(false);
  // console.log('MEALS IN DAY COMPONENT: ', meals);


  function handleToggleForm() {
    setShowForm((prev) => !prev);
  }

  function handleAddMeal(newMeal: { _id: string, title: string, image: string }) {
    setMeals((prevMeals) => [...prevMeals, newMeal]);
    setIsAddButton(false);
  }

  function handleDeleteMeal() {
    setMeals((prevMeals) => prevMeals.slice(0, -1));
    setIsAddButton(true);
  }

  function chooseButtonHandler() {
    if (isAddButton) {
      handleAddMeal({ _id: "67f68eb0e10c0a544cd90ef2", title: "Pasta with Tuna", image: "https://img.spoonacular.com/recipes/654959-312x231.jpg" });
    } else {
      handleDeleteMeal();
    }
  }

  return (
    <div className="dayComponent">
      <Card title={day.dayOfWeek}>
        <h3>Meals</h3>
        <ul>
          {meals.map((meal, index) => (
            <Meal 
              key={index}
              // title={meal.title} 
              // image={meal.image}
              id={meal._id} 
            />
          ))}
        </ul>
        <div className="add-meal-form">    
          {showForm && (
            <div
              className="meal-form-overlay"
              onClick={() => setShowForm(false)}
            >
              <div
                className="meal-form-modal"
                onClick={(e) => e.stopPropagation()} // Prevent click-through
              >
                <NewUser onAddForm={handleAddMeal} />
              </div>
            </div>
          )}
        </div>
        <div className="button-wrapper">
          <div className="quick-add-button">
            <Button
              onClick={chooseButtonHandler}
              text={isAddButton ? "Quick Add" : "Delete Last"}
            />
          </div>

          <div className="meal-add-button">
            <Button
              onClick={handleToggleForm}
              text={showForm ? "Cancel" : "Add Meal"}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}

export default DayComponent;
