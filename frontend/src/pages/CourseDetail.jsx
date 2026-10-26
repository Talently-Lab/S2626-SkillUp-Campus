import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getCourse, enrollInCourse } from "../api/api";
import { getFriendlyMessage } from "../api/errorMessages";
import { LoaderCircle } from "lucide-react";
import img from "../assets/imagen-placeholder.png";
import { pushToDataLayer, trackAttemptEnrollment } from "../api/analytics";

//CODIGO PROVISORIO HASTA QUE ESTE EL DISEÑO DE FIGMA
export const CourseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [enrolling, setEnrolling] = useState(false);
    const [enrollMsg, setEnrollMsg] = useState({ type: "", text: "" });
    const [enrolled, setEnrolled] = useState(false);

    useEffect(() => {
        let cancelled = false;

        getCourse(id)
            .then((data) => {
                if (!cancelled) setCourse(data);
            })
            .catch((err) => {
                if (!cancelled) setError(getFriendlyMessage(err));
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => { cancelled = true; };
    }, [id]);

    const handleEnroll = async () => {

        if(course){//toma el clic de una, no importa si esta logueado o no
            pushToDataLayer(trackAttemptEnrollment(course));
        }

        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login", { state: { from: `/courses/${id}` } });
            return;
        }

        setEnrollMsg({ type: "", text: "" });
        setEnrolling(true);

        try {
            await enrollInCourse(id, token);
            setEnrolled(true);
            setEnrollMsg({ type: "success", text: "¡Listo! Ya estás inscripto." });
            setTimeout(() => navigate("/dashboard"), 1200);
        } catch (err) {
            setEnrollMsg({ type: "error", text: getFriendlyMessage(err) });
        } finally {
            setEnrolling(false);
        }
    };

    if (loading) {
        return <p className="max-w-[1000px] mx-auto p-8 text-gray2">Cargando curso...</p>;
    }

    if (error) {
        return (
            <div className="max-w-[1000px] mx-auto p-8">
                <p role="alert" className="text-error mb-4">{error}</p>
                <Link to="/courses" className="text-secondary underline">
                    Volver al catálogo
                </Link>
            </div>
        );
    }

    if (!course) return null;

    const disponible = course.activo !== false;

    return (
        <div className="max-w-[1000px] mx-auto p-8">
            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
                <img
                    src={img}
                    alt={course.titulo}
                    className="w-full rounded-lg object-cover"
                />

                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 flex-wrap">
                        <h1 className="text-[32px] font-primary font-bold text-dark">
                            {course.titulo}
                        </h1>
                        {!disponible && (
                            <span className="bg-error/10 text-error text-sm font-bold px-3 py-1 rounded-lg border border-error">
                                No disponible
                            </span>
                        )}
                    </div>

                    <p className="text-[16px] font-secondary text-gray1 leading-relaxed">
                        {course.descripcion}
                    </p>

                    <p className="text-[14px] text-gray2">
                        Cupo máximo: <strong>{course.cupo_maximo}</strong>
                    </p>

                    {enrollMsg.text && (
                        <div
                            role={enrollMsg.type === "error" ? "alert" : "status"}
                            className={`p-3 rounded-lg text-sm ${
                                enrollMsg.type === "error"
                                    ? "bg-error/10 text-error"
                                    : "bg-success/10 text-success"
                            }`}
                        >
                            {enrollMsg.text}
                        </div>
                    )}

                    <div className="flex flex-wrap items-center gap-4 mt-2">
                        {enrolled ? (
                            <Link
                                to="/dashboard"
                                className="bg-secondary text-white font-bold px-8 py-3 rounded-[30px]"
                            >
                                Ir a mi panel
                            </Link>
                        ) : (
                            <button
                                type="button"
                                onClick={handleEnroll}
                                disabled={enrolling || !disponible}
                                className="bg-primary text-white font-bold px-8 py-3 rounded-[30px] flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {enrolling ? (
                                    <>
                                        <LoaderCircle className="h-5 w-5 animate-spin" />
                                        Inscribiendo...
                                    </>
                                ) : (
                                    "Inscribirme"
                                )}
                            </button>
                        )}

                        <Link to="/courses" className="text-secondary underline self-center">
                            Volver al catálogo
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};