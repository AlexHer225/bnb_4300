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
  meals?: string[];
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
  // const [meals, setMeals] = useState<string[]>(day?.meals);
  const [isAddButton, setIsAddButton] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [mealUpdateTrigger, setMealUpdateTrigger] = useState(false); // 🆕

  // console.log('DAY COMPONENT WITH ID: ', id);

  useEffect(() => {
    const getDay = async () => {
      try {
        const res = await fetch(`/api/days/${id}`, { method: 'GET' });
        const data = await res.json();
        const tempDay = data.day;
        // console.log('SETTING DAY: ', tempDay);
        setDay(tempDay);
        // if (tempDay.meals) {
        //   // console.log('SETTING MEALS: ', tempDay.meals);
        //   setMeals(tempDay.meals);
        // }
        // if (tempDay.meals) {
        //   // console.log('tempDay meals:', tempDay.meals);
        //   tempDay.meals.forEach((meal) => {
        //     // console.log('mapped meal:', meal);
        //   });
        // }
      } catch (err) {
        console.error('Error fetching day:', err);
      }
    };
    getDay();
  }, [id]);

  // 🔁 Fetch day data when id or mealUpdateTrigger changes
  useEffect(() => {
    const getDay = async () => {
      try {
        const res = await fetch(`/api/days/${id}`, { method: 'GET' });
        const data = await res.json();
        const tempDay = data.day;
        // console.log('SETTING DAY: ', tempDay);
        setDay(tempDay);
      } catch (err) {
        console.error('Error fetching day:', err);
      }
    };
    getDay();
    // console.log('TRIGGERED: meal update');
  }, [id, mealUpdateTrigger]);


  function handleToggleForm() {
    setShowForm((prev) => !prev);
  }

  function handleAddMeal(newMeal: string ) {
    const updatedMeals = [...(day?.meals || []), newMeal];
    const addMeal = async () => {
      const res = await fetch(`api/days/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          meals: updatedMeals,
        })
      });

      if (res.ok) {
        setMealUpdateTrigger(prev => !prev);
      } else {
        console.error('Failed to update meals');
      }
    }
    addMeal();
    // setMeals([...meals, newMeal]);
    // setMealUpdateTrigger(prev => !prev);
    setIsAddButton(false);
  }

  async function handleDeleteMeal(mealId: string) {
    try {
      const response = await fetch(`api/days/${id}/remove-meal`, {
        method: 'PUT',
        body: JSON.stringify({
          mealId: mealId
        })
      });
      if (response.ok) {
        setMealUpdateTrigger(prev => !prev);
      } else {
        throw new Error('Failed to delete meal');
      }
      // setMeal(null);
    } catch (error) {
      console.error('Error deleting meal:', error);
    } 

    // setMeals((prevMeals) => prevMeals.slice(0, -1));
    setIsAddButton(true);
  }

  async function quickAddHandler() {
    if (isAddButton) {
      const response = await fetch('/api/meals?size=1', { method: 'GET' });
      const wrappedMeal = await response.json(); 
      const randomMeal = wrappedMeal.meals[0]._id;
      // console.log('QUICK ADD RANDOM: ', randomMeal);
      handleAddMeal(randomMeal);
    } 
    // else {
    //   handleDeleteMeal();
    // }
  }
  
  if (!day) return;
  return (
    <div className="dayComponent">
      <Card title={day.dayOfWeek}>
        <h3>Meals</h3>
        
        {Array.isArray(day.meals) && day.meals.length > 0 && (
          <ul>
            {day.meals?.map((meal) => (
              <Meal key={meal} id={meal} dayId={id} onDelete={handleDeleteMeal} />
            ))}
          </ul>
          )}
      {/*         
        <ul>
          {day.meals?.map((meal) => (
            <Meal key={meal._id} id={meal._id} />
          ))}
        </ul> */}
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
              onClick={quickAddHandler}
              text="Quick Add"
              // text={isAddButton ? "Quick Add" : "Delete Last"}
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
