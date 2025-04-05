import { prisma } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const {userId} = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { creatorId, streamId } = await req.json()

    if (!creatorId || !streamId) {
      return NextResponse.json({ error: "Creator ID and Stream ID are required" }, { status: 400 })
    }

    await prisma.currentStream.deleteMany({
      where: { creatorId },
    })

    const currentStream = await prisma.currentStream.create({
      data: {
        creatorId,
        StreamId:streamId,
      },
    })

    return NextResponse.json({ success: true, currentStream })
  } catch (error) {
    console.error("Error creating current stream:", error)
    return NextResponse.json({ error: "Failed to create current stream" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {

    const { creatorId, streamId } = await req.json()

    if (!creatorId) {
      return NextResponse.json({ error: "Creator ID is required" }, { status: 400 })
    }

    await prisma.currentStream.deleteMany({
      where: {
        creatorId,
        ...(streamId && { streamId }),
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting current stream:", error)
    return NextResponse.json({ error: "Failed to delete current stream" }, { status: 500 })
  }
}

