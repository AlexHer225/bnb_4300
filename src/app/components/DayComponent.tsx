import Card from "./Card"
import Day from "../models/daySchema";

function DayComponent({ day }: { day: typeof Day["prototype"] }) {
    return (
        <Card title={day.dayOfWeek}/>
    );
}

export default DayComponent;