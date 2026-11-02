export const CourseCardSkeleton = () => (
    <div className="flex flex-col w-[820px] border border-[#9A9CA0] rounded-lg overflow-hidden sm:flex-row animate-pulse">
        <div className="w-full sm:w-77.5 sm:h-85.75 bg-gray4 shrink-0" />

        <div className="p-6 flex flex-col flex-1 gap-4">
            <div className="space-y-2">
                <div className="h-6 bg-gray4 rounded w-3/4" />
                <div className="h-6 bg-gray4 rounded w-1/2" />
            </div>

            <div className="space-y-2">
                <div className="h-4 bg-gray4 rounded w-full" />
                <div className="h-4 bg-gray4 rounded w-5/6" />
                <div className="h-4 bg-gray4 rounded w-2/3" />
            </div>

            <div className="flex gap-2 mt-2">
                <div className="h-6 w-24 bg-gray4 rounded-lg" />
                <div className="h-6 w-20 bg-gray4 rounded-lg" />
            </div>

            <div className="mt-auto pt-4 border-t border-[#9A9CA0] flex justify-end">
                <div className="h-10 w-32 bg-gray4 rounded-[30px]" />
            </div>
        </div>
    </div>
);