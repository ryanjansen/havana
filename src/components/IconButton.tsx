import React from "react";
import { Tooltip } from "react-tooltip";

type IconButtonProps = {
    icon: React.ReactNode;
    label?: string;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    tooltip?: string;
    tooltipId?: string;
};

const IconButton: React.FC<IconButtonProps> = ({
    icon,
    label,
    onClick,
    disabled = false,
    className = "",
    tooltip = "",
    tooltipId = "",
}) => (
    <>
        <button
            type="button"
            className={`${tooltipId} text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-large rounded-full text-sm p-3 text-center inline-flex items-center bg-blue-600 hover:bg-blue-800 ${className}`}
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
        <Tooltip
            anchorSelect={`.${tooltipId}`}
            place="top"
            noArrow
            style={{
                backgroundColor: "#71797E",
            }}
        >
            {tooltip}
        </Tooltip>
    </>
);

export default IconButton;
