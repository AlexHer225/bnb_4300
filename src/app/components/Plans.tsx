import Plan from "./Plan";
import Button from "./Button";
import { useState } from "react";
import '../../css/dashboard.css';

interface Day {
    _id: string;
    dayOfWeek: string;
    date: Date;
    meals: any[]; 
}

interface PlanType {
    _id: string;
    days: Day[];
}

interface PlansProps {
    plansProps: PlanType[];
}

// Carousel of plans 
export default function Plans({plansProps}: PlansProps) {
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
        setPlans((prev: PlanType[]) => [...prev, newPlan]);
    }
    
    return (
        <div className="plans">
            <div className="plans-carousel">
                {plans.map((plan: PlanType, index: number) => (
                    <Plan key={index} plan={plan} />
                ))}
            </div>
            <div className="meal-plan-button">   
                <Button onClick={handleClick}/>
            </div> 
        </div>
    );
}