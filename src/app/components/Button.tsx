import { MouseEventHandler, ReactNode } from 'react';
import "../../css/dashboard.css"

interface ButtonProps {
    onClick: MouseEventHandler<HTMLButtonElement>;
    text?: string;
}

function Button({ onClick, text }: ButtonProps) {
    return (
        <button onClick = {onClick}>
            {text}
        </button>
    );
}

export default Button;