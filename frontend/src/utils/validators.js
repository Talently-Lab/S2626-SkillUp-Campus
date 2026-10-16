export const validateEmail = (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "valid" : "invalid";

export const validateName = (v) => {
    const t = v.trim();
    if (t.length < 2) return "invalid";
    if (t.length < 3) return "warning";
    return "valid";
};

export const validatePassword = (v) => {
    if (v.length < 8) return "invalid";
    const hasLetter = /[a-zA-Z]/.test(v);
    const hasNumber = /\d/.test(v);
    const hasSymbol = /[^a-zA-Z0-9]/.test(v);
    const score = [hasLetter, hasNumber, hasSymbol].filter(Boolean).length;
    if (score === 3) return "valid";
    return "warning";
};

export const getFieldStatus = (value, validate) => {
    if (!value) return "default";
    const r = validate(value);
    if (r === "valid") return "success";
    if (r === "warning") return "warning";
    if (r === "invalid") return "error";
    return "default";
};