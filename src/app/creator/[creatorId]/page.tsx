import StreamView from "@/components/StreamView"

export default function CreatorPage({ params : { creatorId }} : { params : { creatorId : string } }){
    return(
        <StreamView creatorId={creatorId}/>
    )
}