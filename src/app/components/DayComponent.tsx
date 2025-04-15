import Card from "./Card"
import Button from "./Button";
import { useState } from "react";
import '../../css/dashboard.css';

interface DayComponentProps {
    day: {
        _id: string;
        dayOfWeek: string;
        date: Date;
        meals: any[]; 
      }
}

function DayComponent({ day } : DayComponentProps) {
    const [meals, setMeals] = useState(day.meals);

    let isAddButton = true;

    // Function to handle adding a meal
    function handleAddMeal() {
        const newMeal = {
            _id: `${Date.now()}`,
            name: "New Meal",
            ingredients: [],
            instructions: "",
            image: "",
            servings: 1,
            readyInMinutes: 30,
        };
        setMeals((prevMeals) => [...prevMeals, newMeal]);
        isAddButton = false;
    }

    // Day component without a meal, used when deleting
    const emptyDayComponent = () => {
        return (
            <div className="dayComponent">
                <Card title={day.dayOfWeek} />
                <div className="meal-add-button">
                    <Button onClick={handleAddMeal} />
                </div>            
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
            <div className="edit-meal">
                <Button onClick={chooseButtonHandler}/>
            </div>            
        </div>
    );

    // Old garbage code
   /* const [meals, setMeals] = useState(day.meals);

    const addMealButton = () => {
        function handleClick() {
            // Add meal logic here
        }
        
        let isVisible = true;

        if (meals.length >= 3) {
            isVisible = false;
        } 

        function setVisibility(): string {
            return isVisible ? "visible" : "hidden";
        }

        return (
            <div className="add-meal" style={{ visibility: setVisibility() }}>
                <Button onClick={handleClick} />
            </div>
        );
    } */

    /*return (
        <div className="dayComponent">
            <Card title={day}/>
        </div>
    );*/
}

export default DayComponent;