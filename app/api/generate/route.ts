import { type NextRequest, NextResponse } from "next/server"
import { generateWithGemini } from "@/lib/gemini"

export async function POST(req: NextRequest) {
  try {
    const { prompt, artifactType } = await req.json()

    if (!prompt) {
      return NextResponse.json({ success: false, error: "Prompt is required" }, { status: 400 })
    }

    // Generate content using Gemini
    const result = await generateWithGemini(prompt, artifactType)

    return NextResponse.json({
      success: true,
      result,
    })
  } catch (error) {
    console.error("Error generating artifact:", error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "An unexpected error occurred" },
      { status: 500 },
    )
  }
}

