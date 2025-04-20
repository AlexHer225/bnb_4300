import Card from "./Card";
import Button from "./Button";
import MealForm from "./MealForm";
import { SetStateAction, useEffect, useState } from "react";
import "../../css/dashboard.css";
// import NewUser from "./MealForm";
import Meal from "./Meal";
import mongoose from "mongoose";
import { clear } from "console";

interface DayComponentProps {
  id: string,
  dayOfWeek?: string;
  date?: Date;
  meals?: MealProps[];
}

interface MealProps {
  _id: string,
  title: string,
  image: string
}

export default function DayComponent({id}: DayComponentProps) {
// const DayComponent: React.FC<DayComponentProps> = ({ id }) => {
// function DayComponent({ day, selectedDay }: DayComponentProps) {
  const [day, setDay] = useState<DayComponentProps | null>(null);
  const [meals, setMeals] = useState<MealProps[]>([]);
  const [isAddButton, setIsAddButton] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/days/${id}`, { method: 'GET' });
        const data = await res.json();
        const tempDay = data.day;
        setDay(tempDay);
      } catch (err) {
        console.error('Error fetching meal:', err);
      }
    })();
  }, []);

  function handleToggleForm() {
    setShowForm((prev) => !prev);
  }

  function handleAddMeal(newMeal: { _id: string, title: string, image: string }) {
    setMeals([...meals, newMeal]);
    setIsAddButton(false);
  }

  function handleDeleteMeal() {
    setMeals((prevMeals) => prevMeals.slice(0, -1));
    setIsAddButton(true);
  }

  async function chooseButtonHandler() {
    if (isAddButton) {
      const response = await fetch('/api/meals?size=1', { method: 'GET' });
      const wrappedMeal = await response.json(); 
      const randomMeal = wrappedMeal.meals[0];
      handleAddMeal(randomMeal);
    } else {
      handleDeleteMeal();
    }
  }
  
  if (!day) return <div>Loading Day...</div>;
  return (
    <div className="dayComponent">
      <Card title={day.dayOfWeek}>
        <h3>Meals</h3>
        <ul>
          {meals?.map((meal) => (
            <Meal 
              key={meal._id}
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
                <MealForm onAddForm={handleAddMeal} closeForm={() => setShowForm(false)}/>
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
