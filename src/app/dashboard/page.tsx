"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Plans from '../components/Plans';
import Day from '../models/daySchema';
import { mock } from 'node:test';
import '../../css/dashboard.css';
import { useSession } from 'next-auth/react';

type Meal = {
  _id: string;
  title: string;
  image: string;
  readyInMinutes: number;
  sourceUrl: string;
  cheap: boolean;
  diets: string[];
  summary: string;
  __v: number;
};

export default function Dashboard() {
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;
  const [meals, setMeals] = useState<Meal[]>([]);
  const [plans, setPlans] = useState<any[]>([]);
  const [newPlan, setNewPlan] = useState<any | null>(null);

  // Generates days based on meals
  const generateDays = () => {
    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return weekDays.map((day, index) => ({
      _id: `${Date.now()}-${index}`,
      dayOfWeek: day,
      date: new Date(Date.now() + index * 86400000),
      meals: meals.length ? [meals[index % meals.length]] : [],
    }));
  };

  useEffect(() => {
    const fetchMeals = async () => {
      const res = await fetch('/data/demoMeals.json');
      const data = await res.json();
      console.log('Fetched meals:', data); 
      setMeals(data);
    };
    fetchMeals();
  }, []);

  const savedPlans = meals.length ? [
    {
      _id: 'plan-1',
      days: generateDays(),
    },
    {
      _id: 'plan-2',
      days: generateDays(),
    }
  ] : [];

  const handleTogglePlan = () => {
    if (newPlan) {
      setNewPlan(null);
    } else if (meals.length) { // Only allow creating a plan if meals are fetched
      setNewPlan({
        _id: 'demo-plan',
        days: generateDays(),
      });
    }
  };

  const handleAddNewPlan = () => {
    if (meals.length) { // Only allow creating a new plan if meals are fetched
      setNewPlan({
        title: 'Demo 7 Day Meal Plan',
        days: generateDays(),
      });
    }
  };

  return (
    <div>
      {/* <Navbar session={null} /> */}
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
              <div className='plan-container'>
              {newPlan && (
                  <Plans plansProps={[newPlan]} />
              )} 
              </div>
          </>
        )}
      </div>
    </div>
  );
}