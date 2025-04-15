import Plan from "./Plan";
import Button from "./Button";
import { useState } from "react";
import '../../css/dashboard.css';

// Carousel of plans 
export default function Plans({plansProps}) {
    const [plans, setPlans] = useState(plansProps);

    // IDs are placeholders, change when backend is implemented
    function handleClick () {
        const newPlan = {
            _id: `${Date.now()}`,
            days: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"].map((day, index) => ({
                _id: `${Date.now()}-${index}`,
                dayOfWeek: day,
                date: new Date(),
                meals: [],
            }))
        };
        setPlans(prev => [...prev, newPlan]);
    }
    
    return (
        <div className="plans">
            <h1>My Plans</h1>
            <div className="plans-carousel">
                {plans.map((plan, index) => (
                    <Plan key={index} plan={plan} />
                ))}
            </div>

            <Button onClick={handleClick}/>
        </div>
    );
}