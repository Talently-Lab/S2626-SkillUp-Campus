export const FRIENDLY_MESSAGES = {
    NETWORK_ERROR:
        "No pudimos conectarnos con el servidor. Verificá tu conexión.",
    INVALID_CREDENTIALS:
        "El correo o la contraseña son incorrectos. Volvé a intentarlo.",
    EMAIL_ALREADY_REGISTERED:
        "Ese correo ya tiene una cuenta. ¿Querés iniciar sesión?",
    VALIDATION_ERROR:
        "Revisá los datos ingresados e intentá de nuevo.",
    DEFAULT:
        "Algo salió mal. Intentá de nuevo en unos minutos.",
};

export function getFriendlyMessage(error) {
    if (!error) return FRIENDLY_MESSAGES.DEFAULT;

    if (error.code === "NETWORK_ERROR") {
        return FRIENDLY_MESSAGES.NETWORK_ERROR;
    }

    if (error.status === 401) {
        return FRIENDLY_MESSAGES.INVALID_CREDENTIALS;
    }

    if (error.status === 409) {
        return FRIENDLY_MESSAGES.EMAIL_ALREADY_REGISTERED;
    }

    if (error.code === "VALIDATION_ERROR" && error.errors?.length > 0) {
        return error.errors[0].message;
    }

    if (error.message) {
        return error.message;
    }

    return FRIENDLY_MESSAGES.DEFAULT;
}