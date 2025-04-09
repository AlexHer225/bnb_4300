import Plan from '.Plans';

const Plans = ({plans}) => {
    return (
        <div>
            {plans.map((plan) => (
                <Plan key={plan.id} plan={plan} />
            ))}
        </div>
    );
};

export default Plans;