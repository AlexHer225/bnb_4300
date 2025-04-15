import Card from "./Card";
import Button from "./Button";
import MealForm from "./MealForm";
import { useState } from "react";
import "../../css/dashboard.css";

interface DayComponentProps {
  day: {
    _id: string;
    dayOfWeek: string;
    date: Date;
    meals: { name: string }[];
  };
  onClick: () => void;
  selectedDay: string | null;
}

function DayComponent({ day, selectedDay }: DayComponentProps) {
  const [meals, setMeals] = useState(day.meals);
  const [isAddButton, setIsAddButton] = useState(true); // Converted to state
  const [showForm, setShowForm] = useState(false); 

  //Show the Meal Form
  function handleToggleForm() {
    setShowForm((prev) => !prev);
  }

  function handleAddMeal(newMeal: { name: string }) {
    setMeals((prevMeals) => [...prevMeals, newMeal]);
    setIsAddButton(false);
  }

  function handleDeleteMeal() {
    setMeals((prevMeals) => prevMeals.slice(0, -1));
    setIsAddButton(true);
  }

  function chooseButtonHandler() {
    if (isAddButton) {
      // fallback: add a dummy meal if no form used
      handleAddMeal({ name: "Spaghetti" });
    } else {
      handleDeleteMeal();
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
      
      <div className="meal-add-button">
        <Button onClick={handleToggleForm} text={showForm ? "Cancel" : "Add Meal"} />
      </div>
      
      {showForm && <MealForm onAddForm={chooseButtonHandler} />}

    </div>
  );
}

export default DayComponent;
