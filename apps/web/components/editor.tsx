"use client"

import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useMemo } from "react";

interface EditorProps {
    placeholder: string;
    onChange: (value: string) => void | React.Dispatch<React.SetStateAction<string>>;
    value?: string;
}

export const Editor = ({ placeholder, onChange, value }: EditorProps) => {
    const ReactQuill = useMemo(
        () => dynamic(() => import("react-quill"), { ssr: false }),
        []
    );

    return (
        <ReactQuill
            theme="snow"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
}