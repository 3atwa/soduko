"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Brain, Search, Target, Activity, Zap } from "lucide-react"

interface AlgorithmStepsProps {
  steps: any[]
  algorithm: string
  isLoading: boolean
}

export function AlgorithmSteps({ steps, algorithm, isLoading }: AlgorithmStepsProps) {
  const getAlgorithmIcon = () => {
    switch (algorithm) {
      case "astar":
        return <Target className="w-5 h-5 text-blue-500" />
      case "beam":
        return <Search className="w-5 h-5 text-green-500" />
      default:
        return <Brain className="w-5 h-5 text-purple-500" />
    }
  }

  const getAlgorithmName = () => {
    switch (algorithm) {
      case "astar":
        return "A* Algorithm"
      case "beam":
        return "Beam Search"
      default:
        return "Algorithm"
    }
  }

  const getAlgorithmColor = () => {
    switch (algorithm) {
      case "astar":
        return "from-blue-500 to-blue-600"
      case "beam":
        return "from-green-500 to-green-600"
      default:
        return "from-purple-500 to-purple-600"
    }
  }

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/50 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className={`p-2 rounded-xl bg-gradient-to-r ${getAlgorithmColor()} text-white shadow-lg`}>
            {getAlgorithmIcon()}
          </div>
          {getAlgorithmName()} Steps
        </CardTitle>
        {steps.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="px-3 py-1">
              <Activity className="w-3 h-3 mr-1" />
              {steps.length} steps completed
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              <Zap className="w-3 h-3 mr-1" />
              {steps[steps.length - 1]?.nodesExplored || 0} nodes explored
            </Badge>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Solving puzzle...</span>
              <span className="text-muted-foreground">{steps.length} steps</span>
            </div>
            <Progress value={(steps.length / 50) * 100} className="w-full h-2" />
            <div className="text-xs text-muted-foreground text-center">
              Watch the algorithm work in real-time on the puzzle grid
            </div>
          </div>
        )}

        <ScrollArea className="h-96 w-full">
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div
                key={index}
                className="p-4 border rounded-xl bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 hover:shadow-md transition-all duration-200 border-gray-200 dark:border-gray-600"
              >
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline" className="font-semibold">
                    Step {step.step}
                  </Badge>
                  <div className="text-xs text-muted-foreground bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded-lg">
                    Position: ({step.position[0] + 1}, {step.position[1] + 1})
                  </div>
                          <div className="text-xs text-muted-foreground bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded-lg">
                      {step.timeTaken || 0}ms
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center font-bold text-xs">
                      {step.value}
                    </div>
                    <span className="text-muted-foreground">Value placed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span className="text-muted-foreground">{step.nodesExplored} nodes</span>
                  </div>

                  {step.heuristic !== null && (
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-blue-500" />
                      <span className="text-muted-foreground">Heuristic: {step.heuristic}</span>
                    </div>
                  )}

                  {step.beamWidth && (
                    <div className="flex items-center gap-2">
                      <Search className="w-4 h-4 text-green-500" />
                      <span className="text-muted-foreground">Beam: {step.beamWidth}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {steps.length === 0 && !isLoading && (
              <div className="text-center text-muted-foreground py-12">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-2xl flex items-center justify-center">
                  <Brain className="w-10 h-10 opacity-50" />
                </div>
                <p className="text-lg font-medium mb-2">No algorithm steps yet</p>
                <p className="text-sm">Click solve to see the algorithm in action</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
