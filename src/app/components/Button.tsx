import { MouseEventHandler, ReactNode } from 'react';
import "../../css/dashboard.css"

interface ButtonProps {
    onClick: MouseEventHandler<HTMLButtonElement>;
    text?: string;
}

function Button({ onClick, text }: ButtonProps) {
    return (
        <button onClick = {onClick}>
            <div className="button-text">{text}</div>
        </button>
    );
}

export default Button;