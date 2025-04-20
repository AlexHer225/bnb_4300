import DayComponent from "./DayComponent";
import "../../css/dashboard.css";
import { useEffect, useState } from "react";

interface PlanProps {
  planData: {
      _id: string;
      days: string[];
  };
  selectedDayId: string | null;
  setSelectedDayId: (id: string | null) => void;
}
  
  function Plan({ planData, selectedDayId, setSelectedDayId }: PlanProps) {
    const [selectedDay, setSelectedDay] = useState<string | null>(null);

    if (!planData.days) return <h2>Error, no Plan</h2>;
    return (
      <div className="plan-flex-container">
        {planData.days.map((day) => (
            <DayComponent key={day} id={day} />
        ))}
      </div>
    );
  }
  
  export default Plan;