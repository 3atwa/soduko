"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FileText, Target, Search, BarChart3, Zap, Brain, Sparkles, Clock, Activity } from "lucide-react"

export function ReadmeSection() {
  return (
    <div className="space-y-8">
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/50 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
              <FileText className="w-6 h-6" />
            </div>
            AI Sudoku Solver Documentation
          </CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none">
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            This application demonstrates the comparison between A* and Beam Search algorithms for solving Sudoku
            puzzles across different difficulty levels with real-time visualization and performance analytics.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/50 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg">
              <Brain className="w-5 h-5" />
            </div>
            Algorithm Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
                  <Target className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-lg text-blue-600 dark:text-blue-400">A* Algorithm</h4>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-blue-800 dark:text-blue-200">Type:</span>
                    <Badge variant="outline" className="border-blue-300 text-blue-700">
                      Informed search algorithm
                    </Badge>
                  </div>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-blue-800 dark:text-blue-200">Heuristic:</span>
                    <span className="text-sm text-blue-700 dark:text-blue-300">
                      Empty cells + constraint violations
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-green-800 dark:text-green-200">Optimality:</span>
                    <Badge className="bg-green-600">Guaranteed optimal solution</Badge>
                  </div>
                </div>
                <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-orange-800 dark:text-orange-200">Memory:</span>
                    <span className="text-sm text-orange-700 dark:text-orange-300">Can be memory intensive</span>
                  </div>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-purple-800 dark:text-purple-200">Best for:</span>
                    <span className="text-sm text-purple-700 dark:text-purple-300">Finding optimal solutions</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg">
                  <Search className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-lg text-green-600 dark:text-green-400">Beam Search</h4>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-green-800 dark:text-green-200">Type:</span>
                    <Badge variant="outline" className="border-green-300 text-green-700">
                      Local search algorithm
                    </Badge>
                  </div>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-green-800 dark:text-green-200">Beam Width:</span>
                    <span className="text-sm text-green-700 dark:text-green-300">
                      Limited number of best candidates
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-yellow-800 dark:text-yellow-200">Optimality:</span>
                    <Badge variant="outline" className="border-yellow-300 text-yellow-700">
                      May not find optimal solution
                    </Badge>
                  </div>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-blue-800 dark:text-blue-200">Memory:</span>
                    <Badge className="bg-blue-600">Memory efficient</Badge>
                  </div>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-purple-800 dark:text-purple-200">Best for:</span>
                    <span className="text-sm text-purple-700 dark:text-purple-300">
                      Quick solutions with memory constraints
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/50 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg">
              <Sparkles className="w-5 h-5" />
            </div>
            Difficulty Levels
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
              <Badge className="mb-3 bg-green-600 text-white px-4 py-2">Easy</Badge>
              <p className="font-semibold text-green-800 dark:text-green-200">45 given clues</p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">High constraint satisfaction</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
              <Badge className="mb-3 bg-yellow-600 text-white px-4 py-2">Medium</Badge>
              <p className="font-semibold text-yellow-800 dark:text-yellow-200">35 given clues</p>
              <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">Moderate complexity</p>
            </div>
            <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
              <Badge className="mb-3 bg-orange-600 text-white px-4 py-2">Hard</Badge>
              <p className="font-semibold text-orange-800 dark:text-orange-200">25 given clues</p>
              <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">Requires backtracking</p>
            </div>
            <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
              <Badge className="mb-3 bg-red-600 text-white px-4 py-2">Impossible</Badge>
              <p className="font-semibold text-red-800 dark:text-red-200">17 given clues</p>
              <p className="text-xs text-red-600 dark:text-red-400 mt-1">Minimal clue threshold</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/50 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg">
              <BarChart3 className="w-5 h-5" />
            </div>
            Expected Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-4 text-lg">Performance Expectations</h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-4 border rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
                  <h5 className="font-bold text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    A* Algorithm
                  </h5>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Higher success rate on all difficulties</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Slower execution time due to exhaustive search</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>More nodes explored for optimal solutions</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Better performance on impossible puzzles</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 border rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
                  <h5 className="font-bold text-green-600 dark:text-green-400 mb-3 flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    Beam Search
                  </h5>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Faster execution time</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Lower memory usage</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>May fail on harder puzzles</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span>Good performance on easy/medium puzzles</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-semibold mb-4 text-lg">Key Metrics to Observe</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 border rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
                  <div className="p-3 bg-yellow-100 dark:bg-yellow-800 rounded-xl mb-3 inline-block">
                    <Zap className="w-6 h-6 text-yellow-600 dark:text-yellow-300" />
                  </div>
                  <p className="font-semibold text-yellow-800 dark:text-yellow-200">Execution Time</p>
                  <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">Speed comparison</p>
                </div>
                <div className="text-center p-4 border rounded-xl bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                  <div className="p-3 bg-blue-100 dark:bg-blue-800 rounded-xl mb-3 inline-block">
                    <Target className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                  </div>
                  <p className="font-semibold text-blue-800 dark:text-blue-200">Success Rate</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Solution accuracy</p>
                </div>
                <div className="text-center p-4 border rounded-xl bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                  <div className="p-3 bg-green-100 dark:bg-green-800 rounded-xl mb-3 inline-block">
                    <Search className="w-6 h-6 text-green-600 dark:text-green-300" />
                  </div>
                  <p className="font-semibold text-green-800 dark:text-green-200">Nodes Explored</p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">Search efficiency</p>
                </div>
                <div className="text-center p-4 border rounded-xl bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
                  <div className="p-3 bg-purple-100 dark:bg-purple-800 rounded-xl mb-3 inline-block">
                    <Activity className="w-6 h-6 text-purple-600 dark:text-purple-300" />
                  </div>
                  <p className="font-semibold text-purple-800 dark:text-purple-200">Steps Count</p>
                  <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">Solution path length</p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-semibold mb-4 text-lg flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-600" />
                Usage Instructions
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    Select a difficulty level from the dropdown
                  </li>
                  <li className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    Choose either A* or Beam Search algorithm
                  </li>
                  <li className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    Watch the step-by-step solving process on the grid
                  </li>
                </ol>
                <ol className="list-decimal list-inside space-y-2 text-sm" start={4}>
                  <li className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    Compare results in the Algorithm Comparison tab
                  </li>
                  <li className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    Analyze performance metrics in the Statistics tab
                  </li>
                  <li className="p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    Run multiple tests to see consistent patterns
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
