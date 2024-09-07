/* eslint-disable no-unused-vars */
import {
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { Content, ContentType } from "@repo/db/types";
import { AiOutlineDelete, BiPencil, ChevronDown, Grip, PlusCircledIcon } from "@repo/ui/icon";
import { cn } from "@repo/ui/lib/utils";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates
} from "@dnd-kit/sortable";
import { SortableItem } from "./sortable-item";
import { Button } from "@repo/ui";
import Link from "next/link";

interface SectionListProps {
    items: Content[];
    onReorder: (updateData: { id: string; position: number }[]) => void;
    courseId: string;
    handleFolderEdit: (id: string) => void;
}

export const SectionList = ({
    items,
    onReorder,
    handleFolderEdit,
    courseId
}: SectionListProps) => {
    const [isOpen, setIsOpen] = useState<{ [key: string]: boolean }>(
        items.filter(item => item.type === ContentType.FOLDER).reduce((acc, item) => {
            acc[item.id] = false;
            return acc;
        }, {} as { [key: string]: boolean })
    );
    const [isMounted, setIsMounted] = useState(false);
    const [sections, setSections] = useState(items);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        setSections(items);
    }, [items]);

    const handleDragEnd = (event: DragEndEvent) => {
        if (!event.active || !event.over) return;

        const { active, over } = event;
        const activeId = active.id as string;
        const overId = over.id as string;

        const updatedSections = [...sections];

        const activeItemIndex = updatedSections.findIndex(section => section.id === activeId);
        const overItemIndex = updatedSections.findIndex(section => section.id === overId);

        if (activeItemIndex === -1 || overItemIndex === -1) return;

        // Check if both items are in the same parent or different parents
        const activeItem = updatedSections[activeItemIndex];
        const overItem = updatedSections[overItemIndex];

        if (!activeItem || !overItem) return;

        if (activeItem.type === ContentType.FOLDER && overItem.type === ContentType.FOLDER) {
            // Handle reordering of parent sections
            const folders = updatedSections.filter(section => section.type === ContentType.FOLDER);
            const newFolders = arrayMove(folders, folders.findIndex(f => f.id === activeId), folders.findIndex(f => f.id === overId));
            const newSections = newFolders.concat(updatedSections.filter(section => section.type !== ContentType.FOLDER));

            // Update positions
            const bulkUpdateData = newFolders.map((folder, index) => ({
                id: folder.id,
                position: index,
            }));

            setSections(newSections);
            onReorder(bulkUpdateData);
        } else if (activeItem.type !== ContentType.FOLDER && overItem.type === ContentType.FOLDER) {
            // Reordering children within a folder
            const parentFolderId = overItem.id;

            const children = updatedSections.filter(section => section.parentId === parentFolderId);
            const newChildren = arrayMove(children, children.findIndex(c => c.id === activeId), children.findIndex(c => c.id === overId));

            const otherSections = updatedSections.filter(section => section.parentId !== parentFolderId);
            const newSections = otherSections.concat(newChildren);

            // Update positions
            const bulkUpdateData = newChildren.map((child, index) => ({
                id: child.id,
                position: index,
                parentId: parentFolderId,
            }));

            setSections(newSections);
            onReorder(bulkUpdateData);
        }
    };

    const handleIsOpenChange = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    }

    const sensors = useSensors(
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
        useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
    );

    if (!isMounted) return null;

    return (
        <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
            <SortableContext items={sections.filter(section => section.type === ContentType.FOLDER).map(section => section.id)} >
                <div className="w-full flex flex-col items-center justify-center">
                    {sections.filter(section => section.type === ContentType.FOLDER).map((section, index) => (
                        <>
                            <SortableItem key={section.id || index} id={section.id}>
                                <div >
                                    <Grip className="h-4 w-4 mr-4" />
                                </div>
                                {section.title}
                                <div className="ml-auto flex gap-2">
                                    <BiPencil
                                        className="h-4 w-4 text-blue-600 cursor-pointer hover:scale-110"
                                        aria-label="Edit Parent Section"
                                        onClick={(e) => handleFolderEdit(section?.id)}
                                    />
                                    <AiOutlineDelete
                                        className="text-red-600 cursor-pointer hover:scale-110"
                                        size={18}
                                        aria-label="Delete Parent Section"
                                        onClick={() => handleFolderEdit(section.id)}
                                    />
                                    <ChevronDown
                                        className={cn("h-5 w-5 cursor-pointer hover:scale-105", isOpen[section?.id] && "rotate-180")}
                                        onClick={(e) => handleIsOpenChange(section?.id, e)}
                                        aria-label="Open Child Sections"
                                    />
                                </div>
                            </SortableItem>
                            {
                                isOpen[section.id] &&
                                <>
                                    {sections
                                        .filter(childSection => childSection.type !== ContentType.FOLDER && childSection.parentId === section.id)
                                        .map((childSection, index) => (
                                            <SortableItem key={childSection.id || index} id={childSection.id} parentId={childSection?.parentId as string}>
                                                <div >
                                                    <Grip className="h-4 w-4 mr-4 " />
                                                </div>
                                                {childSection.title}
                                                <div className="ml-auto flex gap-2">
                                                    <Link href={`/admin/course/${courseId}/sections/${section?.id}/${childSection?.id}`}>
                                                        <BiPencil
                                                            className="h-4 w-4 text-blue-600  cursor-pointer hover:scale-110"
                                                            aria-label="Edit Child Section"
                                                        />
                                                    </Link>
                                                    <AiOutlineDelete
                                                        className="text-red-600 cursor-pointer hover:scale-110"
                                                        size={18}
                                                        aria-label="Delete Child Section"
                                                    // onClick={() => handleChildEdit(section.id)}
                                                    />
                                                </div>
                                            </SortableItem>
                                        ))}
                                    <Button
                                        variant="primary"
                                        asChild
                                    >
                                        <Link href={`/admin/course/${courseId}/sections/${section?.id}`}>
                                            <PlusCircledIcon className="me-2 size-4" />
                                            Add Child Section
                                        </Link>
                                    </Button>
                                </>
                            }
                        </>
                    )
                    )}
                </div>
            </SortableContext>
        </DndContext>
    );
};
