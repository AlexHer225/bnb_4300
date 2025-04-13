interface CardProps {
    title: string;
    description: string;
}

const Card: React.FC<CardProps> = ({ title, description }) => {
    return (
        <div className="card" style={styles.card}>
            <div style={styles.content}>
                <h2 style={styles.title}>{title}</h2>
                <p style={styles.description}>{description}</p>
            </div>
        </div>
    );
};

const styles = {
    card: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        maxWidth: '300px',
        margin: '16px',
    },
    image: {
        width: '100%',
        height: 'auto',
    },
    content: {
        padding: '16px',
    },
    title: {
        fontSize: '1.5rem',
        margin: '0 0 8px',
    },
    description: {
        fontSize: '1rem',
        color: '#555',
    },
};

export default Card;