import React from 'react';
import { Skeleton } from "@/components/ui/Skeleton";

const EventCardSkeleton = () => {
    return (
        <div className="w-full rounded-2xl overflow-hidden bg-[#0a0f1e] border border-white/8 flex flex-col">
            {/* 16:9 poster placeholder */}
            <div className="w-full aspect-video">
                <Skeleton className="w-full h-full rounded-none" />
            </div>

            {/* Card body */}
            <div className="p-5 flex flex-col gap-3">
                {/* Title */}
                <Skeleton className="h-5 w-3/4 bg-white/10 rounded-lg" />
                {/* Description */}
                <Skeleton className="h-4 w-full bg-white/10 rounded-lg" />
                <Skeleton className="h-4 w-5/6 bg-white/10 rounded-lg" />
                {/* Meta */}
                <div className="flex gap-3 mt-1">
                    <Skeleton className="h-3.5 w-24 bg-white/10 rounded" />
                    <Skeleton className="h-3.5 w-20 bg-white/10 rounded" />
                </div>
                {/* Button */}
                <Skeleton className="h-10 w-full bg-white/10 rounded-xl mt-1" />
            </div>
        </div>
    );
};

export default EventCardSkeleton;
