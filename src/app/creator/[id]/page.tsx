import StreamView from "@/components/StreamView";

type Props = {
  params: {
    id: string;
  };
};

export default function CreatorPage({ params }: Props) {
  return <StreamView creatorId={params.id} />;
}