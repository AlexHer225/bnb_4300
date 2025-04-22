import DayComponent from "./DayComponent";
import "../../css/dashboard.css";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

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
    const [isSaved, setIsSaved] = useState<boolean>(true);

    const { data: session, status } = useSession();

    useEffect(() => {
      const getPlan = async () => {
        const response = await fetch(`/api/plans/${planData._id}`, {method: 'GET'});
        const plan = await response.json();
        console.log('plan: ', plan);
        console.log('plan.user: ', plan[0].user);
        setIsSaved(!!plan[0].user);
      }
      getPlan();
    }, []);

    const savePlan = async () => {
      // console.log('updating plan to have user: ', session?.user?.id);
      await fetch(`api/plans/${planData._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          user: session?.user?.id
        })
      })
    };

    if (!planData.days) return <h2>Error, no Plan</h2>;
    return (
      <div className="plan-flex-container-parent">
        <div className="plan-flex-container">
          {planData.days.map((day) => (
            <DayComponent key={day} id={day} />
          ))}
          </div>
        {session?.user && isSaved == false &&
          (<button className="save-plan-button" onClick={savePlan}>Save Plan</button>)}
        
      </div>
    );
  }
  
  export default Plan;