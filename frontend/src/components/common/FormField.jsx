import { useState } from "react";
import Eye from "../../assets/Eye.svg";
import EyeSlash from "../../assets/EyeSlash.svg";

const BORDER = {
    default: "border-info",
    success: "border-succes",
    warning: "border-warning",
    error: "border-error",
};

export function FormField({
    id,
    label,
    type = "text",
    value,
    onChange,
    placeholder,
    autoComplete,
    icon,
    isPassword = false,
    status = "default",
    helperText,
    required = true,
    minLength,
    className = "",
}) {
    const [show, setShow] = useState(false);
    const inputType = isPassword ? (show ? "text" : "password") : type;

    return (
        <div className={`w-[320px] ${className}`}>
            <label
                htmlFor={id}
                className="text-[16px] font-medium font-secondary block mb-[8px]"
            >
                {label}
            </label>

            <div
                className={`relative w-full h-[55px] bg-[#FFEAD1] border flex items-center transition-colors ${BORDER[status]}`}
            >
                {icon && (
                    <span className="absolute left-3 pointer-events-none flex items-center">
                        {icon}
                    </span>
                )}

                <input
                    id={id}
                    name={id}
                    type={inputType}
                    required={required}
                    minLength={minLength}
                    autoComplete={autoComplete}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full h-full pl-12 pr-12 bg-transparent outline-none text-[16px] placeholder:text-[16px] placeholder:text-[#4F4F4F] placeholder:font-normal placeholder:font-secondary"
                />

                <div className="absolute right-3 flex items-center gap-2">
                    {isPassword && (
                        <button
                            type="button"
                            onClick={() => setShow((v) => !v)}
                            aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
                            aria-pressed={show}
                            className="flex items-center cursor-pointer hover:opacity-70 transition"
                        >
                            <img
                                src={show ? Eye : EyeSlash}
                                alt=""
                                aria-hidden="true"
                                className="h-6 w-6"
                            />
                        </button>
                    )}
                </div>
            </div>

            {helperText && (
                <p className="mt-1 text-[12px] font-secondary text-[#4F4F4F] leading-snug">
                    {helperText}
                </p>
            )}
        </div>
    );
}
