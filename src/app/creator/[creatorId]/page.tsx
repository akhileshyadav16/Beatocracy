import StreamView from "@/components/StreamView";

interface CreatorPageProps {
  params: {
    creatorId: string;
  };
}

export default async function CreatorPage({ params }: CreatorPageProps) {
  return <StreamView creatorId={params.creatorId} />;
}