import Plan from "./Plan";
import Button from "./Button";
import { useState } from "react";

// Carousel of plans 
export default function Plans({plansProps}) {
    const [plans, setPlans] = useState(plansProps);

    function handleClick () {
        const newPlan = {
            _id: `${Date.now()}`,
            days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => ({
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