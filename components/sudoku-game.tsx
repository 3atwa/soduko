"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Loader2, RotateCcw, Zap, Sparkles } from "lucide-react"
import { AlgorithmSteps } from "@/components/algorithm-steps"

interface SudokuGameProps {
  onSolveComplete: (result: any) => void
}

interface StepVisualization {
  row: number
  col: number
  value: number
  stepNumber: number
  isActive: boolean
  timeTaken?: number
}

const DIFFICULTIES = {
  easy: { name: "Easy", clues: 45, color: "bg-green-500" },
  medium: { name: "Medium", clues: 35, color: "bg-yellow-500" },
  hard: { name: "Hard", clues: 25, color: "bg-orange-500" },
  impossible: { name: "Impossible", clues: 17, color: "bg-red-500" },
}

const INITIAL_PUZZLES = {
  easy: [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ],
  medium: [
    [0, 0, 0, 6, 0, 0, 4, 0, 0],
    [7, 0, 0, 0, 0, 3, 6, 0, 0],
    [0, 0, 0, 0, 9, 1, 0, 8, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 5, 0, 1, 8, 0, 0, 0, 3],
    [0, 0, 0, 3, 0, 6, 0, 4, 5],
    [0, 4, 0, 2, 0, 0, 0, 6, 0],
    [9, 0, 3, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 1, 0, 0],
  ],
  hard: [
    [0, 0, 0, 0, 0, 0, 6, 8, 0],
    [0, 0, 0, 0, 0, 3, 0, 0, 0],
    [7, 0, 0, 0, 9, 0, 0, 0, 0],
    [5, 0, 0, 0, 0, 7, 0, 0, 0],
    [0, 0, 0, 0, 4, 5, 7, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 3, 0],
    [0, 0, 1, 0, 0, 0, 0, 6, 8],
    [0, 0, 8, 5, 0, 0, 0, 1, 0],
    [0, 9, 0, 0, 0, 0, 4, 0, 0],
  ],
  impossible: [
    [0, 0, 0, 0, 0, 6, 0, 0, 0],
    [0, 5, 9, 0, 0, 0, 0, 0, 8],
    [2, 0, 0, 0, 0, 8, 0, 0, 0],
    [0, 4, 5, 0, 0, 0, 0, 0, 0],
    [0, 0, 3, 0, 0, 0, 0, 0, 0],
    [0, 0, 6, 0, 0, 3, 0, 5, 4],
    [0, 0, 0, 3, 2, 5, 0, 0, 6],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
}

export function SudokuGame({ onSolveComplete }: SudokuGameProps) {
  const [difficulty, setDifficulty] = useState<keyof typeof DIFFICULTIES>("easy")
  const [puzzle, setPuzzle] = useState(INITIAL_PUZZLES.easy)
  const [originalPuzzle, setOriginalPuzzle] = useState(INITIAL_PUZZLES.easy)
  const [isLoading, setIsLoading] = useState(false)
  const [algorithmSteps, setAlgorithmSteps] = useState<any[]>([])
  const [currentAlgorithm, setCurrentAlgorithm] = useState<string>("")
  const [stepVisualizations, setStepVisualizations] = useState<StepVisualization[]>([])
  const [currentStepIndex, setCurrentStepIndex] = useState(-1)
  const [solveTime, setSolveTime] = useState<number | null>(null)
  const [currentSolveTime, setCurrentSolveTime] = useState<number>(0)

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isLoading) {
      const startTime = Date.now();
      setCurrentSolveTime(0);
      
      interval = setInterval(() => {
        setCurrentSolveTime(Date.now() - startTime);
      }, 100);
    } else {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleDifficultyChange = (newDifficulty: keyof typeof DIFFICULTIES) => {
    setDifficulty(newDifficulty)
    const newPuzzle = INITIAL_PUZZLES[newDifficulty]
    setPuzzle(newPuzzle)
    setOriginalPuzzle(newPuzzle)
    setAlgorithmSteps([])
    setStepVisualizations([])
    setCurrentStepIndex(-1)
    setSolveTime(null)
  }

  const resetPuzzle = () => {
    setPuzzle([...originalPuzzle])
    setAlgorithmSteps([])
    setStepVisualizations([])
    setCurrentStepIndex(-1)
    setSolveTime(null)
  }

  const solvePuzzle = async (algorithm: "astar" | "beam") => {
    setIsLoading(true)
    setCurrentAlgorithm(algorithm)
    setAlgorithmSteps([])
    setStepVisualizations([])
    setCurrentStepIndex(-1)
    setSolveTime(null)

    const startTime = Date.now()

    try {
      const response = await fetch("/api/solve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          grid: puzzle,
          algorithm: algorithm,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`API call failed: ${response.status} ${response.statusText}`, errorText)
        throw new Error(`API call failed: ${response.statusText}`)
      }

      const result = await response.json()
      const endTime = Date.now()
      const totalTime = endTime - startTime
      setSolveTime(totalTime)

      if (result.error) {
        console.error("API returned error:", result.error)
        throw new Error(result.error)
      }

      const solveResult = {
        algorithm,
        difficulty,
        success: result.success,
        steps: result.steps?.length || 0,
        time: totalTime,
        nodesExplored: result.nodesExplored,
        solution: result.solution,
        timestamp: new Date().toISOString(),
      }

      if (result.success && result.steps) {
        await animateSolution(result.steps)
        setPuzzle(result.solution)
      }

      setAlgorithmSteps(result.steps || [])
      onSolveComplete(solveResult)
    } catch (error) {
      console.error("Error solving puzzle:", error)
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
      const fallbackResult = {
        algorithm,
        difficulty,
        success: false,
        steps: 0,
        time: Date.now() - startTime,
        nodesExplored: 0,
        solution: puzzle,
        timestamp: new Date().toISOString(),
        error: errorMessage,
      }
      onSolveComplete(fallbackResult)
    } finally {
      setIsLoading(false)
    }
  }

  const animateSolution = async (steps: any[]) => {
    const visualizations: StepVisualization[] = steps.map((step, index) => ({
      row: step.position[0],
      col: step.position[1],
      value: step.value,
      stepNumber: index + 1,
      isActive: false,
      timeTaken: step.timeTaken || 0,
    }));

    setStepVisualizations(visualizations);

    for (let i = 0; i < steps.length; i++) {
      const stepStartTime = Date.now();
      setCurrentStepIndex(i);

      const step = steps[i];
      setPuzzle((prev) => {
        const newPuzzle = prev.map((row) => [...row]);
        newPuzzle[step.position[0]][step.position[1]] = step.value;
        return newPuzzle;
      });

      const stepTime = Date.now() - stepStartTime;
      
      setStepVisualizations(prev => prev.map((vis, idx) => 
        idx === i ? {...vis, timeTaken: stepTime} : vis
      ));

      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  };

  const handleCellChange = (row: number, col: number, value: string) => {
    const newValue = value === "" ? 0 : Number.parseInt(value)
    if (newValue >= 0 && newValue <= 9) {
      const newPuzzle = puzzle.map((r, i) => r.map((c, j) => (i === row && j === col ? newValue : c)))
      setPuzzle(newPuzzle)
    }
  }

  const getCellClassName = (row: number, col: number) => {
    const isOriginal = originalPuzzle[row][col] !== 0
    const isCurrentStep = stepVisualizations.some(
      (step, index) => step.row === row && step.col === col && index === currentStepIndex,
    )
    const isCompletedStep = stepVisualizations.some(
      (step, index) => step.row === row && step.col === col && index < currentStepIndex,
    )

    let className = `
      w-10 h-10 text-center border text-sm font-semibold sudoku-cell
      ${isOriginal ? "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300" : "bg-white dark:bg-gray-800"}
      ${(row + 1) % 3 === 0 && row !== 8 ? "border-b-2 border-b-gray-800 dark:border-b-gray-300" : ""}
      ${(col + 1) % 3 === 0 && col !== 8 ? "border-r-2 border-r-gray-800 dark:border-r-gray-300" : ""}
      ${row % 3 === 0 && row !== 0 ? "border-t-2 border-t-gray-800 dark:border-t-gray-300" : ""}
      ${col % 3 === 0 && col !== 0 ? "border-l-2 border-l-gray-800 dark:border-l-gray-300" : ""}
      rounded-lg transition-all duration-300
    `

    if (isCurrentStep) {
      className += " bg-green-400 dark:bg-green-600 text-white step-highlight scale-110 z-10"
    } else if (isCompletedStep) {
      className += " bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-600"
    }

    return className
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-white/20 dark:border-gray-700/50 shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between text-2xl">
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full ${DIFFICULTIES[difficulty].color}`}></div>
              Sudoku Puzzle
            </div>
            <Badge variant="outline" className="text-lg px-3 py-1">
              {DIFFICULTIES[difficulty].name}
            </Badge>
          </CardTitle>
          <div className="flex flex-wrap gap-3">
            <Select value={difficulty} onValueChange={handleDifficultyChange}>
              <SelectTrigger className="w-40 h-11 rounded-xl bg-white/50 dark:bg-gray-700/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(DIFFICULTIES).map(([key, diff]) => (
                  <SelectItem key={key} value={key}>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${diff.color}`}></div>
                      {diff.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={resetPuzzle} className="h-11 rounded-xl">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-9 gap-1 mb-6 max-w-lg mx-auto p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl">
            {puzzle.map((row, i) =>
              row.map((cell, j) => (
                <input
                  key={`${i}-${j}`}
                  type="text"
                  value={cell === 0 ? "" : cell}
                  onChange={(e) => handleCellChange(i, j, e.target.value)}
                  className={getCellClassName(i, j)}
                  maxLength={1}
                  disabled={originalPuzzle[i][j] !== 0 || isLoading}
                />
              )),
            )}
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              onClick={() => solvePuzzle("astar")}
              disabled={isLoading}
              className="flex items-center gap-2 h-12 px-6 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg"
            >
              {isLoading && currentAlgorithm === "astar" ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Zap className="w-5 h-5" />
              )}
              Solve with A*
            </Button>
            <Button
              onClick={() => solvePuzzle("beam")}
              disabled={isLoading}
              className="flex items-center gap-2 h-12 px-6 rounded-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg"
            >
              {isLoading && currentAlgorithm === "beam" ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Sparkles className="w-5 h-5" />
              )}
              Solve with Beam Search
            </Button>
          </div>
{currentStepIndex >= 0 && (
  <div className="mt-4 text-center">
    <Badge variant="secondary" className="text-sm px-3 py-1">
      Step {currentStepIndex + 1} of {stepVisualizations.length}
    </Badge>
    <div className="text-xs text-muted-foreground mt-1">
      Current Step Time: {stepVisualizations[currentStepIndex]?.timeTaken ?? 0} ms
    </div>

  </div>
)}
          {(solveTime !== null) && (
            <div className="mt-4 text-center">
              <div className="text-lg font-semibold">
                {isLoading ? (
                  <></>
                ) : (
                  <>Total Solving Time: <span className="text-blue-600 dark:text-blue-400">{solveTime} ms</span></>
                )}
              </div>

            </div>
          )}
        </CardContent>
      </Card>

      <AlgorithmSteps steps={algorithmSteps} algorithm={currentAlgorithm} isLoading={isLoading} />
    </div>
  )
}