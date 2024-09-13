import { currentUser } from "@/lib/auth";
import { db } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
    _req: NextRequest,
    { params }: { params: { userId: string; } }
) => {
    try {
        const user = await currentUser();
        if (!user || !user?.id) {
            return NextResponse.json({ error: "Unauthorized. Please login to access this" }, { status: 401 });
        }

        if (user?.id !== params.userId) {
            return NextResponse.json({ error: "Forbidden you are not allowed to do this" }, { status: 403 })
        }

        const data = await db.purchase.findMany({
            where: {
                userId: params?.userId,
            },
            include: {
                course: {
                    include: {
                        content: true
                    }
                }
            }
        });

        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        console.error("Internal Error", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}