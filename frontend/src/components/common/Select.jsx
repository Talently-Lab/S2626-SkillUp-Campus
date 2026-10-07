import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function Select({ label, value, onChange, options }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (val) => {
        onChange(val);
        setOpen(false);
    };

    return (
        <div ref={ref}>
            <label className="block text-[16px] font-bold text-dark mb-1.5">
                {label}
            </label>
            <div className="relative">
                <button
                    ref={buttonRef}
                    type="button"
                    onClick={() => setOpen((o) => !o)}
                    className="w-full h-12.5 px-3 py-2 pr-10 text-[16px] text-left border-[1px] border-neutral rounded-[4px] focus:outline-none cursor-pointer appearance-none bg-white"
                >
                    {value || 'All'}
                </button>
                <ChevronDown
                    className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-[23px] h-[24px] text-dark transition-transform ${open ? "rotate-180" : ""}`}
                    strokeWidth={2}
                />

                {open && (
                    <ul
                        className={`absolute z-10 w-full bg-white border-[1px] border-neutral rounded-[4px] shadow-md `}
                    >
                        <li
                            onClick={() => handleSelect("")}
                            className="px-3 py-2 text-[16px] cursor-pointer hover:bg-[#FF9617] hover:text-neutral"
                        >
                            All
                        </li>
                        {options.map((opt) => (
                            <li
                                key={opt}
                                onClick={() => handleSelect(opt)}
                                className="px-3 py-2 text-[16px] cursor-pointer hover:bg-[#FF9617] hover:text-neutral"
                            >
                                {opt}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}