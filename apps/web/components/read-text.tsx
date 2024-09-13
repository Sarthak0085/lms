"use client"

import { cn } from "@repo/ui/lib/utils";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.bubble.css";
import 'react-quill/dist/quill.snow.css';

export const ReadText = ({ value, isCard = false }: { value: string; isCard?: boolean }) => {
    const ReactQuill = useMemo(
        () => dynamic(() => import("react-quill"), { ssr: false }),
        []
    );

    const newValue = value?.slice(0, 160) + `...`;

    return (
        <ReactQuill
            className={cn("custom-quill", isCard && "multi-line-ellipsis truncate")}
            style={{ fontSize: "30px" }}
            theme="bubble"
            value={isCard ? newValue : value}
            readOnly
        />
    );
};
