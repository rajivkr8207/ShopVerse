import React, { forwardRef } from "react";

type ButtonProps = {
    text: string;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "outline" | "ghost";
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ text, onClick, disabled = false, className = "", type = "button", variant = "primary" }, ref) => {
        const variants = {
            primary: "bg-[var(--primary)] text-[var(--neutral)] hover:opacity-90 shadow-lg shadow-[#00E5FF]/20",
            secondary: "bg-[var(--tertiary)] text-white hover:opacity-90",
            outline: "border-2 border-[var(--primary)] text-[var(--primary)] bg-transparent hover:bg-[var(--primary)] hover:text-[var(--neutral)]",
            ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-white/5",
        };

        return (
            <button
                ref={ref}
                type={type}
                onClick={onClick}
                disabled={disabled}
                className={`
          px-6 py-2.5 rounded-xl font-semibold transition-all duration-300
          ${disabled
                        ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                        : variants[variant]}
          active:scale-95 flex items-center justify-center gap-2
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