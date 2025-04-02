
import type React from "react"
import StreamView from "@/components/StreamView";
import { auth } from "@clerk/nextjs/server";


export default async function Home() {

    const {userId} = await auth();
    if(!userId){
        return null
    }
  return (
    <StreamView creatorId={userId} />
  )
}

