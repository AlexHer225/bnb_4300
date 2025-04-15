import DayComponent from "./DayComponent";
import "../../css/dashboard.css";

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
  }
  
  function Plan({ plan }: PlanProps) {
    return (
      <div className="plan">
        <h1>Plan</h1>
        {plan.days.map((day) => (
            <DayComponent key={day._id} day={day} />
        ))}
      </div>
    );
  }
  
  export default Plan;