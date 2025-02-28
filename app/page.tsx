import { ArtifactsHero } from "@/components/artifacts-hero"
import { ArtifactsDemo } from "@/components/artifacts-demo"
import { UseCases } from "@/components/use-cases"
import { ArtifactsHeader } from "@/components/artifacts-header"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <ArtifactsHeader />
      <ArtifactsHero />
      <ArtifactsDemo />
      <UseCases />
    </main>
  )
}

