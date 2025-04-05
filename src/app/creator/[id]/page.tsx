import StreamView from "@/components/StreamView";

type Props = {
  params: {
    creatorId: string;
  };
};

export default function CreatorPage({ params }: Props) {
  return <StreamView creatorId={params?.creatorId} />;
}