import { Button } from "@/components/ui/button"

export function ArtifactsHero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-amber-50 to-orange-100 dark:from-zinc-900 dark:to-zinc-800">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Artifacts powered by Gemini
            </h1>
            <p className="mx-auto max-w-[700px] text-zinc-700 dark:text-zinc-300 md:text-xl">
              Generate high-quality work products faster than ever before. From code snippets and flowcharts to SVG
              graphics and interactive dashboards.
            </p>
          </div>
          <div className="space-x-4">
            <Button className="bg-orange-600 hover:bg-orange-700">Try Artifacts</Button>
            <Button variant="outline">Learn More</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

