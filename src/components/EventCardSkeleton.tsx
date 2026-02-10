import React from 'react';
import { Skeleton } from "@/components/ui/Skeleton";

const EventCardSkeleton = () => {
    return (
        <div className="relative w-full aspect-3/4 rounded-4xl overflow-hidden bg-white/5 border border-white/10">
            {/* Image Placeholder */}
            <Skeleton className="absolute inset-0 w-full h-full" />

            {/* Content Container */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                {/* Title & Description */}
                <div className="mb-4 space-y-3">
                    <Skeleton className="h-8 w-3/4 bg-white/20" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full bg-white/20" />
                        <Skeleton className="h-4 w-5/6 bg-white/20" />
                        <Skeleton className="h-4 w-4/6 bg-white/20" />
                    </div>
                </div>

                {/* Badges Row */}
                <div className="flex items-center gap-3 mb-6">
                    <Skeleton className="h-8 w-20 rounded-full bg-white/20" />
                    <Skeleton className="h-8 w-24 rounded-full bg-white/20" />
                </div>

                {/* Button */}
                <Skeleton className="h-12 w-full rounded-full bg-white/20" />
            </div>
        </div>
    );
};

export default EventCardSkeleton;
