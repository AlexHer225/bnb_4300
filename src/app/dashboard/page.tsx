"use client";
import React from 'react';
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
    _id: `${Date.now()}-${index}`,
    dayOfWeek: day,
    date: new Date(Date.now() + index * 86400000), 
    meals: [mockMeals[index % mockMeals.length]], 
  }));
}



export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [plans, setPlans] = React.useState<any[]>([]); //Saves Plans for Logged In User
  const [newPlan, setNewPlan] = React.useState<any | null>(null); // 7 Day Plan for non authenicated user

  const planDays = generateDays(); 

  //Temporary Plans for Logged In View
  const savedPlans = [
    {
      _id: 'plan-1',
      days: generateDays(),
    },
    {
      _id: 'plan-2',
      days: generateDays(),
    }
  ];

  //Toggle the button
  const handleTogglePlan = () => {
    if(newPlan) {
      setNewPlan(null);
    } else {
        setNewPlan({
          _id: 'demo-plan',
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
              <Plans key={index} plansProps={[plan]} />            ))}
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
                <Plans plansProps={[newPlan]} />
              )} 
          </>
        )}
      </div>
    </div>
  );
}