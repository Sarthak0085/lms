import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { cn } from "@repo/ui/lib/utils";
import React from "react";

interface SortableItemProps {
    id: string;
    children: React.ReactNode,
    parentId?: string;
}

export const SortableItem = ({ id, children, parentId }: SortableItemProps) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id,
        transition: {
            duration: 150, // milliseconds
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
        },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        // border: `2px solid ${isDragging && "blue"}`
        // Add other styles if necessary
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={cn("w-full flex items-center bg-white/60 dark:bg-black/30 border border-black/20 dark:border-white/20 rounded-lg text-sm font-medium p-3 my-4 cursor-grab",
                parentId && "w-[95%] bg-slate-200",
                isDragging && "border-2 border-blue-600 dark:border-blue-400"
            )}
        >
            {children}
        </div>
    );
};