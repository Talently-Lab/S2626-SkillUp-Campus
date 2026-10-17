export const FRIENDLY_MESSAGES = {
    //de servidor y de red
    NETWORK_ERROR:
        "Parece que perdimos la conexión por un momento. Comprobá que todo esté funcionando y volvé a intentarlo.",
    DEFAULT:
        "Ups, parece que tuvimos un incoveniente. Volvé a intentarlo en unos segundos.",
    //para login
    INVALID_CREDENTIALS:
        "Casi. Revisá tu contraseña y volvé a intentarlo.",
    EMAIL_NOT_REGISTERED:
        "No encontramos una cuenta con este correo. Revisá que esté bien escrito o creá una cuenta.",
    //para el registro y la validacion
    EMAIL_ALREADY_REGISTERED:
        "Este correo ya tiene una cuenta en SkillUp. Probá iniciar sesión o recuperá tu contraseña.",
    INVALID_EMAIL:
        "Parece que tu correo necesita un pequeño ajuste. Comprobá que esté bien escrito y volvé a intentarlo.",
    INVALID_PASSWORD:
        "Tu contraseña es demasiado corta. Usá al menos 8 caracteres.",
    PASSWORD_MISMATCH:
        "Las contraseñas no coinciden. Volvé a escribirlas para asegurarte de que sean iguales.",
    REQUIRED_FIELD:
        "Nos falta este dato para continuar. Completalo y seguimos adelante.",
    //para cuando expire la sesion.
    SESSION_EXPIRED:
        "Parece que te tomaste un descanso. Volvé a iniciar sesión y seguí aprendiendo.",
    //este en teoria maneja el response 401 por lo que aplica para cualquier credencial incorrecta (email/password)
/*     VALIDATION_ERROR:
        "Revisá los datos ingresados e intentá de nuevo.", */

};

export function getFriendlyMessage(error, {hasToken = false} = {}) {
    if (!error) return FRIENDLY_MESSAGES.DEFAULT;

    if (error.code === "NETWORK_ERROR") {
        return FRIENDLY_MESSAGES.NETWORK_ERROR;
    }

    switch(error.code){
        case "EMAIL_NOT_REGISTERED":
            return FRIENDLY_MESSAGES.EMAIL_NOT_REGISTERED;
        case "INVALID_CREDENTIALS":
            return FRIENDLY_MESSAGES.INVALID_CREDENTIALS;
        case "EMAIL_ALREADY_REGISTERED":
            return FRIENDLY_MESSAGES.EMAIL_ALREADY_REGISTERED;
        case "REQUIRED_FIELD":
            return FRIENDLY_MESSAGES.REQUIRED_FIELD;
        case "INVALID_PASSWORD":
            return FRIENDLY_MESSAGES.INVALID_PASSWORD;
    }

    if(error.status === 401){
        if(hasToken){
            return FRIENDLY_MESSAGES.SESSION_EXPIRED;
        }
        return FRIENDLY_MESSAGES.INVALID_CREDENTIALS;
    }

    if(error.status === 409){
        return FRIENDLY_MESSAGES.EMAIL_ALREADY_REGISTERED;
    }

    if (error.code === "VALIDATION_ERROR" && error.errors?.length > 0) {
        const first = error.errors[0];

        if (first.code === "FIELD_REQUIRED") return FRIENDLY_MESSAGES.REQUIRED_FIELD;

        if (first.code === "INVALID_LENGTH" && first.field === "password") {
            return FRIENDLY_MESSAGES.INVALID_PASSWORD;
        }

        if (first.field === "email") return FRIENDLY_MESSAGES.INVALID_EMAIL;

        return first.message;
    }

    if(error.status >= 500){
        return FRIENDLY_MESSAGES.DEFAULT;
    }

    return error.message || FRIENDLY_MESSAGES.DEFAULT;
}