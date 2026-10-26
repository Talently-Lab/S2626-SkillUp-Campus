const ANALYTICS_URL = import.meta.env.VITE_ANALYTICS_URL;
const ANALYTICS_KEY = import.meta.env.VITE_ANALYTICS_KEY;
const SESSION_KEY = "session_id";
//esto es todo "beta", con el tiempo de implementaran cambios
function getSessionId() {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
        id = `sess_${crypto.randomUUID()}`;
        sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
}

async function trackEvent(eventName, userId, errorDetail = "") {
    if (!ANALYTICS_URL || !ANALYTICS_KEY) {
        console.warn("[analytics] Faltan VITE_ANALYTICS_URL o VITE_ANALYTICS_KEY");
        return;
    }

    const payload = {
        key: ANALYTICS_KEY,
        user_id: userId || getSessionId(),
        event_name: eventName,
        error_detail: errorDetail,
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
        await fetch(ANALYTICS_URL, {
            method: "POST",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify(payload),
            signal: controller.signal,
            keepalive: true,
        });
    } catch (err) {
        console.warn("[analytics] No se pudo enviar el evento:", eventName, err.message);
    } finally {
        clearTimeout(timeoutId);
    }
}

export function trackViewRegisterForm() {
    return trackEvent("view_register_form", null);
}

export function trackClickRegister() {
    return trackEvent("click_register", null);
}

export function trackRegisterSuccess(userId) {
    return trackEvent("register_success", userId);
}

export function trackRegisterError(errorDetail, userId = null) {
    return trackEvent("register_error", userId, errorDetail);
}

export function extractErrorDetail(err) {
    if (err?.code === "NETWORK_ERROR") return "network_timeout";

    if (err?.status === 409) return "email_already_exists";

    if (err?.status >= 500) return "server_error";

    if (err?.code === "VALIDATION_ERROR" && err.errors?.length > 0) {
        const first = err.errors[0];
        if (first.field === "email") return "invalid_email_format";
        if (first.field === "password") return "password_too_short";
        if (first.field === "nombre") return "invalid_name";
    }

    return "unknown_error";
}

//tracker:
export const pushToDataLayer = (payload) => {
    if (typeof window === 'undefined') return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
};

//eventos:
export const extractCourseTelemetryData = (course) => ({
    id: course.id,
    titulo: course.titulo,
    area_aprendizaje: course.area_aprendizaje,
    nivel: course.nivel,
    modalidad: course.modalidad,
    duracion: course.duracion,
});

export const trackViewCourseList = (cantidadCursos, areaFiltrada = 'todas') => ({
    event: 'view_course_list',
    cantidad_cursos: cantidadCursos,
    area_filtrada: areaFiltrada,
});

export const trackClickCourseDetail = (course, index) => ({
    event: 'click_course_detail',
    ...extractCourseTelemetryData(course),
    posicion: index + 1,
});

export const trackAttemptEnrollment = (course) => ({
    event: 'attempt_enrollment',
    ...extractCourseTelemetryData(course),
});