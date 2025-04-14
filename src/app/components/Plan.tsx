import DayComponent from "./DayComponent";
import "../../css/dashboard.css";

type Day = {
    dayOfWeek: string;
    date?: Date;
    meals?: {name: string}[]; 
}

type PlanProps = {
    title: string;
    days: Day[];
}

function Plan({ title, days }: PlanProps) {
    return (
        <div className="plan-container">
            <DayComponent day={{dayOfWeek: "Monday"}}/>
            <DayComponent day={{dayOfWeek: "Tuesday"}}/>
            <DayComponent day={{dayOfWeek: "Wednesday"}}/>
            <DayComponent day={{dayOfWeek: "Thursday"}}/>
            <DayComponent day={{dayOfWeek: "Friday"}}/>
            <DayComponent day={{dayOfWeek: "Saturday"}}/>
            <DayComponent day={{dayOfWeek: "Sunday"}}/>
        </div>
    );
}

export default Plan;