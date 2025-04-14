import Card from "./Card"
import Meal from "../models/mealSchema";
import Day from "../models/daySchema";

function DayComponent({ day }: { day: typeof Day["prototype"] }) {
    return (
        <Card
            key={day.dayOfWeek}
            // title should be editable by user, but can figure this out later
            title={day.date.toString()}
            description={day.meal.map((meal: typeof Meal) => meal.name).join(", ")}
        />
    );
}

export default DayComponent;