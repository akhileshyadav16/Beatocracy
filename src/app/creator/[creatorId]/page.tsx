import StreamView from "@/components/StreamView";

interface CreatorPageProps {
  params: {
    creatorId: string;
  };
}

export default function CreatorPage({ params }: CreatorPageProps) {
  return <StreamView creatorId={params.creatorId} />;
}
