import DayComponent from "./DayComponent";
import Image from "next/image";
//import Card from "./Card";
import "../../css/dashboard.css";

interface PlanProps {
    plan: {
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
        <Image src="./favicon.ico" alt="Plan Image" />
        {plan.days.map((day) => (
            //<Card key={day._id} day={day}/>
            <DayComponent key={day._id} day={day} />
        ))}
      </div>
    );
  }
  
  export default Plan;