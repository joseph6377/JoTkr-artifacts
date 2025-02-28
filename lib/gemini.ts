import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai"

// Initialize the Gemini API client
export function initGemini() {
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not set")
  }

  return new GoogleGenerativeAI(apiKey)
}

// Get the Gemini model
export function getGeminiModel() {
  const genAI = initGemini()

  return genAI.getGenerativeModel({
    model: "gemini-2.0-pro-exp-02-05",
    generationConfig: {
      temperature: 0.9,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
    },
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ],
  })
}

// Generate content with Gemini
export async function generateWithGemini(prompt: string, artifactType: string) {
  const model = getGeminiModel()

  // Create a system prompt based on the artifact type
  let systemPrompt = ""
  let userPrompt = ""

  switch (artifactType) {
    case "code":
      systemPrompt =
        "You are an expert programmer who writes clean, well-documented code. Respond only with code, no explanations."
      userPrompt = `Generate the following code: ${prompt}`
      break
    case "flowchart":
      systemPrompt =
        "You are an expert at creating Mermaid flowcharts and diagrams. Respond only with the Mermaid code, no explanations."
      userPrompt = `Create a Mermaid flowchart for: ${prompt}\nOnly output the Mermaid code, starting with \`\`\`mermaid and ending with \`\`\`.`
      break
    case "svg":
      systemPrompt = "You are an expert at creating SVG graphics. Respond only with the SVG code, no explanations."
      userPrompt = `Create an SVG graphic for: ${prompt}\nOnly output the SVG code, starting with <svg and ending with </svg>.`
      break
    case "dashboard":
      systemPrompt =
        "You are an expert at creating React dashboard components. Respond only with the React component code, no explanations."
      userPrompt = `Create a React dashboard component for: ${prompt}\nOnly output the React component code.`
      break
    default:
      systemPrompt = "You are an expert at creating high-quality content."
      userPrompt = prompt
  }

  try {
    const result = await model.generateContent([{ text: systemPrompt }, { text: userPrompt }])

    const response = result.response
    const text = response.text()

    // Clean up the response based on artifact type
    if (artifactType === "flowchart") {
      // Extract just the Mermaid code
      const mermaidMatch = text.match(/```mermaid\s*([\s\S]*?)\s*```/)
      return mermaidMatch ? mermaidMatch[1].trim() : text
    } else if (artifactType === "svg") {
      // Extract just the SVG code
      const svgMatch = text.match(/<svg[\s\S]*?<\/svg>/)
      return svgMatch ? svgMatch[0] : text
    } else if (artifactType === "code" || artifactType === "dashboard") {
      // Remove code block markers if present
      return text
        .replace(/```[\w]*\n/g, "")
        .replace(/```$/g, "")
        .trim()
    }

    return text
  } catch (error) {
    console.error("Error generating with Gemini:", error)
    throw new Error(`Gemini API error: ${error instanceof Error ? error.message : String(error)}`)
  }
}

