import Plan from "./Plan";
import Button from "./Button";
import { useEffect, useState } from "react";
import '../../css/dashboard.css';

interface Day {
    _id: string;
    dayOfWeek: string;
}

interface PlansProps {
    plansProps: PlanType[];
}

interface PlanType {
    _id: string;
    days: string[];
  }
  

// Carousel of plans 
export default function Plans({plansProps}: PlansProps) {
    const [plans, setPlans] = useState<PlanType[]>([]);
    const [selectedDayId, setSelectedDayId] = useState<string | null>(null);

    useEffect(() => {
        setPlans([...plans, ...plansProps]);
        // console.log('SET PLANS: ', [...plans, ...plansProps]);
    }, [plansProps]);

    async function handleAddWeek () {
        const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        var days: Day[] = [];
        for (let i = 0; i < 7; i++ ) {
            let response = await fetch(`api/days/${weekDays[i]}`, {
            method: 'POST',
            body: JSON.stringify({
                dayOfWeek: weekDays[i],
                // date: '',
            //   meals: meals[i],
            })
            });
            const day: Day = await response.json();
            days = [...days, day];
        }
        const dayIds = days.map(day => String(day._id));

        const planResponse = await fetch('/api/plans/', {
          method: "POST",
          body: JSON.stringify({
            days: dayIds,
            name: 'Custom Plan',
          }),
        });
        
        const defaultPlan = await planResponse.json();
  
        const plansProps = { _id: defaultPlan, days: dayIds };
        setPlans([...plans, plansProps]);
      }

    return (
        <div className="plans">
            <div className="plans-carousel">
                {plans.map((plan: PlanType, index: number) => (
                    <Plan key={index} planData={plan} selectedDayId={selectedDayId} setSelectedDayId={setSelectedDayId} />
                ))}
                <br></br>
            </div>
            <div className="meal-plan-button">   
                <Button onClick={handleAddWeek} text="Add Week"/>
            </div> 
        </div>
    );
}