interface CardProps {
    title: string;
    children: React.ReactNode;
}

function Card ({ title, children } : CardProps) {
    return (
        <div className="card">
            <div className="card-content">
                <h1>{title}</h1>
                <div>{children}</div>
            </div>
        </div>
    );
}

export default Card;