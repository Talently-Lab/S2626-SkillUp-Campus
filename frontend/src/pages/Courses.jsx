import { useState, useMemo } from 'react';
import { courses } from '../data/courses';
import { Sidebar } from "../components/courses/Sidebar";
import { CourseCard } from "../components/courses/CourseCard";
import hero from "../assets/hero-image.png";

const INITIAL_FILTERS = {
    learningArea: "",
    level: "",
    format: "",
    cost: "",
};

export const Courses = () => {
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState(INITIAL_FILTERS);

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const handleReset = () => {
        setSearch("");
        setFilters(INITIAL_FILTERS);
    };

    const filtered = useMemo(() => {
        return courses.filter((c) => {
            const matchSearch = c.courseTitle.toLowerCase().includes(search.toLowerCase());
            const matchesArea = !filters.learningArea || c.learningArea === filters.learningArea;
            const matchesLevel = !filters.level || c.level === filters.level;
            const matchesFormat = !filters.format || c.format === filters.format;
            const matchesCost = !filters.cost || c.cost === filters.cost;

            return matchSearch && matchesArea && matchesLevel && matchesFormat && matchesCost;
        });
    }, [search, filters]);

    return (
        <div>
            <section className="h-[587px] w-full bg-gradient-to-b from-[#FFEAD1] to-[#FF9617] flex flex-col justify-end">
                <div className="w-[1214px] h-[504px] mx-auto flex justify-between items-center">
                    <div className="w-[548px] h-[294px] font-primary space-y-3">
                        <h1 className="text-[#1E0523] text-[56px] font-bold leading-17">
                            A platform that helps you 
                            <span className="bg-linear-to-b from-[#FF9617] to-[#9417B1] bg-clip-text text-transparent"> find the missing piece</span>
                        </h1>
                        <p className="text-[20px] font-normal font-secondary leading-6">
                            At SkillUp, you can fill in the gaps in your skills to enhance your profile and become the best version of yourself, with up-to-date, high-quality content.
                        </p>
                    </div>

                    <div className="self-end relative bg-primary h-[504px] w-[427px] rounded-tl-[49%] rounded-tr-[49%]">
                        <img
                            src={hero}
                            alt="Descripción de la imagen"
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[427px] h-[499px] object-contain"
                        />
                    </div>
                </div>
            </section>
            <div className="max-w-[1300px] mx-auto px-4 sm:px-6 py-18">
                <div className="flex justify-between">
                    <section className="w-[397px]">
                        <Sidebar search={search} onSearchChange={setSearch}
                            filters={filters} onFilterChange={handleFilterChange} onReset={handleReset}
                        />
                    </section>
                    <section className="flex flex-col gap-4 p-4">
                        {filtered.length === 0 ? (
                            <p className="text-center py-12">
                                No courses found.
                            </p>
                        ) : (
                            filtered.map((course) => (
                                <CourseCard key={course.id} course={course} />
                            ))
                        )}
                    </section>
                </div>
            </div>
        </div>

    );
}