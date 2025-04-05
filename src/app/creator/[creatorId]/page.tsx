import StreamView from "@/components/StreamView";

export default async function CreatorPage({
  params,
}: {
  params: { creatorId: string };
}) {
  return <StreamView creatorId={params.creatorId} />;
}