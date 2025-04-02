import StreamView from "@/components/StreamView"

export default function({ params : { creatorId }} : { params : { creatorId : string } }){
    return(
        <StreamView creatorId={creatorId}/>
    )
}