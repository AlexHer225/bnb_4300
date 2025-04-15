"use client";
import React from 'react';
<<<<<<< HEAD
import Navbar from '../components/Navbar';
=======
import Navbar from '../Navbar';
import Plans from '../components/Plans';
import Day from '../models/daySchema';
import { mock } from 'node:test';
import '../../css/dashboard.css';


//Delete Later
//Temporary meals just to store for demo
const mockMeals = [
  {name: 'Pasta'},
  {name: 'Salad'},
  {name: 'Pizza'},
  {name: 'Sushi'},
  {name: 'Tacos'},
  {name: 'Burger'},
];


//Delete Later
//Temporary days for 7 day plan
const generateDays = () => {
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  return weekDays.map((day, index) => ({
    dayOfWeek: day,
    date: new Date(Date.now() + index * 86400000), 
    meals: [mockMeals[index % mockMeals.length]], 
  }));
}


>>>>>>> 316b0653aed81c963ca8054e95c538e150b520ac

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [plans, setPlans] = React.useState<any[]>([]); //Saves Plans for Logged In User
  const [newPlan, setNewPlan] = React.useState<any | null>(null); // 7 Day Plan for non authenicated user

  const planDays = generateDays(); 

  //Temporary Plans for Logged In View
  const savedPlans = [
    {
      title: 'Healthy Week Plan',
      days: generateDays(),
    },
    {
      title: 'Cheat Week Plan',
      days: generateDays(),
    }
  ];

  //Toggle the button
  const handleTogglePlan = () => {
    if(newPlan) {
      setNewPlan(null);
    } else {
        setNewPlan({
          title: 'Demo 7 Day Meal Plan',
          days: generateDays(),
        });
    }
  }

  const handleAddNewPlan = () => {
    setNewPlan({
      title: 'Demo 7 Day Meal Plan',
      days: generateDays(),
    });
  };

  return (
    <div>
      <Navbar/>
      <div className="dashboard-container">
        {isLoggedIn ? (
          <>
            <h2 className='header-dashboard'>Your Meal Plans</h2>
            {savedPlans.map((plan, index) => (
              <Plans key={index} title={plan.title} days={plan.days} />
            ))}
          </>
        ) : (
          <>
            <h2 className='header-dashboard'>Welcome to Hangry!</h2>
            <p className='dashboard-login-description'>Please log in to save your meal plans.</p>
              <div className='new-plan-container'>
                <button onClick={handleTogglePlan} className='new-plan-button'>
                  {newPlan ? 'Remove Meal Plan -' : 'Create 7 Day Meal Plan +'}
                </button>
              </div>

              {newPlan && (
                <Plans key={newPlan.key} title={newPlan.title} days={newPlan.days} />
              )} 
          </>
        )}
      </div>
    </div>
  );
}