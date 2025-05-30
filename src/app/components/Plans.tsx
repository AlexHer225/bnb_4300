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

    return (
        <div className="plans">
            <div className="plans-carousel">
                {plansProps.map((plan: PlanType, index: number) => (
                    <Plan key={index} planData={plan} onDelete={onDelete} onSave={onSave}/>
                ))}
            </div>
        </div>
    );
}