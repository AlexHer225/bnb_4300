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
    onDelete?: (deletedId: string) => void;
    onSave?: (savedId: string) => void;
}

interface PlanType {
    _id: string;
    days: string[];
    name?: string;
  }
  

// Carousel of plans 
export default function Plans({plansProps, onDelete, onSave}: PlansProps) {
    /*const [plans, setPlans] = useState<PlanType[]>([]);

    // console.log('NEW PLANS CREATED: ', plansProps);

    useEffect(() => {
        // setPlans([...plans, ...plansProps]);
        // setPlans(prev => [...prev, ...plansProps]);
        setPlans(plansProps);
    }, [plansProps]);*/

    return (
        <div className="plans">
            <div className="plans-carousel">
                {plansProps.map((plan: PlanType, index: number) => (
                    <Plan key={index} planData={plan} onDelete={onDelete} onSave={onSave}/>
                ))}
            </div>
            {/* <div className="meal-plan-button">   
                <Button onClick={handleAddWeek} text="Add Week"/>
            </div>  */}
        </div>
    );
}