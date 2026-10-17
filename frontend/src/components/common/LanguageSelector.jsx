import { useEffect, useRef, useState } from "react";
import Globe from "../../assets/Globe.svg"
import ChevronDown from "../../assets/ChevronDown.svg"

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
                className="flex w-[43.86px] h-[25.67px] items-center gap-2 text-[#FFEAD1] hover:text-primary transition-colors cursor-pointer"
            >
                <img src={Globe} alt="" width={25.67} height={25.67} />
                <img src={ChevronDown} alt="" width={10.5} height={4} className={`transition-transform ${open ? "rotate-180" : ""}`}/>
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