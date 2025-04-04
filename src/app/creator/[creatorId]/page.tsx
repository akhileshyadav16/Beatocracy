import StreamView from "@/components/StreamView";

export default function CreatorPage({ params }: { params: { creatorId: string } }) {
  return <StreamView creatorId={params.creatorId} />;
}