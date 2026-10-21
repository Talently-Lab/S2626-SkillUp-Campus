const API_URL = import.meta.env.VITE_API_URL;

export class ApiError extends Error {
    constructor({ status, code, message, errors }) {
        super(message || "Ocurrió un error inesperado.");
        this.name = "ApiError";
        this.status = status;
        this.code = code;
        this.errors = errors || [];
    }
}


async function request(endpoint, { method = "GET", body, token } = {}) {
    const headers = {
        "Content-Type": "application/json",
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    let res;
    try {
        res = await fetch(`${API_URL}${endpoint}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        });
    } catch {
        throw new ApiError({
            status: 0,
            code: "NETWORK_ERROR",
            message: "No pudimos conectarnos con el servidor. Verificá tu conexión.",
        });
    }

    if (res.status === 204) return null;

    const data = await res.json().catch(() => null);

    if (!res.ok) {
        if (res.status === 401 && token) {
            localStorage.removeItem("token");
            localStorage.removeItem("usuario");
            window.location.href = "/login";
        }

        throw new ApiError({
            status: res.status,
            code: data?.code,
            message: data?.message || data?.error || `Error ${res.status}`,
            errors: data?.errors,
        });
    }

    return data;
}





export async function register({ nombre, email, password }) {
    return request("/auth/register", {
        method: "POST",
        body: { nombre, email, password },
    });
}
export async function login({ email, password }) {
    return request("/auth/login", {
        method: "POST",
        body: { email, password },
    });
}