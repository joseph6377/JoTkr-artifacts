"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Code, FileCode, BarChart3, FileImage, Loader2 } from "lucide-react"
import { ArtifactRenderer } from "@/components/artifact-renderer"

export function ArtifactsDemo() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [artifact, setArtifact] = useState<string | null>(null)
  const [artifactType, setArtifactType] = useState("code")
  const [error, setError] = useState<string | null>(null)

  const generateArtifact = async () => {
    if (!prompt) return

    setIsGenerating(true)
    setArtifact(null)
    setError(null)

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          artifactType,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const contentType = response.headers.get("content-type")
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await response.json()
        if (data.success) {
          setArtifact(data.result)
        } else {
          setError(data.error || "Failed to generate artifact. Please try again.")
        }
      } else {
        // If the response is not JSON, read it as text
        const text = await response.text()
        setError(`Unexpected response from server: ${text.substring(0, 100)}...`)
      }
    } catch (error) {
      console.error("Error calling API:", error)
      setError(`Error: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Generate Artifacts</h2>
            <p className="text-zinc-700 dark:text-zinc-300">
              Describe what you want to create and our AI will generate it for you.
            </p>
            <Textarea
              placeholder="Describe the artifact you want to generate..."
              className="min-h-[150px]"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
              <Tabs defaultValue="code" className="w-full" onValueChange={setArtifactType}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="code" className="flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    <span className="hidden sm:inline">Code</span>
                  </TabsTrigger>
                  <TabsTrigger value="flowchart" className="flex items-center gap-2">
                    <FileCode className="h-4 w-4" />
                    <span className="hidden sm:inline">Flowchart</span>
                  </TabsTrigger>
                  <TabsTrigger value="svg" className="flex items-center gap-2">
                    <FileImage className="h-4 w-4" />
                    <span className="hidden sm:inline">SVG</span>
                  </TabsTrigger>
                  <TabsTrigger value="dashboard" className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    <span className="hidden sm:inline">Dashboard</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <Button
                onClick={generateArtifact}
                disabled={isGenerating || !prompt}
                className="bg-orange-600 hover:bg-orange-700"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate"
                )}
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Your Artifact</h2>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-zinc-950 text-zinc-50 font-mono text-sm overflow-auto max-h-[500px]">
                  {error ? (
                    <div className="p-4 text-red-500">{error}</div>
                  ) : (
                    <ArtifactRenderer artifact={artifact} artifactType={artifactType} isGenerating={isGenerating} />
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

