"use client";
import React, { useEffect, useState } from 'react';
import Plans from '../components/Plans';
import '../../css/dashboard.css';
import { useSession } from 'next-auth/react';

type Meal = {
  _id: string;
};

type Day = {
  _id: string;
};

interface PlanType {
  _id: string;
  days: string[];
  name?: string;
  user?: string;
}

export default function MyDashboard() {
  const { data: session } = useSession();

  const [dbPlans, setDBPlans] = useState<PlanType[]>([]);
  const [savedPlans, setSavedPlans] = useState<PlanType[]>([]);

  useEffect(() => {
    const getSavedPlans = async () => {
      const response = await fetch(`/api/plans/user/${session?.user?.id}`);
      const plans = await response.json();
      const formattedPlans = plans.map((plan: PlanType) => ({
        _id: plan._id,
        days: plan.days,
        name: plan.name,
        user: plan.user,
      }));
      setSavedPlans(formattedPlans);
    };

    if (session?.user?.id) {
      getSavedPlans();
    }
  }, [session]);

  //useEffect(() => {
    // Create a new plan with meals. This is just for demo purposes.
    // In a real application, you would probably want to create a plan based on user input.
    // This function will be called when the component mounts.
    /*const createInitialPlan = async () => {
      const plan = await createNewPlan('Demo Plan');
    };
    createInitialPlan().catch(console.error);
  }, []);*/

  const createNewPlan = async (name: string) => {
    const mealsResponse = await fetch(`api/meals?size=7`, {
      method: 'GET'
    });
    const mealsWrapped = await mealsResponse.json();
    const meals: Meal[] = mealsWrapped.meals;

    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let days: string[] = [];

    for (let i = 0; i < 7; i++) {
      const response = await fetch(`api/days/`, {
        method: 'POST',
        body: JSON.stringify({
          dayOfWeek: weekDays[i],
          meals: meals[i],
        }),
      });
      const day: Day = await response.json();
      days.push(String(day._id));
    }

    const planResponse = await fetch('/api/plans/', {
      method: "POST",
      body: JSON.stringify({
        days: days,
        name: name,
      }),
    });

    const newPlan = await planResponse.json();

    const plansProps: PlanType = { _id: newPlan, days: days, name: name };
    setDBPlans(prevPlans => [...prevPlans, plansProps]);
  };

  return (
    <div>
      <div className="dashboard-container">
        <h2 className='header-dashboard'>Your Saved Meal Plans</h2>
        {savedPlans.length > 0 ? (
          <div className='savedPlans'>
            <Plans plansProps={savedPlans} />
          </div>
        ) : (
          <h2>Looks like you have no saved plans. Create one today!</h2>
        )}
        <Plans plansProps={dbPlans} />
        <button className='new-plan-button' onClick={() => createNewPlan('New Plan')}>Create New Plan</button>
      </div>
    </div>
  );
}
