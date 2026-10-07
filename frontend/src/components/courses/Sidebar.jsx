import { LEARNING_AREAS, LEVELS, FORMATS, COSTS } from "../../data/filters";
import { Search, X } from "lucide-react";
import { Select } from "../common/Select";


export const Sidebar = ({ search, onSearchChange, filters, onFilterChange, onReset }) => {

    return (
        <aside className="shrink-0 p-4 flex flex-col gap-3 sticky top-10">
            <div className="relative w-full">
                <Search
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark"
                    strokeWidth={2}
                />
                <input
                    type="search"
                    placeholder="Search courses..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full h-[62px] pl-12 pr-12 text-[16px] border border-neutral bg-[#F5F6F6] rounded-[31px] focus:outline-none
                                [&::-webkit-search-cancel-button]:appearance-none
                                [&::-webkit-search-decoration]:appearance-none"
                />
                {search && (
                    <button
                        type="button"
                        onClick={() => onSearchChange('')}
                        aria-label="Clear search"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-dark cursor-pointer"
                    >
                        <X className="w-5 h-5" strokeWidth={2} />
                    </button>
                )}
            </div>

            <div className="flex flex-col gap-[33px]">
                <div className="flex items-center justify-between">
                    <h2 className="text-[16px] font-bold text-secondary">Filters</h2>
                    <button type="button" onClick={onReset} className="text-[16px] font-normal text-[#1E0523] hover:underline cursor-pointer">
                        Clear all
                    </button>
                </div>

                <div>
                    <Select label={"Category"} value={filters.learningArea} onChange={(v) => onFilterChange("learningArea", v)} options={LEARNING_AREAS} />
                    <Select label={"Level"} value={filters.level} onChange={(v) => onFilterChange("level", v)} options={LEVELS} />
                    <Select label={"Mode"} value={filters.format} onChange={(v) => onFilterChange("format", v)} options={FORMATS} />
                    <Select label={"Cost"} value={filters.cost} onChange={(v) => onFilterChange("cost", v)} options={COSTS} />
                </div>
            </div>

        </aside>
    );
}