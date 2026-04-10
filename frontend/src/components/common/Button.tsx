import React, { forwardRef } from "react";

type ButtonProps = {
    text: string;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    type?: "button" | "submit" | "reset";
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ text, onClick, disabled = false, className = "", type = "button" }, ref) => {
        return (
            <button
                ref={ref}
                type={type}
                onClick={onClick}
                disabled={disabled}
                className={`
          px-5 py-2 rounded-xl font-medium transition-all duration-200
          ${disabled
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700 active:scale-95"}
          text-white
          ${className}
        `}
            >
                {text}
            </button>
        );
    }
);

Button.displayName = "Button";

export default Button;