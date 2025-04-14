import DayComponent from "./DayComponent";

function Plan() {
    return (
        <div className="plan">
            <h1>Plan</h1>
            <DayComponent day={{dayOfWeek: "Monday"}}/>
            <DayComponent day={{dayOfWeek: "Tuesday"}}/>
            <DayComponent day={{dayOfWeek: "Wednesday"}}/>
            <DayComponent day={{dayOfWeek: "Thursday"}}/>
            <DayComponent day={{dayOfWeek: "Friday"}}/>
            <DayComponent day={{dayOfWeek: "Saturday"}}/>
            <DayComponent day={{dayOfWeek: "Sunday"}}/>
        </div>
    );
}

export default Plan;