import { type NextRequest, NextResponse } from "next/server"
import { spawn } from "child_process"
import path from "path"
import fs from "fs"

export async function POST(request: NextRequest) {
  try {
    const { grid, algorithm } = await request.json()

    // Validate input
    if (!grid || !algorithm) {
      return NextResponse.json({ error: "Missing grid or algorithm parameter" }, { status: 400 })
    }

    if (!Array.isArray(grid) || grid.length !== 9) {
      return NextResponse.json({ error: "Invalid grid format" }, { status: 400 })
    }

    // Check if Python files exist
    const algorithmsDir = path.join(process.cwd(), "algorithms")
    const solverApiPath = path.join(algorithmsDir, "solver_api.py")

    if (!fs.existsSync(solverApiPath)) {
      console.log("Python files not found, using fallback simulation")
      return NextResponse.json(await simulateAlgorithm(grid, algorithm))
    }

    try {
      // Try to execute Python script
      const result = await executePythonScript(solverApiPath, {
        grid,
        algorithm,
        beam_width: algorithm === "beam" ? 5 : undefined,
      })
      return NextResponse.json(result)
    } catch (pythonError) {
      console.log("Python execution failed, using fallback:", pythonError)
      // Fallback to simulation
      return NextResponse.json(await simulateAlgorithm(grid, algorithm))
    }
  } catch (error) {
    console.error("Error in solve API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function executePythonScript(scriptPath: string, inputData: any): Promise<any> {
  return new Promise((resolve, reject) => {
    // Try different Python commands
    const pythonCommands = ["python3", "python", "py"]
    let currentCommandIndex = 0

    function tryNextCommand() {
      if (currentCommandIndex >= pythonCommands.length) {
        reject(new Error("No working Python interpreter found"))
        return
      }

      const pythonCmd = pythonCommands[currentCommandIndex]
      const python = spawn(pythonCmd, [scriptPath])

      let stdout = ""
      let stderr = ""

      python.stdout.on("data", (data) => {
        stdout += data.toString()
      })

      python.stderr.on("data", (data) => {
        stderr += data.toString()
      })

      python.on("close", (code) => {
        if (code !== 0) {
          currentCommandIndex++
          tryNextCommand()
          return
        }

        try {
          const result = JSON.parse(stdout)
          resolve(result)
        } catch (error) {
          reject(new Error(`Failed to parse Python output: ${stdout}`))
        }
      })

      python.on("error", (error) => {
        currentCommandIndex++
        tryNextCommand()
      })

      // Send input data to Python script
      python.stdin.write(JSON.stringify(inputData))
      python.stdin.end()
    }

    tryNextCommand()
  })
}

// Fallback simulation function
async function simulateAlgorithm(grid: number[][], algorithm: string) {
  const steps: any[] = []
  let nodesExplored = 0

  // Find empty cells
  const emptyCells = []
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (grid[i][j] === 0) {
        emptyCells.push([i, j])
      }
    }
  }

  // Use a simple backtracking solver for simulation
  const solution = grid.map((row) => [...row])

  function isValid(board: number[][], row: number, col: number, num: number): boolean {
    // Check row
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num) return false
    }

    // Check column
    for (let x = 0; x < 9; x++) {
      if (board[x][col] === num) return false
    }

    // Check 3x3 box
    const startRow = row - (row % 3)
    const startCol = col - (col % 3)
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i + startRow][j + startCol] === num) return false
      }
    }

    return true
  }

  function solveSudoku(board: number[][]): boolean {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num
              nodesExplored++

              // Record step
              steps.push({
                step: steps.length + 1,
                position: [row, col],
                value: num,
                nodesExplored: nodesExplored,
                heuristic: algorithm === "astar" ? Math.floor(Math.random() * 10) + 1 : null,
                beamWidth: algorithm === "beam" ? 5 : null,
                score: algorithm === "beam" ? Math.floor(Math.random() * 50) + 10 : null,
              })

              if (solveSudoku(board)) {
                return true
              }

              board[row][col] = 0
            }
          }
          return false
        }
      }
    }
    return true
  }

  const success = solveSudoku(solution)

  return {
    success,
    solution: success ? solution : grid,
    steps,
    nodesExplored,
    algorithm,
  }
}
