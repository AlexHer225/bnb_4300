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
  name?: string;
  user?: string;
}

export default function Dashboard() {
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user;
  // const [newPlan, setNewPlan] = useState<any | null>(null);
  const [dbPlans, setDBPlans] = useState<PlanType[]>([]);
  const [savedPlans, setSavedPlans] = useState<PlanType[]>([]);

  useEffect(() => {
    // console.log('setSavedPlans: ', savedPlans);
  }, [savedPlans]);
  
  useEffect(() => {
    const getSavedPlans = async () => {
      const response = await fetch(`/api/plans/user/${session?.user?.id}`); // get plans by user ID 
      const plans = await response.json();
      // console.log('recieved plans PLANS: ', plans);
      if (plans.length > 0) {
        // console.log('SETTING PLANS');
        const formattedPlans = plans.map((plan: PlanType) => {
          return {
            _id: plan._id,
            days: plan.days,
            name: plan.name, // Default name if not provided
            user: plan.user, // Optionally set user, if available
          };
        });
        // console.log('FORMATTED PLANS: ', formattedPlans);
        setSavedPlans(formattedPlans);
      }
    };
    if (session?.user?.id) {
      getSavedPlans();
    } else {
      console.log('NO session user id, session user: ', session?.user);
    }
}, [session]);



//////////////////////////////////////////////////////
  useEffect(() => {
    const createInitialPlan = async () => {
      const plan = await createNewPlan('Demo Plan');
    };
    createInitialPlan().catch(console.error);
  }, []);

  // const handleTogglePlan = () => {
  //   if (newPlan) {
  //     setNewPlan(null);
  //   } else if (meals.length) { // Only allow creating a plan if meals are fetched
  //     setNewPlan({
  //       _id: 'demo-plan',
  //       days: generateDays(),
  //     });
  //   }
  // };

  // const handleAddNewPlan = () => {
  //   if (meals.length) { // Only allow creating a new plan if meals are fetched
  //     setNewPlan({
  //       title: 'Demo 7 Day Meal Plan',
  //       days: generateDays(),
  //     });
  //   }
  // };
////////////////////////////////

const createNewPlan = async (name: string) => {
  const mealsResponse = await fetch(`api/meals?size=7`, {
    method: 'GET'
  });
  const mealsWrapped = await mealsResponse.json();
  const meals: Meal[] = mealsWrapped.meals;
  // console.log('DASHBOARD MEALS: ', meals);
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
      name: name,
    }),
  });
  const newPlan = await planResponse.json();

  const plansProps: PlanType = { _id: newPlan, days: days, name: 'New Plan' };
  setDBPlans(prevPlans => [...prevPlans, plansProps]);
};

  
  return (
    <div>
      <div className="dashboard-container">
        {isLoggedIn ? (
          <>
            <h2 className='header-dashboard'>Your Saved Meal Plans</h2>
            {/* {savedPlans.map((plan, index) => (
              <Plans key={index} plansProps={[plan]} />))} */}
            {savedPlans.length > 0 ? (
              <div className='savedPlans'>
              {/* <h2>should be showing my saved plan: {savedPlans[0].name}</h2> */}
              <Plans plansProps={savedPlans} />
              </div>
            ) : (
              <h2>Looks like you have no saved plans. Create one today!</h2>
            )}
            <h2 className='header-dashboard'>Workspace</h2>
            <Plans plansProps={dbPlans} />
            <button className='new-plan-button' onClick={() => createNewPlan('New Plan')}>Create New Plan</button>
          </>
        ) : (
          <>
            <h2 className='header-dashboard'>Welcome to Hangry!</h2>
            <p className='dashboard-login-description'>Please log in to save your meal plans.</p>
              <div className='demo-plan-container'>
                <Plans plansProps={dbPlans} />
                {/* <button onClick={handleTogglePlan} className='new-plan-button'>
                  {newPlan ? 'Remove Meal Plan -' : 'Create 7 Day Meal Plan +'}
                </button> */}
              </div>
              {/* <div className='plan-container'>
                <Plans plansProps={dbPlans} />
              </div> */}
          </>
        )}
      </div>
      {/* <h1>NEW PLAN BACKEND</h1> */}
      {/* PLEASE NOTE, ONLY USE THE PLANS LIKE THE ONE BELOW, PROPER DATA IMPLEMENTATION */}
      {/* ALSO, THE USAGE OF PLANS ANYWHERE ABOVE THIS COMMENT IS INVALID, TO BE UPDATED TO MATCH THE ONE BELOW */}
    </div>
  );
}