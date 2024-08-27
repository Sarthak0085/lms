"use client";

import { Button } from "@repo/ui/components/ui/button";
import { FaGithub, FcGoogle } from "@repo/ui/icon";
import React from "react";
// import { signIn } from "next-auth/react";
// import { FaGithub } from "react-icons/fa";
// import { FcGoogle } from "react-icons/fc";

export const Social = () => {
    // const onClick = (provider: "google" | "github") => {
    //     signIn(provider);
    // };
    return (
        <div className="flex items-center w-full gap-x-2">
            <Button
                size={"lg"}
                className="w-full"
                variant={"outline"}
            // onClick={() => {
            //     onClick("google");
            // }}
            >
                <FcGoogle className="h-5 w-5" />
            </Button>
            <Button
                size={"lg"}
                className="w-full"
                variant={"outline"}
            // onClick={() => {
            //     onClick("github");
            // }}
            >
                <FaGithub className="h-5 w-5" />
            </Button>
        </div>
    );
};
