import React from "react";

type IconButtonProps = {
    icon: React.ReactNode;
    label?: string;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
};

const IconButton: React.FC<IconButtonProps> = ({
    icon,
    label,
    onClick,
    disabled = false,
    className = "",
}) => (
    <button
        type="button"
        className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-large rounded-full text-sm p-3 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${className}`}
        onClick={onClick}
        disabled={disabled}
        aria-label={label}
        style={{
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.6 : 1,
        }}
    >
        {icon}
        {label && <span style={{ marginLeft: "0.5rem" }}>{label}</span>}
    </button>
);

export default IconButton;
