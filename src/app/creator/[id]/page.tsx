"use client";

import { useParams } from "next/navigation";
import StreamView from "@/components/StreamView";

export default function CreatorPage() {
  const params = useParams();
  const creatorId = params.id as string;

  return <StreamView creatorId={creatorId} />;
}