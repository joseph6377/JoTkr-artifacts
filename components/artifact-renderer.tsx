"use client"

import { useEffect, useRef } from "react"
import { Loader2 } from "lucide-react"

interface ArtifactRendererProps {
  artifact: string | null
  artifactType: string
  isGenerating: boolean
}

export function ArtifactRenderer({ artifact, artifactType, isGenerating }: ArtifactRendererProps) {
  const svgContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (artifactType === "svg" && artifact && svgContainerRef.current) {
      svgContainerRef.current.innerHTML = artifact
    }
  }, [artifact, artifactType])

  if (isGenerating) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    )
  }

  if (!artifact) {
    return (
      <div className="flex items-center justify-center h-[400px] text-zinc-500">
        Your generated artifact will appear here
      </div>
    )
  }

  if (artifactType === "svg") {
    return (
      <div className="flex items-center justify-center p-4 bg-white h-[400px]">
        <div ref={svgContainerRef} className="max-w-full max-h-full" />
      </div>
    )
  }

  if (artifactType === "flowchart") {
    return (
      <div className="p-4 overflow-auto">
        <pre className="text-xs">{artifact}</pre>
        <p className="text-xs text-zinc-500 mt-4">
          To visualize this flowchart, copy the code above and paste it into a Mermaid editor like
          <a href="https://mermaid.live" target="_blank" rel="noopener noreferrer" className="text-orange-500 ml-1">
            mermaid.live
          </a>
        </p>
      </div>
    )
  }

  return <pre className="p-4 overflow-auto whitespace-pre-wrap">{artifact}</pre>
}

