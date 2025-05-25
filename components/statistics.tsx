"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts"
import { TrendingUp, TrendingDown, Award, AlertTriangle, Activity, Clock, Target, Zap } from "lucide-react"
import { BarChart3 } from "lucide-react" // Declaring the BarChart3 variable

interface StatisticsProps {
  results: any[]
}

export function Statistics({ results }: StatisticsProps) {
  const astarResults = results.filter((r) => r.algorithm === "astar")
  const beamResults = results.filter((r) => r.algorithm === "beam")

  const successData = [
    { name: "A* Success", value: astarResults.filter((r) => r.success).length, color: "#3b82f6" },
    { name: "A* Failed", value: astarResults.filter((r) => !r.success).length, color: "#ef4444" },
    { name: "Beam Success", value: beamResults.filter((r) => r.success).length, color: "#10b981" },
    { name: "Beam Failed", value: beamResults.filter((r) => !r.success).length, color: "#f59e0b" },
  ]

  const difficultyStats = ["easy", "medium", "hard", "impossible"].map((diff) => {
    const astarDiff = astarResults.filter((r) => r.difficulty === diff)
    const beamDiff = beamResults.filter((r) => r.difficulty === diff)

    return {
      difficulty: diff.charAt(0).toUpperCase() + diff.slice(1),
      astarSuccess: astarDiff.filter((r) => r.success).length,
      astarFailed: astarDiff.filter((r) => !r.success).length,
      beamSuccess: beamDiff.filter((r) => r.success).length,
      beamFailed: beamDiff.filter((r) => !r.success).length,
      astarAvgTime: astarDiff.length > 0 ? astarDiff.reduce((acc, r) => acc + r.time, 0) / astarDiff.length : 0,
      beamAvgTime: beamDiff.length > 0 ? beamDiff.reduce((acc, r) => acc + r.time, 0) / beamDiff.length : 0,
    }
  })

  const getWinner = () => {
    if (results.length === 0) return null

    const astarAvgTime =
      astarResults.length > 0
        ? astarResults.reduce((acc, r) => acc + r.time, 0) / astarResults.length
        : Number.POSITIVE_INFINITY
    const beamAvgTime =
      beamResults.length > 0
        ? beamResults.reduce((acc, r) => acc + r.time, 0) / beamResults.length
        : Number.POSITIVE_INFINITY

    const astarSuccessRate =
      astarResults.length > 0 ? astarResults.filter((r) => r.success).length / astarResults.length : 0
    const beamSuccessRate =
      beamResults.length > 0 ? beamResults.filter((r) => r.success).length / beamResults.length : 0

    if (astarSuccessRate > beamSuccessRate) return "astar"
    if (beamSuccessRate > astarSuccessRate) return "beam"
    return astarAvgTime < beamAvgTime ? "astar" : "beam"
  }

  const winner = getWinner()

  return (
    <div className="space-y-8">
      {winner && (
        <Card className="border-green-200 dark:border-green-800 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-green-800 dark:text-green-200">
              <div className="p-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg">
                <Award className="w-5 h-5" />
              </div>
              Overall Performance Winner
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Badge className={`${winner === "astar" ? "bg-blue-600" : "bg-green-600"} text-white px-4 py-2 text-lg`}>
                {winner === "astar" ? "A* Algorithm" : "Beam Search"}
              </Badge>
              <span className="text-green-700 dark:text-green-300 font-medium">
                {winner === "astar" ? "More optimal and faster" : "Better success rate"}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/50 shadow-xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-500" />
              Total Solves
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{results.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {astarResults.length} A* + {beamResults.length} Beam
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/50 shadow-xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="w-4 h-4 text-green-500" />
              Success Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {results.length > 0 ? Math.round((results.filter((r) => r.success).length / results.length) * 100) : 0}%
            </div>
            <Progress
              value={results.length > 0 ? (results.filter((r) => r.success).length / results.length) * 100 : 0}
              className="mt-3 h-2"
            />
          </CardContent>
        </Card>

        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/50 shadow-xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-500" />
              Avg Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {results.length > 0 ? Math.round(results.reduce((acc, r) => acc + r.time, 0) / results.length) : 0}ms
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <TrendingUp className="w-3 h-3" />
              Across all difficulties
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/50 shadow-xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              Failed Attempts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600 dark:text-red-400">
              {results.filter((r) => !r.success).length}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <AlertTriangle className="w-3 h-3" />
              Optimization needed
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/50 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg">
                <Zap className="w-5 h-5" />
              </div>
              Success/Failure Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={successData.filter((d) => d.value > 0)}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {successData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/50 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg">
                <BarChart3 className="w-5 h-5" />
              </div>
              Performance by Difficulty
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={difficultyStats} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="difficulty" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
                <Bar dataKey="astarSuccess" stackId="astar" fill="#3b82f6" name="A* Success" radius={[2, 2, 0, 0]} />
                <Bar dataKey="astarFailed" stackId="astar" fill="#ef4444" name="A* Failed" radius={[2, 2, 0, 0]} />
                <Bar dataKey="beamSuccess" stackId="beam" fill="#10b981" name="Beam Success" radius={[2, 2, 0, 0]} />
                <Bar dataKey="beamFailed" stackId="beam" fill="#f59e0b" name="Beam Failed" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/50 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg">
              <Activity className="w-5 h-5" />
            </div>
            Algorithm Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-semibold mb-3 flex items-center gap-2 text-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Strengths
              </h4>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                  <p className="text-sm font-medium text-green-800 dark:text-green-200">
                    A* shows optimal pathfinding with heuristics
                  </p>
                </div>
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    Beam Search handles memory constraints well
                  </p>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                  <p className="text-sm font-medium text-purple-800 dark:text-purple-200">
                    Both algorithms scale with difficulty
                  </p>
                </div>
                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800">
                  <p className="text-sm font-medium text-indigo-800 dark:text-indigo-200">
                    Consistent performance across runs
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold mb-3 flex items-center gap-2 text-lg">
                <TrendingDown className="w-5 h-5 text-red-600" />
                Areas for Improvement
              </h4>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                  <p className="text-sm font-medium text-red-800 dark:text-red-200">
                    Beam Search may miss optimal solutions
                  </p>
                </div>
                <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                  <p className="text-sm font-medium text-orange-800 dark:text-orange-200">
                    A* can be memory intensive on hard puzzles
                  </p>
                </div>
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                    Both struggle with impossible configurations
                  </p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-900/20 rounded-xl border border-gray-200 dark:border-gray-800">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    Need better heuristics for edge cases
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
