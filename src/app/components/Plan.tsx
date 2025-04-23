import DayComponent from "./DayComponent";
import "../../css/dashboard.css";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface PlanProps {
  planData: {
      _id: string;
      days: string[];
  };

  onDelete?: (deletedId: string) => void;
  onSave?: (savedId: string) => void;
}
  
  function Plan({ planData, onDelete, onSave }: PlanProps) {
    const [isSaved, setIsSaved] = useState<boolean>(true);

    const { data: session, status } = useSession();

    useEffect(() => {
      const getPlan = async () => {
        const response = await fetch(`/api/plans/${planData._id}`, {method: 'GET'});
        const plan = await response.json();
        setIsSaved(!!plan[0].user);
      }
      getPlan();
    }, []);

    async function savePlanHandler() {
      if (onSave) {
        console.log("saved");
        onSave(planData._id);
      }
    }

    async function deletePlanHandler() {
      if (onDelete) {
        console.log("deleted");
        onDelete(planData._id);
      } 
    } 

    if (!planData.days) return <h2>Error, no Plan</h2>;
    return (
      <div className="plan-flex-container-parent">
        <div className="plan-flex-container">
          {planData.days.map((day) => (
            <DayComponent key={day} id={day} />
          ))}
        </div>
        <div className = "plan-buttons-container">
          {session?.user && isSaved == false &&
            (<button className="save-plan-button" onClick={savePlanHandler}>Save Plan</button>)}
          {session?.user &&  
            (<button className="delete-plan-button" onClick={deletePlanHandler}>Delete Plan</button>)}
        </div>
      </div>
    );
  }
  
  export default Plan;