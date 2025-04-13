import Card from "./Card"

function DayComponent({ day }: { day: Day }) {
    return (
        <Card
            key={day._id}
            // title should be editable by user, but can figure this out later
            title={day.date.toString()}
            description={day.meals.map((meal: Meal) => meal.name).join(", ")}
        />
    );
}

export default DayComponent;