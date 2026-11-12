import { Link } from "react-router-dom"
import { pushToDataLayer, trackClickCourseDetail } from "../../api/analytics";

export const CourseCard = ({ course, index }) => {

    const handleSelectCourse = () => {
        pushToDataLayer(trackClickCourseDetail(course, index));
    }

    return (
        <article className="flex flex-col w-[820px] gap-[13px] border border-[#9A9CA0] rounded-lg overflow-hidden sm:flex-row hover:shadow-2xl transition-shadow">
            <img src={course.imagen_url} alt={course.titulo} width={310} height={343}
                className="w-full sm:w-77.5 sm:h-85.75 shrink-0 object-cover" loading="lazy"
            />

            <div className="p-6 flex flex-col flex-1 gap-4">
                <div>
                    <h3 className="text-[24px] font-secondary font-bold text-dark leading-snug line-clamp-2">
                        {course.titulo}
                    </h3>
                </div>

                <p className="text-[16px] font-medium leading-[22.4px]">
                    {course.descripcion}
                </p>

                <div className="flex flex-wrap items-center gap-2 text-[14px] font-bold mb-2">
                    <span className="bg-primary/10 text-primary px-2.25 p-px rounded-lg border border-primary">{course.area_aprendizaje}</span>
                    <span className="bg-secondary/10 text-secondary px-2.25 p-px rounded-lg border border-secondary">{course.nivel}</span>
                    <span className="bg-dark/10 text-dark px-2.25 p-px rounded-lg border border-tertiary">{course.modalidad}</span>
                </div>

                <div className="flex mt-auto pt-4 border-t-[1px] border-[#9A9CA0] items-center justify-between gap-4">
                    {/*<div className="flex items-center gap-4 text-[16px] font-medium">
                        <span>{course.duration}</span>
                        <div className="flex gap-1">
                            <span>{course.rating}</span>
                            <span className="text-primary">{"\u2605"}</span>
                        </div>
                    </div> */}
                    <div className="flex items-center gap-4 text-[16px] font-medium">
                        <span>{course.duracion}</span>
                        {course.cupo_maximo != null && (
                            <span className="bg-primary/10 text-primary px-2.25 p-px rounded-lg border border-primary">
                                Cupo: {course.cupo_maximo}
                            </span>
                        )}
                        {course.activo === false && (
                            <span className="bg-error/10 text-error px-2.25 p-px rounded-lg border border-error">
                                No disponible
                            </span>
                        )}
                    </div>

                    <Link
                        to={`/courses/${course.id}`}
                        onClick={handleSelectCourse}
                        className="bg-primary text-white text-sm font-bold px-[94.5px] py-[14px] rounded-[30px]"
                    >
                        View more
                    </Link>
                </div>
            </div>
        </article>
    );
}