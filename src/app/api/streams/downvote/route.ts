import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const DownvoteSchema = z.object({
    streamId: z.string() 
});

export async function POST(req: NextRequest) {
    try {
        const {userId} = await auth();
        if (!userId) {
            return NextResponse.json(
                { message: "Unauthorized: User not found" },
                { status: 403 }
            );
        }

        const { streamId } = DownvoteSchema.parse(await req.json()); 

        await prisma.upvote.delete({
            where: {
                userId_streamId: {
                    userId,
                    streamId
                }
            }
        });

        return NextResponse.json({ message: "Upvote removed successfully" });
    } catch (err) {
        console.error("Downvote Error:", err);

        return NextResponse.json(
            { message: "Error while removing upvote" },
            { status: 500 } 
        );
    }
}
