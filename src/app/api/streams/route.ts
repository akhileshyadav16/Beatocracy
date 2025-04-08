import { NextRequest, NextResponse } from "next/server";
import { z } from "zod"
import { prisma } from "@/lib/db";
import youtubesearchapi from "youtube-search-api";
import { auth } from "@clerk/nextjs/server";


const MEDIA_REGEX = new RegExp(
    "^(?:https?:\\/\\/)?(?:www\\.)?" +
      "(?:" +
      "(?:youtube\\.com\\/(?:watch\\?v=|embed\\/|shorts\\/)|youtu\\.be\\/)([a-zA-Z0-9_-]{11})" + 
      "|" +
      "(?:open\\.spotify\\.com\\/track\\/)([a-zA-Z0-9]+)" + 
      ")"
  );


const CreateStreamSchema = z.object({
    creatorId : z.string(),
    url : z.string(),
})

export async function POST(req:NextRequest){
    try{
        const data = CreateStreamSchema.parse(await req.json());
       

    const match = data.url.match(MEDIA_REGEX);
    if (!match) {
      return NextResponse.json(
        { message: "Wrong URL Format" },
        { status: 411 }
      );
    }

    const extractedId = match[1] || match[2]; 
    const type = match[1] ? "Youtube" : "Spotify";

    
    const videoData = await youtubesearchapi.GetVideoDetails(extractedId);
    console.log(videoData);
    const videoThumbnail = await  videoData?.thumbnail?.thumbnails.sort(
        (a: { width: number }, b: { width: number }) => a.width - b.width
      ).reverse();
      

    const res = await prisma.stream.create({
      data: {
        userId: data.creatorId,
        url: data.url,
        extractedId: extractedId,
        type: type,
        title : videoData.title,
        bigImage : videoThumbnail?.[0].url || "" ,
        smallImage : videoThumbnail?.[1].url || "",
        upvotes : 0
      },
    });

    return NextResponse.json(
      { message: "Stream added successfully",res },
      { status: 201 }
    );
    }catch(e){
        console.log(e);
        return NextResponse.json({
            message:"Error while adding a stream"
        },{
            status: 411
        }
    )
    }
   
}

export async function GET(req: NextRequest) {
    try {
      const creatorId = req.nextUrl.searchParams.get("creatorId");
      const { userId } = await auth(); 

      if(!userId){
        return NextResponse.json({
            message:"Login first"
        })
      }
  
      if (!creatorId) {
        return NextResponse.json(
          { message: "creatorId is required" },
          { status: 400 }
        );
      }
  
      const streams = await prisma.stream.findMany({
        where: {
          userId: creatorId,
        },
        include: {
          _count: {
            select: { upvote: true },
          },
          upvote: {
            where: { userId: userId },
            select: { id: true }, 
          },
        },
      });

      const currentStream = await prisma.currentStream.findFirst({
        where: { creatorId },
        include: {
          stream: true,
        },
      })
  
      return NextResponse.json({
        streams: streams.map(({ _count, upvote, ...rest }) => ({
          ...rest,
          upvotes: _count.upvote,
          haveVoted: upvote.length > 0,
        })),
        current : currentStream?.stream
      },

    );
    } catch (err) {
      console.log(err)
      return NextResponse.json(
        { message: "Error in fetching Streams" },
        { status: 500 }
      );
    }
  }
  
