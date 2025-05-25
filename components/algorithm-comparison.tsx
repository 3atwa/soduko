"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import { Target, Search, Clock, Zap } from "lucide-react"

interface AlgorithmComparisonProps {
  results: any[]
}

export function AlgorithmComparison({ results }: AlgorithmComparisonProps) {
  const astarResults = results.filter((r) => r.algorithm === "astar")
  const beamResults = results.filter((r) => r.algorithm === "beam")

  const comparisonData = [
    {
      difficulty: "Easy",
      astar:
        astarResults.filter((r) => r.difficulty === "easy").reduce((acc, r) => acc + r.time, 0) /
        Math.max(astarResults.filter((r) => r.difficulty === "easy").length, 1),
      beam:
        beamResults.filter((r) => r.difficulty === "easy").reduce((acc, r) => acc + r.time, 0) /
        Math.max(beamResults.filter((r) => r.difficulty === "easy").length, 1),
    },
    {
      difficulty: "Medium",
      astar:
        astarResults.filter((r) => r.difficulty === "medium").reduce((acc, r) => acc + r.time, 0) /
        Math.max(astarResults.filter((r) => r.difficulty === "medium").length, 1),
      beam:
        beamResults.filter((r) => r.difficulty === "medium").reduce((acc, r) => acc + r.time, 0) /
        Math.max(beamResults.filter((r) => r.difficulty === "medium").length, 1),
    },
    {
      difficulty: "Hard",
      astar:
        astarResults.filter((r) => r.difficulty === "hard").reduce((acc, r) => acc + r.time, 0) /
        Math.max(astarResults.filter((r) => r.difficulty === "hard").length, 1),
      beam:
        beamResults.filter((r) => r.difficulty === "hard").reduce((acc, r) => acc + r.time, 0) /
        Math.max(beamResults.filter((r) => r.difficulty === "hard").length, 1),
    },
    {
      difficulty: "Impossible",
      astar:
        astarResults.filter((r) => r.difficulty === "impossible").reduce((acc, r) => acc + r.time, 0) /
        Math.max(astarResults.filter((r) => r.difficulty === "impossible").length, 1),
      beam:
        beamResults.filter((r) => r.difficulty === "impossible").reduce((acc, r) => acc + r.time, 0) /
        Math.max(beamResults.filter((r) => r.difficulty === "impossible").length, 1),
    },
  ]

  const nodesData = [
    {
      difficulty: "Easy",
      astar:
        astarResults.filter((r) => r.difficulty === "easy").reduce((acc, r) => acc + r.nodesExplored, 0) /
        Math.max(astarResults.filter((r) => r.difficulty === "easy").length, 1),
      beam:
        beamResults.filter((r) => r.difficulty === "easy").reduce((acc, r) => acc + r.nodesExplored, 0) /
        Math.max(beamResults.filter((r) => r.difficulty === "easy").length, 1),
    },
    {
      difficulty: "Medium",
      astar:
        astarResults.filter((r) => r.difficulty === "medium").reduce((acc, r) => acc + r.nodesExplored, 0) /
        Math.max(astarResults.filter((r) => r.difficulty === "medium").length, 1),
      beam:
        beamResults.filter((r) => r.difficulty === "medium").reduce((acc, r) => acc + r.nodesExplored, 0) /
        Math.max(beamResults.filter((r) => r.difficulty === "medium").length, 1),
    },
    {
      difficulty: "Hard",
      astar:
        astarResults.filter((r) => r.difficulty === "hard").reduce((acc, r) => acc + r.nodesExplored, 0) /
        Math.max(astarResults.filter((r) => r.difficulty === "hard").length, 1),
      beam:
        beamResults.filter((r) => r.difficulty === "hard").reduce((acc, r) => acc + r.nodesExplored, 0) /
        Math.max(beamResults.filter((r) => r.difficulty === "hard").length, 1),
    },
    {
      difficulty: "Impossible",
      astar:
        astarResults.filter((r) => r.difficulty === "impossible").reduce((acc, r) => acc + r.nodesExplored, 0) /
        Math.max(astarResults.filter((r) => r.difficulty === "impossible").length, 1),
      beam:
        beamResults.filter((r) => r.difficulty === "impossible").reduce((acc, r) => acc + r.nodesExplored, 0) /
        Math.max(beamResults.filter((r) => r.difficulty === "impossible").length, 1),
    },
  ]

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/50 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
                <Target className="w-5 h-5" />
              </div>
              A* Algorithm
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                <span className="font-medium">Total Runs:</span>
                <Badge className="bg-blue-600">{astarResults.length}</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/30 rounded-xl">
                <span className="font-medium">Success Rate:</span>
                <Badge variant="outline" className="border-green-600 text-green-600">
                  {astarResults.length > 0
                    ? Math.round((astarResults.filter((r) => r.success).length / astarResults.length) * 100)
                    : 0}
                  %
                </Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-xl">
                <span className="font-medium">Avg Time:</span>
                <Badge variant="secondary">
                  {astarResults.length > 0
                    ? Math.round(astarResults.reduce((acc, r) => acc + r.time, 0) / astarResults.length)
                    : 0}
                  ms
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/50 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg">
                <Search className="w-5 h-5" />
              </div>
              Beam Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/30 rounded-xl">
                <span className="font-medium">Total Runs:</span>
                <Badge className="bg-green-600">{beamResults.length}</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                <span className="font-medium">Success Rate:</span>
                <Badge variant="outline" className="border-blue-600 text-blue-600">
                  {beamResults.length > 0
                    ? Math.round((beamResults.filter((r) => r.success).length / beamResults.length) * 100)
                    : 0}
                  %
                </Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-xl">
                <span className="font-medium">Avg Time:</span>
                <Badge variant="secondary">
                  {beamResults.length > 0
                    ? Math.round(beamResults.reduce((acc, r) => acc + r.time, 0) / beamResults.length)
                    : 0}
                  ms
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/50 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg">
              <Clock className="w-5 h-5" />
            </div>
            Execution Time Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="difficulty" />
              <YAxis label={{ value: "Time (ms)", angle: -90, position: "insideLeft" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "none",
                  borderRadius: "12px",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Legend />
              <Bar dataKey="astar" fill="#3b82f6" name="A* Algorithm" radius={[4, 4, 0, 0]} />
              <Bar dataKey="beam" fill="#10b981" name="Beam Search" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/50 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg">
              <Zap className="w-5 h-5" />
            </div>
            Nodes Explored Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={nodesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="difficulty" />
              <YAxis label={{ value: "Nodes Explored", angle: -90, position: "insideLeft" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "none",
                  borderRadius: "12px",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="astar"
                stroke="#3b82f6"
                strokeWidth={3}
                name="A* Algorithm"
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="beam"
                stroke="#10b981"
                strokeWidth={3}
                name="Beam Search"
                dot={{ fill: "#10b981", strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
