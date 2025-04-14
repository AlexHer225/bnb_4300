import { MouseEventHandler, ReactNode } from 'react';

interface ButtonProps {
    onClick: MouseEventHandler<HTMLButtonElement>;
}

function Button({ onClick }: ButtonProps) {
    return (
        <button onClick = {onClick}>
            ADD
        </button>
    );
}

export default Button;