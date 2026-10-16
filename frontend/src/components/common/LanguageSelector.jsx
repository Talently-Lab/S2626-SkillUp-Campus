import { ChevronDown, Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const LANGUAGES = [
    { code: "en", label: "English" },
    { code: "es", label: "Español" },
];

export function LanguageSelector({ value = "en", onChange }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (code) => {
        onChange?.(code);
        setOpen(false);
    };

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-label="Change language"
                aria-haspopup="listbox"
                aria-expanded={open}
                className="flex w-[43.86px] h-[25.67px] items-center gap-1 text-[#FFEAD1] hover:text-primary transition-colors cursor-pointer"
            >
                <Globe className="w-[18px] h-[18px]" />
                <ChevronDown
                    className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
                    strokeWidth={2}
                />
            </button>

            {open && (
                <ul
                    role="listbox"
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-1 z-50 min-w-[30px] bg-white border border-neutral rounded-[4px] shadow-md overflow-hidden"
                >
                    {LANGUAGES.map((lang) => (
                        <li
                            key={lang.code}
                            role="option"
                            aria-selected={value === lang.code}
                            onClick={() => handleSelect(lang.code)}
                            className={`px-2 py-2 text-[10px] text-dark cursor-pointer hover:bg-[#FF9617] hover:text-white ${value === lang.code ? "font-extrabold" : ""
                                }`}
                        >
                            {lang.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}