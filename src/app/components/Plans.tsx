import Plan from "./Plan";
import Button from "./Button";
import { useState } from "react";
import DayComponent from "./DayComponent";
import '../../css/dashboard.css';

// Carousel of plans 
export default function Plans({title, days}: { title: string, days: typeof DayComponent['prototype'][] }) {
    // handler -> on click, creates new plan
    function handleClick() {

    }

    return (
        <div className="plans">
            <h2 className="plans-title">{title}</h2>
            <div className="plans-days">
                <Plan title={title} days={days} />
            </div>
        </div>
    );
}