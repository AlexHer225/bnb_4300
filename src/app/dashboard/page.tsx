"use client";
import React, { useEffect, useState } from 'react';
import Plans from '../components/Plans';
import '../../css/dashboard.css';

interface PlanType {
  _id: string;
  days: string[];
  name?: string;
}

export default function Dashboard() {
  const [dbPlans, setDBPlans] = useState<PlanType[]>([]);

  useEffect(() => {
    const createInitialPlan = async () => {
      const mealsResponse = await fetch(`/api/meals?size=7`, {
        method: 'GET',
      });
      const mealsWrapped = await mealsResponse.json();
      const meals = mealsWrapped.meals;

      const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      let days: string[] = [];

      for (let i = 0; i < 7; i++) {
        const res = await fetch('/api/days/', {
          method: 'POST',
          body: JSON.stringify({
            dayOfWeek: weekDays[i],
            meals: meals[i],
          }),
        });
        const day = await res.json();
        days.push(day._id);
      }

      const planResponse = await fetch('/api/plans/', {
        method: 'POST',
        body: JSON.stringify({
          days: days,
          name: 'Demo Plan',
        }),
      });

      const newPlan = await planResponse.json();

      setDBPlans([{ _id: newPlan, days: days, name: 'Demo Plan' }]);
    };

    createInitialPlan().catch(console.error);
  }, []);

  return (
    <div>
      <div className="dashboard-container">
        <h2 className='header-dashboard'>Welcome to Hangry!</h2>
        <p className='dashboard-login-description'>Please log in to save your meal plans.</p>
        <div className='demo-plan-container'>
          <Plans plansProps={dbPlans} />
        </div>
      </div>
    </div>
  );
}
