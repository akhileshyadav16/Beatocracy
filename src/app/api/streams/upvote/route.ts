import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const UpvoteSchema = z.object({
    streamId: z.string() 
});

export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json(
                { message: "User not found while upvoting" },
                { status: 403 }
            );
        }

        const data = UpvoteSchema.parse(await req.json());


        const existingUpvote = await prisma.upvote.findUnique({
            where: {
                userId_streamId: {
                    userId,
                    streamId: data.streamId
                }
            }
        });

        if (existingUpvote) {
            return NextResponse.json(
                { message: "Already upvoted" },
                { status: 400 }
            );
        }

        await prisma.upvote.create({
            data: {
                userId,
                streamId: data.streamId
            }
        });

        return NextResponse.json({ message: "Upvote added successfully" });
    } catch (err) {
        console.error("Error:", err);
        return NextResponse.json(
            { message: "Error while adding upvote" },
            { status: 500 }
        );
    }
}
