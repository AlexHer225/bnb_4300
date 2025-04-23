import Card from "./Card";
import Button from "./Button";
import MealForm from "./MealForm";
import { useEffect, useState } from "react";
import "../../css/dashboard.css";
import Meal from "./Meal";


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
  const [day, setDay] = useState<DayComponentProps | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [mealUpdateTrigger, setMealUpdateTrigger] = useState(false);

  useEffect(() => {
    const getDay = async () => {
      try {
        const res = await fetch(`/api/days/${id}`, { method: 'GET' });
        const data = await res.json();
        const tempDay = data.day;
        setDay(tempDay);
      } catch (err) {
        console.error('Error fetching day:', err);
      }
    };
    getDay();
  }, [id]);

  // Fetch day data when id or mealUpdateTrigger changes
  useEffect(() => {
    const getDay = async () => {
      try {
        const res = await fetch(`/api/days/${id}`, { method: 'GET' });
        const data = await res.json();
        const tempDay = data.day;
        setDay(tempDay);
      } catch (err) {
        console.error('Error fetching day:', err);
      }
    };
    getDay();
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
    } catch (error) {
      console.error('Error deleting meal:', error);
    } 
  }

  async function quickAddHandler() {
    const response = await fetch('/api/meals?size=1', { method: 'GET' });
    const wrappedMeal = await response.json(); 
    const randomMeal = wrappedMeal.meals[0]._id;
    if (!day?.meals?.includes(randomMeal)) {
      handleAddMeal(randomMeal); // no duplicate meals
    } else {
      console.log('DID NOT QUICK ADD MEAL: ', day?.meals, ' = existing meal ', randomMeal);
    }
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
