import { MouseEventHandler, ReactNode } from 'react';
import "../../css/dashboard.css"

interface ButtonProps {
    onClick: MouseEventHandler<HTMLButtonElement>;
}

function Button({ onClick }: ButtonProps) {
    return (
        <button onClick = {onClick}>
            Add Meal
        </button>
    );
}

export default Button;