import { prisma } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const user = await currentUser();
        if (!user) {
            return NextResponse.json({ message: "No User" }, { status: 401 });
        }

        let existingUser = await prisma.user.findUnique({
            where: { id: user.id },
        });

        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 200 });
        }

        await prisma.user.create({
            data: {
                id: user.id,
                email: user.emailAddresses?.[0]?.emailAddress ,
            },
        });

        return NextResponse.json({ message: "User created successfully" }, { status: 201 });

    } catch (err) {
        console.error("Error storing user:", err);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}
