import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, LineChart, Palette, PresentationIcon, BarChart } from "lucide-react"

export function UseCases() {
  const useCases = [
    {
      icon: <Code className="h-8 w-8 text-orange-500" />,
      title: "Developers",
      description: "Make architecture diagrams from codebases and generate code snippets for common patterns.",
    },
    {
      icon: <PresentationIcon className="h-8 w-8 text-orange-500" />,
      title: "Product Managers",
      description: "Create interactive prototypes for rapid feature testing and user flow diagrams.",
    },
    {
      icon: <Palette className="h-8 w-8 text-orange-500" />,
      title: "Designers",
      description: "Build powerful visualizations for quick prototyping and design iterations.",
    },
    {
      icon: <BarChart className="h-8 w-8 text-orange-500" />,
      title: "Marketers",
      description: "Design campaign dashboards with performance metrics and visual analytics.",
    },
    {
      icon: <LineChart className="h-8 w-8 text-orange-500" />,
      title: "Sales Teams",
      description: "Visualize sales pipelines with forecasting insights and customer journey maps.",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-zinc-50 dark:bg-zinc-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Use Cases</h2>
            <p className="mx-auto max-w-[700px] text-zinc-700 dark:text-zinc-300 md:text-xl">
              Every team can use Artifacts to create high-quality work products faster than ever before.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {useCases.map((useCase, index) => (
            <Card key={index} className="border-2 border-orange-100 dark:border-zinc-800">
              <CardHeader>
                <div className="flex items-center gap-2">
                  {useCase.icon}
                  <CardTitle>{useCase.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{useCase.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

