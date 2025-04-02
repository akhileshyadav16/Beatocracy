"use client"
import { CiSquareChevDown, CiSquareChevUp } from "react-icons/ci"
import type React from "react"
import { useState, useEffect } from "react"
import YouTube from "react-youtube"
import toast from "react-hot-toast"
import { IoShareSocialOutline } from "react-icons/io5"
interface VideoItem {
  id: string
  title: string | null
  thumbnail: string | null
  votes: number
  url: string
  haveVoted: boolean
  userId: string
  extractedId?: string
}

export default function Home({ creatorId }: { creatorId: string }) {
  const [currentVideo, setCurrentVideo] = useState<VideoItem | null>(null)
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null)
  const [queue, setQueue] = useState<VideoItem[]>([])
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [userId, setUserId] = useState("")

  useEffect(() => {
    if (currentVideo) {
      const videoId = getYouTubeVideoId(currentVideo.url)
      console.log("Current video ID set to:", videoId)
      setCurrentVideoId(videoId || null)
    } else {
      setCurrentVideoId(null)
    }
  }, [currentVideo])

  const fetchStreams = async () => {
    try {
      const res = await fetch(`/api/streams/?creatorId=${creatorId}`)
      if (!res.ok) throw new Error("Failed to fetch streams")
      const data = await res.json()

      if (data.streams) {

        const formattedQueue = data.streams.map((stream: any) => ({
          id: stream.id,
          title: stream.title || `YouTube Video ${stream.extractedId}`,
          thumbnail: stream.smallImage || `https://img.youtube.com/vi/${stream.extractedId}/mqdefault.jpg`,
          votes: stream.upvotes || 0,
          url: stream.url,
          haveVoted: stream.haveVoted,
          userId: stream.userId,
          extractedId: stream.extractedId,
        }))

        const filteredQueue = formattedQueue.filter((video:any) => {
          if (!currentVideoId) return true
          return video.extractedId !== currentVideoId
        })

        setQueue([...filteredQueue].sort((a, b) => b.votes - a.votes))

        if (data.streams.length > 0) {
          setUserId(data.streams[0].userId)
        }
      }
    } catch (error) {
      console.error("Error fetching streams:", error)
    }
  }

  const callApi = async () => {
    try {
      await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
    } catch (error) {
      console.error("Error calling API:", error)
    }
  }

  useEffect(() => {
    fetchStreams()
    callApi()
    const interval = setInterval(() => {
      fetchStreams()
    }, 10000)

    return () => clearInterval(interval)
  }, [currentVideoId]) ;

  useEffect(() => {
    if (!currentVideo && queue.length > 0) {
      setQueue((prevQueue) => {
        const sortedQueue = [...prevQueue].sort((a, b) => b.votes - a.votes)
        const nextVideo = sortedQueue[0]
        console.log("Setting current video to:", nextVideo.title, "ID:", nextVideo.extractedId)
        setCurrentVideo(nextVideo)
        return sortedQueue.slice(1)
      })
    }
  }, [currentVideo, queue])

  const handleVote = async (id: string, increment: number) => {
    try {
      const response = await fetch(`/api/streams/${increment == 1 ? "upvote" : "downvote"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ streamId: id }),
      })

      if (!response.ok) {
        console.error("Error upvoting video:", await response.json())
        return
      }

      setQueue((prevQueue) => {
        const updatedQueue = prevQueue.map((item) =>
          item.id === id
            ? {
                ...item,
                votes: item.votes + increment,
                haveVoted: increment === 1 ? true : false,
              }
            : item,
        )
        return updatedQueue.sort((a, b) => b.votes - a.votes)
      })

      toast.success(increment === 1 ? "Video liked!" : "Like removed")
    } catch (error) {
      console.error("Error:", error)
      toast.error("Failed to update vote")
    }
  }

  const handleVideoEnd = async () => {

    if (currentVideo) {
      await fetch("/api/streams/my", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ streamId: currentVideo.id }),
      })
    }
    setCurrentVideo(null)
    await fetchStreams()
  }
  const handleSubmitYoutubeUrl = async (e: React.FormEvent) => {
    if (!youtubeUrl.trim()) return

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/streams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creatorId,
          url: youtubeUrl,
        }),
      })

      if (!response.ok) {
        toast.error("Try again")
      } else {
        toast.success("Song Added in Queue ")
      }

      await fetchStreams()
      setYoutubeUrl("")
    } catch (error) {
      console.error("Error adding video:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleShareLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/creator/${userId}`)
      .then(() => toast.success("Copied to clipboard"))
      .catch(() => toast.error("Try again"))
  }

  const getYouTubeVideoId = (url: string | null): string | undefined => {
    if (!url) return undefined
    const match = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]+)/)
    return match ? match[1] : undefined
  }

  return (
    <div className="w-screen text-center py-10 min-h-screen bg-gradient-to-t text-slate-300 from-slate-800 via-slate-900 to-slate-950">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl text-sky-300 font-bold mb-8">Community Music Stream</h1>

        <div className="mb-8 max-w-xl mx-auto">
          <form onSubmit={handleSubmitYoutubeUrl} className="flex gap-2 mb-6">
            <input
              type="text"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="Enter YouTube URL"
              className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-sky-400"
              disabled={isSubmitting}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-sky-600 hover:bg-sky-500 rounded-lg font-medium disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Video"}
            </button>
          </form>
        </div>

        <button
          onClick={handleShareLink}
          className="px-2 my-4 cursor-pointer text-lg font-semibold py-2 w-fit h-10 bg-blue-700 rounded-md"
        >
          {" "}
          <IoShareSocialOutline className="inline font-semibold h-9 w-9 px-2 pb-2" />
          Share
        </button>

        <div className="mb-10 flex flex-col items-center w-full">
          <h2 className="text-3xl text-center text-slate-400 font-bold mb-4">Now Playing</h2>
          <div className="w-full rounded-lg h-[450px] flex justify-center">
            {currentVideo ? (
              <YouTube
                videoId={getYouTubeVideoId(currentVideo.url)}
                className="w-full max-w-3xl  rounded-lg"
                opts={{
                  width: "100%",
                  height: "100%",
                  playerVars: { autoplay: 1 },
                }}
                onEnd={handleVideoEnd}
              />
            ) : (
              <p className="text-xl">No video currently playing</p>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Up Next</h2>
          {queue.length > 0 ? (
            <ul className="max-w-2xl mx-auto space-y-3">
              {queue.map((video) => (
                <li key={video.id} className="flex items-center gap-4 bg-slate-900 p-3 rounded-lg">
                  <div className="flex items-center gap-1 min-w-[60px]">
                    {!video.haveVoted ? (
                      <>
                        <button
                          className="text-sky-300 hover:text-sky-400 w-8 h-8"
                          onClick={() => handleVote(video.id, 1)}
                        >
                          <CiSquareChevUp className="w-10 h-10" />
                        </button>
                        <span className="text-lg px-2 font-bold text-center">{video.votes}</span>
                      </>
                    ) : (
                      <>
                        <button
                          className="h-8 w-8 text-sky-300 hover:text-sky-200"
                          onClick={() => handleVote(video.id, -1)}
                        >
                          <CiSquareChevDown className="w-10 h-10" />
                        </button>
                        <span className="text-lg px-2 font-bold text-center">{video.votes}</span>
                      </>
                    )}
                  </div>
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title || "Video"}
                    className="w-24 h-18 object-cover rounded"
                  />
                  <div className="flex-1 text-left">
                    <h3 className="font-medium line-clamp-2">{video.title}</h3>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No videos in the queue. Add one above!</p>
          )}
        </div>
      </div>
    </div>
  )
}

