"use client"

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.bubble.css";
import 'react-quill/dist/quill.snow.css';

export const ReadText = ({ value }: { value: string }) => {
    const ReactQuill = useMemo(
        () => dynamic(() => import("react-quill"), { ssr: false }),
        []
    );

    return (
        <ReactQuill
            className="custom-quill"
            style={{ fontSize: "30px" }}
            theme="bubble"
            value={value}
            readOnly
        />
    );
};
