"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Plans from '../components/Plans';
import Day from '../models/daySchema';
import { mock } from 'node:test';
import '../../css/dashboard.css';
import { useSession } from 'next-auth/react';
import MealInfo from '../components/MealInfo';
import Plan from '../models/planSchema';
import { Noto_Sans_Tamil_Supplement } from 'next/font/google';
import { clear } from 'console';

type Meal = {
  _id: string;
};

type Day = {
  _id: string;
}

interface PlanType {
  _id: string;
  days: string[];
}

export default function Dashboard() {
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;
  console.log('IS LOGGED IN: ', isLoggedIn);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [plans, setPlans] = useState<any[]>([]);
  const [newPlan, setNewPlan] = useState<any | null>(null);
  const [dbPlans, setDBPlans] = useState<PlanType[]>([]);
  

  // Generates days based on meals
  const generateDays = async () => {
    return;
    const mealsResponse = await fetch(`api/meals?size=7`, {
      method: 'GET'
    });
    const mealsWrapped = await mealsResponse.json();
    const meals: Meal[] = mealsWrapped.meals;
    // console.log('MEALS: ', meals);
    const mealIds = meals.map(meal => meal._id);
    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    var days: string[] = [];
    for (let i = 0; i < 7; i++ ) {
      let response = await fetch(`api/days/`, {
        method: 'POST',
        body: JSON.stringify({
          dayOfWeek: weekDays[i],
          // date: '',
          meals: meals[i],
        })
      });
      const day: Day = await response.json();
      const dayId = String(day._id);
      days = [...days, dayId];
    }


    // const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    // return weekDays.map((day, index) => ({
    //   _id: `${Date.now()}-${index}`,
    //   dayOfWeek: day,
    //   date: new Date(Date.now() + index * 86400000),
    //   meals: meals.length ? [meals[index % meals.length]] : [],
    // }));
  };

  useEffect(() => {
    const createDefaultPlan = async () => {
      const mealsResponse = await fetch(`api/meals?size=7`, {
        method: 'GET'
      });
      const mealsWrapped = await mealsResponse.json();
      const meals: Meal[] = mealsWrapped.meals;
      // console.log('MEALS: ', meals);
      const mealIds = meals.map(meal => meal._id);

      const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      var days: string[] = [];
      for (let i = 0; i < 7; i++ ) {
        let response = await fetch(`api/days/`, {
          method: 'POST',
          body: JSON.stringify({
            dayOfWeek: weekDays[i],
            // date: '',
            meals: meals[i],
          })
        });
        const day: Day = await response.json();
        const dayId = String(day._id);
        days = [...days, dayId];
      }
      // const dayIds = days.map(day => String(day._id));
      const planResponse = await fetch('/api/plans/', {
        method: "POST",
        body: JSON.stringify({
          days: days,
          name: 'Demo Plan',
        }),
      });
      const defaultPlan = await planResponse.json();

      const plansProps: PlanType = { _id: defaultPlan, days: days };
      // console.log('SETTING PLANS PROPS: ', plansProps);
      // setDBPlans(prev => [...prev, plansProps]);
      setDBPlans([plansProps]);
    };
    createDefaultPlan().catch(console.error);
  }, []);

  // useEffect(() => {
  //   console.log('✅ dbPlans updated:', dbPlans);
  //   setTimeout(() => {
  //     console.log('⏳ dbPlans shortly after update:', dbPlans);
  //   }, 0);
  // }, [dbPlans]);
  


  // useEffect(() => {
  //   const fetchMeals = async () => {
  //     const res = await fetch('/data/demoMeals.json');
  //     const data = await res.json();
  //     // console.log('Fetched meals:', data); 
  //     setMeals(data);
  //   };
  //   fetchMeals();
  // }, []);

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
      <div className="dashboard-container">
        {isLoggedIn ? (
          <>
            <h2 className='header-dashboard'>Your Meal Plans</h2>
            {savedPlans.map((plan, index) => (
              <Plans key={index} plansProps={[plan]} />))}
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
              {isLoggedIn && (
                <Plans plansProps={[newPlan]} />
              )} 
              </div>
          </>
        )}
      </div>
      {/* <h1>NEW PLAN BACKEND</h1> */}
      {/* PLEASE NOTE, ONLY USE THE PLANS LIKE THE ONE BELOW, PROPER DATA IMPLEMENTATION */}
      {/* ALSO, THE USAGE OF PLANS ANYWHERE ABOVE THIS COMMENT IS INVALID, TO BE UPDATED TO MATCH THE ONE BELOW */}
      <Plans plansProps={dbPlans} />
    </div>
  );
}