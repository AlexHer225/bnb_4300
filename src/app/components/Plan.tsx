import Card from '.Card';

interface PlanProps {
    plan: {
        id: number;
        name: string;
        // plan has MealPlan ?
    };
};

export default function Plan({ plan } : PlanProps) {
    return (
        <Card className = {}>
            <div className = {}>
                <h2> {plan.name} </h2>
            </div>
        </Card>
    );
}