import {useState} from "react";
import DayComponent from "./DayComponent";
import { randomUUID } from "crypto";

interface planProps {
    title: string;

    days: typeof DayComponent["prototype"][];
}

function Plan(props: planProps) {
    const [days, setDays] = useState(props.days);

    return (
        <div>
            <h1>{props.title}</h1>
            {days.map((day) => (
                <DayComponent key={Number(randomUUID)} day={day} />
            ))}
        </div>
    );
}
// Plan component that takes in a title and an array of days
export default Plan;