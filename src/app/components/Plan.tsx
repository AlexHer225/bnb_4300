import {useState} from "react";
import DayComponent from "./DayComponent";

interface planProps {
    title: string;

    days: {
        _id: string;
        date: Date;
        meals: {
            _id: string;
            title: string;
            image: string;
            readyInMinutes: number;
            sourceUrl: string;
            cheap: boolean;
            instructions: string;
            extendedIngredients: Array<string>;
            summary: string;
        }[];
    }[];
}

function Plan(props: planProps) {
    const [days, setDays] = useState(props.days);

    return (
        <div>
            <h1>{props.title}</h1>
            {days.map((day) => (
                <DayComponent key={day._id} day={day} />
            ))}
        </div>
    );
}
// Plan component that takes in a title and an array of days
export default Plan;