import DayComponent from "./DayComponent";
import "../../css/dashboard.css";
import { useState } from "react";

interface PlanProps {
    plan: {
      _id: string;
      days: {
        _id: string;
        dayOfWeek: string;
        date: Date;
        meals: any[]; 
      }[];
    };
    selectedDayId: string | null;
    setSelectedDayId: (id: string | null) => void;
  }
  
  function Plan({ plan, selectedDayId, setSelectedDayId }: PlanProps) {

    const [selectedDay, setSelectedDay] = useState<string | null>(null);

    return (
      <div className="plan-flex-container">
        {plan.days.map((day) => (
            <DayComponent key={day._id} day={day} onClick={() => setSelectedDayId(day._id)} selectedDay={selectedDay} />
        ))}
      </div>
    );
  }
  
  export default Plan;