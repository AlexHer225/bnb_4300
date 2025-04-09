import { ReactNode } from 'react';

interface CardProps {
    className?: string; // Optional additional CSS classes
    children: ReactNode; // Content inside the card
  }

const Card: React.FC<CardProps> = ({ className = '', children }) => {
  const classes = `card ${className}`; // Combine card class with additional classes

  return <div className={classes}>{children}</div>;
};
export default Card;