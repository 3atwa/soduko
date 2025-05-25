"use client"

import { useState } from "react"
import { SudokuGame } from "@/components/sudoku-game"
import { AlgorithmComparison } from "@/components/algorithm-comparison"
import { Statistics } from "@/components/statistics"
import { ReadmeSection } from "@/components/readme-section"
import { ThemeToggle } from "@/components/theme-toggle"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, BarChart3, FileText, Gamepad2, Sparkles } from "lucide-react"

export default function SudokuAISolver() {
  const [solveResults, setSolveResults] = useState<any[]>([])

  const handleSolveComplete = (result: any) => {
    setSolveResults((prev) => [...prev, result])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 transition-colors duration-300">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="relative z-10 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 relative">
            <div className="absolute top-0 right-0">
              <ThemeToggle />
            </div>
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
                <Sparkles className="w-8 h-8" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Sudoku Solver
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the power of artificial intelligence with A* and Beam Search algorithms solving Sudoku puzzles
              in real-time
            </p>
          </div>

          {/* Modern Tabs */}
          <Tabs defaultValue="game" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 h-14 p-1 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 rounded-2xl">
              <TabsTrigger
                value="game"
                className="flex items-center gap-2 h-12 rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-lg transition-all duration-200"
              >
                <Gamepad2 className="w-5 h-5" />
                <span className="hidden sm:inline">Game</span>
              </TabsTrigger>
              <TabsTrigger
                value="comparison"
                className="flex items-center gap-2 h-12 rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-lg transition-all duration-200"
              >
                <Brain className="w-5 h-5" />
                <span className="hidden sm:inline">Comparison</span>
              </TabsTrigger>
              <TabsTrigger
                value="statistics"
                className="flex items-center gap-2 h-12 rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-lg transition-all duration-200"
              >
                <BarChart3 className="w-5 h-5" />
                <span className="hidden sm:inline">Statistics</span>
              </TabsTrigger>
              <TabsTrigger
                value="readme"
                className="flex items-center gap-2 h-12 rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-lg transition-all duration-200"
              >
                <FileText className="w-5 h-5" />
                <span className="hidden sm:inline">Docs</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="game" className="mt-0">
              <SudokuGame onSolveComplete={handleSolveComplete} />
            </TabsContent>

            <TabsContent value="comparison" className="mt-0">
              <AlgorithmComparison results={solveResults} />
            </TabsContent>

            <TabsContent value="statistics" className="mt-0">
              <Statistics results={solveResults} />
            </TabsContent>

            <TabsContent value="readme" className="mt-0">
              <ReadmeSection />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
