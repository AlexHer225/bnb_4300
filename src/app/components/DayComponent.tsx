import Card from "./Card"
import Day from "../models/daySchema";
import "../../css/dashboard.css";

function DayComponent({ day }: { day: typeof Day["prototype"] }) {
    return (
        <div className="day-card">
            <Card title={day.dayOfWeek}/>
        </div>
    );
}

export default DayComponent;